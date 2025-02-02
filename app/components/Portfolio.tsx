"use client"
import React, { useState } from 'react';
import { Play, Film, Box, Wand2, Mail, Github, Linkedin, Video, Instagram, ChevronRight, Star, Download, DownloadCloud, FileDown, Sparkles } from 'lucide-react';
import { ProjectModal } from '@/app/components/ProjectModal';
import { ShowreelModal } from '@/app/components/ShowreelModal';
import { ContactForm } from '@/app/components/ContactForm';
import type { Database } from '@/lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];
type Profile = Database['public']['Tables']['profile']['Row'];
type Skill = Database['public']['Tables']['skills']['Row'];
type Service = Database['public']['Tables']['services']['Row'];
type Review = Database['public']['Tables']['reviews']['Row'];

export function Portfolio({ projects, profile, skills, services, reviews }: { projects: Project[], profile: Profile, skills: Skill[], services: Service[], reviews: Review[] }) {

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showReelOpen, setShowReelOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, index) => (
      <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  const scrollToContact = () => {
    setContactVisible(true);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle file download
  const handleDownload = async (url: string | null) => {
    if (!url) return;
    
    try {
      // Fetch the file
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a temporary link element
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      
      // Extract filename from URL or use default
      const filename = url.split('/').pop() || 'download';
      downloadLink.download = filename;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Cleanup
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadLink.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };



  const getIcon = (iconName : string) => {
    const icons = {
      Video: Video,
      Box: Box,
      Wand2: Wand2,
      Film: Film,
    };
  
    const IconComponent = icons[iconName as keyof typeof icons] || Sparkles; // Default to HelpCircle if no match
    return <IconComponent className="w-6 h-6" /> ;
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            poster={profile.bg_thumbnail || ''}
          >
            <source src={profile.bg_video_url || ''} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowReelOpen(true)}
              className="bg-white text-black px-8 py-3 rounded-full flex items-center justify-center transition-all hover:bg-gray-200"
            >
              <Play className="w-5 h-5 mr-2" />
              View Showreel
            </button>
            <button
              onClick={scrollToContact}
              className="border border-white px-8 py-3 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
            >
              Contact Me
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold">Featured Work</h2>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm transition-all ${selectedCategory === category
                    ? 'bg-white text-black'
                    : 'border border-white/20 hover:border-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-lg aspect-video cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.thumbnail_url || ''}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 p-6">
                    <p className="text-sm text-white/70 mb-2">{project.category}</p>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-white/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                {getIcon(skill.icon)}
                  <h3 className="text-xl font-semibold ml-2">{skill.name}</h3>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.tools.map((tool, toolIndex) => (
                    tool.trim() &&
                    <span key={toolIndex} className="text-xs bg-white/5 px-2 py-1 rounded">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="border border-white/10 p-8 rounded-lg hover:border-white/30 transition-all">
                <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.deliverables.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-300">
                      <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-20 px-4 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-black/50 p-8 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <img
                    src={review.avatar ||
                      review.gender === 'MALE' 
                      ? 'https://avatar.iran.liara.run/public/boy' 
                      : 'https://avatar.iran.liara.run/public/girl'
                    }
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-400">{review.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-300 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Let's Create Together</h2>
          <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Looking to bring your vision to life? I'm always open to discussing new projects
            and creative collaborations.
          </p>

          {contactVisible && <ContactForm />}

          <div className="flex justify-center space-x-6 mt-12">
            <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition-colors">
              <Mail className="w-8 h-8" />
            </a>
            <a href={profile.github_url || ''} className="hover:text-purple-400 transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href={profile.linkedin_url || ''} className="hover:text-blue-500 transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href={profile.instagram_url || ''} className="hover:text-pink-400 transition-colors">
              <Instagram className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-black text-center text-gray-400">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {showReelOpen && (
        <ShowreelModal onClose={() => setShowReelOpen(false)} url={profile.showreel_url || ''} />
      )}


      <div className='fixed bottom-6 right-6 rounded-full overflow-hidden'>
        <a 
          onClick={(e) => {
            e.preventDefault();
            handleDownload(profile.cv_url);
          }} 
          href={profile.cv_url || '#'} 
          className="w-full h-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
        >
          <FileDown className="w-6 h-6 sm:w-10 sm:h-10 m-2 sm:m-4 animate-bounce hover:animate-none" />
        </a>
      </div>
    </div>
  );
}