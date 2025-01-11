"use client";

import { useState, useEffect } from "react";
import TaskList from "../../../components/TaskList";
import TaskForm from "../../../components/TaskForm";
import { fetchBucket, createTask, updateTask, deleteTask } from "../../../services/api";
import { Bucket, Task } from "../../../types";

export default function BucketDetails({ params }: { params: Promise<{ id: string }> }) {
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const [bucketId, setBucketId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  // Unwrap the params Promise
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setBucketId(Number(resolvedParams.id));
      } catch {
        setError("Failed to resolve params. Please try again.");
      }
    };

    resolveParams();
  }, [params]);

  // Fetch the bucket details once bucketId is resolved
  useEffect(() => {
    const loadBucket = async () => {
      if (bucketId !== null) {
        try {
          const data = await fetchBucket(bucketId);
          setBucket(data);
        } catch {
          setError("Failed to load bucket details. Please try again.");
        }
      }
    };

    loadBucket();
  }, [bucketId]);

  const handleCreateTask = async (data: { name: string; description: string; status: string }) => {
    try {
      if (!bucket) return;
      const newTask = await createTask(bucket.id, data);
      setBucket({ ...bucket, tasks: [...bucket.tasks, newTask] });
      setIsCreatingTask(false);
    } catch {
      setError("Failed to create task. Please try again.");
    }
  };

  const handleUpdateTask = async (
    taskId: number,
    data: { name: string; description: string; status: string }
  ) => {
    try {
      if (!bucket) return;
      const updatedTask = await updateTask(bucket.id, taskId, data);
      setBucket({
        ...bucket,
        tasks: bucket.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      });
      setEditingTask(null);
    } catch {
      setError("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      if (!bucket) return;
      await deleteTask(bucket.id, taskId);
      setBucket({
        ...bucket,
        tasks: bucket.tasks.filter((task) => task.id !== taskId),
      });
    } catch {
      setError("Failed to delete task. Please try again.");
    }
  };

  if (!bucket) return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">{bucket.name}</h1>
      <p className="text-gray-600 dark:text-gray-400">{bucket.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <strong>Status:</strong> {bucket.status}
      </p>

      {isCreatingTask && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreatingTask(false)}
        />
      )}
      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onSubmit={(data) => handleUpdateTask(editingTask.id, data)}
          onCancel={() => setEditingTask(null)}
        />
      )}
      {!isCreatingTask && !editingTask && (
        <button
          onClick={() => setIsCreatingTask(true)}
          className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 focus:ring focus:ring-green-200 dark:focus:ring-green-800"
        >
          Create Task
        </button>
      )}
      <div className="mt-8">
        <TaskList
          tasks={bucket.tasks}
          onDelete={handleDeleteTask}
          onEdit={setEditingTask}
        />
      </div>
    </div>
  );
}
