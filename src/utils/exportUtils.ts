
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { Resume } from '@/types/resume';

export const exportToPDF = async (elementId: string, filename: string = 'resume') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

export const exportToHTML = (resume: Resume, filename: string = 'resume') => {
  try {
    const { personalInfo, experience, education, skills, template } = resume;
    
    const templateStyles = {
      modern: {
        headerBg: 'linear-gradient(to right, #2563eb, #9333ea)',
        accentColor: '#2563eb',
        sectionBorder: 'border-left: 4px solid #2563eb'
      },
      classic: {
        headerBg: '#1f2937',
        accentColor: '#1f2937',
        sectionBorder: 'border-bottom: 2px solid #d1d5db'
      },
      creative: {
        headerBg: 'linear-gradient(to right, #9333ea, #ec4899)',
        accentColor: '#9333ea',
        sectionBorder: 'border-left: 4px solid #9333ea'
      }
    };

    const styles = templateStyles[template];

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #374151; }
        .resume { max-width: 800px; margin: 0 auto; background: white; }
        .header { background: ${styles.headerBg}; color: white; padding: 2rem; }
        .header h1 { font-size: 2rem; margin-bottom: 0.5rem; }
        .header .contact { display: flex; flex-wrap: wrap; gap: 1rem; opacity: 0.9; }
        .section { padding: 1.5rem 2rem; }
        .section h2 { color: ${styles.accentColor}; font-size: 1.25rem; margin-bottom: 1rem; padding-bottom: 0.5rem; ${styles.sectionBorder}; }
        .experience-item, .education-item { margin-bottom: 1.5rem; }
        .experience-item h3, .education-item h3 { font-size: 1.1rem; margin-bottom: 0.25rem; }
        .company, .institution { color: ${styles.accentColor}; font-weight: 600; }
        .date { color: #6b7280; font-size: 0.9rem; }
        .achievements { margin-top: 0.5rem; }
        .achievements li { margin-left: 1rem; margin-bottom: 0.25rem; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .skill-category h3 { font-size: 1rem; margin-bottom: 0.5rem; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-tag { background: #f3f4f6; color: #374151; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; }
        @media print { .resume { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <h1>${personalInfo.fullName || 'Your Name'}</h1>
            <div class="contact">
                ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
                ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
                ${personalInfo.location ? `<span>${personalInfo.location}</span>` : ''}
                ${personalInfo.linkedIn ? `<span>${personalInfo.linkedIn}</span>` : ''}
                ${personalInfo.website ? `<span>${personalInfo.website}</span>` : ''}
            </div>
        </div>

        ${personalInfo.summary ? `
        <div class="section">
            <h2>Professional Summary</h2>
            <p>${personalInfo.summary}</p>
        </div>
        ` : ''}

        ${experience.length > 0 ? `
        <div class="section">
            <h2>Professional Experience</h2>
            ${experience.map(exp => `
            <div class="experience-item">
                <h3>${exp.position}</h3>
                <div class="company">${exp.company}</div>
                <div class="date">${exp.startDate} - ${exp.isCurrentRole ? 'Present' : exp.endDate}</div>
                ${exp.location ? `<div class="location">${exp.location}</div>` : ''}
                ${exp.achievements.length > 0 ? `
                <ul class="achievements">
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${education.length > 0 ? `
        <div class="section">
            <h2>Education</h2>
            ${education.map(edu => `
            <div class="education-item">
                <h3>${edu.degree} in ${edu.field}</h3>
                <div class="institution">${edu.institution}</div>
                <div class="date">${edu.graduationDate}</div>
                ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${skills.length > 0 ? `
        <div class="section">
            <h2>Skills</h2>
            <div class="skills-grid">
                ${['technical', 'soft', 'language', 'other'].map(category => {
                  const categorySkills = skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return '';
                  return `
                  <div class="skill-category">
                      <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Skills</h3>
                      <div class="skill-tags">
                          ${categorySkills.map(skill => `<span class="skill-tag">${skill.name}</span>`).join('')}
                      </div>
                  </div>
                  `;
                }).join('')}
            </div>
        </div>
        ` : ''}
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    saveAs(blob, `${filename}.html`);
  } catch (error) {
    console.error('Error exporting HTML:', error);
    throw error;
  }
};

export const exportToDOCX = async (resume: Resume, filename: string = 'resume') => {
  try {
    const { personalInfo, experience, education, skills } = resume;

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header with name
          new Paragraph({
            children: [
              new TextRun({
                text: personalInfo.fullName || 'Your Name',
                bold: true,
                size: 32,
                color: "2563eb"
              })
            ],
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER
          }),

          // Contact information
          new Paragraph({
            children: [
              new TextRun({
                text: [
                  personalInfo.email,
                  personalInfo.phone,
                  personalInfo.location,
                  personalInfo.linkedIn,
                  personalInfo.website
                ].filter(Boolean).join(' • ')
              })
            ],
            alignment: AlignmentType.CENTER
          }),

          new Paragraph({ text: "" }), // Empty line

          // Professional Summary
          ...(personalInfo.summary ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Professional Summary",
                  bold: true,
                  size: 24,
                  color: "2563eb"
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({
              children: [new TextRun({ text: personalInfo.summary })]
            }),
            new Paragraph({ text: "" })
          ] : []),

          // Experience
          ...(experience.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Professional Experience",
                  bold: true,
                  size: 24,
                  color: "2563eb"
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            ...experience.flatMap(exp => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.position,
                    bold: true,
                    size: 22
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.company} | ${exp.startDate} - ${exp.isCurrentRole ? 'Present' : exp.endDate}`,
                    italics: true,
                    color: "2563eb"
                  })
                ]
              }),
              ...(exp.location ? [new Paragraph({
                children: [new TextRun({ text: exp.location })]
              })] : []),
              ...exp.achievements.map(achievement => 
                new Paragraph({
                  children: [new TextRun({ text: `• ${achievement}` })]
                })
              ),
              new Paragraph({ text: "" })
            ])
          ] : []),

          // Education
          ...(education.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Education",
                  bold: true,
                  size: 24,
                  color: "2563eb"
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            ...education.flatMap(edu => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.degree} in ${edu.field}`,
                    bold: true,
                    size: 22
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${edu.institution} | ${edu.graduationDate}`,
                    italics: true,
                    color: "2563eb"
                  })
                ]
              }),
              ...(edu.gpa ? [new Paragraph({
                children: [new TextRun({ text: `GPA: ${edu.gpa}` })]
              })] : []),
              new Paragraph({ text: "" })
            ])
          ] : []),

          // Skills
          ...(skills.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Skills",
                  bold: true,
                  size: 24,
                  color: "2563eb"
                })
              ],
              heading: HeadingLevel.HEADING_1
            }),
            ...['technical', 'soft', 'language', 'other'].flatMap(category => {
              const categorySkills = skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return [];
              
              return [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${category.charAt(0).toUpperCase() + category.slice(1)} Skills:`,
                      bold: true
                    })
                  ]
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: categorySkills.map(skill => skill.name).join(', ')
                    })
                  ]
                }),
                new Paragraph({ text: "" })
              ];
            })
          ] : [])
        ]
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `${filename}.docx`);
  } catch (error) {
    console.error('Error exporting DOCX:', error);
    throw error;
  }
};
