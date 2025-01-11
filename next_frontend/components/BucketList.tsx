import React from "react";
import { Bucket } from "../types";
import Link from "next/link";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

interface BucketListProps {
  buckets: Bucket[];
  onDelete: (id: number) => void;
  onEdit: (bucket: Bucket) => void;
}

const BucketList: React.FC<BucketListProps> = ({ buckets, onDelete, onEdit }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Your Buckets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {buckets.map((bucket) => (
          <div
            key={bucket.id}
            className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{bucket.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{bucket.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  <strong>Status:</strong> {bucket.status}
                </p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Link href={`/bucket/${bucket.id}`}>
                  <button
                    className="flex items-center px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition"
                  >
                    <FaEye className="mr-2" />
                    View
                  </button>
                </Link>
                <button
                  onClick={() => onEdit(bucket)}
                  className="flex items-center px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 focus:ring focus:ring-yellow-200 dark:focus:ring-yellow-800 transition"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(bucket.id)}
                  className="flex items-center px-4 py-2 bg-red-500 dark:bg-red-600 text-white text-sm font-medium rounded hover:bg-red-600 dark:hover:bg-red-700 focus:ring focus:ring-red-200 dark:focus:ring-red-800 transition"
                >
                  <FaTrashAlt className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BucketList;
