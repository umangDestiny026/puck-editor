import React, { useMemo } from 'react';
import { Render, Data } from '@puckeditor/core';
import { puckConfig } from '../../puck.config';
import { useLatestSavedComponent } from '../../contexts/SavedComponentsContext';

const MAX_NESTING_DEPTH = 3;

interface SavedComponentRendererProps {
  _savedComponentId: string;
  _savedComponentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _savedPuckJson: any;
  _nestingDepth?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _dynamicInputs?: Record<string, any>;
}

/**
 * Recursively walks a value (object, array, or string) and replaces
 * all {{key}} placeholders with the corresponding dynamic input value.
 * @param value - The value to process
 * @param inputs - Dynamic input key-value pairs
 * @returns The value with placeholders replaced
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function replacePlaceholders(value: any, inputs: Record<string, any>): any {
  if (typeof value === 'string') {
    // Match {{key}}, {{ key }}, {key}, { key } placeholder formats
    return value.replace(/\{\{?\s*(\w+)\s*\}?\}/g, (match, key) => {
      return key in inputs ? String(inputs[key]) : match;
    });
  }
  if (Array.isArray(value)) {
    return value.map((item) => replacePlaceholders(item, inputs));
  }
  if (value && typeof value === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {};
    for (const k of Object.keys(value)) {
      result[k] = replacePlaceholders(value[k], inputs);
    }
    return result;
  }
  return value;
}

/**
 * Renders a saved component's Puck JSON using Render.
 * Prevents infinite recursion by capping nesting depth.
 * Replaces {{key}} placeholders in content with dynamic input values.
 * Always uses the latest component data from context (not stale defaultProps).
 * @param props - The component props
 * @param props._savedComponentId - The ID of the saved component
 * @param props._savedComponentName - The display name of the saved component
 * @param props._savedPuckJson - The Puck JSON data to render (fallback if context unavailable)
 * @param props._nestingDepth - Current nesting depth to prevent infinite recursion
 * @param props._dynamicInputs - Dynamic input values to replace placeholders
 */
export function SavedComponentRenderer({
  _savedComponentId,
  _savedComponentName,
  _savedPuckJson,
  _nestingDepth = 0,
  _dynamicInputs,
}: SavedComponentRendererProps) {
  // Always prefer the latest puckJson from context over the stale prop snapshot
  const latestComponent = useLatestSavedComponent(_savedComponentId);
  const effectivePuckJson = latestComponent?.puckJson || _savedPuckJson;

  // All hooks must be called before any early returns
  const data: Data | null = useMemo(() => {
    if (!effectivePuckJson || !effectivePuckJson.content) return null;
    const raw: Data = {
      root: effectivePuckJson.root || { props: {} },
      content: effectivePuckJson.content || [],
      zones: effectivePuckJson.zones || {},
    };
    // eslint-disable-next-line no-console
    console.log(
      `[SavedComponentRenderer] ${_savedComponentName}: dynamicInputs=`,
      _dynamicInputs,
      'content sample=',
      JSON.stringify(raw.content?.[0]?.props)?.slice(0, 200)
    );
    if (_dynamicInputs && Object.keys(_dynamicInputs).length > 0) {
      return replacePlaceholders(raw, _dynamicInputs) as Data;
    }
    return raw;
  }, [effectivePuckJson, _dynamicInputs, _savedComponentName]);

  if (_nestingDepth >= MAX_NESTING_DEPTH) {
    return (
      <div
        style={{
          padding: '12px 16px',
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: 4,
          fontSize: 13,
          color: '#856404',
        }}
      >
        Max nesting depth reached for &quot;{_savedComponentName}&quot;
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          padding: '16px',
          background: '#f8f9fa',
          border: '1px dashed #dee2e6',
          borderRadius: 4,
          textAlign: 'center',
          color: '#6c757d',
          fontSize: 13,
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 4 }}>🧩</div>
        <div style={{ fontWeight: 500 }}>
          Component &quot;{_savedComponentName}&quot; has no content
        </div>
        <div style={{ fontSize: 11, marginTop: 4, color: '#adb5bd' }}>
          ID: {_savedComponentId}
        </div>
      </div>
    );
  }

  return (
    <div
      className="saved-component-wrapper"
      data-saved-component-id={_savedComponentId}
    >
      <Render
        data={data}
        config={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          puckConfig as any
        }
      />
    </div>
  );
}

/**
 * Placeholder shown when a saved component that was used on a page
 * has been deleted from the component list.
 * @param props - The component props
 * @param props.componentId - The ID of the missing component
 * @param props.componentName - The name of the missing component
 */
export function DeletedComponentPlaceholder({
  componentId,
  componentName,
}: {
  componentId: string;
  componentName: string;
}) {
  return (
    <div
      style={{
        padding: '16px',
        background: '#fffbeb',
        border: '1px dashed #d69e2e',
        borderRadius: 4,
        textAlign: 'center',
        color: '#975a16',
        fontSize: 13,
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 4 }}>⚠️</div>
      <div style={{ fontWeight: 500 }}>
        Component &quot;{componentName || componentId}&quot; has no design
        content
      </div>
      <div style={{ fontSize: 11, marginTop: 4, color: '#adb5bd' }}>
        Open this component in the editor and save its design to use it as a
        block.
      </div>
    </div>
  );
}
