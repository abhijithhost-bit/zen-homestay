import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export interface Room {
  id: string;
  code: string;
  name: string;
  max_guests: number;
  base_price_paise: number;
  is_active: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface PropertySettings {
  id: number;
  property_name: string;
  whole_floor_title: string;
  whole_floor_max_guests: number;
  whole_floor_base_price_paise: number;
  whole_floor_is_active: boolean;
  check_in_time: string;
  check_out_time: string;
  pending_expiry_minutes: number;
  max_advance_days: number;
  max_stay_nights: number;
  updated_at?: string;
}

export interface DayAvailability {
  cal_date: string;
  room_1_available: boolean;
  room_2_available: boolean;
  whole_floor_available: boolean;
  room_1_price_paise: number;
  room_2_price_paise: number;
  whole_floor_price_paise: number;
}

export interface DateBlock {
  id: string;
  room_id: string | null;
  start_date: string;
  end_date: string;
  reason: string;
  created_at?: string;
  updated_at?: string;
}

export interface PricingRule {
  id: string;
  room_id: string | null;
  start_date: string;
  end_date: string;
  price_paise: number;
  title: string;
  priority?: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
