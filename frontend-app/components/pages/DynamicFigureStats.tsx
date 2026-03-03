import Link from 'next/link';

interface TopFigure {
  figure_name: string;
  mention_count: number;
}

interface DynamicFigureStatsProps {
  figures: TopFigure[];
  lang: string;
  translations: {
    communityQAStats: string;
    warningNotice: string;
    warningText: string;
    reportIssuesCTA: string;
  };
}

export default function DynamicFigureStats({ figures, lang, translations }: DynamicFigureStatsProps) {
  // Calculate max count for bar scaling
  const maxCount = figures.length > 0 ? Math.max(...figures.map(f => f.mention_count)) : 1;

  // Keep raw mention count and only use percentage for bar width visualization
  const figuresWithCounts = figures.map(figure => ({
    ...figure,
    barWidth: Math.round((figure.mention_count / maxCount) * 100),
  }));

  return (
    <aside className="goalStats" id="community">
      <h3>{translations.communityQAStats}</h3>

      <div className="warning" role="note" aria-live="polite">
        <span className="warningLabel">{translations.warningNotice}</span>
        <span>{translations.warningText}</span>
      </div>

      <ul className="statsList" aria-live="polite">
        {figuresWithCounts.length > 0 ? (
          figuresWithCounts.map((figure, index) => (
            <li key={`${figure.figure_name}-${index}`}>
              <div className="statsMeta">
                <span>{figure.figure_name}</span>
                <span className="statValue">{figure.mention_count}</span>
              </div>
              <div className="statBar">
                <div style={{ width: `${figure.barWidth}%` }}></div>
              </div>
            </li>
          ))
        ) : (
          // Fallback when no data is available
          <li>
            <div className="statsMeta">
              <span>No figure data yet</span>
              <span className="statValue">0%</span>
            </div>
            <div className="statBar">
              <div style={{ width: '0%' }}></div>
            </div>
          </li>
        )}
      </ul>

      <Link href={`/${lang}/about#emailContact`} className="btn outline small" style={{ marginTop: '30px' }}>
        {translations.reportIssuesCTA}
      </Link>
    </aside>
  );
}
