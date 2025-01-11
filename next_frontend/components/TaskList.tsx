import React from "react";
import { Task } from "../types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tasks available. Create one to get started!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{task.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    <strong>Status:</strong> {task.status}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="flex items-center px-3 py-2 bg-yellow-500 dark:bg-yellow-600 text-white text-sm rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 focus:ring focus:ring-yellow-200 dark:focus:ring-yellow-800 transition"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="flex items-center px-3 py-2 bg-red-500 dark:bg-red-600 text-white text-sm rounded hover:bg-red-600 dark:hover:bg-red-700 focus:ring focus:ring-red-200 dark:focus:ring-red-800 transition"
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
