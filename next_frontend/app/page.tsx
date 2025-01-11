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
      } catch {
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
    } catch {
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
    } catch {
      setError("Failed to update bucket. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBucket(id);
      setBuckets((prev) => prev.filter((bucket) => bucket.id !== id));
    } catch {
      setError("Failed to delete bucket. Please try again.");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dismissError = () => setError(null);

  return (
    <div>
      {/* Stylish Header */}
      <header
        className="relative bg-cover bg-center text-white p-8 rounded-b-3xl shadow-md"
        style={{
          backgroundImage: `url('/bg2.jpg')`, // Replace with the actual file in public folder
        }}
      >
        <div className="container mx-auto flex justify-between items-center flex-col space-y-4 md:flex-row">
          <div>
            <h1 className="text-4xl font-bold">Task Management</h1>
            <p className="text-lg mt-2">Organize your buckets and tasks seamlessly</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Error Handling */}
      <div className="container mx-auto p-4">
        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Create Bucket Button */}
        <div className="flex justify-center my-4">
          {!isCreating && !editingBucket && (
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
            >
              + Create New Bucket
            </button>
          )}
        </div>

        {/* Bucket Form */}
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

      <div className="max-w-[90%] sm:max-w-[80%] mx-auto">
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
