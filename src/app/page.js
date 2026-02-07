"use client";

import DraggableTask from "@/component/DraggableTask";
import DroppableColumn from "@/component/DroppableColumn";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: "1", content: "Drag and Drop শেখা", status: "todo" },
    { id: "2", content: "লজিক প্র্যাকটিস করা", status: "in-progress" },
    { id: "3", content: "একটি মিনি প্রজেক্ট শেষ করা", status: "done" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getTasksByStatus = (status) => tasks.filter((t) => t.status === status);

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <main className="min-h-screen bg-slate-100 p-8">
        <h1 className="text-4xl font-extrabold text-center text-slate-800 mb-12">
          LogicFlow <span className="text-blue-600">Tasker</span>
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {["todo", "in-progress", "done"].map((status) => (
            <DroppableColumn
              key={status}
              id={status}
              title={status}
              className="bg-slate-200/50 p-5 rounded-2xl border-2 border-dashed border-slate-300 min-h-125"
            >
              <h2 className="text-lg font-bold text-slate-700 uppercase mb-4 px-2">
                {status === "todo"
                  ? "📅 To Do"
                  : status === "in-progress"
                  ? "⏳ In Progress"
                  : "✅ Done"}
              </h2>

              <div className="space-y-3">
                {getTasksByStatus(status).map((task) => (
                  <DraggableTask
                    key={task.id}
                    id={task.id}
                    content={task.content}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                  >
                    <p className="text-slate-600 font-medium">{task.content}</p>
                  </DraggableTask>
                ))}
              </div>
            </DroppableColumn>
          ))}
        </div>
      </main>
    </DndContext>
  );
}
