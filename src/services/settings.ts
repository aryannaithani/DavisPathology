import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { LaboratorySetting } from '@/types';

// Demonstration laboratory settings data
const demoSettings: LaboratorySetting[] = [
  {
    id: 'setting-1',
    setting_key: 'laboratory_name',
    setting_value: { value: 'Davis Pathology Lab' },
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'setting-2',
    setting_key: 'address',
    setting_value: {
      value: 'Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh',
    },
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'setting-3',
    setting_key: 'phone',
    setting_value: { value: '+91 731 400 1234' },
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'setting-4',
    setting_key: 'email',
    setting_value: { value: 'info@davispathlab.com' },
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'setting-5',
    setting_key: 'working_hours',
    setting_value: {
      weekday: '7:00 AM – 9:00 PM',
      saturday: '7:00 AM – 5:00 PM',
      sunday: '8:00 AM – 1:00 PM',
    },
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'setting-6',
    setting_key: 'home_collection_fee',
    // Demonstration price
    setting_value: { value: 100 },
    updated_at: '2024-01-01T00:00:00Z',
  },
];

export async function getSetting(key: string): Promise<LaboratorySetting | null> {
  if (!isSupabaseConfigured) {
    return demoSettings.find((s) => s.setting_key === key) ?? null;
  }

  const { data, error } = await supabase
    .from('laboratory_settings')
    .select('*')
    .eq('setting_key', key)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as LaboratorySetting;
}

export async function getSettings(): Promise<LaboratorySetting[]> {
  if (!isSupabaseConfigured) {
    return demoSettings;
  }

  const { data, error } = await supabase
    .from('laboratory_settings')
    .select('*')
    .order('setting_key');

  if (error) throw error;
  return data as LaboratorySetting[];
}

export async function updateSetting(
  key: string,
  value: Record<string, unknown>
): Promise<LaboratorySetting> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot update settings in demo mode.');
  }

  const { data, error } = await supabase
    .from('laboratory_settings')
    .update({
      setting_value: value,
      updated_at: new Date().toISOString(),
    })
    .eq('setting_key', key)
    .select()
    .single();

  if (error) throw error;
  return data as LaboratorySetting;
}
