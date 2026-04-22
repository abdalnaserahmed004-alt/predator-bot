export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bot_commands: {
        Row: {
          command: string
          created_at: string
          enabled: boolean
          id: string
          response: string
          updated_at: string
        }
        Insert: {
          command: string
          created_at?: string
          enabled?: boolean
          id?: string
          response: string
          updated_at?: string
        }
        Update: {
          command?: string
          created_at?: string
          enabled?: boolean
          id?: string
          response?: string
          updated_at?: string
        }
        Relationships: []
      }
      governorates: {
        Row: {
          created_at: string
          id: number
          name_ar: string
          name_en: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: number
          name_ar: string
          name_en: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: number
          name_ar?: string
          name_en?: string
          sort_order?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      telegram_bot_state: {
        Row: {
          id: number
          update_offset: number
          updated_at: string
        }
        Insert: {
          id: number
          update_offset?: number
          updated_at?: string
        }
        Update: {
          id?: number
          update_offset?: number
          updated_at?: string
        }
        Relationships: []
      }
      telegram_messages: {
        Row: {
          chat_id: number
          created_at: string
          direction: string
          id: string
          raw: Json | null
          text: string | null
          update_id: number | null
        }
        Insert: {
          chat_id: number
          created_at?: string
          direction: string
          id?: string
          raw?: Json | null
          text?: string | null
          update_id?: number | null
        }
        Update: {
          chat_id?: number
          created_at?: string
          direction?: string
          id?: string
          raw?: Json | null
          text?: string | null
          update_id?: number | null
        }
        Relationships: []
      }
      telegram_users: {
        Row: {
          chat_id: number
          created_at: string
          first_name: string | null
          id: string
          is_blocked: boolean
          last_name: string | null
          last_seen_at: string
          username: string | null
        }
        Insert: {
          chat_id: number
          created_at?: string
          first_name?: string | null
          id?: string
          is_blocked?: boolean
          last_name?: string | null
          last_seen_at?: string
          username?: string | null
        }
        Update: {
          chat_id?: number
          created_at?: string
          first_name?: string | null
          id?: string
          is_blocked?: boolean
          last_name?: string | null
          last_seen_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_link_sessions: {
        Row: {
          created_at: string
          full_name: string | null
          governorate: string | null
          id: string
          linked_user_id: string | null
          phone_number: string | null
          step: Database["public"]["Enums"]["whatsapp_session_step"]
          telegram_chat_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          governorate?: string | null
          id?: string
          linked_user_id?: string | null
          phone_number?: string | null
          step?: Database["public"]["Enums"]["whatsapp_session_step"]
          telegram_chat_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          governorate?: string | null
          id?: string
          linked_user_id?: string | null
          phone_number?: string | null
          step?: Database["public"]["Enums"]["whatsapp_session_step"]
          telegram_chat_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_link_sessions_linked_user_id_fkey"
            columns: ["linked_user_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_linked_users"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_linked_users: {
        Row: {
          created_at: string
          full_name: string
          governorate: string
          id: string
          last_connected_at: string | null
          last_error: string | null
          pairing_code: string | null
          pairing_code_expires_at: string | null
          phone_number: string
          session_id: string | null
          status: Database["public"]["Enums"]["whatsapp_link_status"]
          telegram_chat_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name: string
          governorate: string
          id?: string
          last_connected_at?: string | null
          last_error?: string | null
          pairing_code?: string | null
          pairing_code_expires_at?: string | null
          phone_number: string
          session_id?: string | null
          status?: Database["public"]["Enums"]["whatsapp_link_status"]
          telegram_chat_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          governorate?: string
          id?: string
          last_connected_at?: string | null
          last_error?: string | null
          pairing_code?: string | null
          pairing_code_expires_at?: string | null
          phone_number?: string
          session_id?: string | null
          status?: Database["public"]["Enums"]["whatsapp_link_status"]
          telegram_chat_id?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      whatsapp_link_status:
        | "pending"
        | "awaiting_code"
        | "connected"
        | "disconnected"
        | "failed"
      whatsapp_session_step:
        | "name"
        | "phone"
        | "governorate"
        | "awaiting_code"
        | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      whatsapp_link_status: [
        "pending",
        "awaiting_code",
        "connected",
        "disconnected",
        "failed",
      ],
      whatsapp_session_step: [
        "name",
        "phone",
        "governorate",
        "awaiting_code",
        "completed",
      ],
    },
  },
} as const
