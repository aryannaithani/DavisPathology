import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { demoPackages } from '@/data/demo';
import { slugify } from '@/lib/utils';
import type { Package } from '@/types';

export async function getPackages(): Promise<Package[]> {
  if (!isSupabaseConfigured) {
    return demoPackages.filter((p) => p.is_active);
  }

  const { data, error } = await supabase
    .from('packages')
    .select('*, package_tests(*, test:tests(*, category:test_categories(*)))')
    .eq('is_active', true)
    .order('name');

  if (error) throw error;

  // Flatten package_tests into a tests array for convenience
  return (data as Package[]).map((pkg) => ({
    ...pkg,
    tests: pkg.package_tests?.map((pt) => pt.test!).filter(Boolean) ?? [],
  }));
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  if (!isSupabaseConfigured) {
    return demoPackages.find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from('packages')
    .select('*, package_tests(*, test:tests(*, category:test_categories(*)))')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  const pkg = data as Package;
  return {
    ...pkg,
    tests: pkg.package_tests?.map((pt) => pt.test!).filter(Boolean) ?? [],
  };
}

export async function createPackage(
  packageData: Omit<Package, 'id' | 'slug' | 'created_at' | 'updated_at' | 'package_tests' | 'tests'>,
  testIds: string[]
): Promise<Package> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot create packages in demo mode.');
  }

  const slug = slugify(packageData.name);

  const { data: pkg, error: pkgError } = await supabase
    .from('packages')
    .insert({ ...packageData, slug })
    .select()
    .single();

  if (pkgError) throw pkgError;

  const packageTests = testIds.map((testId) => ({
    package_id: pkg.id,
    test_id: testId,
  }));

  const { error: ptError } = await supabase
    .from('package_tests')
    .insert(packageTests);

  if (ptError) throw ptError;

  // Return the full package with tests
  const result = await getPackageBySlug(slug);
  if (!result) throw new Error('Failed to retrieve created package');
  return result;
}

export async function updatePackage(
  id: string,
  packageData: Partial<Omit<Package, 'id' | 'created_at' | 'updated_at' | 'package_tests' | 'tests'>>,
  testIds?: string[]
): Promise<Package> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot update packages in demo mode.');
  }

  const updates: Record<string, unknown> = {
    ...packageData,
    updated_at: new Date().toISOString(),
  };

  if (packageData.name) {
    updates.slug = slugify(packageData.name);
  }

  const { data: pkg, error: pkgError } = await supabase
    .from('packages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (pkgError) throw pkgError;

  // If testIds provided, replace package_tests
  if (testIds) {
    const { error: deleteError } = await supabase
      .from('package_tests')
      .delete()
      .eq('package_id', id);

    if (deleteError) throw deleteError;

    if (testIds.length > 0) {
      const packageTests = testIds.map((testId) => ({
        package_id: id,
        test_id: testId,
      }));

      const { error: insertError } = await supabase
        .from('package_tests')
        .insert(packageTests);

      if (insertError) throw insertError;
    }
  }

  const result = await getPackageBySlug(pkg.slug);
  if (!result) throw new Error('Failed to retrieve updated package');
  return result;
}

export async function deactivatePackage(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot deactivate packages in demo mode.');
  }

  const { error } = await supabase
    .from('packages')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}
