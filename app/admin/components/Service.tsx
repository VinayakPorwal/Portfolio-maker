'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataModal } from '@/app/admin/components/DataModal'
import type { Database } from '@/lib/database.types'
import { toast } from 'sonner'

export function ServicesManagement({
    services,
    onAdd,
    onUpdate,
    onDelete,
}: {
    services: Database['public']['Tables']['services']['Row'][]
    onAdd: (newService: Partial<Database['public']['Tables']['services']['Row']>) => Promise<void>
    onUpdate: (serviceId: string, updates: Partial<Database['public']['Tables']['services']['Row']>) => Promise<void>
    onDelete: (serviceId: string) => Promise<void>
}) {
    const [editingService, setEditingService] = useState<Database['public']['Tables']['services']['Row'] | null>(null)
    const [newService, setNewService] = useState<Partial<Database['public']['Tables']['services']['Row']>>({
        name: '',
        description: '',
        deliverables: [],
    })

    const handleAdd = () => {
        toast.promise(onAdd(newService), {
            loading: 'Adding service...',
            success: 'Service added successfully!',
            error: 'Failed to add service.'
        })
    }
    const handleUpdate = (serviceId: string, updates: Partial<Database['public']['Tables']['services']['Row']>) => {
        toast.promise(onUpdate(serviceId, updates), {
            loading: 'Updating service...',
            success: 'Service updated successfully!',
            error: 'Failed to update service.'
        })
    }
    const handleDelete = (serviceId: string) => {
        toast.promise(onDelete(serviceId), {
            loading: 'Deleting service...',
            success: 'Service deleted successfully!',
            error: 'Failed to delete service.'
        })
    }
    return (
        <div className="space-y-4 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Services Management</h2>
                <DataModal
                    title="Add New Service"
                    triggerText="Add Service"
                    triggerIcon={<Plus className="w-4 h-4" />}
                >
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full p-2 bg-gray-800 rounded text-white"
                            value={newService.name}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full p-2 bg-gray-800 rounded text-white"
                            value={newService.description || ''}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            rows={4}
                        />
                        <input
                            type="text"
                            placeholder="Deliverables (comma-separated)"
                            className="w-full p-2 bg-gray-800 rounded text-white"
                            value={newService.deliverables?.join(', ')}
                            onChange={(e) => setNewService({ ...newService, deliverables: e.target.value.split(',').map(item => item.trim()) })}
                        />
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleAdd}>
                            Save Service
                        </Button>
                    </div>
                </DataModal>
            </div>

            {services.map((service) => (
                <div key={service.id} className="bg-neutral-900 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-bold">{service.name}</h3>
                        <p className="text-gray-400">{service.description}</p>
                        <ul className="mt-2 space-y-1">
                            {service.deliverables?.map((deliverable, index) => (
                                <li key={index} className="text-sm text-gray-300">• {deliverable}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-2">
                        <DataModal
                            title="Edit Service"
                            triggerText="Edit"
                            triggerIcon={<Edit2 className="w-4 h-4" />}
                        >
                            <div className="space-y-4">
                                <input
                                    type="text" placeholder="Title"
                                    className="w-full p-2 bg-gray-800 rounded text-white"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                                <textarea
                                    placeholder="Description"
                                    className="w-full p-2 bg-gray-800 rounded text-white" value={newService.description || ''}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })} rows={4} />
                                <input
                                    type="text"
                                    placeholder="Deliverables (comma-separated)"
                                    className="w-full p-2 bg-gray-800 rounded text-white"
                                    value={newService.deliverables?.join(', ')}
                                    onChange={(e) => setNewService({ ...newService, deliverables: e.target.value.split(',').map(item => item.trim()) })} />
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
                                    onAdd(newService)
                                    setNewService({
                                        name: '',
                                        description: '',
                                        deliverables: [],
                                    })
                                }}>Save Service</Button>
                            </div>
                        </DataModal>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}