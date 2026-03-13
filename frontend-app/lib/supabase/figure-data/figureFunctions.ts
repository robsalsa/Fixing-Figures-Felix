import { createClient } from '../client';

export interface FigureData {
  mode: string | null;
  figure_name: string | null;
  brand: string | null;
  product_line: string | null;
  series_title: string | null;
  sculptor: string | null;
  scale: string | null;
  materials: Set<string>;
  other_materials: string | null;
//   height: string;
  seller: string | null;
  age: string | null;
  auth: boolean | null;
  issue: Set<string>;
  issue_description: string | null;
}

export async function saveFigureDataToSupabase(data: FigureData) {
  const supabase = createClient();

  // Convert Set to Array for JSON storage
  const issuesArray = Array.from(data.issue);

  // Combine selected materials with custom "other" materials into a single string
  const materialsList = Array.from(data.materials).filter((m) => m !== 'other');
  if (data.other_materials) {
    materialsList.push(data.other_materials);
  }
  const materialsString = materialsList.length > 0 ? materialsList.join(' / ') : null;

  const figureRecord = {
    mode: data.mode,
    figure_name: data.figure_name,
    brand: data.brand,
    product_line: data.product_line,
    series_title: data.series_title,
    sculptor: data.sculptor,
    scale: data.scale,
    materials: materialsString,
    // height: data.height || null,
    seller: data.seller,
    age: data.age || null,
    authenticity: data.auth,
    issues: issuesArray,
    issue_description: data.issue_description,
  };

  try {
    const { data: insertedData, error } = await supabase
      .from('figures')
      .insert([figureRecord])
      .select();

    if (error) {
      console.error('Error saving figure data:', error);
      throw new Error(`Failed to save figure data: ${error.message}`);
    }

    console.log('Figure data saved successfully:', insertedData);
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Exception while saving figure data:', error);
    return { success: false, error };
  }
}

export interface TopFigure {
  figure_name: string;
  mention_count: number;
}

/**
 * Fetches the top 5 most mentioned figures from the database.
 * Returns figures ordered by mention count (descending).
 * Excludes records with null or empty figure_name.
 */
export async function getTopFiguresByMentions(limit: number = 5): Promise<TopFigure[]> {
  const supabase = createClient();

  try {
    // Query all figures with valid names
    const { data: figures, error } = await supabase
      .from('figures')
      .select('figure_name')
      .not('figure_name', 'is', null)
      .neq('figure_name', '');

    if (error) {
      console.error('Error fetching figures:', error);
      throw new Error(`Failed to fetch figures: ${error.message}`);
    }

    // Count occurrences manually (since Supabase doesn't support GROUP BY directly in JS client)
    const mentionMap = new Map<string, number>();
    
    figures?.forEach((figure) => {
      const name = figure.figure_name?.trim();
      if (name) {
        mentionMap.set(name, (mentionMap.get(name) || 0) + 1);
      }
    });

    // Convert to array and sort by count descending
    const topFigures = Array.from(mentionMap.entries())
      .map(([figure_name, mention_count]) => ({
        figure_name,
        mention_count,
      }))
      .sort((a, b) => b.mention_count - a.mention_count)
      .slice(0, limit);

    return topFigures;
  } catch (error) {
    console.error('Exception while fetching top figures:', error);
    return [];
  }
}

export interface TopItem {
  name: string;
  count: number;
}

/**
 * Fetches the top brands with the most QC issues.
 * Returns brands ordered by mention count (descending).
 * Excludes records with null or empty brand.
 */
export async function getTopBrandsByQCIssues(limit: number = 10): Promise<TopItem[]> {
  const supabase = createClient();

  try {
    const { data: figures, error } = await supabase
      .from('figures')
      .select('brand')
      .not('brand', 'is', null)
      .neq('brand', '');

    if (error) {
      console.error('Error fetching brands:', error);
      throw new Error(`Failed to fetch brands: ${error.message}`);
    }

    const brandMap = new Map<string, number>();
    
    figures?.forEach((figure) => {
      const brand = figure.brand?.trim();
      if (brand) {
        brandMap.set(brand, (brandMap.get(brand) || 0) + 1);
      }
    });

    const topBrands = Array.from(brandMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return topBrands;
  } catch (error) {
    console.error('Exception while fetching top brands:', error);
    return [];
  }
}

/**
 * Fetches the most common issues mentioned across all figures.
 * Returns issues ordered by mention count (descending).
 * Issues are stored as arrays, so we flatten and count all occurrences.
 */
export async function getTopIssues(limit: number = 10): Promise<TopItem[]> {
  const supabase = createClient();

  try {
    const { data: figures, error } = await supabase
      .from('figures')
      .select('issues')
      .not('issues', 'is', null);

    if (error) {
      console.error('Error fetching issues:', error);
      throw new Error(`Failed to fetch issues: ${error.message}`);
    }

    const issueMap = new Map<string, number>();
    
    figures?.forEach((figure) => {
      const issues = figure.issues;
      if (Array.isArray(issues)) {
        issues.forEach((issue: string) => {
          const trimmedIssue = issue?.trim();
          if (trimmedIssue) {
            issueMap.set(trimmedIssue, (issueMap.get(trimmedIssue) || 0) + 1);
          }
        });
      }
    });

    const topIssues = Array.from(issueMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return topIssues;
  } catch (error) {
    console.error('Exception while fetching top issues:', error);
    return [];
  }
}

// --- Tutorial View Tracking ---

export interface TutorialViewItem {
  name: string;
  count: number;
}

/**
 * Records a single page-view for a tutorial.
 * Call client-side on page mount inside a useEffect.
 * The tutorial_slug must exist in the `tutorials` lookup table.
 */
export async function recordTutorialView(tutorialSlug: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('tutorial_views')
    .insert([{ tutorial_slug: tutorialSlug }]);
  if (error) {
    console.error('Error recording tutorial view:', error);
  }
}

/**
 * Fetches the most-viewed tutorials ordered by view count descending.
 * Queries the `tutorial_view_counts` view which joins tutorials + tutorial_views.
 */
export async function getTopTutorialViews(limit: number = 10): Promise<TutorialViewItem[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('tutorial_view_counts')
      .select('tutorial_name, view_count')
      .order('view_count', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching tutorial views:', error);
      return [];
    }

    return (data ?? []).map(
      ({ tutorial_name, view_count }: { tutorial_name: string; view_count: number }) => ({
        name: tutorial_name,
        count: view_count,
      })
    );
  } catch (error) {
    console.error('Exception while fetching tutorial views:', error);
    return [];
  }
}