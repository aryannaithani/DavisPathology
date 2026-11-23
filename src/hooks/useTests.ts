import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCategories,
  getTests,
  getTestBySlug,
  getRelatedTests,
  createTest,
  updateTest,
  deactivateTest,
} from '@/services/tests';
import type { Test } from '@/types';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}

export function useTests(categorySlug?: string, search?: string) {
  return useQuery({
    queryKey: ['tests', categorySlug, search],
    queryFn: () => getTests(categorySlug, search),
  });
}

export function useTest(slug: string) {
  return useQuery({
    queryKey: ['test', slug],
    queryFn: () => getTestBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useRelatedTests(categoryId: string, currentTestId: string) {
  return useQuery({
    queryKey: ['related-tests', categoryId, currentTestId],
    queryFn: () => getRelatedTests(categoryId, currentTestId),
    enabled: Boolean(categoryId && currentTestId),
  });
}

export function useCreateTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (testData: Omit<Test, 'id' | 'slug' | 'created_at' | 'updated_at'>) =>
      createTest(testData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}

export function useUpdateTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Test, 'id' | 'created_at' | 'updated_at'>>;
    }) => updateTest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
      queryClient.invalidateQueries({ queryKey: ['test'] });
    },
  });
}

export function useDeactivateTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deactivateTest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tests'] });
    },
  });
}
