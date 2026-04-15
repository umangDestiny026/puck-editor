import React from 'react';

/**
 * ChildrenPlaceholder — a Puck editor component for layout pages.
 *
 * In the editor, it renders a dashed placeholder showing where `{children}`
 * (i.e. route page content) will appear in the generated Next.js layout.
 *
 * At generation time, the generator detects this component in the Puck JSON
 * and injects `{children}` in its place within layout.tsx.
 *
 * Only one ChildrenPlaceholder should be used per layout page.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChildrenPlaceholder: React.FC<any> = ({ minHeight = '200px' }) => {
  return (
    <div
      style={{
        border: '2px dashed rgba(99, 102, 241, 0.5)',
        borderRadius: '8px',
        padding: '32px 16px',
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background:
          'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(99,102,241,0.03) 10px, rgba(99,102,241,0.03) 20px)',
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(99, 102, 241, 0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(99, 102, 241, 0.7)',
          letterSpacing: '0.5px',
        }}
      >
        {'{children}'} — Page Content Area
      </span>
      <span
        style={{
          fontSize: '11px',
          color: 'rgba(99, 102, 241, 0.45)',
          maxWidth: '280px',
          textAlign: 'center',
        }}
      >
        Route pages will render here in the generated app
      </span>
    </div>
  );
};

export default ChildrenPlaceholder;
