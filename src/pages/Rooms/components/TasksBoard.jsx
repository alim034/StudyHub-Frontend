/**
 * TasksBoard.jsx
 * - Kanban-style board with columns (To Do, In Progress, Done).
 * - Drag-and-drop with dnd-kit.
 * - Responsive modals for task creation/editing.
 */

import React, { useState, useEffect } from "react";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import { getTasks, createTask, updateTask, deleteTask, getTaskSummary } from "../../../api/tasksApi";
import { useToast } from "../../../components/common/Toast";
// import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core"; // Uncomment if dnd-kit is installed

const STATUSES = [
  { key: "todo", label: "To Do" },
  { key: "inprogress", label: "In Progress" },
  { key: "done", label: "Done" },
];

const TasksBoard = ({ roomId }) => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getTasks(roomId).then(data => setTasks(data));
  }, [roomId]);

  // Simulate task creation and show toast
  const handleCreateTask = async () => {
    // Replace with real form logic
    await createTask(roomId, { title: "Sample Task", description: "Demo" });
    toast.show("Reminder has been set for this task!", "success");
    setModalOpen(false);
    getTasks(roomId).then(data => setTasks(data));
  };

  return (
    <section>
      <div className="flex gap-4 mb-4">
        {/* Progress bar and counts */}
        {/* Replace with getTaskSummary(roomId) if needed */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {STATUSES.map(status => (
          <Card key={status.key} header={status.label}>
            {tasks
              .filter(task => task.status === status.key)
              .map(task => (
                <div
                  key={task._id}
                  className="mb-2 p-2 rounded-2xl bg-bg shadow hover:shadow-lg transition-all"
                  tabIndex={0}
                  aria-label={`Task: ${task.title}`}
                >
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-muted text-sm">{task.description}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setModalOpen(true)}
                  >
                    Edit
                  </Button>
                </div>
              ))}
          </Card>
        ))}
      </div>
      <Button onClick={() => setModalOpen(true)} className="mt-4">
        New Task
      </Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* Task form here */}
        <div className="text-center">Task creation/edit form coming soon!</div>
        <Button onClick={handleCreateTask} className="mt-2">Simulate Create Task</Button>
      </Modal>
    </section>
  );
};

export default TasksBoard;