/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentResult, OngoingProject, GalleryItem, NewsPost, LegalDocument, SchoolStats } from './types';

export const INITIAL_STATS: SchoolStats = {
  students: 750,
  teachers: 48,
  graduates: 1280,
  awards: 24,
};

export const INITIAL_PROJECTS: OngoingProject[] = [
  {
    id: "proj_1",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    title: "ICT Centre Development",
    description: "Equipping a state-of-the-art 50-seater computer laboratory with fast fiber internet access, digital projectors, and advanced software tools to promote STEM education.",
    budget: "₦12,500,000",
    startDate: "2026-01-10",
    expectedCompletionDate: "2026-08-15",
    percentageCompletion: 85,
  },
  {
    id: "proj_2",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800", // Let's use clean fallbacks
    title: "Chemistry Laboratory Upgrade",
    description: "Renovation of the core chemistry practical units, installation of modern exhaust hoods, secure gas supply pipes, and digital measurement scales.",
    budget: "₦6,800,000",
    startDate: "2026-03-05",
    expectedCompletionDate: "2026-07-20",
    percentageCompletion: 95,
  },
  {
    id: "proj_3",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    title: "Library Rehabilitation & E-Learning Portal",
    description: "Transitioning our traditional book library into a hybrid node: archiving print copies of books, setting up digital cataloging tablets, and buying international journal licenses.",
    budget: "₦8,700,000",
    startDate: "2026-02-18",
    expectedCompletionDate: "2026-09-01",
    percentageCompletion: 60,
  },
  {
    id: "proj_4",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800",
    title: "Classroom Modernization Phase III",
    description: "Painting, replacing glass panels, installing functional solar power backing sockets and energy-saving high-lumen fans in Senior Secondary classrooms.",
    budget: "₦10,400,000",
    startDate: "2026-04-10",
    expectedCompletionDate: "2026-10-30",
    percentageCompletion: 45,
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    url: "https://i.ibb.co/Fkw6xsct/hga-hs001.jpg",
    title: "Holy Ghost Academy Custom Campus Grounds",
    category: "Campus",
    type: "image",
    uploadDate: "2026-05-12",
  },
  {
    id: "gal_2",
    url: "https://i.ibb.co/p5PJNbK/hga005.jpg",
    title: "Holy Ghost Academy Administrative Blocks",
    category: "Campus",
    type: "image",
    uploadDate: "2026-04-20",
  },
  {
    id: "gal_3",
    url: "https://i.ibb.co/9kHqyL5C/hga003.jpg",
    title: "Advanced Classrooms and STEM Facilities",
    category: "Academics",
    type: "image",
    uploadDate: "2026-05-30",
  },
  {
    id: "gal_4",
    url: "https://i.ibb.co/cSwL02br/hga002.jpg",
    title: "Bright Classrooms & Student Seating Blocks",
    category: "Academics",
    type: "image",
    uploadDate: "2026-03-14",
  },
  {
    id: "gal_5",
    url: "https://i.ibb.co/S7KjD67V/hga001.jpg",
    title: "Spacious Hallways & Academic Environment",
    category: "Campus",
    type: "image",
    uploadDate: "2025-07-18",
  },
  {
    id: "gal_video_1",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    title: "Holy Ghost Academy Campus Virtual Tour",
    category: "School Activities",
    type: "video",
    uploadDate: "2026-06-01",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Fallback YouTube link
  }
];

export const INITIAL_NEWS: NewsPost[] = [
  {
    id: "news_1",
    title: "Admission Requirements Formally Released for 2026/2027 Session",
    summary: "Holy Ghost Academy, Awka is pleased to invite parents to submit applications for JSS 1 and SS 1 admission lists.",
    content: "We are officially accepting student registrations for entrance examinations. Selection will proceed strictly via our custom holistic guidelines which analyze performance on math, english, moral character essays, and oral interview matrices. Parents can download registration packets from our Portal's downloads node.",
    category: "Announcement",
    date: "2026-06-15",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "news_2",
    title: "HGASS Claims First Position in Anambra State Mathematics Olympiad",
    summary: "Our senior mathematical squad emerged victorious at the dual-round competitive math event held last weekend.",
    content: "The academic board congratulates Master Chukwudi Obinna and Miss Chisom Nwankwor for bagging gold awards at the Anambra Mathematics Olympiad. Supported by outstanding tutorial mentoring from our STEM instructors lead by Mr. Gabriel Okafor.",
    category: "Achievement",
    date: "2026-05-18",
    imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "news_3",
    title: "Upcoming Parent-Teacher Association (PTA) Conference Agenda",
    summary: "Join us this coming Friday to audit school safety, budget frameworks, and digital assessment trackers.",
    content: "Dear Parents and Guardians, the general council cordially invites your voice to the strategic review meeting scheduled at the School Assembly Hall starting 10:00 AM. Key agendas center around the solar transformation initiative, standard computer licensing fees, and Term 3 result reviews.",
    category: "Event",
    date: "2026-06-20",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_DOCUMENTS: LegalDocument[] = [
  {
    id: "doc_1",
    name: "HGASS-Prospectus-2026.pdf",
    category: "Prospectus",
    fileType: "pdf",
    fileSize: "2.4 MB",
    uploadDate: "2026-05-01",
    downloadUrl: "#"
  },
  {
    id: "doc_2",
    name: "JSS-General-Mathematics-Syllabus.pdf",
    category: "Syllabus",
    fileType: "pdf",
    fileSize: "1.1 MB",
    uploadDate: "2026-04-12",
    downloadUrl: "#"
  },
  {
    id: "doc_3",
    name: "Term-Circular-Third-Term-Updates.docx",
    category: "Term Circular",
    fileType: "docx",
    fileSize: "450 KB",
    uploadDate: "2026-06-18",
    downloadUrl: "#"
  },
  {
    id: "doc_4",
    name: "Student-Conduct-And-Moral-Handbook-2026.pdf",
    category: "Handbook",
    fileType: "pdf",
    fileSize: "3.2 MB",
    uploadDate: "2026-01-15",
    downloadUrl: "#"
  }
];

export const INITIAL_RESULTS: StudentResult[] = [
  {
    studentProfile: {
      name: "Forster Anarado",
      regNumber: "HGASS/2025/001",
      studentId: "HGASS-001",
      studentClass: "SS 2",
      gender: "Male",
      academicYear: "2025/2026",
      term: "2nd Term",
      passportUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
    },
    academicSession: "2025/2026",
    term: "2nd Term",
    subjects: [
      { subjectName: "Mathematics", ca1Score: 36 / 2, ca2Score: 36 - (36 / 2), examScore: 58, totalScore: 94, grade: "A", remarks: "Distinction" },
      { subjectName: "Physics", ca1Score: 34 / 2, ca2Score: 34 - (34 / 2), examScore: 54, totalScore: 88, grade: "A", remarks: "Distinction" },
      { subjectName: "Chemistry", ca1Score: 32 / 2, ca2Score: 32 - (32 / 2), examScore: 55, totalScore: 87, grade: "A", remarks: "Distinction" },
      { subjectName: "Biology", ca1Score: 35 / 2, ca2Score: 35 - (35 / 2), examScore: 50, totalScore: 85, grade: "A", remarks: "Excellent" },
      { subjectName: "Computer Science", ca1Score: 38 / 2, ca2Score: 38 - (38 / 2), examScore: 59, totalScore: 97, grade: "A", remarks: "Distinction" },
      { subjectName: "Economics", ca1Score: 30 / 2, ca2Score: 30 - (30 / 2), examScore: 48, totalScore: 78, grade: "B", remarks: "Very Good" },
      { subjectName: "Civic Education", ca1Score: 35 / 2, ca2Score: 35 - (35 / 2), examScore: 50, totalScore: 85, grade: "A", remarks: "Excellent" },
      { subjectName: "Agricultural Science", ca1Score: 31 / 2, ca2Score: 31 - (31 / 2), examScore: 49, totalScore: 80, grade: "A", remarks: "Excellent" },
      { subjectName: "English Language", ca1Score: 32 / 2, ca2Score: 32 - (32 / 2), examScore: 51, totalScore: 83, grade: "A", remarks: "Excellent" }
    ],
    totalScore: 777,
    averageScore: 86.3,
    position: "1st out of 42",
    attendance: "88 out of 90 days",
    teacherRemark: "Forster is exceptional, focused, and demonstrates exemplary moral codes. Keep it up!",
    principalRemark: "An outstanding academic result from a highly disciplined and bright student.",
    isPublished: true
  },
  {
    studentProfile: {
      name: "Chisom Abigail Obi",
      regNumber: "HGASS/2025/002",
      studentId: "HGASS-002",
      studentClass: "SS 1",
      gender: "Female",
      academicYear: "2025/2026",
      term: "2nd Term",
      passportUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
    },
    academicSession: "2025/2026",
    term: "2nd Term",
    subjects: [
      { subjectName: "Mathematics", ca1Score: 32 / 2, ca2Score: 32 - (32 / 2), examScore: 52, totalScore: 84, grade: "A", remarks: "Excellent" },
      { subjectName: "Physics", ca1Score: 28 / 2, ca2Score: 28 - (28 / 2), examScore: 44, totalScore: 72, grade: "B", remarks: "Very Good" },
      { subjectName: "Chemistry", ca1Score: 30 / 2, ca2Score: 30 - (30 / 2), examScore: 46, totalScore: 76, grade: "B", remarks: "Very Good" },
      { subjectName: "Biology", ca1Score: 33 / 2, ca2Score: 33 - (33 / 2), examScore: 52, totalScore: 85, grade: "A", remarks: "Excellent" },
      { subjectName: "Computer Science", ca1Score: 34 / 2, ca2Score: 34 - (34 / 2), examScore: 53, totalScore: 87, grade: "A", remarks: "Excellent" },
      { subjectName: "English Language", ca1Score: 36 / 2, ca2Score: 36 - (36 / 2), examScore: 51, totalScore: 87, grade: "A", remarks: "Excellent" },
      { subjectName: "Government", ca1Score: 34 / 2, ca2Score: 34 - (34 / 2), examScore: 48, totalScore: 82, grade: "A", remarks: "Excellent" }
    ],
    totalScore: 573,
    averageScore: 81.8,
    position: "3rd out of 38",
    attendance: "85 out of 90 days",
    teacherRemark: "An intelligent student with highly dependable study frameworks.",
    principalRemark: "Very impressive response, she represents a source of academic pride.",
    isPublished: true
  },
  {
    studentProfile: {
      name: "Kenechukwu Daniel Okafor",
      regNumber: "HGASS/2025/003",
      studentId: "HGASS-003",
      studentClass: "JSS 2",
      gender: "Male",
      academicYear: "2025/2026",
      term: "2nd Term",
      passportUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
    },
    academicSession: "2025/2026",
    term: "2nd Term",
    subjects: [
      { subjectName: "Mathematics", ca1Score: 30 / 2, ca2Score: 30 - (30 / 2), examScore: 45, totalScore: 75, grade: "B", remarks: "Very Good" },
      { subjectName: "English Language", ca1Score: 28 / 2, ca2Score: 28 - (28 / 2), examScore: 48, totalScore: 76, grade: "B", remarks: "Very Good" },
      { subjectName: "CRS", ca1Score: 34 / 2, ca2Score: 34 - (34 / 2), examScore: 52, totalScore: 86, grade: "A", remarks: "Excellent" },
      { subjectName: "Civic Education", ca1Score: 32 / 2, ca2Score: 32 - (32 / 2), examScore: 48, totalScore: 80, grade: "A", remarks: "Excellent" },
      { subjectName: "Basic Technology", ca1Score: 25 / 2, ca2Score: 25 - (25 / 2), examScore: 40, totalScore: 65, grade: "C", remarks: "Good" },
      { subjectName: "Basic Science", ca1Score: 28 / 2, ca2Score: 28 - (28 / 2), examScore: 42, totalScore: 70, grade: "B", remarks: "Very Good" },
      { subjectName: "Computer Science", ca1Score: 31 / 2, ca2Score: 31 - (31 / 2), examScore: 48, totalScore: 79, grade: "B", remarks: "Very Good" }
    ],
    totalScore: 531,
    averageScore: 75.8,
    position: "5th out of 45",
    attendance: "89 out of 90 days",
    teacherRemark: "Kenechukwu is persistent and eager to grasp difficult technological models.",
    principalRemark: "A solid record of character and learning. Keep setting standard goals.",
    isPublished: true
  }
];

export const MANAGEMENT_TEAM = [
  {
    name: "Engr. ThankGod Ndibe",
    role: "Principal",
    qualifications: "B.Engr, M.Engr",
    message: "Welcome to Holy Ghost Academy Secondary School, Awka — a home where knowledge, faith, and discipline merge to build high-capacity leaders of tomorrow. Our curriculum is tailored to expand creative critical thinking and absolute moral responsibility under God.",
    image: "https://i.ibb.co/pj9SBTbc/cccg.jpg"
  },
  {
    name: "Jacinta Onyinye",
    role: "Examination Coordinator I",
    qualifications: "HEALTH SIC",
    message: "We maintain a rigorous evaluation framework, ensuring every student discovers their latent capacity through active STEM research, debates, and literature exposures.",
    image: "https://i.ibb.co/k2XSs63y/onyi112.jpg"
  },
  {
    name: "Humble Favour",
    role: "Examination Coordinator II",
    qualifications: "B.A(MUSIC)",
    message: "Discipline is the cornerstone of academic mastery. Under our guidance, students learn neatness, punctuality, and peer collaboration frameworks.",
    image: "https://i.ibb.co/xqvcdpPp/humble-111.jpg"
  }
];

export const SUBJECTS_GUIDE = {
  jss: [
    { name: "Mathematics", desc: "Foundational arithmetic, algebra, geometric equations, and practical reasoning." },
    { name: "English Language", desc: "Lexis, structural grammar, reading comprehension, and speech practice." },
    { name: "Christian Religious Studies (CRS)", desc: "Old and New Testament moral lessons and holy character formation." },
    { name: "Civic Education", desc: "Understanding domestic rights, national constitutions, and moral responsibilities." },
    { name: "Agricultural Science", desc: "Introduction to soil science, crop propagation, and basic husbandry." },
    { name: "Physical and Health Education (PHE)", desc: "Anatomy basis, nutrition values, physical athletics, and healthy lifestyle guidelines." },
    { name: "CCA (Cultural and Creative Arts)", desc: "Fine arts, drawing principles, drama play frameworks, and indigenous craft methods." },
    { name: "Basic Technology", desc: "Beginning drawing instruments, material definitions, and simple electronics elements." },
    { name: "Basic Science", desc: "Introduction to physical laws, chemical classifications, and biological environments." },
    { name: "Business Studies", desc: "Introduction to accounting systems, typing speeds, entrepreneurship, and office roles." },
    { name: "Computer Science", desc: "General information systems, operational office suits, and digital citizenship rules." }
  ],
  ss: [
    { name: "Mathematics", desc: "Trigonometry bounds, differential calculus bases, probability modeling, and logarithmic transformations." },
    { name: "English Language", desc: "Advanced grammar mastery, essay composition forms, oral presentations, and comprehension analysis of complex texts." },
    { name: "Physics", desc: "Thermodynamics, mechanical kinetic equations, electromagnetic induction, and optics properties." },
    { name: "Chemistry", desc: "Stoichiometry calculus, organic chemistry, reaction rates, and chemical qualitative analyzers." },
    { name: "Biology", desc: "Cellular structures, genetic inheritance mechanisms, ecological systems, and respiratory pathways." },
    { name: "Agricultural Science", desc: "Soil mechanics, animal pathology, economics of farming, and pest control guidelines." },
    { name: "Igbo", desc: "Indigenous language phonetics, cultural heritage literature, grammar structure, and creative storytelling in Igbo." },
    { name: "Literature-in-English", desc: "Critiquing classical drama books, analyzing poetic meters, post-colonial essays, and world theatre plays." },
    { name: "Government", desc: "Historical constitutional amendments, political theory branches, and comparative foreign diplomacy formats." },
    { name: "Christian Religious Studies (CRS)", desc: "Christian ethical standards, prophets of old, and application of Christ-centered leadership in social frameworks." },
    { name: "Civic Education", desc: "Public administration pillars, rule of law, resisting social anomalies, and community cohesion targets." },
    { name: "Economics", desc: "Micro price indexes, macroeconomic policy formulas, market dynamics, and national budgeting rules." },
    { name: "Commerce", desc: "Global retail channels, shipping terms, insurance definitions, banking setups, and securities markets." }
  ]
};
