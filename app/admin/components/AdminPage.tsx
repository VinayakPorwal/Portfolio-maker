'use client'
import { useState } from 'react'
import { ProjectsManagement } from '@/app/admin/components/Projects'
import { SkillsManagement } from '@/app/admin/components/Skills'
import { ServicesManagement } from '@/app/admin/components/Service'
import { ReviewsManagement } from '@/app/admin/components/Reviews'

import type { Database } from '@/lib/database.types'
import { addProject, addReview, addService, addSkill, deleteProject, deleteReview, deleteService, deleteSkill, updateProfile, updateProject, updateReview, updateService, updateSkill } from '@/app/actions'
import { ProfileManagement } from './ProrfilePage'
import ContactQueries from './ContactPage'
 

export function AdminPage({ Data , contactData }: { 
  Data: {
    profile: Database['public']['Tables']['profile']['Row']
    projects: Database['public']['Tables']['projects']['Row'][]
    skills: Database['public']['Tables']['skills']['Row'][]
    services: Database['public']['Tables']['services']['Row'][]
    reviews: Database['public']['Tables']['reviews']['Row'][]
  }
  contactData: Database['public']['Tables']['contact_messages']['Row'][]
}) {
  const [activeTab, setActiveTab] = useState('projects')
 
  return (
    <div className="min-h-screen bg-black text-white p-8 w-full">
      <div className="mx-auto">
        <div>
          <div className="grid grid-cols-6 bg-gray-900 max-w-6xl mx-auto mb-8 rounded-lg overflow-hidden">
            <button 
              className={`p-2 ${activeTab === 'profile' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`p-2 ${activeTab === 'projects' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`p-2 ${activeTab === 'skills' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>
            <button
              className={`p-2 ${activeTab === 'services' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
            <button
              className={`p-2 ${activeTab === 'reviews' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button
              className={`p-2 ${activeTab === 'contact' ? 'bg-blue-600' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact
            </button>
          </div>

          {activeTab === 'profile' && (
            <ProfileManagement
              profile={Data.profile} 
              onUpdate={updateProfile}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsManagement 
              projects={Data.projects} 
              onAdd={addProject}
              onUpdate={updateProject}
              onDelete={deleteProject}
            />
          )}

          {activeTab === 'skills' && (
            <SkillsManagement
              skills={Data.skills}
              onAdd={addSkill}
              onUpdate={updateSkill}
              onDelete={deleteSkill}  
            />
          )}

          {activeTab === 'services' && (
            <ServicesManagement
              services={Data.services}
              onAdd={addService}
              onUpdate={updateService}
              onDelete={deleteService}  
            />
          )}

          {activeTab === 'reviews' && (
            <ReviewsManagement
              reviews={Data.reviews}
              onAdd={addReview}
              onUpdate={updateReview}
              onDelete={deleteReview}
            />
          )}
          {activeTab === 'contact' && (
            <ContactQueries queries={contactData}/>
          )}

        </div>
      </div>
    </div>
  )
}