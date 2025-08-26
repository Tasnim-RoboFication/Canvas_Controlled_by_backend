/**
 * CustomEdge component that renders SVG paths computed by the backend
 * Displays smooth curved connections between nodes
 */

import React, { memo } from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';

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
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}: EdgeProps<CustomEdgeData>) => {
  // Use backend-computed path if available, otherwise fall back to default
  const edgePath = data?.svgPath || getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })[0];

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
