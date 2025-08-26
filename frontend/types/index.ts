/**
 * Type definitions for Canvas 2 application
 */

import { Node, Edge } from 'reactflow';

export interface CustomNodeData {
  label: string;
  onAnchorMouseDown?: (event: React.MouseEvent, position: 'top' | 'bottom') => void;
}

export interface CustomEdgeData {
  svgPath?: string;
  isLoading?: boolean;
}

export type CustomNode = Node<CustomNodeData>;
export type CustomEdge = Edge<CustomEdgeData>;

export interface EdgePathRequest {
  source_x: number;
  source_y: number;
  target_x: number;
  target_y: number;
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
