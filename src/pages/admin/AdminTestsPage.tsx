import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  FlaskConical, 
  Plus, 
  Search, 
  Edit, 
  PowerOff, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  useTests, 
  useCategories, 
  useCreateTest, 
  useUpdateTest, 
  useDeactivateTest 
} from '@/hooks/useTests';
import { testSchema, TestFormData } from '@/schemas';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import type { Test } from '@/types';

export const AdminTestsPage: React.FC = () => {
  const { toast } = useToast();
  const { data: tests = [], isLoading } = useTests();
  const { data: categories = [] } = useCategories();

  const createTestMutation = useCreateTest();
  const updateTestMutation = useUpdateTest();
  const deactivateTestMutation = useDeactivateTest();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: '',
      category_id: categories[0]?.id || '',
      description: '',
      sample_type: 'Blood (EDTA)',
      preparation: 'No special preparation required.',
      turnaround_time: '4–6 hours',
      price: 250,
      is_active: true,
    },
  });

  const isActiveWatch = watch('is_active');

  const filteredTests = tests.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.sample_type.toLowerCase().includes(q);
  });

  const handleOpenAdd = () => {
    reset({
      name: '',
      category_id: categories[0]?.id || '',
      description: '',
      sample_type: 'Blood (EDTA)',
      preparation: 'No special preparation required.',
      turnaround_time: '4–6 hours',
      price: 200,
      is_active: true,
    });
    setEditingTest(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (t: Test) => {
    reset({
      name: t.name,
      category_id: t.category_id,
      description: t.description,
      sample_type: t.sample_type,
      preparation: t.preparation,
      turnaround_time: t.turnaround_time,
      price: t.price,
      is_active: t.is_active,
    });
    setEditingTest(t);
    setIsAddModalOpen(true);
  };

  const onSubmit = async (data: TestFormData) => {
    try {
      if (editingTest) {
        await updateTestMutation.mutateAsync({
          id: editingTest.id,
          data: {
            name: data.name,
            category_id: data.category_id,
            description: data.description,
            sample_type: data.sample_type,
            preparation: data.preparation,
            turnaround_time: data.turnaround_time,
            price: Number(data.price),
            is_active: data.is_active,
          },
        });
        toast({ title: 'Test Updated', description: `${data.name} was successfully updated.` });
      } else {
        await createTestMutation.mutateAsync({
          name: data.name,
          category_id: data.category_id,
          description: data.description,
          sample_type: data.sample_type,
          preparation: data.preparation,
          turnaround_time: data.turnaround_time,
          price: Number(data.price),
          is_active: data.is_active,
        });
        toast({ title: 'Test Added', description: `${data.name} was added to the catalogue.` });
      }
      setIsAddModalOpen(false);
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err instanceof Error ? err.message : 'Operation failed.',
      });
    }
  };

  const handleToggleActive = async (test: Test) => {
    try {
      await updateTestMutation.mutateAsync({
        id: test.id,
        data: { is_active: !test.is_active },
      });
      toast({
        title: 'Status Toggled',
        description: `${test.name} is now ${!test.is_active ? 'Active' : 'Inactive'}.`,
      });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error toggling test status' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Diagnostic Test Management"
          subtitle="Configure laboratory tests, update pricing parameters, and control catalogue visibility."
          className="mb-0 pb-0 border-b-0"
        />
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary-600 text-white text-xs gap-1.5 font-bold">
          <Plus className="w-4 h-4" />
          Add New Test
        </Button>
      </div>

      <div className="max-w-md">
        <Input
          placeholder="Search test catalogue..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white h-10 text-xs"
        />
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading test catalogue..." />
        </div>
      ) : (
        <Card className="border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-border text-neutral-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Test Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Sample Type</th>
                  <th className="py-3 px-4">Turnaround</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTests.map((test) => {
                  const category = categories.find((c) => c.id === test.category_id);
                  return (
                    <tr key={test.id} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {test.name}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        <Badge variant="outline" className="text-[10px]">
                          {category?.name || 'General'}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {test.sample_type}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {test.turnaround_time}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {formatPrice(test.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleActive(test)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-opacity hover:opacity-80 ${
                            test.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {test.is_active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(test)}
                          className="text-xs h-8 px-2"
                        >
                          <Edit className="w-3.5 h-3.5 mr-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add / Edit Test Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              {editingTest ? 'Edit Diagnostic Test' : 'Add New Diagnostic Test'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Test Name *</Label>
              <Input placeholder="e.g. Complete Blood Count (CBC)" {...register('name')} />
              {errors.name && <p className="text-destructive text-[11px]">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Category *</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                  {...register('category_id')}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-destructive text-[11px]">{errors.category_id.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Price (INR) *</Label>
                <Input type="number" {...register('price', { valueAsNumber: true })} />
                {errors.price && <p className="text-destructive text-[11px]">{errors.price.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Sample Required *</Label>
                <Input placeholder="e.g. Blood (EDTA)" {...register('sample_type')} />
                {errors.sample_type && <p className="text-destructive text-[11px]">{errors.sample_type.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Turnaround Time *</Label>
                <Input placeholder="e.g. 4–6 hours" {...register('turnaround_time')} />
                {errors.turnaround_time && <p className="text-destructive text-[11px]">{errors.turnaround_time.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Clinical Description *</Label>
              <Textarea rows={2} placeholder="Explain what the test evaluates..." {...register('description')} />
              {errors.description && <p className="text-destructive text-[11px]">{errors.description.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Patient Preparation Guidelines *</Label>
              <Textarea rows={2} placeholder="Fasting guidelines, medication advice..." {...register('preparation')} />
              {errors.preparation && <p className="text-destructive text-[11px]">{errors.preparation.message}</p>}
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="is_active"
                checked={isActiveWatch}
                onCheckedChange={(checked) => setValue('is_active', checked)}
              />
              <Label htmlFor="is_active" className="text-xs font-medium cursor-pointer">
                Active in Public Catalogue
              </Label>
            </div>

            <DialogFooter className="pt-3 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={createTestMutation.isPending || updateTestMutation.isPending}
                className="bg-primary hover:bg-primary-600 text-white font-bold"
              >
                {editingTest ? 'Save Changes' : 'Create Test'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
