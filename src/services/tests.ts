import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { demoTests, demoCategories } from '@/data/demo';
import { slugify } from '@/lib/utils';
import type { Test, TestCategory } from '@/types';

export async function getCategories(): Promise<TestCategory[]> {
  if (!isSupabaseConfigured) {
    return demoCategories.filter((c) => c.is_active);
  }

  const { data, error } = await supabase
    .from('test_categories')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error) throw error;
  return data as TestCategory[];
}

export async function getTests(
  categorySlug?: string,
  search?: string
): Promise<Test[]> {
  if (!isSupabaseConfigured) {
    let filtered = demoTests.filter((t) => t.is_active);

    if (categorySlug) {
      const category = demoCategories.find((c) => c.slug === categorySlug);
      if (category) {
        filtered = filtered.filter((t) => t.category_id === category.id);
      }
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(lowerSearch) ||
          t.description.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered.map((t) => ({
      ...t,
      category: demoCategories.find((c) => c.id === t.category_id),
    }));
  }

  let query = supabase
    .from('tests')
    .select('*, category:test_categories(*)')
    .eq('is_active', true)
    .order('name');

  if (categorySlug) {
    query = query.eq('category.slug', categorySlug);
  }

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,description.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;

  // When filtering by category slug via join, Supabase returns rows where the
  // joined category is null if the slug doesn't match. Filter those out.
  if (categorySlug) {
    return (data as Test[]).filter((t) => t.category !== null);
  }

  return data as Test[];
}

export async function getTestBySlug(slug: string): Promise<Test | null> {
  if (!isSupabaseConfigured) {
    const test = demoTests.find((t) => t.slug === slug) ?? null;
    if (test) {
      return {
        ...test,
        category: demoCategories.find((c) => c.id === test.category_id),
      };
    }
    return null;
  }

  const { data, error } = await supabase
    .from('tests')
    .select('*, category:test_categories(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Test;
}

export async function getRelatedTests(
  categoryId: string,
  excludeId: string
): Promise<Test[]> {
  if (!isSupabaseConfigured) {
    return demoTests
      .filter((t) => t.category_id === categoryId && t.id !== excludeId && t.is_active)
      .slice(0, 3)
      .map((t) => ({
        ...t,
        category: demoCategories.find((c) => c.id === t.category_id),
      }));
  }

  const { data, error } = await supabase
    .from('tests')
    .select('*, category:test_categories(*)')
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .eq('is_active', true)
    .limit(3);

  if (error) throw error;
  return data as Test[];
}

export async function createTest(
  testData: Omit<Test, 'id' | 'slug' | 'created_at' | 'updated_at' | 'category'>
): Promise<Test> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot create tests in demo mode.');
  }

  const slug = slugify(testData.name);
  const { data, error } = await supabase
    .from('tests')
    .insert({ ...testData, slug })
    .select('*, category:test_categories(*)')
    .single();

  if (error) throw error;
  return data as Test;
}

export async function updateTest(
  id: string,
  testData: Partial<Omit<Test, 'id' | 'created_at' | 'updated_at' | 'category'>>
): Promise<Test> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot update tests in demo mode.');
  }

  const updates: Record<string, unknown> = {
    ...testData,
    updated_at: new Date().toISOString(),
  };

  if (testData.name) {
    updates.slug = slugify(testData.name);
  }

  const { data, error } = await supabase
    .from('tests')
    .update(updates)
    .eq('id', id)
    .select('*, category:test_categories(*)')
    .single();

  if (error) throw error;
  return data as Test;
}

export async function deactivateTest(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Cannot deactivate tests in demo mode.');
  }

  const { error } = await supabase
    .from('tests')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw error;
}
