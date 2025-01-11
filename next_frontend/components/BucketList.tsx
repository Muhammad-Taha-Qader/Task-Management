import React from "react";
import { Bucket } from "../types";
import Link from "next/link";

interface BucketListProps {
  buckets: Bucket[];
  onDelete: (id: number) => void;
  onEdit: (bucket: Bucket) => void; 
}

const BucketList: React.FC<BucketListProps> = ({ buckets, onDelete, onEdit }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Buckets</h1>
      <ul className="space-y-4">
        {buckets.map((bucket) => (
          <li key={bucket.id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{bucket.name}</h2>
                <p>{bucket.description}</p>
                <p>Status: {bucket.status}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/bucket/${bucket.id}`}>
                  <button className="text-blue-500">View</button>
                </Link>
                <button
                  onClick={() => onEdit(bucket)} // Trigger edit mode
                  className="text-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(bucket.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
