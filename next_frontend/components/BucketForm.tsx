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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        {initialData ? "Edit Bucket" : "Create Bucket"}
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
          placeholder="Enter bucket name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
          placeholder="Enter bucket description"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Empty" | "Pending" | "Completed")}
          className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
          required
        >
          <option value="Empty">Empty</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:ring focus:ring-gray-300 dark:focus:ring-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default BucketForm;
