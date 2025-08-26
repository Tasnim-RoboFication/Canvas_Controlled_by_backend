@echo off
REM Canvas 2 Development Startup Script for Windows
REM Starts both frontend and backend services

echo 🎨 Canvas 2 - Development Environment Setup
echo ==========================================

REM Check prerequisites
echo 🔍 Checking prerequisites...

where python >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Python is required but not installed.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js and npm are required but not installed.
    pause
    exit /b 1
)

where pip >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ pip is required but not installed.
    pause
    exit /b 1
)

echo ✅ All prerequisites found!

REM Setup backend
echo.
echo 🔧 Setting up backend...
cd backend

if not exist "venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv venv
)

echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

echo 📚 Installing Python dependencies...
pip install -r requirements.txt

echo 🚀 Starting FastAPI backend...
start /b python start.py

cd ..

REM Setup frontend
echo.
echo 🔧 Setting up frontend...
cd frontend

if not exist "node_modules" (
    echo 📦 Installing Node.js dependencies...
    npm install
)

echo 🚀 Starting Next.js frontend...
start /b npm run dev

cd ..

echo.
echo 🎉 Development environment is starting up!
echo.
echo 📍 Frontend: http://localhost:3000
echo 📍 Backend API: http://localhost:8000
echo 📖 API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop all services...

pause >nul

REM Cleanup
echo.
echo 🛑 Shutting down services...
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1
echo 👋 Development environment stopped.
pause
