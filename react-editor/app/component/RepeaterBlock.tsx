import React from 'react';
import { DropZone } from '@puckeditor/core';

export type RepeaterItem = {
  [key: string]: any;
  id: string;
};

export type RepeaterBlockProps = {
  items?: RepeaterItem[];
  columns?: number;
  columnsMobile?: number;
  columnsTablet?: number;
  gap?: number;
  emptyMessage?: string;
  templateMode?: 'components' | 'html';
  htmlTemplate?: string;
};

/**
 * Replace {{item.field}} with sample values for editor preview
 * @param template
 * @param item
 */
function previewInterpolate(
  template: string,
  item: Record<string, any>
): string {
  return template.replace(
    /\{\{item\.(\w+(?:\.\w+)*)\}\}/g,
    (_m, path: string) => {
      const segs = path.split('.');
      let cur: any = item;
      for (const s of segs) {
        if (cur == null) return `{{item.${path}}}`;
        cur = cur[s];
      }
      return cur != null ? String(cur) : `{{item.${path}}}`;
    }
  );
}

export default function RepeaterBlock({
  items = [],
  columns = 3,
  columnsMobile: _columnsMobile = 1,
  columnsTablet: _columnsTablet = 2,
  gap = 16,
  emptyMessage = 'No items to display',
  templateMode = 'components',
  htmlTemplate = '',
}: RepeaterBlockProps) {
  const isHtmlMode = templateMode === 'html';

  return (
    <div style={{ width: '100%' }}>
      {/* Template section — different UI per mode */}
      {isHtmlMode ? (
        <div
          style={{
            border: '2px dashed #f59e0b',
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            background: 'rgba(245,158,11,0.04)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#f59e0b',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            HTML Template Mode — preview
          </div>
          {htmlTemplate ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(columns, 3)}, 1fr)`,
                gap: `${gap}px`,
              }}
            >
              {(items.length > 0
                ? items.slice(0, 3)
                : [
                    {
                      id: '1',
                      title: 'Sample',
                      description: 'Preview',
                      price: '0',
                    },
                  ]
              ).map((item, i) => (
                <div
                  key={item.id || `html-preview-${i}`}
                  dangerouslySetInnerHTML={{
                    __html: previewInterpolate(htmlTemplate, item),
                  }}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    padding: 8,
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                color: '#9ca3af',
                fontSize: 13,
                textAlign: 'center',
                padding: 16,
              }}
            >
              Set your HTML template in the props panel using{' '}
              {'{{item.fieldName}}'} placeholders
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            border: '2px dashed #6366f1',
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            background: 'rgba(99,102,241,0.04)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#6366f1',
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Components Mode — design your item layout here
          </div>
          <DropZone zone="template" />
        </div>
      )}

      {/* Runtime info */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      >
        {items.length > 0 ? (
          items.map((item, i) => (
            <div
              key={item.id || `preview-${i}`}
              style={{
                border: '1px dashed #d1d5db',
                borderRadius: 6,
                padding: 16,
                textAlign: 'center',
                fontSize: 12,
                color: '#9ca3af',
                background: '#f9fafb',
                minHeight: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Item {i + 1}
            </div>
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: 13,
            }}
          >
            {emptyMessage}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 11,
          color: '#9ca3af',
          textAlign: 'center',
        }}
      >
        {items.length} item{items.length !== 1 ? 's' : ''} will render at
        runtime ({columns} columns, {gap}px gap) — Mode:{' '}
        {isHtmlMode ? 'HTML Template' : 'Components'}
      </div>
    </div>
  );
}
