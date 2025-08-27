"""
FastAPI backend for Canvas 2 - React Flow Application
Provides edge path computation with smooth Bezier curves
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import math

app = FastAPI(title="Canvas 2 API", description="Edge path computation service")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EdgePathRequest(BaseModel):
    """Request model for edge path computation"""
    source_x: float
    source_y: float
    target_x: float
    target_y: float
    edge_type: str

class EdgePathResponse(BaseModel):
    """Response model containing SVG path string"""
    path: str
    source: Dict[str, float]
    target: Dict[str, float]

def calculate_straight_path(source_x: float, source_y: float, target_x: float, target_y: float) -> str:
    """
    Calculate straight line path between two points
    
    Args:
        source_x, source_y: Starting point coordinates
        target_x, target_y: Ending point coordinates
        
    Returns:
        SVG path string for straight line connection
    """
    return f"M {source_x},{source_y} L {target_x},{target_y}"


def calculate_bezier_path(source_x: float, source_y: float, target_x: float, target_y: float) -> str:
    """
    Calculate smooth Bezier curve path between two points
    
    Args:
        source_x, source_y: Starting point coordinates
        target_x, target_y: Ending point coordinates
        
    Returns:
        SVG path string for smooth curved connection
    """
    # Calculate the distance between points to determine curve intensity
    distance = math.sqrt((target_x - source_x) ** 2 + (target_y - source_y) ** 2)
    
    # Control point offset - adjust curve based on distance and direction
    control_offset = min(distance * 0.4, 100)  # Cap the curve intensity
    
    # Determine if connection is more horizontal or vertical
    dx = abs(target_x - source_x)
    dy = abs(target_y - source_y)
    
    if dx > dy:
        # More horizontal connection - use vertical control points
        control1_x = source_x + (control_offset if target_x > source_x else -control_offset)
        control1_y = source_y
        control2_x = target_x - (control_offset if target_x > source_x else -control_offset)
        control2_y = target_y
    else:
        # More vertical connection - use horizontal control points
        control1_x = source_x
        control1_y = source_y + (control_offset if target_y > source_y else -control_offset)
        control2_x = target_x
        control2_y = target_y - (control_offset if target_y > source_y else -control_offset)
    
    # Create SVG cubic Bezier curve path
    path = f"M {source_x},{source_y} C {control1_x},{control1_y} {control2_x},{control2_y} {target_x},{target_y}"
    
    return path

def calculate_edge_path(source_x: float, source_y: float, target_x: float, target_y: float, edge_type: str) -> str:
    """
    Calculate edge path based on the specified edge type
    
    Args:
        source_x, source_y: Starting point coordinates
        target_x, target_y: Ending point coordinates
        edge_type: Type of edge ('bezier', 'straight', 'smooth', 'steep')
        
    Returns:
        SVG path string for the specified edge type
    """
    if edge_type == "straight":
        return calculate_straight_path(source_x, source_y, target_x, target_y)
    else:  # Default to bezier
        return calculate_bezier_path(source_x, source_y, target_x, target_y)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Canvas 2 API is running", "status": "healthy"}

@app.post("/get-edge-path", response_model=EdgePathResponse)
async def get_edge_path(request: EdgePathRequest):
    """
    Compute SVG path for edge connection between two anchor points
    
    Args:
        request: EdgePathRequest containing source and target coordinates
        
    Returns:
        EdgePathResponse with computed SVG path string
    """
    try:
        # Validate coordinates
        if not all(isinstance(coord, (int, float)) for coord in [
            request.source_x, request.source_y, request.target_x, request.target_y
        ]):
            raise HTTPException(status_code=400, detail="Invalid coordinate values")
        
        # Calculate path based on edge type
        path = calculate_edge_path(
            request.source_x,
            request.source_y,
            request.target_x,
            request.target_y,
            request.edge_type
        )
        
        return EdgePathResponse(
            path=path,
            source={"x": request.source_x, "y": request.source_y},
            target={"x": request.target_x, "y": request.target_y}
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error computing edge path: {str(e)}")

@app.get("/health")
async def health_check():
    """Detailed health check endpoint"""
    return {
        "status": "healthy",
        "service": "Canvas 2 Edge Path API",
        "version": "1.0.0",
        "endpoints": {
            "get_edge_path": "/get-edge-path",
            "health": "/health"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
