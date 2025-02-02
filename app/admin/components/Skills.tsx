'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataModal } from '@/app/admin/components/DataModal'
import type { Database } from '@/lib/database.types'
import { toast } from 'sonner'

export function SkillsManagement({
  skills,
  onUpdate,
  onAdd,
  onDelete,
}: {
  skills: Database['public']['Tables']['skills']['Row'][]
  onUpdate: (skillId: string, updates: Partial<Database['public']['Tables']['skills']['Row']>) => Promise<void>
  onAdd: (newSkill: Partial<Database['public']['Tables']['skills']['Insert']>) => Promise<void>
  onDelete: (skillId: string) => Promise<void>
}) {
  const [newSkill, setNewSkill] = useState<Partial<Database['public']['Tables']['skills']['Insert']>>({ name: '', level: 50, tools: [], icon: '' })

  const handleAdd = () => {
    toast.promise(onAdd(newSkill), {
      loading: 'Adding skill...',
      success: 'Skill added successfully!',
      error: 'Failed to add skill.'
    })
  }
  const handleUpdate = (skillId: string, updates: Partial<Database['public']['Tables']['skills']['Row']>) => {
    toast.promise(onUpdate(skillId, updates), {
      loading: 'Updating skill...',
      success: 'Skill updated successfully!',
      error: 'Failed to update skill.'
    })
  }
  const handleDelete = (skillId: string) => {
    toast.promise(onDelete(skillId), {
      loading: 'Deleting skill...',
      success: 'Skill deleted successfully!',
      error: 'Failed to delete skill.'
    })
  }
  console.log(skills)
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <DataModal
          title="Add New Skill"
          triggerText="Add Skill"
          triggerIcon={<Plus className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Skill Name"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skill Icon"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newSkill.icon}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
            />
            <input
              type="text"
              placeholder="Skill Tools"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newSkill.tools?.join(', ') || ''}
              onChange={(e) => setNewSkill({ ...newSkill, tools: e.target.value.split(', ') })}
            />

            <input
              type="number"
              placeholder="Proficiency"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleAdd}
            >
              Save Skill
            </Button>
          </div>
        </DataModal>
      </div>

      {skills.map((skill) => (
        <div key={skill.id} className="bg-neutral-900 p-4 rounded-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold">{skill.name}</h3>
            <p className="text-gray-400">Level: {skill.level}%</p>
            {skill.tools?.length > 0 &&
              <p className="text-gray-400 gap-2">Tools: {skill.tools.map((tool, index) => (
                tool.trim() &&
                <span key={index} className="bg-blue-900/50 px-2 py-1 rounded text-sm mr-2">
                  {tool}
                </span>
              ))}
              </p>}
          </div>
          <div className="flex gap-2">
            <EditSkillModal skill={skill} onUpdate={handleUpdate} />
            <Button variant="destructive" size="sm" onClick={() => handleDelete(skill.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}


const EditSkillModal = ({ skill, onUpdate }: { skill: Database['public']['Tables']['skills']['Row'], onUpdate: (skillId: string, updates: Partial<Database['public']['Tables']['skills']['Row']>) => Promise<void> }) => {
  const [editingSkill, setEditingSkill] = useState<Database['public']['Tables']['skills']['Row']>({
    id: skill.id,
    name: skill.name,
    level: skill.level,
    tools: skill.tools,
    icon: skill.icon
  })

  return (
    <DataModal
      title="Edit Skill"
      triggerText="Edit"
      triggerIcon={<Edit2 className="w-4 h-4" />}
    >
      <div className="grid grid-cols-2 gap-2 *:p-2" >
        <input type="text" placeholder="Skill Name" value={editingSkill?.name || ''}
          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })} />

        <input type="text" placeholder="Skill Icon" value={editingSkill?.icon || ''}
          onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })} />

        <div className="flex gap-2">
          <input
            className="w-full p-2"
            type="text"
            placeholder="Skill Tools (comma-separated)"
            value={editingSkill?.tools?.join(", ") || ""}
            onChange={(e) =>
              setEditingSkill({
                ...editingSkill,
                tools: e.target.value.split(",").map((item) => item.trim()),
              })
            }
          />
          <button
            onClick={() => setEditingSkill({ ...editingSkill, tools: [] })}
          >
            Clear
          </button>
        </div>

        <input type="number" placeholder="Skill Level" value={editingSkill?.level}
          onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })} />

      </div>
      <Button onClick={() => onUpdate(skill.id, { name: editingSkill?.name || '', icon: editingSkill?.icon || '', tools: editingSkill?.tools || [], level: editingSkill?.level || 0 })}>
        Save
      </Button>
    </DataModal>
  )
} 