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
            kamera_user: {
                Row: {
                    avatar: string | null
                    create_time: string | null
                    creator: number | null
                    del: number
                    email: string | null
                    id: number
                    login_time: string | null
                    name: string | null
                    password: string
                    remark: string | null
                    role: string | null
                    status: number
                    telephone: string | null
                    update_time: string | null
                    updater: number | null
                    username: string
                }
                Insert: {
                    avatar?: string | null
                    create_time?: string | null
                    creator?: number | null
                    del?: number
                    email?: string | null
                    id?: number
                    login_time?: string | null
                    name?: string | null
                    password?: string
                    remark?: string | null
                    role?: string | null
                    status?: number
                    telephone?: string | null
                    update_time?: string | null
                    updater?: number | null
                    username?: string
                }
                Update: {
                    avatar?: string | null
                    create_time?: string | null
                    creator?: number | null
                    del?: number
                    email?: string | null
                    id?: number
                    login_time?: string | null
                    name?: string | null
                    password?: string
                    remark?: string | null
                    role?: string | null
                    status?: number
                    telephone?: string | null
                    update_time?: string | null
                    updater?: number | null
                    username?: string
                }
                Relationships: []
            }
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
