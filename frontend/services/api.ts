/**
 * API service for communicating with FastAPI backend
 * Handles edge path computation requests
 */

import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface EdgePathRequest {
  source_x: number;
  source_y: number;
  target_x: number;
  target_y: number;
}

export interface EdgePathResponse {
  path: string;
  source: { x: number; y: number };
  target: { x: number; y: number };
}

export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Request edge path computation from the backend
 */
export const getEdgePath = async (request: EdgePathRequest): Promise<EdgePathResponse> => {
  try {
    const response = await api.post<EdgePathResponse>('/get-edge-path', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || error.message;
      throw new Error(`API Error: ${message}`);
    }
    throw new Error('Unknown error occurred while fetching edge path');
  }
};

/**
 * Check if the backend API is available
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
};

/**
 * Batch request multiple edge paths
 */
export const getMultipleEdgePaths = async (
  requests: EdgePathRequest[]
): Promise<EdgePathResponse[]> => {
  try {
    const promises = requests.map(request => getEdgePath(request));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching multiple edge paths:', error);
    throw error;
  }
};

export default api;
