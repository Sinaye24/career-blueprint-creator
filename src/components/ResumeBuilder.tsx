import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { FormSection, FormField, ArrayField } from './FormSection';
import { TemplateSelector } from './TemplateSelector';
import { ResumePreview } from './ResumePreview';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Resume, ResumeSection, Experience, Education, Skill } from '@/types/resume';
import { saveResumeData, loadResumeData, getDefaultResume } from '@/utils/resumeStorage';
import { exportToPDF, exportToHTML, exportToDOCX } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { Download, Save, ChevronDown, FileText, Globe, FileImage } from 'lucide-react';

export const ResumeBuilder: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<ResumeSection>('personal');
  const [resume, setResume] = useState<Resume>(getDefaultResume());
  const [completedSections, setCompletedSections] = useState<Set<ResumeSection>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadResumeData();
    if (savedData) {
      setResume(prev => ({ ...prev, ...savedData }));
      toast({
        title: "Resume loaded",
        description: "Your previously saved resume data has been restored.",
      });
    }
  }, [toast]);

  // Auto-save on changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveResumeData(resume);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resume]);

  const updateResume = (section: keyof Resume, data: any) => {
    setResume(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSectionChange = (section: ResumeSection) => {
    setCurrentSection(section);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      achievements: ['']
    };
    updateResume('experience', [...resume.experience, newExp]);
  };

  const removeExperience = (index: number) => {
    updateResume('experience', resume.experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const updated = resume.experience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    updateResume('experience', updated);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    };
    updateResume('education', [...resume.education, newEdu]);
  };

  const removeEducation = (index: number) => {
    updateResume('education', resume.education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: keyof Education, value: any) => {
    const updated = resume.education.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    );
    updateResume('education', updated);
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'technical',
      level: 'intermediate'
    };
    updateResume('skills', [...resume.skills, newSkill]);
  };

  const removeSkill = (index: number) => {
    updateResume('skills', resume.skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: any) => {
    const updated = resume.skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    updateResume('skills', updated);
  };

  const handleExport = async (format: 'pdf' | 'html' | 'docx') => {
    setIsExporting(true);
    try {
      const filename = resume.personalInfo.fullName 
        ? resume.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-') 
        : 'resume';

      switch (format) {
        case 'pdf':
          await exportToPDF('resume-preview', filename);
          toast({
            title: "PDF exported successfully",
            description: "Your resume has been downloaded as a PDF file.",
          });
          break;
        case 'html':
          exportToHTML(resume, filename);
          toast({
            title: "HTML exported successfully",
            description: "Your resume has been downloaded as an HTML file.",
          });
          break;
        case 'docx':
          await exportToDOCX(resume, filename);
          toast({
            title: "DOCX exported successfully",
            description: "Your resume has been downloaded as a Word document.",
          });
          break;
      }
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const renderPersonalInfoSection = () => (
    <FormSection
      title="Personal Information"
      description="Enter your basic contact information and professional summary"
      onNext={() => setCurrentSection('experience')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" required>
          <Input
            value={resume.personalInfo.fullName}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </FormField>

        <FormField label="Email Address" required>
          <Input
            type="email"
            value={resume.personalInfo.email}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, email: e.target.value })}
            placeholder="john@example.com"
          />
        </FormField>

        <FormField label="Phone Number" required>
          <Input
            value={resume.personalInfo.phone}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </FormField>

        <FormField label="Location" required>
          <Input
            value={resume.personalInfo.location}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, location: e.target.value })}
            placeholder="New York, NY"
          />
        </FormField>

        <FormField label="LinkedIn Profile">
          <Input
            value={resume.personalInfo.linkedIn}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, linkedIn: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
        </FormField>

        <FormField label="Website/Portfolio">
          <Input
            value={resume.personalInfo.website}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, website: e.target.value })}
            placeholder="johndoe.com"
          />
        </FormField>
      </div>

      <div className="mt-6">
        <FormField label="Professional Summary" required>
          <Textarea
            value={resume.personalInfo.summary}
            onChange={(e) => updateResume('personalInfo', { ...resume.personalInfo, summary: e.target.value })}
            placeholder="Write a brief summary of your professional background and key achievements..."
            rows={4}
          />
        </FormField>
      </div>
    </FormSection>
  );

  const renderExperienceSection = () => (
    <FormSection
      title="Professional Experience"
      description="Add your work history, starting with your most recent position"
      onNext={() => setCurrentSection('education')}
      onPrevious={() => setCurrentSection('personal')}
    >
      <ArrayField
        label="Work Experience"
        items={resume.experience}
        onAdd={addExperience}
        onRemove={removeExperience}
        addButtonText="Add Experience"
        renderItem={(exp, index) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Job Title" required>
              <Input
                value={exp.position}
                onChange={(e) => updateExperience(index, 'position', e.target.value)}
                placeholder="Software Engineer"
              />
            </FormField>

            <FormField label="Company" required>
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                placeholder="Tech Company Inc."
              />
            </FormField>

            <FormField label="Location">
              <Input
                value={exp.location}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                placeholder="New York, NY"
              />
            </FormField>

            <FormField label="Start Date" required>
              <Input
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                placeholder="January 2022"
              />
            </FormField>

            <div className="flex items-center space-x-2 col-span-2">
              <Checkbox
                checked={exp.isCurrentRole}
                onCheckedChange={(checked) => updateExperience(index, 'isCurrentRole', checked)}
              />
              <label className="text-sm font-medium">This is my current role</label>
            </div>

            {!exp.isCurrentRole && (
              <FormField label="End Date" required>
                <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  placeholder="December 2023"
                />
              </FormField>
            )}

            <div className="col-span-2">
              <FormField label="Key Achievements">
                <Textarea
                  value={exp.achievements.join('\n')}
                  onChange={(e) => updateExperience(index, 'achievements', e.target.value.split('\n').filter(line => line.trim()))}
                  placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 5 developers on a major project&#10;• Improved application performance by 40%"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">Enter each achievement on a new line</p>
              </FormField>
            </div>
          </div>
        )}
      />
    </FormSection>
  );

  const renderEducationSection = () => (
    <FormSection
      title="Education"
      description="Add your educational background and qualifications"
      onNext={() => setCurrentSection('skills')}
      onPrevious={() => setCurrentSection('experience')}
    >
      <ArrayField
        label="Education"
        items={resume.education}
        onAdd={addEducation}
        onRemove={removeEducation}
        addButtonText="Add Education"
        renderItem={(edu, index) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Institution" required>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                placeholder="University of Technology"
              />
            </FormField>

            <FormField label="Degree" required>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </FormField>

            <FormField label="Field of Study" required>
              <Input
                value={edu.field}
                onChange={(e) => updateEducation(index, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </FormField>

            <FormField label="Graduation Date" required>
              <Input
                value={edu.graduationDate}
                onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                placeholder="May 2020"
              />
            </FormField>

            <FormField label="GPA (Optional)">
              <Input
                value={edu.gpa}
                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </FormField>
          </div>
        )}
      />
    </FormSection>
  );

  const renderSkillsSection = () => (
    <FormSection
      title="Skills & Competencies"
      description="Highlight your technical and soft skills"
      onNext={() => setCurrentSection('preview')}
      onPrevious={() => setCurrentSection('education')}
    >
      <ArrayField
        label="Skills"
        items={resume.skills}
        onAdd={addSkill}
        onRemove={removeSkill}
        addButtonText="Add Skill"
        renderItem={(skill, index) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Skill Name" required>
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                placeholder="React, Leadership, Spanish, etc."
              />
            </FormField>

            <FormField label="Category" required>
              <Select value={skill.category} onValueChange={(value) => updateSkill(index, 'category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="soft">Soft Skills</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Proficiency Level">
              <Select value={skill.level} onValueChange={(value) => updateSkill(index, 'level', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>
        )}
      />
    </FormSection>
  );

  const renderPreviewSection = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
            <p className="text-gray-600">Review and customize your resume template</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                saveResumeData(resume);
                toast({
                  title: "Resume saved",
                  description: "Your resume has been saved successfully.",
                });
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  disabled={isExporting}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? 'Exporting...' : 'Export'}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('pdf')} className="flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('html')} className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Export as HTML
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('docx')} className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Export as DOCX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TemplateSelector
          selectedTemplate={resume.template}
          onTemplateSelect={(template) => updateResume('template', template)}
        />
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <div id="resume-preview">
          <ResumePreview resume={resume} />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button
          onClick={() => setCurrentSection('skills')}
          variant="outline"
          className="px-6"
        >
          Back to Edit
        </Button>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'personal':
        return renderPersonalInfoSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'skills':
        return renderSkillsSection();
      case 'preview':
        return renderPreviewSection();
      default:
        return renderPersonalInfoSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {currentSection !== 'preview' && (
        <Sidebar
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          completedSections={completedSections}
        />
      )}
      
      <div className={`flex-1 ${currentSection !== 'preview' ? 'p-8' : 'p-4'}`}>
        {renderCurrentSection()}
      </div>
    </div>
  );
};
