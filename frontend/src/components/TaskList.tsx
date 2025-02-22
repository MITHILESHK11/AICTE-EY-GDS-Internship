import React from 'react';
import { Task } from '../types';
import { Circle, CheckCircle, Clock, Calendar, MessageSquare } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
}

export default function TaskList({ tasks, onStatusChange }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleStatusClick = (task: Task) => {
    const statusOrder: Task['status'][] = ['todo', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    onStatusChange(task.id, nextStatus);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          {(['todo', 'in-progress', 'completed'] as const).map((status) => (
            <div key={status} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-4 capitalize">
                {status.replace('-', ' ')}
              </h3>
              <div className="space-y-4">
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => handleStatusClick(task)}
                          className="flex items-center space-x-3"
                        >
                          {getStatusIcon(task.status)}
                          <span className="text-sm font-medium text-gray-900">{task.title}</span>
                        </button>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          {task.dueDate && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className={isOverdue(task.dueDate) ? 'text-red-500 font-medium' : ''}>
                                {formatDate(task.dueDate)}
                              </span>
                            </div>
                          )}
                        </div>
                        {task.comments.length > 0 && (
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{task.comments.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}