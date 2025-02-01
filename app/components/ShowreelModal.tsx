import React from 'react';
import { X } from 'lucide-react';

interface ShowreelModalProps {
  onClose: () => void;
  url: string;
}

export function ShowreelModal({ onClose , url}: ShowreelModalProps) {
  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-neutral-900 rounded-lg overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            src={url || ''}
            title="Showreel"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}