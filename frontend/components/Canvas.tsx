/**
 * Main Canvas component integrating React Flow with dynamic nodes and edges
 * Features node creation, edge drawing, and backend path computation
 */

import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowProvider,
  useReactFlow,
  NodeTypes,
  EdgeTypes,
  Background,
  Controls,
  MiniMap,
  ConnectionMode,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  ReactFlowInstance,
  NodePositionChange,
} from 'reactflow';

import 'reactflow/dist/style.css';
import CustomNode, { CustomNodeData } from './CustomNode';
import CustomEdge, { CustomEdgeData } from './CustomEdge';
import { getEdgePath, checkApiHealth } from '../services/api';
import { EdgePathRequest } from '../types';

// Edge type options - updated to include all types
export type EdgeType = 'bezier' | 'straight' | 'step' | 'smoothstep';

// Define node and edge types
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

// Initial nodes and edges
const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 250 },
    data: { label: 'Node 2' },
  },
];

const initialEdges: Edge<CustomEdgeData>[] = [];

interface CanvasFlowProps {}

const CanvasFlow: React.FC<CanvasFlowProps> = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [nodeCounter, setNodeCounter] = useState(3);
  const [selectedEdgeType, setSelectedEdgeType] = useState<EdgeType>('bezier');
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();

  // Check API health on component mount
  useEffect(() => {
    const checkApi = async () => {
      const isHealthy = await checkApiHealth();
      setIsApiConnected(isHealthy);
    };
    
    checkApi();
    
    // Check API health periodically
    const interval = setInterval(checkApi, 30000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Fetch edge path from backend and update edge data
   */
  const updateEdgeWithBackendPath = useCallback(async (
    edgeId: string,
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
    edgeType?: EdgeType
  ) => {
    if (!isApiConnected) {
      console.warn('API not connected, using default edge path');
      return;
    }

    try {
      // Set loading state
      setEdges(edges => edges.map(edge => 
        edge.id === edgeId 
          ? { ...edge, data: { ...edge.data, isLoading: true } }
          : edge
      ));

      const request: EdgePathRequest = {
        source_x: sourceX,
        source_y: sourceY,
        target_x: targetX,
        target_y: targetY,
        edge_type: edgeType || selectedEdgeType,
      };

      const response = await getEdgePath(request);

      // Update edge with computed path
      setEdges(edges => edges.map(edge => 
        edge.id === edgeId 
          ? { 
              ...edge, 
              data: { 
                ...edge.data, 
                svgPath: response.path, 
                isLoading: false 
              } 
            }
          : edge
      ));

    } catch (error) {
      console.error('Failed to fetch edge path:', error);
      
      // Remove loading state on error
      setEdges(edges => edges.map(edge => 
        edge.id === edgeId 
          ? { ...edge, data: { ...edge.data, isLoading: false } }
          : edge
      ));
    }
  }, [isApiConnected, setEdges, selectedEdgeType]);

  /**
   * Handle new edge connections
   */
  const onConnect: OnConnect = useCallback((connection: Connection) => {
    console.log('🔗 Connection:', {
      source: connection.source,
      sourceHandle: connection.sourceHandle,
      target: connection.target,
      targetHandle: connection.targetHandle
    });

    const newEdge: Edge<CustomEdgeData> = {
      id: `edge-${Date.now()}`,
      source: connection.source!,
      target: connection.target!,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      type: 'custom',
      data: { 
        isLoading: true,
        edgeType: selectedEdgeType // Store the selected edge type with the edge
      },
    };

    setEdges(edges => addEdge(newEdge, edges));

    // Get node positions to compute edge path
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);

    if (sourceNode && targetNode) {
      // Calculate source anchor position
      const sourceY = connection.sourceHandle === 'top' 
        ? sourceNode.position.y 
        : sourceNode.position.y + 60;
      
      // Calculate target anchor position
      const targetY = connection.targetHandle === 'top-target' 
        ? targetNode.position.y 
        : connection.targetHandle === 'bottom-target'
          ? targetNode.position.y + 60
          : targetNode.position.y + 60; // Default to bottom

      updateEdgeWithBackendPath(
        newEdge.id,
        sourceNode.position.x + 60,
        sourceY,
        targetNode.position.x + 60,
        targetY,
        selectedEdgeType // Use the currently selected type for new edges
      );
    }
  }, [nodes, setEdges, updateEdgeWithBackendPath, selectedEdgeType]);

  /**
   * Handle node position changes - update connected edges
   */
  const handleNodesChange: OnNodesChange = useCallback((changes) => {
    onNodesChange(changes);

    // Check if any node moved
    const movedNodes = changes.filter(change => 
      change.type === 'position' && change.dragging === false
    ) as NodePositionChange[];

    if (movedNodes.length > 0) {
      // Update all edges connected to moved nodes
      movedNodes.forEach(change => {
        const nodeId = change.id;
        const connectedEdges = edges.filter(edge => 
          edge.source === nodeId || edge.target === nodeId
        );

        connectedEdges.forEach(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);

          if (sourceNode && targetNode) {
            // Calculate source anchor position
            const sourceY = edge.sourceHandle === 'top' 
              ? sourceNode.position.y 
              : sourceNode.position.y + 60;
            
            // Calculate target anchor position
            const targetY = edge.targetHandle === 'top-target' 
              ? targetNode.position.y 
              : edge.targetHandle === 'bottom-target'
                ? targetNode.position.y + 60
                : targetNode.position.y + 60; // Default to bottom

            updateEdgeWithBackendPath(
              edge.id,
              sourceNode.position.x + 60,
              sourceY,
              targetNode.position.x + 60,
              targetY,
              edge.data?.edgeType || 'bezier' // Use the edge's stored type, not the currently selected type
            );
          }
        });
      });
    }
  }, [onNodesChange, edges, nodes, updateEdgeWithBackendPath]); // Remove selectedEdgeType from dependencies

  /**
   * Add a new node to the canvas
   */
  const addNode = useCallback(() => {
    const newNode: Node<CustomNodeData> = {
      id: `node-${nodeCounter}`,
      type: 'custom',
      position: { 
        x: Math.random() * 400 + 100, 
        y: Math.random() * 300 + 100 
      },
      data: { label: `Node ${nodeCounter}` },
    };

    setNodes(nodes => [...nodes, newNode]);
    setNodeCounter(counter => counter + 1);
  }, [nodeCounter, setNodes]);

  /**
   * Clear all nodes and edges
   */
  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setNodeCounter(1);
  }, [setNodes, setEdges]);

  /**
   * Reset to initial state
   */
  const resetCanvas = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setNodeCounter(3);
  }, [setNodes, setEdges]);

  return (
    <div className="canvas-container" style={{ width: '100vw', height: '100vh' }}>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Controls Panel */}
      <div className="controls-panel">
        <h3>Canvas Controls</h3>
        <button onClick={addNode}>Add Node</button>
        <button onClick={resetCanvas}>Reset</button>
        <button onClick={clearCanvas}>Clear All</button>
        
        <div className="edge-type-selector">
          <h4>Edge Type</h4>
          <select 
            value={selectedEdgeType} 
            onChange={(e) => setSelectedEdgeType(e.target.value as EdgeType)}
            className="edge-type-dropdown"
          >
            <option value="bezier">Bezier (Curved)</option>
            <option value="straight">Straight Line</option>
            <option value="step">Step</option>
            <option value="smoothstep">Smooth Step</option>
          </select>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={`status-indicator ${isApiConnected ? 'connected' : 'disconnected'}`}>
        <strong>Backend API:</strong> {isApiConnected ? 'Connected' : 'Disconnected'}
        <br />
        <small>
          {isApiConnected 
            ? 'Edge paths computed server-side' 
            : 'Using fallback edge rendering'
          }
        </small>
      </div>
    </div>
  );
};

const Canvas: React.FC = () => {
  return (
    <ReactFlowProvider>
      <CanvasFlow />
    </ReactFlowProvider>
  );
};

export default Canvas;
