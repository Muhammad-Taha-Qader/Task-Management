import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Replace with your Rails backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all buckets
export const fetchBuckets = async () => {
  const response = await API.get("/buckets");
  return response.data;
};

// Fetch a single bucket with tasks
export const fetchBucket = async (id: number) => {
  const response = await API.get(`/buckets/${id}`);
  return response.data;
};

// Create a new bucket
export const createBucket = async (data: { name: string; description: string; status: string }) => {
  const response = await API.post("/buckets", data);
  return response.data;
};

// Update a bucket
export const updateBucket = async (id: number, data: { name: string; description: string; status: string }) => {
  const response = await API.put(`/buckets/${id}`, data);
  return response.data;
};

// Delete a bucket
export const deleteBucket = async (id: number) => {
  const response = await API.delete(`/buckets/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (bucketId: number, data: { name: string; description: string; status: string }) => {
  const response = await API.post(`/buckets/${bucketId}/tasks`, data);
  return response.data;
};

// Update a task
export const updateTask = async (bucketId: number, taskId: number, data: { name: string; description: string; status: string }) => {
  const response = await API.put(`/buckets/${bucketId}/tasks/${taskId}`, data);
  return response.data;
};

// Delete a task
export const deleteTask = async (bucketId: number, taskId: number) => {
  const response = await API.delete(`/buckets/${bucketId}/tasks/${taskId}`);
  return response.data;
};
