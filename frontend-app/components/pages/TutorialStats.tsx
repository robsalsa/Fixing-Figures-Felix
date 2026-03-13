'use client';

import { useEffect, useState } from 'react';
import {
  getTopTutorialViews,
  getTopIssues,
  recordTutorialView,
  TutorialViewItem,
  TopItem,
} from '@/lib/supabase/figure-data/figureFunctions';

interface TutorialStatsProps {
  /** When provided, records a view for this tutorial on mount.
   *  Must match a slug in the `tutorials` lookup table (e.g. "loose-parts"). */
  tutorialSlug?: string;
  viewsTitle?: string;
  issuesTitle?: string;
  noViewsText?: string;
  noIssuesText?: string;
}

export default function TutorialStats({
  tutorialSlug,
  viewsTitle = 'Most Viewed Tutorials',
  issuesTitle = 'Most Common Issues',
  noViewsText = 'No view data yet',
  noIssuesText = 'No issue data yet',
}: TutorialStatsProps) {
  const [tutorialViews, setTutorialViews] = useState<TutorialViewItem[]>([]);
  const [commonIssues, setCommonIssues] = useState<TopItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Record this tutorial's view if a slug is provided
    if (tutorialSlug) {
      recordTutorialView(tutorialSlug);
    }

    // Fetch both stat sets in parallel
    Promise.all([getTopTutorialViews(10), getTopIssues(5)]).then(([views, issues]) => {
      setTutorialViews(views);
      setCommonIssues(issues);
      setLoading(false);
    });
  }, [tutorialSlug]);

  const maxViews = tutorialViews.length > 0 ? Math.max(...tutorialViews.map((v) => v.count)) : 1;
  const maxIssues = commonIssues.length > 0 ? Math.max(...commonIssues.map((i) => i.count)) : 1;

  if (loading) {
    return (
      <div className="goalGrid">
        <div className="goalContent" aria-busy="true">
          Loading stats…
        </div>
      </div>
    );
  }

  return (
    <div className="goalGrid">
      {/* Most Viewed Tutorials */}
      <div className="goalContent">
        <h3 style={{ margin: '0 0 16px' }}>{viewsTitle}</h3>
        <ul className="statsList" aria-live="polite">
          {tutorialViews.length > 0 ? (
            tutorialViews.map((item, idx) => (
              <li key={`${item.name}-${idx}`}>
                <div className="statsMeta">
                  <span>{item.name}</span>
                  <span className="statValue">{item.count}</span>
                </div>
                <div className="statBar">
                  <div style={{ width: `${Math.round((item.count / maxViews) * 100)}%` }} />
                </div>
              </li>
            ))
          ) : (
            <li>
              <div className="statsMeta">
                <span>{noViewsText}</span>
                <span className="statValue">0</span>
              </div>
              <div className="statBar">
                <div style={{ width: '0%' }} />
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Most Common Issues */}
      <aside className="goalStats">
        <h3 style={{ margin: '0 0 16px' }}>{issuesTitle}</h3>
        <ul className="statsList" aria-live="polite">
          {commonIssues.length > 0 ? (
            commonIssues.map((item, idx) => (
              <li key={`${item.name}-${idx}`}>
                <div className="statsMeta">
                  <span>{item.name}</span>
                  <span className="statValue">{item.count}</span>
                </div>
                <div className="statBar">
                  <div style={{ width: `${Math.round((item.count / maxIssues) * 100)}%` }} />
                </div>
              </li>
            ))
          ) : (
            <li>
              <div className="statsMeta">
                <span>{noIssuesText}</span>
                <span className="statValue">0</span>
              </div>
              <div className="statBar">
                <div style={{ width: '0%' }} />
              </div>
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
}
