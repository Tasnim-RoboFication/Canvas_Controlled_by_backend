# Canvas 2 - React Flow + FastAPI Application

A full-stack application featuring dynamic node and edge creation with React Flow frontend and FastAPI backend.

## Features

- **Dynamic Node Creation**: Create rectangular nodes with anchor points
- **Interactive Edge Creation**: Drag between anchor points to create edges
- **Backend Path Computation**: SVG paths computed server-side for smooth curves
- **Real-time Updates**: Edges update dynamically when nodes are moved
- **Full Interactivity**: Complete drag-and-drop functionality

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

## Getting Started

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
# Canvas_Controlled_by_backend
