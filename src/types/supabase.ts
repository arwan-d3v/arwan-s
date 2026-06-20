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
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          role: string // e.g. "superadmin", "public"
          loyalty_points: number
          tier: string // e.g. "Apprentice"
          subscription_plan: string
          current_period_end: string | null
          referral_code: string
          referred_by: string | null
          last_daily_claim: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          loyalty_points?: number
          tier?: string
          subscription_plan?: string
          current_period_end?: string | null
          referral_code?: string
          referred_by?: string | null
          last_daily_claim?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: string
          loyalty_points?: number
          tier?: string
          subscription_plan?: string
          current_period_end?: string | null
          referral_code?: string
          referred_by?: string | null
          last_daily_claim?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          longest_streak: number
          last_login: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          longest_streak?: number
          last_login?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          longest_streak?: number
          last_login?: string
          created_at?: string
          updated_at?: string
        }
      }
      utility_usage: {
        Row: {
          id: string
          user_id: string
          date: string
          images_converted: number
          videos_converted: number
          social_downloads: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          images_converted?: number
          videos_converted?: number
          social_downloads?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          images_converted?: number
          videos_converted?: number
          social_downloads?: number
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          provider: string
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: string
          provider: string
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          provider?: string
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          source?: string | null
          created_at?: string
        }
      }
      // Assuming more tables are needed later, they can be added here
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
