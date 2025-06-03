
import { Resume } from '@/types/resume';

const STORAGE_KEY = 'resume_data';

export const saveResumeData = (resume: Partial<Resume>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  } catch (error) {
    console.error('Failed to save resume data:', error);
  }
};

export const loadResumeData = (): Partial<Resume> | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    return null;
  }
};

export const clearResumeData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear resume data:', error);
  }
};

export const getDefaultResume = (): Resume => ({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  template: 'modern'
});
