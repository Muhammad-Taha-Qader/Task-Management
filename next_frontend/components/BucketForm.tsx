import React, { useState } from "react";

interface BucketFormProps {
  initialData?: {
    name: string;
    description: string;
    status: "Empty" | "Pending" | "Completed";
  };
  onSubmit: (data: { name: string; description: string; status: "Empty" | "Pending" | "Completed" }) => void;
  onCancel: () => void;
}

const BucketForm: React.FC<BucketFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [status, setStatus] = useState<"Empty" | "Pending" | "Completed">(initialData?.status || "Empty");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow">
      <h2 className="text-xl font-bold">{initialData ? "Edit Bucket" : "Create Bucket"}</h2>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Empty" | "Pending" | "Completed")}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Empty">Empty</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BucketForm;
