/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudentProfile {
  name: string;
  regNumber: string;
  studentId: string;
  studentClass: string; // e.g. "JSS 1", "SS 2"
  gender: string;
  academicYear: string;
  term: string;
  dob?: string;
  passportUrl?: string;
}

export interface SubjectScore {
  subjectName: string;
  ca1Score: number; // CA1, max 20
  ca2Score: number; // CA2, max 20
  examScore: number; // final exam, usually max 60
  totalScore: number; // sum, max 100
  grade: string; // A, B, C, D, E, F
  remarks: string; // Excellent, Credit, pass, fail etc
}

export interface StudentResult {
  studentProfile: StudentProfile;
  academicSession: string; // e.g. "2025/2026"
  term: string; // "1st Term" | "2nd Term" | "3rd Term"
  subjects: SubjectScore[];
  totalScore: number;
  averageScore: number;
  position: string; // e.g. "3rd out of 45"
  classStanding?: string; // e.g. "Promoted" or similar
  gradePoint?: string; // e.g. "4.5"
  accreditedGradeBracket?: string; // e.g. "Distinction"
  attendance: string; // e.g. "94/98 days"
  principalRemark: string;
  teacherRemark: string;
  isPublished: boolean;
}

export interface OngoingProject {
  id: string;
  image: string;
  title: string;
  description: string;
  budget: string;
  startDate: string;
  expectedCompletionDate: string;
  percentageCompletion: number;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'School Activities' | 'Sports' | 'Academics' | 'Graduation' | 'Cultural Events' | 'Projects' | string;
  type: 'image' | 'video';
  uploadDate: string;
  embedUrl?: string; // YouTube or Drive link if type is video
}

export interface NewsPost {
  id: string;
  title: string;
  summary: string;
  content: string; // rich text/markdown
  category: string; // Announcement | Event | Academic | Achievement
  date: string;
  imageUrl?: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  category: string; // Syllabus | Term Circular | Prospectus | Handbook | Assignment
  fileType: 'pdf' | 'docx' | 'xlsx';
  fileSize: string;
  uploadDate: string;
  downloadUrl: string; // mock blob download or text template
}

export interface SchoolStats {
  students: number;
  teachers: number;
  graduates: number;
  awards: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}
