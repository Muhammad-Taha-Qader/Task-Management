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
    <div>
      {/* Stylish Header */}
      <header
        className="relative bg-cover bg-center text-white p-8 rounded-b-3xl shadow-md"
        style={{
          backgroundImage: `url('/bg.jpg')`, // Replace with the actual file in public folder
        }}
      >
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-4xl font-bold">{bucket.name}</h1>
            <p className="text-lg mt-2">{bucket.description}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <p className="text-sm">
              <strong>Status:</strong> {bucket.status}
            </p>
          </div>
        </div>
      </header>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4 mt-4">
          {error}
        </div>
      )}

      {/* Task Management Section */}
      <div className="container mx-auto p-4">
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
        <div className="flex justify-center my-4">
        {!isCreatingTask && !editingTask && (
          <button
            onClick={() => setIsCreatingTask(true)}
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-xl hover:bg-green-600 dark:hover:bg-green-700 focus:ring focus:ring-green-200 dark:focus:ring-green-800"
          >
            Create Task
          </button>
        )}
        </div>
        <div className="mt-8">
          <TaskList
            tasks={bucket.tasks}
            onDelete={handleDeleteTask}
            onEdit={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
}
