/**
 * CustomEdge component that renders SVG paths computed by the backend
 * Displays smooth curved connections between nodes
 */

import React, { memo } from 'react';
import { EdgeProps } from 'reactflow';

export interface CustomEdgeData {
  svgPath?: string;
  isLoading?: boolean;
}

const CustomEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  data,
  selected,
}: EdgeProps<CustomEdgeData>) => {
  // Only use backend-computed path - no fallback
  const edgePath = data?.svgPath;

  // Don't render anything if no backend path is available
  if (!edgePath) {
    return null;
  }

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          stroke: data?.isLoading ? '#94a3b8' : selected ? '#4f46e5' : '#6366f1',
          strokeWidth: selected ? 3 : 2,
          strokeDasharray: data?.isLoading ? '5,5' : 'none',
          fill: 'none',
        }}
        className="react-flow__edge-path"
        d={edgePath}
      />
      
      {/* Loading indicator for when path is being computed */}
      {data?.isLoading && (
        <circle
          r="4"
          fill="#94a3b8"
          cx={(sourceX + targetX) / 2}
          cy={(sourceY + targetY) / 2}
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </>
  );
});

CustomEdge.displayName = 'CustomEdge';

export default CustomEdge;
