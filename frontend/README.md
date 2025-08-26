# Canvas 2 Frontend - Next.js + React Flow

Interactive node-based canvas application with dynamic edge creation and backend path computation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Access Points

- **Development**: http://localhost:3000
- **Backend API**: http://localhost:8000

## ✨ Features

- 🎨 **Dynamic Node Creation**: Add rectangular nodes with precise anchor points
- 🔗 **Interactive Edge Drawing**: Drag between anchor points to create connections
- 🌊 **Backend Integration**: SVG paths computed server-side for optimal curves
- ⚡ **Real-time Updates**: Edges update automatically when nodes are moved
- 🎯 **Precise Connections**: Connect exactly where you drag (top-to-top, bottom-to-bottom)
- 🔄 **Loading States**: Visual feedback during path computation
- 📱 **Modern UI**: Clean, responsive interface with status indicators

## 🏗️ Architecture

### Components

#### `Canvas.tsx` - Main Orchestrator
- **Purpose**: Manages React Flow integration and state
- **Features**:
  - Node and edge state management
  - Backend API integration
  - Real-time edge updates
  - Loading state handling

#### `CustomNode.tsx` - Interactive Nodes
- **Purpose**: Rectangular nodes with anchor points
- **Features**:
  - Top and bottom anchor points
  - Visual selection states
  - Handle mouse interactions

#### `CustomEdge.tsx` - Curved Connections
- **Purpose**: Renders backend-computed SVG paths
- **Features**:
  - Backend-only path rendering
  - Loading animations
  - Selection states

### Services

#### `api.ts` - Backend Communication
- **Purpose**: Handles all FastAPI communication
- **Features**:
  - Edge path computation requests
  - Health monitoring
  - Error handling
  - Batch operations

## 🎯 Key Features

### Node Operations
- **Dynamic Creation**: Add nodes with "Add Node" button
- **Drag & Drop**: Move nodes around canvas
- **Selection**: Visual feedback for selected nodes
- **Anchor Points**: Blue circles for edge connections

### Edge Operations
- **Precise Connections**: Connect exactly where you drag
- **Smooth Curves**: Backend-computed Bezier paths
- **Real-time Updates**: Automatic recalculation on node movement
- **Loading States**: Visual feedback during computation

### Canvas Navigation
- **Zoom**: Mouse wheel to zoom in/out
- **Pan**: Drag empty areas to navigate
- **Mini-map**: Overview of entire canvas
- **Controls**: Built-in React Flow controls

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.0.3 | React framework |
| react | 18.2.0 | UI library |
| reactflow | 11.10.1 | Node-based UI |
| axios | 1.6.2 | HTTP client |
| typescript | 5.3.2 | Type safety |

## 🐛 Troubleshooting

### Common Issues

**Edges not appearing:**
- Check backend is running on port 8000
- Verify API connection in browser console
- Check CORS configuration

**TypeScript errors:**
- Run `npm install` to ensure all types are installed
- Check `tsconfig.json` configuration

**Performance issues:**
- Limit number of nodes for testing
- Check React DevTools for unnecessary re-renders
- Ensure proper memoization in components

### Debug Mode

Enable debug logging:
```tsx
// In Canvas.tsx
console.log('Connection created:', connection);
console.log('Edge path received:', response.path);
```

## 🧪 Testing

### Manual Testing
- [ ] Node creation works
- [ ] Edge creation between anchors
- [ ] Node movement updates edges
- [ ] Loading animations appear
- [ ] Canvas navigation (zoom/pan)

### Component Testing
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚢 Production Build

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

### Optimization
- Automatic code splitting
- Image optimization
- Bundle analysis with `@next/bundle-analyzer`
- TypeScript compilation

---

**Frontend built with Next.js and React Flow**
