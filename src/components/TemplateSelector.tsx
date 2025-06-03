
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateOption {
  id: 'modern' | 'classic' | 'creative';
  name: string;
  description: string;
  preview: string;
  features: string[];
}

const templates: TemplateOption[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with subtle gradients',
    preview: '🔷',
    features: ['ATS-Friendly', 'Clean Layout', 'Professional Colors', 'Easy to Read']
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional format preferred by conservative industries',
    preview: '📄',
    features: ['Traditional Layout', 'Conservative Design', 'High Compatibility', 'Timeless Style']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative professionals and modern companies',
    preview: '🎨',
    features: ['Eye-Catching', 'Creative Layout', 'Modern Typography', 'Visual Impact']
  }
];

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'classic' | 'creative';
  onTemplateSelect: (template: 'modern' | 'classic' | 'creative') => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a design that matches your industry and personal style</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;
          
          return (
            <Card
              key={template.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                isSelected
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : "hover:ring-1 hover:ring-gray-300"
              )}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{template.preview}</div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>

                <div className="space-y-2 mb-6">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "w-full",
                    isSelected
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {isSelected ? 'Selected' : 'Select Template'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
