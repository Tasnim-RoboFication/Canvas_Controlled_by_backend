/**
 * Type definitions for Canvas 2 application
 */

import { Node, Edge } from 'reactflow';

// Define EdgeType first, before using it in interfaces
export type EdgeType = 'bezier' | 'straight' | 'step' | 'smoothstep';

export interface CustomNodeData {
  label: string;
  onAnchorMouseDown?: (event: React.MouseEvent, position: 'top' | 'bottom') => void;
}

export interface CustomEdgeData {
  svgPath?: string;
  isLoading?: boolean;
  edgeType: EdgeType; // Now EdgeType is defined above
}

export type CustomNode = Node<CustomNodeData>;
export type CustomEdge = Edge<CustomEdgeData>;

// API types
export interface EdgePathRequest {
  source_x: number;
  source_y: number;
  target_x: number;
  target_y: number;
  edge_type: EdgeType;
}

export interface EdgePathResponse {
  path: string;
  source: { x: number; y: number };
  target: { x: number; y: number };
}

export interface ApiError {
  message: string;
  status?: number;
}
