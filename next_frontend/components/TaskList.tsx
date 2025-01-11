import React from "react";
import { Task } from "../types";

interface TaskListProps {
tasks: Task[];
onDelete: (id: number) => void;
onEdit: (task: Task) => void; 
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
return (
    <div>
    <h2 className="text-xl font-bold mb-4">Tasks</h2>
    <ul className="space-y-4">
        {tasks.map((task) => (
        <li key={task.id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
            </div>
            <div className="flex space-x-2">
                <button
                onClick={() => onEdit(task)} // Trigger edit mode
                className="text-yellow-500"
                >
                Edit
                </button>
                <button
                onClick={() => onDelete(task.id)}
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
  
export default TaskList;
