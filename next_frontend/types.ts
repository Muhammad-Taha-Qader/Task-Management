// types.ts
export interface Task {
    id: number;
    name: string;
    description: string;
    status: "Pending" | "Completed";
  }
  
  export interface Bucket {
    id: number;
    name: string;
    description: string;
    status: "Empty" | "Pending" | "Completed";
    tasks: Task[];
  }
  