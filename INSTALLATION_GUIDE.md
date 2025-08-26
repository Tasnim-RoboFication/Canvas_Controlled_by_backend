# 📋 Canvas 2 - Complete Installation Guide

This guide provides step-by-step instructions for setting up the Canvas 2 application on different operating systems.

## 📋 Prerequisites

Before installing Canvas 2, ensure you have the following software installed:

### Required Software

| Software | Minimum Version | Recommended | Download Link |
|----------|----------------|-------------|---------------|
| **Node.js** | 18.0.0 | 20.x LTS | [nodejs.org](https://nodejs.org/) |
| **npm** | 8.0.0 | Latest | Included with Node.js |
| **Python** | 3.8.0 | 3.11+ | [python.org](https://python.org/) |
| **pip** | 21.0.0 | Latest | Included with Python |
| **Git** | 2.20.0 | Latest | [git-scm.com](https://git-scm.com/) |

### Verify Installation

Run these commands to verify your prerequisites:

```bash
# Check Node.js and npm
node --version    # Should be 18.0.0 or higher
npm --version     # Should be 8.0.0 or higher

# Check Python and pip
python --version  # Should be 3.8.0 or higher
pip --version     # Should be 21.0.0 or higher

# Check Git
git --version     # Should be 2.20.0 or higher
```

## 🚀 Quick Installation (Automated)

### Option 1: Windows Users

1. **Open Command Prompt or PowerShell as Administrator**
2. **Navigate to project directory:**
   ```cmd
   cd "E:\RoboFication LLC\Canvas 2"
   ```
3. **Run the automated setup:**
   ```cmd
   start-dev.bat
   ```

### Option 2: Unix/Linux/macOS Users

1. **Open Terminal**
2. **Navigate to project directory:**
   ```bash
   cd "/path/to/Canvas 2"
   ```
3. **Make script executable and run:**
   ```bash
   chmod +x start-dev.sh
   ./start-dev.sh
   ```

The automated setup will:
- ✅ Check prerequisites
- ✅ Create Python virtual environment
- ✅ Install all dependencies
- ✅ Start both backend and frontend servers
- ✅ Open the application in your browser

## 🔧 Manual Installation (Step-by-Step)

If you prefer manual setup or the automated script doesn't work:

### Step 1: Clone/Download the Project

If you haven't already, get the project files:

```bash
# If using Git
git clone https://github.com/Tasnim-RoboFication/Canvas_Controlled_by_backend.git
cd Canvas_Controlled_by_backend

# Or download and extract the ZIP file
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create Python virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   
   # Unix/Linux/macOS
   python3 -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # Windows (Command Prompt)
   venv\Scripts\activate
   
   # Windows (PowerShell)
   venv\Scripts\Activate.ps1
   
   # Unix/Linux/macOS
   source venv/bin/activate
   ```

4. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the FastAPI server:**
   ```bash
   # Option 1: Using the start script
   python start.py
   
   # Option 2: Using uvicorn directly
   uvicorn main:app --reload
   ```

6. **Verify backend is running:**
   - Open browser and go to: http://localhost:8000
   - You should see: `{"message": "Canvas 2 API is running", "status": "healthy"}`
   - API docs available at: http://localhost:8000/docs

### Step 3: Frontend Setup

**Open a new terminal/command prompt** (keep the backend running):

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the Next.js development server:**
   ```bash
   npm run dev
   ```

4. **Verify frontend is running:**
   - Open browser and go to: http://localhost:3000
   - You should see the Canvas 2 application interface

## 🎯 Post-Installation Verification

### Test Basic Functionality

1. **Frontend loads correctly:**
   - [ ] Canvas interface appears
   - [ ] "Add Node" button is visible
   - [ ] Status indicator shows "Backend API: Connected"

2. **Node operations work:**
   - [ ] Click "Add Node" creates new nodes
   - [ ] Nodes can be dragged around
   - [ ] Blue anchor points are visible on nodes

3. **Edge operations work:**
   - [ ] Drag from anchor to anchor creates edges
   - [ ] Edges show loading animation briefly
   - [ ] Edges appear as smooth curves (not straight lines)
   - [ ] Moving nodes updates connected edges

4. **API connectivity:**
   - [ ] Browser console shows no CORS errors
   - [ ] Network tab shows successful requests to localhost:8000

### Test API Directly

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test edge path computation
curl -X POST http://localhost:8000/get-edge-path \
  -H "Content-Type: application/json" \
  -d '{"source_x": 100, "source_y": 50, "target_x": 300, "target_y": 200}'
```

Expected response:
```json
{
  "path": "M 100,50 C 140,50 260,200 300,200",
  "source": {"x": 100, "y": 50},
  "target": {"x": 300, "y": 200}
}
```

## 🐛 Troubleshooting Common Issues

### Backend Issues

**❌ "Port 8000 is already in use"**
```bash
# Find and kill process using port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <process_id> /F

# Unix/Linux/macOS:
lsof -i :8000
kill -9 <process_id>

# Or use different port:
uvicorn main:app --port 8001 --reload
```

**❌ "ModuleNotFoundError: No module named 'fastapi'"**
```bash
# Ensure virtual environment is activated
# Windows:
venv\Scripts\activate

# Unix/Linux/macOS:
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

**❌ "Python/pip not found"**
- Ensure Python is installed and added to PATH
- Try `python3` and `pip3` instead of `python` and `pip`
- Restart terminal after installing Python

### Frontend Issues

**❌ "Port 3000 is already in use"**
```bash
# Kill process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Unix/Linux/macOS:
lsof -i :3000
kill -9 <process_id>

# Or use different port:
npm run dev -- --port 3001
```

**❌ "npm: command not found"**
- Ensure Node.js is installed and added to PATH
- Restart terminal after installing Node.js
- Download from [nodejs.org](https://nodejs.org/)

**❌ "Module not found" errors**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json  # Unix/Linux/macOS
rmdir /s node_modules & del package-lock.json  # Windows
npm install
```

### CORS Issues

**❌ "Access to fetch at 'http://localhost:8000' from origin 'http://localhost:3000' has been blocked by CORS policy"**

1. **Check backend CORS configuration in `backend/main.py`:**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],  # Should include your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Restart backend server after changes**

3. **Clear browser cache and try again**

### Performance Issues

**❌ "Application is slow/unresponsive"**
- Limit number of nodes for testing (start with 5-10 nodes)
- Check browser developer tools for console errors
- Ensure you're using development mode (not production build)
- Close other resource-intensive applications

## 🔄 Development Workflow

### Daily Development Setup

1. **Start backend (Terminal 1):**
   ```bash
   cd backend
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   python start.py
   ```

2. **Start frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Making Changes

- **Backend changes**: Server auto-reloads with `--reload` flag
- **Frontend changes**: Next.js hot-reloads automatically
- **Dependency changes**: Restart servers after installing new packages

## 🚢 Production Deployment

### Backend Production

```bash
# Install production WSGI server
pip install gunicorn

# Run with multiple workers
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Configuration

Create production environment files:

**Backend**: Create `.env` file:
```env
CORS_ORIGINS=https://yourdomain.com
PORT=8000
WORKERS=4
```

**Frontend**: Create `.env.production.local`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 📞 Getting Help

If you encounter issues not covered in this guide:

1. **Check the logs:**
   - Backend: Look at terminal output where FastAPI is running
   - Frontend: Check browser console (F12 → Console tab)

2. **Verify versions:**
   - Ensure all prerequisites meet minimum version requirements
   - Check that dependencies match versions in `package.json` and `requirements.txt`

3. **Create an issue:**
   - Include error messages, operating system, and software versions
   - Describe steps taken and expected vs actual behavior

## ✅ Installation Complete!

Once everything is working:

- ✅ Backend running on http://localhost:8000
- ✅ Frontend running on http://localhost:3000  
- ✅ API documentation at http://localhost:8000/docs
- ✅ All functionality tested and working

You're ready to start using Canvas 2! 🎉

---

**Need help? Check the troubleshooting section or create an issue on GitHub.**
