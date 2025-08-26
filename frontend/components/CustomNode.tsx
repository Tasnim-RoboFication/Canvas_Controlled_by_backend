/**
 * CustomNode component with anchor points for edge connections
 * Features rectangular nodes with top and bottom anchor points
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface CustomNodeData {
  label: string;
  onAnchorMouseDown?: (event: React.MouseEvent, position: 'top' | 'bottom') => void;
}

const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  const handleAnchorMouseDown = (event: React.MouseEvent, position: 'top' | 'bottom') => {
    event.stopPropagation();
    if (data.onAnchorMouseDown) {
      data.onAnchorMouseDown(event, position);
    }
  };

  return (
    <div className={`custom-node ${selected ? 'selected' : ''}`}>
      {/* Top anchor point */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className="node-anchor top"
        onMouseDown={(e) => handleAnchorMouseDown(e, 'top')}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"  // Unique ID for target
        className="node-anchor top"
        style={{ 
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Node content */}
      <div className="node-content">
        {data.label}
      </div>
      
      {/* Bottom anchor point */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="node-anchor bottom"
        onMouseDown={(e) => handleAnchorMouseDown(e, 'bottom')}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"  // Unique ID for target
        className="node-anchor bottom"
        style={{ 
          opacity: 0,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
