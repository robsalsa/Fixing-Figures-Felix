'use client';

import { useState } from 'react';

interface RankingItem {
  name: string;
  count: number;
}

interface RankingCardProps {
  title: string;
  items: RankingItem[];
  allItems: RankingItem[];
  description: string;
  linkText: string;
  warningNotice?: string;
  warningText?: string;
  showWarning?: boolean;
  noDataText?: string;
}

export default function RankingCard({
  title,
  items,
  allItems,
  description,
  linkText,
  warningNotice = 'Notice:',
  warningText = 'Data is community sourced',
  showWarning = false,
  noDataText = 'No data yet',
}: RankingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use all items if expanded, otherwise use limited items
  const displayItems = isExpanded ? allItems : items;

  // Calculate max count for bar scaling
  const maxCount = displayItems.length > 0 ? Math.max(...displayItems.map(i => i.count)) : 1;

  // Calculate bar width for each item
  const itemsWithWidth = displayItems.map(item => ({
    ...item,
    barWidth: Math.round((item.count / maxCount) * 100),
  }));

  return (
    <article className="card">
      <h4>{title}</h4>
      <p className="cardDesc">{description}</p>

      {showWarning && (
        <div className="warning" role="note" aria-live="polite" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
          <span className="warningLabel">{warningNotice}</span>
          <span>{warningText}</span>
        </div>
      )}

      <ul className="statsList" aria-live="polite" style={{ marginBottom: '1rem' }}>
        {itemsWithWidth.length > 0 ? (
          itemsWithWidth.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              <div className="statsMeta">
                <span>{item.name}</span>
                <span className="statValue">{item.count}</span>
              </div>
              <div className="statBar">
                <div style={{ width: `${item.barWidth}%` }}></div>
              </div>
            </li>
          ))
        ) : (
          <li>
            <div className="statsMeta">
              <span>{noDataText}</span>
              <span className="statValue">0</span>
            </div>
            <div className="statBar">
              <div style={{ width: '0%' }}></div>
            </div>
          </li>
        )}
      </ul>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="cardLink"
        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
      >
        {isExpanded ? `← Show less` : linkText}
      </button>
    </article>
  );
}
