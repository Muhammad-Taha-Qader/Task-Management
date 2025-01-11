"use client";

import { useState, useEffect } from "react";
import BucketList from "../components/BucketList";
import BucketForm from "../components/BucketForm";
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

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
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
      {!isCreating && !editingBucket && (
        <button
          onClick={() => setIsCreating(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Bucket
        </button>
      )}
      <BucketList
        buckets={buckets}
        onDelete={handleDelete}
        onEdit={setEditingBucket}
      />
    </div>
  );
}
