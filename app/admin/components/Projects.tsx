'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataModal } from '@/app/admin/components/DataModal'
import { Project } from 'next/dist/build/swc/types'
import { Database } from '@/lib/database.types'
import { toast } from 'sonner'
// import type { Project } from '@/lib/database.types'

export function ProjectsManagement({
  projects,
  onAdd,
  onUpdate,
  onDelete,
}: {
  projects: Database['public']['Tables']['projects']['Row'][]
  onAdd: (newProject: Partial<Database['public']['Tables']['projects']['Row']>) => Promise<void>
  onUpdate: (projectId: string, updates: Partial<Database['public']['Tables']['projects']['Row']>) => Promise<void>
  onDelete: (projectId: string) => Promise<void>
}) {
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState<Partial<Database['public']['Tables']['projects']['Row']>>({
    title: '',
    description: '',
    category: '',
    thumbnail_url: '',
    video_url: '',
    tags: [],
  })

  const handleAdd = () => {
    toast.promise(onAdd(newProject), {
      loading: 'Adding project...',
      success: 'Project added successfully!',
      error: 'Failed to add project.'
    })
  }
  const handleUpdate = (projectId: string, updates: Partial<Database['public']['Tables']['projects']['Row']>) => {
    toast.promise(onUpdate(projectId, updates), {
      loading: 'Updating project...',
      success: 'Project updated successfully!',
      error: 'Failed to update project.'
    })
  }

  const handleDelete = (projectId: string) => {
    toast.promise(onDelete(projectId), {
      loading: 'Deleting project...',
      success: 'Project deleted successfully!',
      error: 'Failed to delete project.'
    })
  }
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <DataModal
          title="Add New Project"
          triggerText="Add Project"
          triggerIcon={<Plus className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newProject.thumbnail_url || ''}
              onChange={(e) => setNewProject({ ...newProject, thumbnail_url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Video URL"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newProject.video_url || ''}
              onChange={(e) => setNewProject({ ...newProject, video_url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newProject.tags?.join(', ')}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value.split(',').map(tag => tag.trim()) })}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newProject.description || ''}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={4}
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleAdd}
            >

              Save Project
            </Button>
          </div>
        </DataModal>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="bg-neutral-900 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
            <div className="flex gap-2 mt-2">
              {project.tags?.map((tag, index) => (
                tag.trim() &&
                <span key={index} className="bg-blue-900/50 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <EditProjectModal project={project} onUpdate={handleUpdate} />
            <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

const EditProjectModal = ({ project, onUpdate }: { project: Database['public']['Tables']['projects']['Row'], onUpdate: (projectId: string, updates: Partial<Database['public']['Tables']['projects']['Update']>) => Promise<void> }) => {
  const [editingProject, setEditingProject] = useState<Database['public']['Tables']['projects']['Update'] | null>(
    {
      title: project.title,
      category: project.category,
      thumbnail_url: project.thumbnail_url,
      video_url: project.video_url,
      tags: project.tags,
      description: project.description,
    }
  )
  return <DataModal
    title="Edit Project"
    triggerText="Edit"
    triggerIcon={<Edit2 className="w-4 h-4" />}
  >
    <div className="flex flex-col gap-2 *:p-2">
      <input type="text" placeholder="Title" value={editingProject?.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} />
      <input type="text" placeholder="Category" value={editingProject?.category}
        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} />

      <input type="text" placeholder="Thumbnail URL" value={editingProject?.thumbnail_url || ''}
        onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })} />

      <input type="text" placeholder="Video URL" value={editingProject?.video_url || ''}
        onChange={(e) => setEditingProject({ ...editingProject, video_url: e.target.value })} />

      <div className="flex gap-2">
        <input
          className="w-full p-2"
          type="text"
          placeholder="Tags (comma-separated)"
          value={editingProject?.tags?.join(", ") || ""}
          onChange={(e) =>
            setEditingProject({
              ...editingProject,
              tags: e.target.value.split(",").map((item) => item.trim()),
            })
          }
        />
        <button
          onClick={() => setEditingProject({ ...editingProject, tags: [] })}
        >
          Clear
        </button>
      </div>

      <textarea placeholder="Description" value={project.description || ''} rows={4}
        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
    </div>
    <Button onClick={() => onUpdate(project.id, { title: editingProject?.title || '', category: editingProject?.category || '', thumbnail_url: editingProject?.thumbnail_url || '', video_url: editingProject?.video_url || '', tags: editingProject?.tags || [], description: editingProject?.description || '' })}>
      Save
    </Button>
    {/* Edit form similar to add form */}
  </DataModal>
}
