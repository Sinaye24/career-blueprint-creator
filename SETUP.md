
# Resume Builder - Setup Instructions

## Overview
This is a modern, responsive resume builder application built with React, TypeScript, and Tailwind CSS. It allows users to create professional resumes with multiple templates and export them in PDF, HTML, and DOCX formats.

## Technology Stack
- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage for auto-save functionality
- **Export Libraries**: 
  - jsPDF (PDF export)
  - html2canvas (PDF generation)
  - docx (Word document export)
  - file-saver (File download handling)

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd resume-builder
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ResumeBuilder.tsx
│   ├── ResumePreview.tsx
│   ├── Sidebar.tsx
│   ├── FormSection.tsx
│   └── TemplateSelector.tsx
├── pages/              # Page components
│   └── Builder.tsx
├── types/              # TypeScript type definitions
│   └── resume.ts
├── utils/              # Utility functions
│   ├── exportUtils.ts
│   └── resumeStorage.ts
├── hooks/              # Custom React hooks
└── lib/                # Library configurations
```

## Environment Configuration
No environment variables are required for basic functionality. The application runs entirely in the browser with local storage for data persistence.

## Features
- ✅ Multi-section resume building (Personal Info, Experience, Education, Skills)
- ✅ Three professional templates (Modern, Classic, Creative)
- ✅ Real-time preview
- ✅ Auto-save functionality
- ✅ Export to PDF, HTML, and DOCX formats
- ✅ Responsive design
- ✅ ATS-friendly templates

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

**Build Errors:**
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

**Export Issues:**
- PDF export requires a modern browser with canvas support
- DOCX export may take a few seconds for large resumes
- Ensure popup blockers are disabled for file downloads

**Performance:**
- The application is optimized for modern browsers
- Large resumes (10+ experiences) may take longer to export

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License.
