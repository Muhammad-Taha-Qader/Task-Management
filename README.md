# Task Management Application 🚀

This is a **Task Management Application** that enables users to manage buckets and their associated tasks. The project is split into two parts:

1. **Backend**: A Rails API that provides endpoints for managing buckets and tasks.
2. **Frontend**: A Next.js application that handles the user interface and communicates with the Rails backend via API.

---

## **Table of Contents**

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend (Rails API)](#backend-rails-api)
  - [Frontend (Next.js)](#frontend-nextjs)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## **Features**

### **Buckets**
- View a list of all buckets.
- Create, update, and delete buckets.
- View tasks associated with a specific bucket.

### **Tasks**
- Add tasks to a bucket.
- Update tasks within a bucket.
- Delete tasks from a bucket.

---
## **Demo**
[![Watch the video](https://img.youtube.com/vi/Vc-XexfzTBA/0.jpg)](https://youtu.be/Vc-XexfzTBA)

---

## **Tech Stack**

### **Backend**
- **Framework**: Ruby on Rails (API mode)
- **Database**: SQLite (Development), PostgreSQL (Production)
- **Versioning**: API v1

### **Frontend**
- **Framework**: Next.js (App Directory)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Type Safety**: TypeScript
- **HTTP Client**: Axios

---

## **Installation**

### **Backend (Rails API)**

1. Clone the repository:
   ```bash
   git clone https://github.com/Muhammad-Taha-Qader/Task-Management
   cd rails_backend
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Set up the database:
   ```bash
   rails db:create db:migrate
   ```

4. Start the Rails server:
   ```bash
   rails server
   ```

   The Rails API will run on `http://localhost:3000`.

---

### **Frontend (Next.js)**

1. Clone the repository:
   ```bash
   cd next_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API base URL:
   Update the `baseURL` in `services/api.ts` to point to the Rails backend:
   ```typescript
   const API = axios.create({
     baseURL: "http://localhost:3000/api/v1",
     headers: {
       "Content-Type": "application/json",
     },
   });
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

   The Next.js app will run on `http://localhost:3001` (default port).

---

## **API Endpoints**

The Rails backend provides the following API endpoints:

### **Buckets**
| Method | Endpoint              | Description               |
|--------|-----------------------|---------------------------|
| GET    | `/api/v1/buckets`     | Fetch all buckets         |
| GET    | `/api/v1/buckets/:id` | Fetch a specific bucket   |
| POST   | `/api/v1/buckets`     | Create a new bucket       |
| PUT    | `/api/v1/buckets/:id` | Update a specific bucket  |
| DELETE | `/api/v1/buckets/:id` | Delete a specific bucket  |

### **Tasks**
| Method | Endpoint                              | Description                 |
|--------|---------------------------------------|-----------------------------|
| POST   | `/api/v1/buckets/:bucket_id/tasks`    | Add a task to a bucket      |
| PUT    | `/api/v1/buckets/:bucket_id/tasks/:id`| Update a task in a bucket   |
| DELETE | `/api/v1/buckets/:bucket_id/tasks/:id`| Delete a task from a bucket |

---

## **Project Structure**

### **Rails API (Backend)**

```
task-management-backend/
├── app/
│   ├── controllers/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── buckets_controller.rb
│   │   │   │   └── tasks_controller.rb
│   ├── models/
│   │   ├── bucket.rb
│   │   └── task.rb
├── config/
│   ├── routes.rb  # Defines API routes
├── db/
│   ├── migrate/   # Database migration files
│   └── schema.rb  # Database schema
```

### **Next.js (Frontend)**

```
task-management-frontend/
├── app/
│   ├── page.tsx         # Home page (list buckets)
│   ├── bucket/
│   │   └── [id]/
│   │       └── page.tsx # Bucket details and tasks
├── components/
│   ├── BucketForm.tsx   # Form for creating/updating buckets
│   ├── BucketList.tsx   # List of buckets
│   ├── TaskForm.tsx     # Form for creating/updating tasks
│   └── TaskList.tsx     # List of tasks
├── services/
│   └── api.ts           # Axios API service
├── styles/
│   └── globals.css      # Tailwind CSS styles
├── types.ts             # TypeScript type definitions
```

---

## **How It Works**

1. **Frontend**:
   - Users interact with the Next.js app.
   - The app communicates with the Rails API via Axios.

2. **Backend**:
   - Rails handles CRUD operations for buckets and tasks.
   - All responses are in JSON format.

3. **Data Flow**:
   - Users can create, view, update, and delete buckets and tasks.
   - The frontend ensures a responsive UI while interacting with the backend.

---

## **Contributing**

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

---