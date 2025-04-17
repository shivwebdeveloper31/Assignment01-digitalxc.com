# Assignment 01 - DigitalXC Kanban Board

A full-stack **Kanban Board** project built with **ReactJS**, **Tailwind CSS**, **JSON Server** for the backend, and deployed using **Vercel** (Frontend) and **Render** (Backend).

---

## Live Links

**Frontend**: [https://assignment01-digitalxc-com.vercel.app/](https://assignment01-digitalxc-com.vercel.app/)  
**Frontend GitHub Repo**: [Assignment01-digitalxc.com](https://github.com/shivwebdeveloper31/Assignment01-digitalxc.com.git)

**Backend (JSON Server)**: [https://assignement01-backend-2.onrender.com/](https://assignement01-backend-2.onrender.com/)  
**Backend GitHub Repo**: [assignement01_backend](https://github.com/shivwebdeveloper31/assignement01_backend)

---

## Tech Stack

### Frontend:
- React JS
- Tailwind CSS
- Axios
- react-beautiful-dnd

### Backend:
- JSON Server (Mock REST API)

### Deployment:
- Frontend → Vercel
- Backend → Render


## Features

- Drag and drop tasks between columns using `react-beautiful-dnd`
- Add new tasks with title, description, and status
- Persist tasks with `json-server`
- Responsive layout using Tailwind CSS

---

## Getting Started (Local Setup)

###  Clone the Repositories

```bash
# Frontend
git clone https://github.com/shivwebdeveloper31/Assignment01-digitalxc.com.git
cd Assignment01-digitalxc.com
npm install

# Backend
git clone https://github.com/shivwebdeveloper31/assignement01_backend.git
cd assignement01_backend
npm install

# inside assignement01_backend
npm start
# or
json-server --watch db.json --port 3004

--- Sample API Endpoints
- GET /tasks

- POST /tasks

- PUT /tasks/:id

- DELETE /tasks/:id

Deploy Link : https://assignement01-backend-2.onrender.com/tasks

Thanks

Screenshot of Project :
![Screenshot (44)](https://github.com/user-attachments/assets/0da0fe18-ddf8-4081-984d-dc821d222281)

![Screenshot (43)](https://github.com/user-attachments/assets/fa2dff22-0ce5-4c0a-84a7-effbaa0fba5f)

