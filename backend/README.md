# Canvas 2 Backend - FastAPI

FastAPI backend service for computing smooth edge paths between nodes.

## 🚀 Quick Start

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Unix/Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start development server
python start.py
# or: uvicorn main:app --reload
```

## 🌐 Access Points

- **API Server**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## ✨ Features

- 🌊 **Edge Path Computation**: Generates smooth Bezier curves between anchor points
- 🔄 **CORS Support**: Configured for seamless frontend integration
- 💚 **Health Monitoring**: Comprehensive health check endpoints for service status
- 🛡️ **Error Handling**: Robust error handling and input validation
- 📚 **Auto Documentation**: Interactive API docs with FastAPI
- 🎯 **Mathematical Precision**: Advanced algorithms for optimal curve generation

## 🏗️ API Endpoints

### POST `/get-edge-path`
Compute SVG path for edge connection between two anchor points.

**Request Body:**
```json
{
  "source_x": 100.0,
  "source_y": 50.0,
  "target_x": 300.0,
  "target_y": 200.0
}
```

**Response:**
```json
{
  "path": "M 100,50 C 140,50 260,200 300,200",
  "source": {"x": 100.0, "y": 50.0},
  "target": {"x": 300.0, "y": 200.0}
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/get-edge-path \
  -H "Content-Type: application/json" \
  -d '{"source_x": 100, "source_y": 50, "target_x": 300, "target_y": 200}'
```

### GET `/health`
Detailed service health check with version and endpoint information.

**Response:**
```json
{
  "status": "healthy",
  "service": "Canvas 2 Edge Path API",
  "version": "1.0.0",
  "endpoints": {
    "get_edge_path": "/get-edge-path",
    "health": "/health"
  }
}
```

### GET `/`
Simple health check endpoint.

**Response:**
```json
{
  "message": "Canvas 2 API is running",
  "status": "healthy"
}
```

## 🧮 Edge Path Algorithm

### Bezier Curve Computation

The edge path computation uses cubic Bezier curves with intelligent control point placement:

#### 1. **Distance Calculation**
```python
distance = sqrt((target_x - source_x)² + (target_y - source_y)²)
control_offset = min(distance * 0.4, 100)  # Cap at 100px
```

#### 2. **Direction Analysis**
```python
dx = abs(target_x - source_x)  # Horizontal distance
dy = abs(target_y - source_y)  # Vertical distance

if dx > dy:  # More horizontal connection
    # Use vertical control points
else:  # More vertical connection  
    # Use horizontal control points
```

#### 3. **Control Point Placement**
- **Horizontal connections**: Control points extend vertically from endpoints
- **Vertical connections**: Control points extend horizontally from endpoints
- **Adaptive intensity**: Curve strength based on connection distance

#### 4. **SVG Path Generation**
```python
path = f"M {source_x},{source_y} C {control1_x},{control1_y} {control2_x},{control2_y} {target_x},{target_y}"
```

### Algorithm Benefits
- ✅ **Smooth curves** that look natural
- ✅ **Adaptive behavior** based on connection distance and direction  
- ✅ **Consistent visual quality** across different node arrangements
- ✅ **Performance optimized** for real-time computation

## 🔧 Development

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.104.1 | Web framework |
| uvicorn | 0.24.0 | ASGI server |
| pydantic | 2.5.0 | Data validation |
| python-multipart | 0.0.6 | Form parsing |

### Project Structure
```
backend/
├── main.py           # FastAPI application and endpoints
├── start.py          # Development server script  
├── requirements.txt  # Python dependencies
└── README.md         # This documentation
```

## 🧪 Testing

### Manual API Testing
```bash
# Test health endpoint
curl http://localhost:8000/health

# Test edge path computation
curl -X POST http://localhost:8000/get-edge-path \
  -H "Content-Type: application/json" \
  -d '{"source_x": 100, "source_y": 50, "target_x": 300, "target_y": 200}'
```

### Interactive Testing
Visit http://localhost:8000/docs for interactive API documentation and testing interface.

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000  # Windows
lsof -i :8000                 # Unix/Linux/macOS

# Kill the process or use different port
uvicorn main:app --port 8001
```

**CORS errors:**
- Ensure frontend URL is in `allow_origins` list
- Check browser console for specific CORS error messages
- Verify frontend is running on expected port (3000)

**Import errors:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Unix/Linux/macOS
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

## 🚢 Production Deployment

### Using Gunicorn
```bash
# Install Gunicorn
pip install gunicorn

# Run with multiple workers
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables
```bash
# Production settings
export CORS_ORIGINS="https://yourdomain.com"
export PORT=8000
export WORKERS=4
```

---

**Backend built with FastAPI and mathematical precision**
