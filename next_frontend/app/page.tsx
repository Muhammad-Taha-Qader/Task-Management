"use client";

import { useState, useEffect } from "react";
import BucketList from "../components/BucketList";
import BucketForm from "../components/BucketForm";
import ThemeToggle from "../components/ThemeToggle";
import { fetchBuckets, createBucket, updateBucket, deleteBucket } from "../services/api";
import { Bucket } from "../types";

export default function HomePage() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingBucket, setEditingBucket] = useState<Bucket | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadBuckets = async () => {
      try {
        const data = await fetchBuckets();
        setBuckets(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      } catch (err: any) {
        setError("Failed to load buckets. Please try again.");
      }
    };

    loadBuckets();
  }, []);

  const handleCreate = async (data: { name: string; description: string; status: string }) => {
    try {
      const newBucket = await createBucket(data);
      setBuckets((prev) => [...prev, newBucket]);
      setIsCreating(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Failed to create bucket. Please try again.");
    }
  };

  const handleUpdate = async (id: number, data: { name: string; description: string; status: string }) => {
    try {
      const updatedBucket = await updateBucket(id, data);
      setBuckets((prev) =>
        prev.map((bucket) => (bucket.id === updatedBucket.id ? updatedBucket : bucket))
      );
      setEditingBucket(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Failed to update bucket. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBucket(id);
      setBuckets((prev) => prev.filter((bucket) => bucket.id !== id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setError("Failed to delete bucket. Please try again.");
    }
  };

  const dismissError = () => setError(null);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Task Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your buckets and tasks efficiently
          </p>
        </div>
        <ThemeToggle />
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span>{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={dismissError}
          >
            <span className="text-red-500">&times;</span>
          </button>
        </div>
      )}

      <div className="flex justify-center mb-4">
        {!isCreating && !editingBucket && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
          >
            + Create New Bucket
          </button>
        )}
      </div>

      <div>
        {isCreating && (
          <BucketForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        )}
        {editingBucket && (
          <BucketForm
            initialData={editingBucket}
            onSubmit={(data) => handleUpdate(editingBucket.id, data)}
            onCancel={() => setEditingBucket(null)}
          />
        )}
      </div>

      <div>
        {buckets.length === 0 && !isCreating && !editingBucket ? (
          <div className="text-center text-gray-500 mt-6 dark:text-gray-400">
            <p>No buckets found. Start by creating a new bucket!</p>
          </div>
        ) : (
          <BucketList
            buckets={buckets}
            onDelete={handleDelete}
            onEdit={setEditingBucket}
          />
        )}
      </div>
    </div>
  );
}
