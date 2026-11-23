import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deactivatePackage,
} from '@/services/packages';
import type { Package } from '@/types';

export function usePackages() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
}

export function usePackage(slug: string) {
  return useQuery({
    queryKey: ['package', slug],
    queryFn: () => getPackageBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      packageData,
      testIds,
    }: {
      packageData: Omit<Package, 'id' | 'slug' | 'created_at' | 'updated_at' | 'tests' | 'package_tests'>;
      testIds: string[];
    }) => createPackage(packageData, testIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
      testIds,
    }: {
      id: string;
      data: Partial<Omit<Package, 'id' | 'created_at' | 'updated_at' | 'tests' | 'package_tests'>>;
      testIds?: string[];
    }) => updatePackage(id, data, testIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      queryClient.invalidateQueries({ queryKey: ['package'] });
    },
  });
}

export function useDeactivatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deactivatePackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}
