import { createClient } from '../client';

export interface FigureData {
  mode: string | null;
  figure_name: string | null;
  brand: string | null;
  product_line: string | null;
  series_title: string | null;
  sculptor: string | null;
  scale: string | null;
  materials: string | null;
//   height: string;
  seller: string | null;
  age: string;
  auth: boolean | null;
  issue: Set<string>;
  issue_description: string | null;
}

export async function saveFigureDataToSupabase(data: FigureData) {
  const supabase = createClient();

  // Convert Set to Array for JSON storage
  const issuesArray = Array.from(data.issue);

  const figureRecord = {
    mode: data.mode,
    figure_name: data.figure_name,
    brand: data.brand,
    product_line: data.product_line,
    series_title: data.series_title,
    sculptor: data.sculptor,
    scale: data.scale,
    materials: data.materials,
    height: data.height || null,
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