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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (err: any) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
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
        tasks: bucket.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        ),
      });
      setEditingTask(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Failed to delete task. Please try again.");
    }
  };

  if (!bucket) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-2xl font-bold">{bucket.name}</h1>
      <p>{bucket.description}</p>
      <p>Status: {bucket.status}</p>
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
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Task
        </button>
      )}
      <TaskList
        tasks={bucket.tasks}
        onDelete={handleDeleteTask}
        onEdit={setEditingTask}
      />
    </div>
  );
}
