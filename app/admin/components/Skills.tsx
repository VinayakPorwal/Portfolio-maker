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
  const [editingSkill, setEditingSkill] = useState<Database['public']['Tables']['skills']['Row'] | null>(null)
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
          </div>
          <div className="flex gap-2">
            <DataModal
              title="Edit Skill"
              triggerText="Edit"
              triggerIcon={<Edit2 className="w-4 h-4" />}
            >
                <div>
                    <input type="text" placeholder="Skill Name" value={skill.name} />
                    <input type="text" placeholder="Skill Icon" value={skill.icon} />
                    <input type="text" placeholder="Skill Tools" value={skill.tools?.join(', ') || ''} />
                    <input type="number" placeholder="Skill Level" value={skill.level} />
                </div>
              {/* Edit form similar to add form */}
            </DataModal>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(skill.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}