# 📝 Todo App with React & Go (Fiber) Backend

A clean and responsive full-stack Todo application built with:

- ⚛️ React frontend with dark/light mode
- 🚀 Go backend using Fiber framework
- 🍃 MongoDB for data persistence
- ✅ Full CRUD functionality

---

## 🔧 Features

- ✅ Add new todos
- 🔄 Mark todos as complete/incomplete
- 🗑️ Delete todos with confirmation prompt
- 🌓 Toggle between dark and light mode
- 📱 Responsive and mobile-friendly layout
- 📭 Clear empty state UI when no todos exist

---

## 🧰 Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React, React Icons                  |
| Backend  | Go (Fiber Framework)                |
| Database | MongoDB                             |
| Styling  | CSS (with CSS variables for themes) |

---

## ⚙️ Getting Started

### 🔙 Backend Setup

1. **Install dependencies**

   ```bash
   go mod tidy
   ```

2. **Create `.env` file**

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

3. **Run the server**
   ```bash
   go run main.go
   ```

---

### 💻 Frontend Setup

1. **Navigate to client folder**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   REACT_APP_API_BASE=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm start
   ```

---

## 🌐 API Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| GET    | `/api/todos`     | Retrieve all todos       |
| POST   | `/api/todos`     | Add a new todo           |
| PATCH  | `/api/todos/:id` | Toggle completion status |
| DELETE | `/api/todos/:id` | Delete a todo            |

---

## 🌍 Environment Variables

### Backend

- `MONGODB_URI` — MongoDB connection string
- `PORT` — Port for server (default: 5000)

### Frontend

- `REACT_APP_API_BASE` — API base URL (default: `http://localhost:5000`)

---
