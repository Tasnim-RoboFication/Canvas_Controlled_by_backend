# Canvas 2 Frontend - Next.js + React Flow

Interactive node-based canvas application with dynamic edge creation and backend path computation.

## Features

- **Dynamic Node Creation**: Add rectangular nodes with anchor points
- **Interactive Edge Drawing**: Drag between anchor points to create connections
- **Backend Integration**: SVG paths computed server-side for optimal curves
- **Real-time Updates**: Edges update automatically when nodes are moved
- **Modern UI**: Clean, responsive interface with status indicators

## Components

### `Canvas.tsx`
Main application component integrating React Flow with custom nodes and edges.

### `CustomNode.tsx`
Rectangular node component with top and bottom anchor points for connections.

### `CustomEdge.tsx`
Edge component that renders backend-computed SVG paths with loading states.

### API Service (`services/api.ts`)
Handles communication with FastAPI backend for edge path computation.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Add Nodes**: Click "Add Node" to create new rectangular nodes
2. **Create Edges**: Drag from one anchor point (blue circles) to another
3. **Move Nodes**: Drag nodes around - edges will update automatically
4. **Controls**: Use the control panel for canvas management

## Architecture

- **React Flow**: Provides the canvas and node/edge management
- **Custom Components**: Specialized nodes and edges for the application
- **Backend Integration**: Real-time path computation via FastAPI
- **State Management**: React hooks for nodes, edges, and application state

## Configuration

The frontend connects to the FastAPI backend at `http://localhost:8000` by default. This can be configured via the `NEXT_PUBLIC_API_URL` environment variable.
