import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Boxes, 
  Plus, 
  Edit, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  usePackages, 
  useCreatePackage, 
  useUpdatePackage, 
  useDeactivatePackage 
} from '@/hooks/usePackages';
import { useTests } from '@/hooks/useTests';
import { packageSchema, PackageFormData } from '@/schemas';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import type { Package } from '@/types';

export const AdminPackagesPage: React.FC = () => {
  const { toast } = useToast();
  const { data: packages = [], isLoading } = usePackages();
  const { data: tests = [] } = useTests();

  const createPackageMutation = useCreatePackage();
  const updatePackageMutation = useUpdatePackage();
  const deactivatePackageMutation = useDeactivatePackage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
  });

  const isActiveWatch = watch('is_active');

  const handleOpenAdd = () => {
    reset({
      name: '',
      description: '',
      price: 599,
      preparation: 'Fasting 10-12 hours required. Water allowed.',
      is_active: true,
      test_ids: [tests[0]?.id || ''],
    });
    setSelectedTestIds(tests.slice(0, 3).map((t) => t.id));
    setValue('test_ids', tests.slice(0, 3).map((t) => t.id));
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: Package) => {
    const includedIds = pkg.tests?.map((t) => t.id) || [];
    reset({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      preparation: pkg.preparation,
      is_active: pkg.is_active,
      test_ids: includedIds,
    });
    setSelectedTestIds(includedIds);
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const toggleTestSelection = (testId: string) => {
    let updated: string[];
    if (selectedTestIds.includes(testId)) {
      updated = selectedTestIds.filter((id) => id !== testId);
    } else {
      updated = [...selectedTestIds, testId];
    }
    setSelectedTestIds(updated);
    setValue('test_ids', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: PackageFormData) => {
    try {
      if (editingPackage) {
        await updatePackageMutation.mutateAsync({
          id: editingPackage.id,
          data: {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            preparation: data.preparation,
            is_active: data.is_active,
          },
          testIds: selectedTestIds,
        });
        toast({ title: 'Package Updated', description: `${data.name} has been updated.` });
      } else {
        await createPackageMutation.mutateAsync({
          packageData: {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            preparation: data.preparation,
            is_active: data.is_active,
          },
          testIds: selectedTestIds,
        });
        toast({ title: 'Package Created', description: `${data.name} is now in catalogue.` });
      }
      setIsModalOpen(false);
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err instanceof Error ? err.message : 'Operation failed.',
      });
    }
  };

  const handleToggleActive = async (pkg: Package) => {
    try {
      await updatePackageMutation.mutateAsync({
        id: pkg.id,
        data: { is_active: !pkg.is_active },
      });
      toast({
        title: 'Status Toggled',
        description: `${pkg.name} is now ${!pkg.is_active ? 'Active' : 'Inactive'}.`,
      });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error toggling package status' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Health Package Management"
          subtitle="Assemble bundled preventive health checkup packages and adjust package rates."
          className="mb-0 pb-0 border-b-0"
        />
        <Button onClick={handleOpenAdd} className="bg-primary hover:bg-primary-600 text-white text-xs gap-1.5 font-bold">
          <Plus className="w-4 h-4" />
          Create New Package
        </Button>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading packages..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="border-border flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {pkg.name}
                  </h3>
                  <button
                    onClick={() => handleToggleActive(pkg)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {pkg.is_active ? 'Active' : 'Inactive'}
                  </button>
                </div>

                <div className="text-2xl font-extrabold text-primary">
                  {formatPrice(pkg.price)}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {pkg.description}
                </p>

                <div className="pt-3 border-t border-border space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                    Included Tests ({pkg.tests?.length || 0}):
                  </span>
                  <ul className="text-xs text-foreground space-y-1">
                    {pkg.tests?.slice(0, 4).map((t) => (
                      <li key={t.id} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                        <span className="truncate">{t.name}</span>
                      </li>
                    ))}
                    {(pkg.tests?.length || 0) > 4 && (
                      <li className="text-[11px] text-muted-foreground pl-5 italic">
                        + {(pkg.tests?.length || 0) - 4} more investigations
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEdit(pkg)}
                    className="w-full text-xs font-semibold gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    Edit Package Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Package Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              {editingPackage ? 'Edit Health Package' : 'Create Health Checkup Package'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Package Name *</Label>
              <Input placeholder="e.g. Senior Citizen Full Profile" {...register('name')} />
              {errors.name && <p className="text-destructive text-[11px]">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Package Price (INR) *</Label>
              <Input type="number" {...register('price', { valueAsNumber: true })} />
              {errors.price && <p className="text-destructive text-[11px]">{errors.price.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Description *</Label>
              <Textarea rows={2} placeholder="Explain target screening purpose..." {...register('description')} />
              {errors.description && <p className="text-destructive text-[11px]">{errors.description.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Preparation Requirements *</Label>
              <Textarea rows={2} placeholder="Fasting advice, sample timing..." {...register('preparation')} />
              {errors.preparation && <p className="text-destructive text-[11px]">{errors.preparation.message}</p>}
            </div>

            {/* Test Multi-select Checklist */}
            <div className="space-y-2 pt-2">
              <Label className="text-xs font-semibold">
                Select Included Diagnostic Tests * ({selectedTestIds.length} selected)
              </Label>
              {errors.test_ids && <p className="text-destructive text-[11px]">{errors.test_ids.message}</p>}
              <div className="max-h-48 overflow-y-auto border border-border rounded-lg p-2 space-y-1.5">
                {tests.map((t) => {
                  const isChecked = selectedTestIds.includes(t.id);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleTestSelection(t.id)}
                      className={`p-2 rounded flex items-center justify-between text-xs cursor-pointer ${
                        isChecked ? 'bg-primary/10 font-semibold text-primary' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <span>{t.name}</span>
                      <span className="font-mono text-[11px]">{formatPrice(t.price)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="pkg_active"
                checked={isActiveWatch}
                onCheckedChange={(checked) => setValue('is_active', checked)}
              />
              <Label htmlFor="pkg_active" className="text-xs font-medium cursor-pointer">
                Active in Public Catalogue
              </Label>
            </div>

            <DialogFooter className="pt-3 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={createPackageMutation.isPending || updatePackageMutation.isPending}
                className="bg-primary hover:bg-primary-600 text-white font-bold"
              >
                {editingPackage ? 'Save Package' : 'Create Package'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
