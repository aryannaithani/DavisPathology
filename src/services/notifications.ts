import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Notification } from '@/types';

export async function getNotifications(userId: string): Promise<Notification[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Notification[];
}

export async function createNotification(
  userId: string,
  title: string,
  message: string
): Promise<Notification> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot create notifications in demo mode.');
  }

  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      title,
      message,
      is_read: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Notification;
}

export async function markAsRead(notificationId: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot update notifications in demo mode.');
  }

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export async function getUnreadCount(userId: string): Promise<number> {
  if (!isSupabaseConfigured) {
    return 0;
  }

  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);

  if (error) throw error;
  return count ?? 0;
}
