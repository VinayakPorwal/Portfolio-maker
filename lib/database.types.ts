export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string
          name: string
          title: string
          bio: string | null
          email: string
          cv_url: string | null
          bg_video_url: string | null
          bg_thumbnail: string | null
          github_url: string | null
          instagram_url: string | null
          linkedin_url: string | null
          showreel_url: string | null
          created_at: string
          updated_at: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          thumbnail_url: string | null
          video_url: string | null
          youtube_id: string | null
          tags: string[]
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: string
          thumbnail_url?: string | null
          video_url?: string | null
          youtube_id?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string
          thumbnail_url?: string | null
          video_url?: string | null
          youtube_id?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          level: number
          tools: string[]
          icon: string
        }
        Insert: {
          id?: string
          name: string
          level: number
          tools: string[]
          icon: string
        }
        Update: {
          id?: string
          name?: string
          level?: number
          tools?: string[]
          icon?: string
        }
      }
      reviews: {
        Row: {
          id: string
          name: string
          company: string
          avatar: string
          gender: string
          review: string
          rating: number
        }
        Insert: {
          id?: string
          name: string
          company: string
          avatar: string
          gender: string
          review: string
          rating: number
        }
        Update: {
          id?: string
          name?: string
          company?: string
          avatar?: string
          review?: string
          rating?: number
          gender?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          deliverables: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          deliverables: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          deliverables?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          status: string
          created_at: string
          updated_at: string
        }
      }
    }
  }
}