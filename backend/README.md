# Canvas 2 Backend - FastAPI

FastAPI backend service for computing smooth edge paths between nodes.

## Features

- **Edge Path Computation**: Generates smooth Bezier curves between anchor points
- **CORS Support**: Configured for frontend integration
- **Health Monitoring**: Health check endpoints for service status
- **Error Handling**: Comprehensive error handling and validation

## API Endpoints

### POST `/get-edge-path`
Compute SVG path for edge connection between two anchor points.

**Request Body:**
```json
{
  "source_x": 100,
  "source_y": 50,
  "target_x": 300,
  "target_y": 200
}
```

**Response:**
```json
{
  "path": "M 100,50 C 140,50 260,200 300,200",
  "source": {"x": 100, "y": 50},
  "target": {"x": 300, "y": 200}
}
```

### GET `/health`
Service health check with detailed status information.

### GET `/`
Simple health check endpoint.

## Installation

```bash
pip install -r requirements.txt
```

## Running the Server

```bash
uvicorn main:app --reload
```

The server will be available at `http://localhost:8000`.

## Algorithm

The edge path computation uses cubic Bezier curves with intelligent control point placement:

1. **Distance Calculation**: Determines curve intensity based on anchor point distance
2. **Direction Analysis**: Adapts curve orientation based on connection direction
3. **Control Point Placement**: Positions control points for smooth, natural curves
4. **SVG Path Generation**: Creates optimized SVG path strings

The algorithm ensures smooth, visually appealing connections that adapt to different node arrangements.
