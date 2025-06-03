
import React from 'react';
import { cn } from '@/lib/utils';
import { User, Briefcase, GraduationCap, Star, Eye, FileText } from 'lucide-react';
import { ResumeSection } from '@/types/resume';

interface SidebarProps {
  currentSection: ResumeSection;
  onSectionChange: (section: ResumeSection) => void;
  completedSections: Set<ResumeSection>;
}

const sectionConfig = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Star },
  { id: 'preview', label: 'Preview', icon: Eye },
] as const;

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSectionChange,
  completedSections
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-sm text-gray-500">Create your perfect resume</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sectionConfig.map(({ id, label, icon: Icon }) => {
            const isActive = currentSection === id;
            const isCompleted = completedSections.has(id as ResumeSection);
            
            return (
              <li key={id}>
                <button
                  onClick={() => onSectionChange(id as ResumeSection)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                  {isCompleted && !isActive && (
                    <div className="ml-auto w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">ATS-Friendly Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use standard section headings</li>
            <li>• Include relevant keywords</li>
            <li>• Keep formatting simple</li>
            <li>• Use bullet points for achievements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
