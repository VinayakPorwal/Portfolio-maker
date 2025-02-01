'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Database } from '@/lib/database.types'
import { toast } from 'sonner'

export function ProfileManagement({
    profile,
    onUpdate,
}: {
    profile: Database['public']['Tables']['profile']['Row']
    onUpdate: (updates: Partial<Database['public']['Tables']['profile']['Row']>, id: string) => Promise<void>
}) {
    const [profileData, setProfileData] = useState({
        name: profile.name,
        title: profile.title,
        bio: profile.bio || '',
        email: profile.email,
        cv_url: profile.cv_url || '',
        github_url: profile.github_url || '',
        instagram_url: profile.instagram_url || '',
        linkedin_url: profile.linkedin_url || '',
        showreel_url: profile.showreel_url || '',
        bg_video_url: profile.bg_video_url || '',
        bg_thumbnail: profile.bg_thumbnail || ''
    })

    const handleUpdate = () => {
        toast.promise(onUpdate(profileData, profile.id), {
            loading: 'Updating profile...',
            success: 'Profile updated successfully!',
            error: 'Failed to update profile.'
        })
    }

    return (
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Profile Management</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 p-3 rounded text-white font-bold" onClick={handleUpdate}>
            Save Profile
          </Button>
        </div>
      
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-400">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>
      
          <div>
            <label className="block mb-1 text-gray-400">Professional Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.title}
              onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
            />
          </div>
        </div>
      
        <div className="mt-6">
          <label className="block mb-1 text-gray-400">Bio</label>
          <textarea
            placeholder="Short bio"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            rows={4}
          />
        </div>
      
        {/* Contact Info */}
        <div className="mt-6">
          <label className="block mb-1 text-gray-400">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
        </div>
      
        {/* Media Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 text-gray-400">CV URL</label>
            <input
              type="url"
              placeholder="CV URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.cv_url}
              onChange={(e) => setProfileData({ ...profileData, cv_url: e.target.value })}
            />
          </div>
      
          <div>
            <label className="block mb-1 text-gray-400">Showreel URL</label>
            <input
              type="url"
              placeholder="Showreel URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.showreel_url}
              onChange={(e) => setProfileData({ ...profileData, showreel_url: e.target.value })}
            />
          </div>
      
          <div>
            <label className="block mb-1 text-gray-400">Background Video URL</label>
            <input
              type="text"
              placeholder="Background Video URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.bg_video_url}
              onChange={(e) => setProfileData({ ...profileData, bg_video_url: e.target.value })}
            />
          </div>
      
          <div>
            <label className="block mb-1 text-gray-400">Background Thumbnail URL</label>
            <input
              type="text"
              placeholder="Background Thumbnail URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.bg_thumbnail}
              onChange={(e) => setProfileData({ ...profileData, bg_thumbnail: e.target.value })}
            />
          </div>
        </div>
      
        {/* Social Links */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 text-gray-400">GitHub</label>
            <input
              type="url"
              placeholder="GitHub URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.github_url}
              onChange={(e) => setProfileData({ ...profileData, github_url: e.target.value })}
            />
          </div>
      
          <div>
            <label className="block mb-1 text-gray-400">Instagram</label>
            <input
              type="url"
              placeholder="Instagram URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.instagram_url}
              onChange={(e) => setProfileData({ ...profileData, instagram_url: e.target.value })}
            />
          </div>
      
          <div>
            <label className="block mb-1 text-gray-400">LinkedIn</label>
            <input
              type="url"
              placeholder="LinkedIn URL"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
              value={profileData.linkedin_url}
              onChange={(e) => setProfileData({ ...profileData, linkedin_url: e.target.value })}
            />
          </div>
        </div>
      </div>
    )
}
