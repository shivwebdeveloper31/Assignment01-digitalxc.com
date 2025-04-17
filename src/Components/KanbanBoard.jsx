import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const API_URL = 'https://assignement01-backend-2.onrender.com/tasks';

const statusLabels = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL);
        setTasks(res.data);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    try {
      const res = await axios.post(API_URL, newTask);
      setTasks((prev) => [...prev, res.data]);
      setShowForm(false);
      setNewTask({ title: '', description: '', status: 'todo' });
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    const taskId = draggableId;
    const newStatus = destination.droppableId;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    const updatedTask = { ...task, status: newStatus };

    try {
      await axios.put(`${API_URL}/${taskId}`, updatedTask);
      const updatedTasks = tasks.map((t) =>
        t.id === taskId ? updatedTask : t
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Task
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3 rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3 rounded"
            />
            <select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-red-500">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(statusLabels).map(([status, label]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-4 rounded shadow min-h-[300px]"
                >
                  <h2 className="text-xl font-semibold mb-4">{label}</h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-100 p-3 mb-2 rounded shadow"
                          >
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
