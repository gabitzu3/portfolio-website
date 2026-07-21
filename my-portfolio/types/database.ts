export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
export type PostCategory = "cybersecurity" | "leadership" | "projects";
export type PostStatus = "draft" | "published";
export type ProjectStatus = "draft" | "published";
export type AchievementCategory =
  | "ctf"
  | "internship"
  | "competition"
  | "education";
export type ReviewStatus = "pending" | "approved" | "rejected";
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          title: string | null;
          bio: string | null;
          avatar_url: string | null;
          focus_areas: string[];
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          title?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          focus_areas?: string[];
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          title?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          focus_areas?: string[];
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          category: PostCategory;
          status: PostStatus;
          cover_image_url: string | null;
          author_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content?: string;
          excerpt?: string | null;
          category?: PostCategory;
          status?: PostStatus;
          cover_image_url?: string | null;
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          category?: PostCategory;
          status?: PostStatus;
          cover_image_url?: string | null;
          author_id?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      achievements: {
        Row: {
          id: string;
          title: string;
          description: string;
          achievement_date: string;
          category: AchievementCategory;
          media_url: string | null;
          media_type: string | null;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          achievement_date: string;
          category: AchievementCategory;
          media_url?: string | null;
          media_type?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          achievement_date?: string;
          category?: AchievementCategory;
          media_url?: string | null;
          media_type?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string | null;
          issued_date: string | null;
          expiry_date: string | null;
          file_path: string;
          file_type: string | null;
          is_visible: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer?: string | null;
          issued_date?: string | null;
          expiry_date?: string | null;
          file_path: string;
          file_type?: string | null;
          is_visible?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string | null;
          issued_date?: string | null;
          expiry_date?: string | null;
          file_path?: string;
          file_type?: string | null;
          is_visible?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          submitter_id: string | null;
          name: string;
          role: string | null;
          content: string;
          rating: number | null;
          status: ReviewStatus;
          moderated_by: string | null;
          moderated_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          submitter_id?: string | null;
          name: string;
          role?: string | null;
          content: string;
          rating?: number | null;
          status?: ReviewStatus;
          moderated_by?: string | null;
          moderated_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          submitter_id?: string | null;
          name?: string;
          role?: string | null;
          content?: string;
          rating?: number | null;
          status?: ReviewStatus;
          moderated_by?: string | null;
          moderated_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      logs: {
        Row: {
          id: string;
          action: string;
          user_id: string | null;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          action: string;
          user_id?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          action?: string;
          user_id?: string | null;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          tags: string[];
          cover_image_url: string | null;
          status: ProjectStatus;
          importance: number;
          sort_order: number;
          operation: string | null;
          status_label: string | null;
          duration: string | null;
          objective: string | null;
          architecture: string | null;
          lessons_learned: string | null;
          demo_url: string | null;
          repo_url: string | null;
          featured: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          tags?: string[];
          cover_image_url?: string | null;
          status?: ProjectStatus;
          importance?: number;
          sort_order?: number;
          operation?: string | null;
          status_label?: string | null;
          duration?: string | null;
          objective?: string | null;
          architecture?: string | null;
          lessons_learned?: string | null;
          demo_url?: string | null;
          repo_url?: string | null;
          featured?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          tags?: string[];
          cover_image_url?: string | null;
          status?: ProjectStatus;
          importance?: number;
          sort_order?: number;
          operation?: string | null;
          status_label?: string | null;
          duration?: string | null;
          objective?: string | null;
          architecture?: string | null;
          lessons_learned?: string | null;
          demo_url?: string | null;
          repo_url?: string | null;
          featured?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      post_category: PostCategory;
      post_status: PostStatus;
      achievement_category: AchievementCategory;
      review_status: ReviewStatus;
      project_status: ProjectStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Achievement = Database["public"]["Tables"]["achievements"]["Row"];
export type Certification = Database["public"]["Tables"]["certifications"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Log = Database["public"]["Tables"]["logs"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];