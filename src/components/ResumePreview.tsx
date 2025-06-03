
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  resume: Resume;
  className?: string;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume, className }) => {
  const { personalInfo, experience, education, skills, template } = resume;

  const templateStyles = {
    modern: {
      header: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
      accent: 'text-blue-600',
      section: 'border-l-4 border-blue-500'
    },
    classic: {
      header: 'bg-gray-800 text-white',
      accent: 'text-gray-800',
      section: 'border-b-2 border-gray-300'
    },
    creative: {
      header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      accent: 'text-purple-600',
      section: 'border-l-4 border-purple-500'
    }
  };

  const styles = templateStyles[template];

  return (
    <Card className={cn("bg-white shadow-lg overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="max-w-3xl mx-auto bg-white min-h-[1100px] relative">
          {/* Header */}
          <div className={cn("p-8", styles.header)}>
            <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-4 text-sm opacity-90">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Summary */}
            {personalInfo.summary && (
              <section>
                <h2 className={cn("text-xl font-bold mb-4 pb-2", styles.accent, styles.section)}>
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <section>
                <h2 className={cn("text-xl font-bold mb-4 pb-2", styles.accent, styles.section)}>
                  Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id || index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                          <p className={cn("font-medium", styles.accent)}>{exp.company}</p>
                          <p className="text-sm text-gray-600">{exp.location}</p>
                        </div>
                        <div className="text-sm text-gray-600 text-right">
                          <p>{exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}</p>
                        </div>
                      </div>
                      {exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className={cn("text-xl font-bold mb-4 pb-2", styles.accent, styles.section)}>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                        <p className={cn("font-medium", styles.accent)}>{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{edu.graduationDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section>
                <h2 className={cn("text-xl font-bold mb-4 pb-2", styles.accent, styles.section)}>
                  Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['technical', 'soft', 'language', 'other'].map(category => {
                    const categorySkills = skills.filter(skill => skill.category === category);
                    if (categorySkills.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h3 className="font-semibold text-gray-900 mb-2 capitalize">{category} Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill, index) => (
                            <span
                              key={skill.id || index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
