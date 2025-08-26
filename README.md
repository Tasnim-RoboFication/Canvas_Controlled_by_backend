# Canvas 2 - React Flow + FastAPI Application

> **A professional node-based canvas application with backend-computed edge paths**

A full-stack application featuring dynamic node and edge creation with React Flow frontend and FastAPI backend. Create nodes, connect them with smooth curves, and watch edges update in real-time as you move nodes around.

![Canvas 2 Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0.3-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-blue)

## ✨ Features

- 🎨 **Dynamic Node Creation**: Create rectangular nodes with precise anchor points
- 🔗 **Interactive Edge Creation**: Drag between anchor points to create connections
- 🌊 **Backend Path Computation**: Beautiful Bezier curves computed server-side
- ⚡ **Real-time Updates**: Edges automatically update when nodes are moved
- 🎯 **Precise Connections**: Connect exactly where you drag (top-to-top, bottom-to-bottom, etc.)
- 🔄 **Loading States**: Visual feedback during path computation
- 📱 **Responsive Design**: Works on desktop and tablet devices
- 🛠️ **Developer Friendly**: Full TypeScript support with comprehensive documentation

## Project Structure

```
├── backend/                    # FastAPI Backend
│   ├── main.py                # Main FastAPI application
│   ├── start.py               # Development server script
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Backend documentation
├── frontend/                   # Next.js Frontend
│   ├── components/            # React components
│   │   ├── Canvas.tsx         # Main canvas with React Flow
│   │   ├── CustomNode.tsx     # Custom node with anchor points
│   │   └── CustomEdge.tsx     # Custom edge with backend paths
│   ├── config/                # Configuration files
│   │   └── api.ts             # API configuration
│   ├── pages/                 # Next.js pages
│   │   ├── _app.tsx           # App wrapper
│   │   └── index.tsx          # Main page
│   ├── services/              # API services
│   │   └── api.ts             # Backend communication
│   ├── styles/                # CSS styles
│   │   └── globals.css        # Global styles
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts           # Type definitions
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── next.config.js         # Next.js configuration
│   └── README.md              # Frontend documentation
├── start-dev.sh               # Unix development startup script
├── start-dev.bat              # Windows development startup script
├── DEMO.md                    # Demo instructions and walkthrough
└── README.md                  # Main project documentation
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**For Windows:**
```bash
start-dev.bat
```

**For Unix/Linux/macOS:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Manual Setup

#### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+ and pip
- **Git** (for cloning)

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Unix/Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python start.py
# or alternatively: uvicorn main:app --reload
```

#### Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

## 🌐 Access Points

Once both servers are running:

- **🎨 Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **🔧 Backend API**: [http://localhost:8000](http://localhost:8000)
- **📚 API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **🔍 API Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

## 📖 How to Use

### Basic Operations

1. **Add Nodes**: Click the "Add Node" button to create new rectangular nodes
2. **Create Edges**: Drag from any blue anchor point to another anchor point
3. **Move Nodes**: Drag nodes around - connected edges will update automatically
4. **Select Elements**: Click on nodes or edges to select them
5. **Navigate Canvas**: Use mouse wheel to zoom, drag empty areas to pan

### Advanced Features

- **Precise Connections**: Drag from top anchor to top anchor for top-to-top connections
- **Multiple Connections**: Connect multiple edges to the same anchor point
- **Real-time Updates**: Move nodes and watch all connected edges recalculate smoothly
- **Visual Feedback**: Loading animations show when edges are being computed

## 🏗️ Architecture

### Frontend (Next.js + React Flow)
- **Canvas.tsx**: Main orchestrator component managing nodes, edges, and API integration
- **CustomNode.tsx**: Rectangular nodes with top/bottom anchor points
- **CustomEdge.tsx**: Edges that render backend-computed SVG paths
- **API Service**: Handles communication with FastAPI backend

### Backend (FastAPI)
- **Edge Path Computation**: Advanced Bezier curve algorithms
- **RESTful API**: Clean endpoints for path computation and health checks
- **CORS Support**: Configured for seamless frontend integration
- **Error Handling**: Comprehensive validation and error responses

### Communication Flow
```
User Action → React Flow → API Request → FastAPI → SVG Path → Edge Rendering
```

## 🔧 Development

### Key Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Frontend Framework | Next.js | 14.0.3 | React-based web framework |
| Canvas Library | React Flow | 11.10.1 | Node-based UI components |
| Backend Framework | FastAPI | 0.104.1 | Python API framework |
| Language | TypeScript | 5.3.2 | Type-safe JavaScript |
| HTTP Client | Axios | 1.6.2 | API communication |
| Validation | Pydantic | 2.5.0 | Data validation |

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] **Node Creation**: Click "Add Node" creates new nodes
- [ ] **Edge Creation**: Drag between anchors creates smooth curves
- [ ] **Precise Connections**: Top-to-top and bottom-to-bottom work correctly
- [ ] **Node Movement**: Moving nodes updates connected edges
- [ ] **Loading States**: See loading animations during edge computation
- [ ] **Multiple Connections**: Multiple edges to same node work
- [ ] **Selection**: Clicking nodes/edges shows selection state
- [ ] **Canvas Navigation**: Zoom and pan work smoothly

### API Testing

Test the backend directly:
```bash
# Health check
curl http://localhost:8000/health

# Edge path computation
curl -X POST http://localhost:8000/get-edge-path \
  -H "Content-Type: application/json" \
  -d '{"source_x": 100, "source_y": 50, "target_x": 300, "target_y": 200}'
```

## 🐛 Troubleshooting

### Common Issues

**Backend not connecting:**
- Ensure FastAPI server is running on port 8000
- Check for port conflicts
- Verify Python dependencies are installed

**Frontend errors:**
- Run `npm install` in frontend directory
- Check Node.js version (18+ required)
- Clear Next.js cache: `npm run build`

**Edges appear straight instead of curved:**
- Check browser console for API errors
- Verify backend is responding at `/get-edge-path`
- Check CORS configuration

**Performance issues:**
- Limit number of nodes/edges for testing
- Check browser performance tools
- Ensure development mode is not used in production

## 🚢 Production Deployment

### Backend Deployment
```bash
# Install production dependencies
pip install -r requirements.txt

# Run with Gunicorn (production WSGI server)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - Powerful node-based UI library
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework for production

---

**Built with ❤️ using React Flow and FastAPI**
