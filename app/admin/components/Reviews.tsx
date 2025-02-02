'use client'
import { useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DataModal } from '@/app/admin/components/DataModal'
import type { Database } from '@/lib/database.types'
import { toast } from 'sonner'

export function ReviewsManagement({
  reviews,
  onAdd,
  onUpdate,
  onDelete,
}: {
  reviews: Database['public']['Tables']['reviews']['Row'][]
  onAdd: (newReview: Partial<Database['public']['Tables']['reviews']['Insert']>) => Promise<void>
  onUpdate: (reviewId: string, updates: Partial<Database['public']['Tables']['reviews']['Update']>) => Promise<void>
  onDelete: (reviewId: string) => Promise<void>
}) {
  const [newReview, setNewReview] = useState<Partial<Database['public']['Tables']['reviews']['Insert']>>({
    name: '',
    company: '',
    review: '',
    rating: 5,
    avatar: '',
    gender: 'MALE',
  })

  const handleAdd = () => {
    toast.promise(onAdd(newReview), {
      loading: 'Adding review...',
      success: 'Review added successfully!',
      error: 'Failed to add review.'
    })
    setNewReview({
      name: '',
      company: '',
      gender: 'MALE',
      review: '',
      rating: 5,
      avatar: '',
    })
  }
  const handleDelete = (reviewId: string) => {
    toast.promise(onDelete(reviewId), {
      loading: 'Deleting review...',
      success: 'Review deleted successfully!',
      error: 'Failed to delete review.'
    })
  }
  const handleUpdate = (reviewId: string, updates: Partial<Database['public']['Tables']['reviews']['Update']>) => {
    toast.promise(onUpdate(reviewId, updates), {
      loading: 'Updating review...',
      success: 'Review updated successfully!',
      error: 'Failed to update review.'
    })
  }
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reviews Management</h2>
        <DataModal
          title="Add New Review"
          triggerText="Add Review"
          triggerIcon={<Plus className="w-4 h-4" />}
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newReview.company}
              onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
            />
            <input
              type="text"
              placeholder="Avatar URL"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newReview.avatar}
              onChange={(e) => setNewReview({ ...newReview, avatar: e.target.value })}
            />
            <select value={newReview.gender}
              onChange={(e) => setNewReview({ ...newReview, gender: e.target.value as 'MALE' | 'FEMALE' | 'OTHER' })}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <textarea
              placeholder="Review"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              rows={4}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              className="w-full p-2 bg-gray-800 rounded text-white"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              min={1}
              max={5}
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleAdd}
            >
              Save Review
            </Button>
          </div>
        </DataModal>
      </div>

      {reviews.map((review) => (
        <div key={review.id} className="bg-neutral-900 p-4 rounded-lg flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <img
              src={review.avatar ||
                review.gender === 'MALE'
                ? 'https://avatar.iran.liara.run/public/boy'
                : 'https://avatar.iran.liara.run/public/girl'}
              alt={review.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-bold">{review.name}</h3>
              <p className="text-gray-400">{review.company}</p>
              <p className="text-gray-300 mt-2">{review.review}</p>
              <div className="flex items-center mt-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <span key={index} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <EditReviewModal review={review} onUpdate={handleUpdate} />
            <Button variant="destructive" size="sm" onClick={() => handleDelete(review.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}


const EditReviewModal = ({ review, onUpdate }: { review: Database['public']['Tables']['reviews']['Row'], onUpdate: (reviewId: string, updates: Partial<Database['public']['Tables']['reviews']['Update']>) => Promise<void> }) => {
  const [editingReview, setEditingReview] = useState<Database['public']['Tables']['reviews']['Update'] | null>({
    id: review.id,
    name: review.name,
    company: review.company,
    avatar: review.avatar,
    gender: review.gender,
    review: review.review,
    rating: review.rating,
  })

  return (
    <DataModal
      title="Edit Review"
      triggerText="Edit"
      triggerIcon={<Edit2 className="w-4 h-4" />}
    >
      <div className="flex flex-col gap-2 *:p-2">
        <input
          type="text"
          placeholder="Name"
          value={editingReview?.name}
          onChange={(e) => setEditingReview({ ...editingReview, name: e.target.value })} />
        <input
          type="text"
          placeholder="Company"
          value={editingReview?.company}
          onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })} />
        <input
          type="text"
          placeholder="Avatar URL"
          value={editingReview?.avatar}
          onChange={(e) => setEditingReview({ ...editingReview, avatar: e.target.value })} />
        <textarea
          placeholder="Review"
          value={editingReview?.review}
          onChange={(e) => setEditingReview({ ...editingReview, review: e.target.value })} 
          rows={4} />
        <select
          value={editingReview?.gender}
          onChange={(e) => setEditingReview({ ...editingReview, gender: e.target.value })}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={editingReview?.rating}
          onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
          min={1} max={5} />
      </div>
      <Button onClick={() => onUpdate(review.id, { name: editingReview?.name || '', company: editingReview?.company || '', avatar: editingReview?.avatar || '', review: editingReview?.review || '', rating: editingReview?.rating || 0 })}>
        Save
      </Button>
    </DataModal>
  )
}
