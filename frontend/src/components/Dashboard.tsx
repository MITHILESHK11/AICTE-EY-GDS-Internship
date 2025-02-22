import React, { useState } from 'react';
import { User, Project, Task } from '../types';
import { Plus, LogOut, LayoutDashboard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import ProjectList from './ProjectList';
import TaskList from './TaskList';
import NewProjectModal from './NewProjectModal';
import NewTaskModal from './NewTaskModal';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCreateProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
    setShowNewProject(false);
  };

  const handleCreateTask = (task: Omit<Task, 'id' | 'createdAt' | 'comments'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      comments: []
    };
    setTasks([...tasks, newTask]);
    setShowNewTask(false);
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const getTaskStats = () => {
    const projectTasks = selectedProject 
      ? tasks.filter(task => task.projectId === selectedProject.id)
      : tasks;

    return {
      total: projectTasks.length,
      completed: projectTasks.filter(t => t.status === 'completed').length,
      inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
      todo: projectTasks.filter(t => t.status === 'todo').length,
      highPriority: projectTasks.filter(t => t.priority === 'high').length
    };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-6 w-6 text-blue-600 mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">Project Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          {/* Stats Section */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <p className="text-2xl font-semibold">{stats.total}</p>
                </div>
                <LayoutDashboard className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-semibold">{stats.inProgress}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">To Do</p>
                  <p className="text-2xl font-semibold">{stats.todo}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-gray-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">High Priority</p>
                  <p className="text-2xl font-semibold">{stats.highPriority}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <button
              onClick={() => setShowNewProject(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProjectList
                projects={projects}
                selectedProject={selectedProject}
                onSelectProject={setSelectedProject}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedProject && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Tasks for {selectedProject.title}
                    </h3>
                    <button
                      onClick={() => setShowNewTask(true)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Task
                    </button>
                  </div>
                  <TaskList
                    tasks={tasks.filter((task) => task.projectId === selectedProject.id)}
                    onStatusChange={handleStatusChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {showNewProject && (
        <NewProjectModal
          onClose={() => setShowNewProject(false)}
          onCreate={handleCreateProject}
        />
      )}

      {showNewTask && selectedProject && (
        <NewTaskModal
          projectId={selectedProject.id}
          onClose={() => setShowNewTask(false)}
          onCreate={handleCreateTask}
        />
      )}
    </div>
  );
}