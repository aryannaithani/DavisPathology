import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  createNotification,
} from '@/services/notifications';

export function useNotifications(userId?: string) {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => (userId ? getNotifications(userId) : Promise.resolve([])),
    enabled: Boolean(userId),
  });
}

export function useUnreadNotificationsCount(userId?: string) {
  return useQuery({
    queryKey: ['notifications-unread-count', userId],
    queryFn: () => (userId ? getUnreadCount(userId) : Promise.resolve(0)),
    enabled: Boolean(userId),
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) => markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      title,
      message,
    }: {
      userId: string;
      title: string;
      message: string;
    }) => createNotification(userId, title, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] });
    },
  });
}
