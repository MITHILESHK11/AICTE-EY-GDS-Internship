import React from 'react';
import { Project } from '../types';
import { Folder } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
}

export default function ProjectList({
  projects,
  selectedProject,
  onSelectProject,
}: ProjectListProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {projects.length === 0 ? (
          <li className="p-4 text-center text-gray-500">No projects yet</li>
        ) : (
          projects.map((project) => (
            <li
              key={project.id}
              className={`cursor-pointer hover:bg-gray-50 ${
                selectedProject?.id === project.id ? 'bg-gray-50' : ''
              }`}
              onClick={() => onSelectProject(project)}
            >
              <div className="px-4 py-4 flex items-center">
                <Folder className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{project.title}</p>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}