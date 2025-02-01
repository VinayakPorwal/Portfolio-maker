import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-neutral-900 rounded-lg overflow-hidden">
        <div className="relative">
          {project.youtube_id ? (
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtube_id}`}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={project.thumbnail_url || ''}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          )}
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag, index) => (
              <span key={index} className="text-sm bg-white/10 px-3 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          {project.video_url && (
            <a
              href={project.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Original
            </a>
          )}
        </div>
      </div>
    </div>
  );
}