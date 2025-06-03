
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  onNext,
  onPrevious,
  showNavigation = true
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="text-2xl text-gray-900">{title}</CardTitle>
          {description && (
            <p className="text-gray-600 mt-2">{description}</p>
          )}
        </CardHeader>
        <CardContent className="p-8">
          {children}
          
          {showNavigation && (
            <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!onPrevious}
                className="px-6"
              >
                Previous
              </Button>
              <Button
                onClick={onNext}
                disabled={!onNext}
                className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ label, children, required }) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
};

interface ArrayFieldProps {
  label: string;
  items: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
  addButtonText: string;
}

export const ArrayField: React.FC<ArrayFieldProps> = ({
  label,
  items,
  onAdd,
  onRemove,
  renderItem,
  addButtonText
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold text-gray-900">{label}</Label>
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {addButtonText}
        </Button>
      </div>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id || index} className="relative">
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <div className="flex justify-end mb-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {renderItem(item, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
