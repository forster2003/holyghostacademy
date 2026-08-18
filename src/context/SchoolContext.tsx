/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentResult, 
  OngoingProject, 
  GalleryItem, 
  NewsPost, 
  LegalDocument, 
  SchoolStats, 
  ContactMessage 
} from '../types';
import { 
  INITIAL_STATS, 
  INITIAL_PROJECTS, 
  INITIAL_GALLERY, 
  INITIAL_NEWS, 
  INITIAL_DOCUMENTS, 
  INITIAL_RESULTS 
} from '../data';
import { parseGradebookCSV } from '../utils/csvUtils';
import { supabase, isSupabaseConfigured, isUsingCustomSupabase, activeSupabaseUrl } from '../supabase';

interface SchoolContextType {
  stats: SchoolStats;
  projects: OngoingProject[];
  gallery: GalleryItem[];
  news: NewsPost[];
  documents: LegalDocument[];
  results: StudentResult[];
  messages: ContactMessage[];
  isAdmin: boolean;
  isSupabaseLoading: boolean;
  supabaseConnectionStatus: 'unchecked' | 'connected' | 'failed' | 'unconfigured';
  isUsingCustomSupabase: boolean;
  activeSupabaseUrl: string;
  
  // Auth
  login: (password: string) => boolean;
  logout: () => void;

  // Stats Actions
  updateStats: (newStats: SchoolStats) => void;

  // News Actions
  addNews: (post: Omit<NewsPost, 'id'>) => void;
  editNews: (id: string, post: Partial<NewsPost>) => void;
  deleteNews: (id: string) => void;

  // Project Actions
  addProject: (proj: Omit<OngoingProject, 'id'>) => void;
  editProject: (id: string, proj: Partial<OngoingProject>) => void;
  deleteProject: (id: string) => void;

  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'uploadDate'>) => void;
  editGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Document Actions
  addDocument: (doc: Omit<LegalDocument, 'id' | 'uploadDate'>) => void;
  editDocument: (id: string, doc: Partial<LegalDocument>) => void;
  deleteDocument: (id: string) => void;

  // Results Actions
  addResult: (result: StudentResult) => void;
  editResult: (regNumber: string, session: string, term: string, updatedResult: Partial<StudentResult>) => void;
  deleteResult: (regNumber: string, session: string, term: string) => void;
  importResultsCSV: (csvContent: string) => { success: boolean; count: number; message: string };
  syncAllResultsToSupabase: () => Promise<{ success: boolean; message: string }>;

  // Message Actions
  sendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<SchoolStats>(() => {
    const saved = localStorage.getItem('hgass_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [projects, setProjects] = useState<OngoingProject[]>(() => {
    const saved = localStorage.getItem('hgass_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('hgass_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If it contains the old placeholder unsplash images, reset to INITIAL_GALLERY
        const hasPlaceholders = parsed.some((item: any) => item.url && item.url.includes('images.unsplash.com') && item.id !== 'gal_video_1');
        if (hasPlaceholders) {
          return INITIAL_GALLERY;
        }
        return parsed;
      } catch (e) {
        return INITIAL_GALLERY;
      }
    }
    return INITIAL_GALLERY;
  });

  const [news, setNews] = useState<NewsPost[]>(() => {
    const saved = localStorage.getItem('hgass_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [documents, setDocuments] = useState<LegalDocument[]>(() => {
    const saved = localStorage.getItem('hgass_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [results, setResults] = useState<StudentResult[]>(() => {
    const saved = localStorage.getItem('hgass_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('hgass_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('hgass_is_admin') === 'true';
  });

  const [isSupabaseLoading, setIsSupabaseLoading] = useState<boolean>(false);
  const [supabaseConnectionStatus, setSupabaseConnectionStatus] = useState<'unchecked' | 'connected' | 'failed' | 'unconfigured'>('unchecked');

  // Load all data from Supabase on component mount if configured
  useEffect(() => {
    const loadDataFromSupabase = async () => {
      if (!isSupabaseConfigured) {
        setSupabaseConnectionStatus('unconfigured');
        return;
      }
      
      setIsSupabaseLoading(true);
      try {
        // 1. Fetch Stats
        const { data: statsData, error: statsError } = await supabase.from('school_stats').select('*').single();
        if (!statsError && statsData) {
          setStats({
            students: statsData.students,
            teachers: statsData.teachers,
            graduates: statsData.graduates,
            awards: statsData.awards
          });
        }

        // 2. Fetch Projects
        const { data: projectsData, error: projError } = await supabase.from('ongoing_projects').select('*').order('id', { ascending: false });
        if (!projError && projectsData) {
          const fetchedProjects = projectsData.map((p: any) => ({
            id: String(p.id),
            title: p.title,
            description: p.description || '',
            budget: p.budget || '₦0',
            percentageCompletion: p.percentage_completion || 0,
            startDate: p.start_date || '',
            expectedCompletionDate: p.expected_completion_date || '',
            image: p.image || ''
          }));
          setProjects(fetchedProjects);
        }

        // 3. Fetch Gallery
        const { data: galleryData, error: galError } = await supabase.from('gallery_items').select('*').order('id', { ascending: false });
        if (!galError && galleryData) {
          const fetchedGallery = galleryData.map((g: any) => ({
            id: String(g.id),
            url: g.url,
            title: g.title,
            category: g.category,
            type: g.type,
            embedUrl: g.embed_url || undefined,
            uploadDate: g.upload_date || ''
          }));
          setGallery(fetchedGallery);
        }

        // 4. Fetch News
        const { data: newsData, error: newsError } = await supabase.from('news_posts').select('*').order('id', { ascending: false });
        if (!newsError && newsData) {
          const fetchedNews = newsData.map((n: any) => ({
            id: String(n.id),
            title: n.title,
            summary: n.summary || '',
            content: n.content,
            category: n.category,
            date: n.date || '',
            imageUrl: n.image_url || undefined
          }));
          setNews(fetchedNews);
        }

        // 5. Fetch Documents
        const { data: docsData, error: docsError } = await supabase.from('legal_documents').select('*').order('id', { ascending: false });
        if (!docsError && docsData) {
          const fetchedDocs = docsData.map((d: any) => ({
            id: String(d.id),
            name: d.name,
            category: d.category,
            fileType: d.file_type,
            fileSize: d.file_size || '1.0 MB',
            downloadUrl: d.download_url || '#',
            uploadDate: d.upload_date || ''
          }));
          setDocuments(fetchedDocs);
        }

        // 6. Fetch Student Results with Profiles & Scores (Join)
        const { data: resultsData, error: resError } = await supabase
          .from('student_results')
          .select(`
            *,
            student_profiles:reg_number (*),
            subject_scores (
              subject_name,
              ca1_score,
              ca2_score,
              exam_score,
              total_score,
              grade,
              remarks
            )
          `);
        
        if (!resError && resultsData) {
          const fetchedResults: StudentResult[] = resultsData.map((row: any) => {
            const profile = row.student_profiles || {};
            const subjects = row.subject_scores || [];
            return {
              studentProfile: {
                name: profile.name || '',
                regNumber: profile.reg_number || row.reg_number,
                studentId: profile.student_id || '',
                studentClass: profile.student_class || '',
                gender: profile.gender || '',
                academicYear: profile.academic_year || '',
                term: profile.term || '',
                passportUrl: profile.passport_url || undefined
              },
              academicSession: row.academic_session,
              term: row.term,
              totalScore: Number(row.total_score),
              averageScore: Number(row.average_score),
              position: row.position || '',
              classStanding: row.class_standing || undefined,
              gradePoint: row.grade_point || undefined,
              attendance: row.attendance || '',
              principalRemark: row.principal_remark || '',
              teacherRemark: row.teacher_remark || '',
              isPublished: row.is_published,
              subjects: subjects.map((sub: any) => ({
                subjectName: sub.subject_name,
                ca1Score: Number(sub.ca1Score || sub.ca1_score),
                ca2Score: Number(sub.ca2Score || sub.ca2_score),
                examScore: Number(sub.examScore || sub.exam_score),
                totalScore: Number(sub.totalScore || sub.total_score),
                grade: sub.grade,
                remarks: sub.remarks
              }))
            };
          });
          setResults(fetchedResults);
        }

        // 7. Fetch messages
        const { data: msgData, error: msgError } = await supabase.from('contact_messages').select('*').order('id', { ascending: false });
        if (!msgError && msgData) {
          const fetchedMessages = msgData.map((m: any) => ({
            id: String(m.id),
            name: m.name,
            email: m.email,
            phone: m.phone || '',
            message: m.message,
            date: m.date || '',
            read: m.read || false
          }));
          setMessages(fetchedMessages);
        }

        setSupabaseConnectionStatus('connected');
      } catch (e) {
        console.error('Failed to load data from Supabase:', e);
        setSupabaseConnectionStatus('failed');
      } finally {
        setIsSupabaseLoading(false);
      }
    };

    loadDataFromSupabase();
  }, []);

  // Sync state to local storage when changed
  useEffect(() => {
    localStorage.setItem('hgass_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('hgass_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('hgass_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('hgass_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('hgass_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('hgass_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('hgass_messages', JSON.stringify(messages));
  }, [messages]);

  // Auth Operations
  const login = (password: string): boolean => {
    if (password === 'HGASS@25') {
      setIsAdmin(true);
      localStorage.setItem('hgass_is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('hgass_is_admin');
  };

  // Stats Operations
  const updateStats = (newStats: SchoolStats) => {
    setStats(newStats);
    if (isSupabaseConfigured) {
      supabase.from('school_stats').update({
        students: newStats.students,
        teachers: newStats.teachers,
        graduates: newStats.graduates,
        awards: newStats.awards,
        updated_at: new Date().toISOString()
      }).eq('id', 1).then(({ error }) => {
        if (error) console.error('Supabase stats update error:', error);
      });
    }
  };

  // News Operations
  const addNews = (post: Omit<NewsPost, 'id'>) => {
    const newPost: NewsPost = {
      ...post,
      id: `news_${Date.now()}`
    };
    setNews(prev => [newPost, ...prev]);
    if (isSupabaseConfigured) {
      supabase.from('news_posts').insert({
        title: post.title,
        summary: post.summary,
        content: post.content,
        category: post.category,
        image_url: post.imageUrl || null,
        date: post.date || new Date().toISOString().split('T')[0]
      }).then(({ error }) => {
        if (error) console.error('Supabase addNews error:', error);
      });
    }
  };

  const editNews = (id: string, updatedFields: Partial<NewsPost>) => {
    setNews(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('news_', ''));
      if (!isNaN(numericId)) {
        supabase.from('news_posts').update({
          title: updatedFields.title,
          summary: updatedFields.summary,
          content: updatedFields.content,
          category: updatedFields.category,
          image_url: updatedFields.imageUrl || null,
          date: updatedFields.date
        }).eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase editNews error:', error);
        });
      }
    }
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('news_', ''));
      if (!isNaN(numericId)) {
        supabase.from('news_posts').delete().eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase deleteNews error:', error);
        });
      }
    }
  };

  // Project Operations
  const addProject = (proj: Omit<OngoingProject, 'id'>) => {
    const newProj: OngoingProject = {
      ...proj,
      id: `proj_${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
    if (isSupabaseConfigured) {
      supabase.from('ongoing_projects').insert({
        title: proj.title,
        description: proj.description || '',
        budget: proj.budget || '₦0',
        percentage_completion: proj.percentageCompletion || 0,
        start_date: proj.startDate || '',
        expected_completion_date: proj.expectedCompletionDate || '',
        image: proj.image || ''
      }).then(({ error }) => {
        if (error) console.error('Supabase addProject error:', error);
      });
    }
  };

  const editProject = (id: string, updatedFields: Partial<OngoingProject>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('proj_', ''));
      if (!isNaN(numericId)) {
        supabase.from('ongoing_projects').update({
          title: updatedFields.title,
          description: updatedFields.description,
          budget: updatedFields.budget,
          percentage_completion: updatedFields.percentageCompletion,
          start_date: updatedFields.startDate,
          expected_completion_date: updatedFields.expectedCompletionDate,
          image: updatedFields.image
        }).eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase editProject error:', error);
        });
      }
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('proj_', ''));
      if (!isNaN(numericId)) {
        supabase.from('ongoing_projects').delete().eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase deleteProject error:', error);
        });
      }
    }
  };

  // Gallery Operations
  const addGalleryItem = (item: Omit<GalleryItem, 'id' | 'uploadDate'>) => {
    const uploadDate = new Date().toISOString().split('T')[0];
    const newItem: GalleryItem = {
      ...item,
      id: `gal_${Date.now()}`,
      uploadDate
    };
    setGallery(prev => [newItem, ...prev]);
    if (isSupabaseConfigured) {
      supabase.from('gallery_items').insert({
        url: item.url,
        title: item.title,
        category: item.category,
        type: item.type,
        embed_url: item.embedUrl || null,
        upload_date: uploadDate
      }).then(({ error }) => {
        if (error) console.error('Supabase addGalleryItem error:', error);
      });
    }
  };

  const editGalleryItem = (id: string, updatedFields: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(item => item.id === id ? { ...item, ...updatedFields } : item));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('gal_', ''));
      if (!isNaN(numericId)) {
        supabase.from('gallery_items').update({
          url: updatedFields.url,
          title: updatedFields.title,
          category: updatedFields.category,
          type: updatedFields.type,
          embed_url: updatedFields.embedUrl,
          upload_date: updatedFields.uploadDate
        }).eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase editGalleryItem error:', error);
        });
      }
    }
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('gal_', ''));
      if (!isNaN(numericId)) {
        supabase.from('gallery_items').delete().eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase deleteGalleryItem error:', error);
        });
      }
    }
  };

  // Document Operations
  const addDocument = (doc: Omit<LegalDocument, 'id' | 'uploadDate'>) => {
    const uploadDate = new Date().toISOString().split('T')[0];
    const newDoc: LegalDocument = {
      ...doc,
      id: `doc_${Date.now()}`,
      uploadDate
    };
    setDocuments(prev => [newDoc, ...prev]);
    if (isSupabaseConfigured) {
      supabase.from('legal_documents').insert({
        name: doc.name,
        category: doc.category,
        file_type: doc.fileType,
        file_size: doc.fileSize || '1.0 MB',
        download_url: doc.downloadUrl || '#',
        upload_date: uploadDate
      }).then(({ error }) => {
        if (error) console.error('Supabase addDocument error:', error);
      });
    }
  };

  const editDocument = (id: string, updatedFields: Partial<LegalDocument>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updatedFields } : d));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('doc_', ''));
      if (!isNaN(numericId)) {
        supabase.from('legal_documents').update({
          name: updatedFields.name,
          category: updatedFields.category,
          file_type: updatedFields.fileType,
          file_size: updatedFields.fileSize,
          download_url: updatedFields.downloadUrl,
          upload_date: updatedFields.uploadDate
        }).eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase editDocument error:', error);
        });
      }
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('doc_', ''));
      if (!isNaN(numericId)) {
        supabase.from('legal_documents').delete().eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase deleteDocument error:', error);
        });
      }
    }
  };

  // Result Operations
  const addResult = (result: StudentResult) => {
    setResults(prev => {
      const filtered = prev.filter(r => 
        !(r.studentProfile.regNumber === result.studentProfile.regNumber && 
          r.academicSession === result.academicSession && 
          r.term === result.term)
      );
      return [result, ...filtered];
    });

    if (isSupabaseConfigured) {
      supabase.from('student_profiles').upsert({
        reg_number: result.studentProfile.regNumber,
        name: result.studentProfile.name,
        student_id: result.studentProfile.studentId,
        student_class: result.studentProfile.studentClass,
        gender: result.studentProfile.gender,
        academic_year: result.studentProfile.academicYear,
        term: result.term,
        passport_url: result.studentProfile.passportUrl || null
      }).then(() => {
        supabase.from('student_results').upsert({
          reg_number: result.studentProfile.regNumber,
          academic_session: result.academicSession,
          term: result.term,
          total_score: result.totalScore,
          average_score: result.averageScore,
          position: result.position,
          class_standing: result.classStanding || 'Promoted',
          grade_point: result.gradePoint || null,
          attendance: result.attendance,
          principal_remark: result.principalRemark,
          teacher_remark: result.teacherRemark,
          is_published: result.isPublished
        }, {
          onConflict: 'reg_number,academic_session,term'
        }).select().single().then(({ data, error }) => {
          if (!error && data) {
            supabase.from('subject_scores').delete().eq('result_id', data.id).then(() => {
              if (result.subjects && result.subjects.length > 0) {
                const scoresToInsert = result.subjects.map(s => ({
                  result_id: data.id,
                  subject_name: s.subjectName,
                  ca1_score: s.ca1Score,
                  ca2_score: s.ca2Score,
                  exam_score: s.examScore,
                  total_score: s.totalScore,
                  grade: s.grade,
                  remarks: s.remarks
                }));
                supabase.from('subject_scores').insert(scoresToInsert).then(({ error: scErr }) => {
                  if (scErr) console.error('Supabase insert scores error:', scErr);
                });
              }
            });
          } else if (error) {
            console.error('Supabase upsert result error:', error);
          }
        });
      });
    }
  };

  const editResult = (regNumber: string, session: string, term: string, updatedFields: Partial<StudentResult>) => {
    let finalResult: StudentResult | undefined;
    setResults(prev => prev.map(r => {
      if (r.studentProfile.regNumber === regNumber && r.academicSession === session && r.term === term) {
        const nr = {
          ...r,
          ...updatedFields,
          studentProfile: updatedFields.studentProfile ? { ...r.studentProfile, ...updatedFields.studentProfile } : r.studentProfile
        };
        finalResult = nr;
        return nr;
      }
      return r;
    }));

    if (isSupabaseConfigured && finalResult) {
      const result = finalResult;
      supabase.from('student_profiles').upsert({
        reg_number: result.studentProfile.regNumber,
        name: result.studentProfile.name,
        student_id: result.studentProfile.studentId,
        student_class: result.studentProfile.studentClass,
        gender: result.studentProfile.gender,
        academic_year: result.studentProfile.academicYear,
        term: result.term,
        passport_url: result.studentProfile.passportUrl || null
      }).then(() => {
        supabase.from('student_results').upsert({
          reg_number: result.studentProfile.regNumber,
          academic_session: result.academicSession,
          term: result.term,
          total_score: result.totalScore,
          average_score: result.averageScore,
          position: result.position,
          class_standing: result.classStanding || 'Promoted',
          grade_point: result.gradePoint || null,
          attendance: result.attendance,
          principal_remark: result.principalRemark,
          teacher_remark: result.teacherRemark,
          is_published: result.isPublished
        }, {
          onConflict: 'reg_number,academic_session,term'
        }).select().single().then(({ data, error }) => {
          if (!error && data) {
            supabase.from('subject_scores').delete().eq('result_id', data.id).then(() => {
              if (result.subjects && result.subjects.length > 0) {
                const scoresToInsert = result.subjects.map(s => ({
                  result_id: data.id,
                  subject_name: s.subjectName,
                  ca1_score: s.ca1Score,
                  ca2_score: s.ca2Score,
                  exam_score: s.examScore,
                  total_score: s.totalScore,
                  grade: s.grade,
                  remarks: s.remarks
                }));
                supabase.from('subject_scores').insert(scoresToInsert).then(({ error: scErr }) => {
                  if (scErr) console.error('Supabase insert scores error:', scErr);
                });
              }
            });
          }
        });
      });
    }
  };

  const deleteResult = (regNumber: string, session: string, term: string) => {
    setResults(prev => prev.filter(r => 
      !(r.studentProfile.regNumber === regNumber && r.academicSession === session && r.term === term)
    ));
    if (isSupabaseConfigured) {
      supabase.from('student_results')
        .delete()
        .eq('reg_number', regNumber)
        .eq('academic_session', session)
        .eq('term', term)
        .then(({ error }) => {
          if (error) console.error('Supabase delete result error:', error);
        });
    }
  };

  const importResultsCSV = (csvContent: string): { success: boolean; count: number; message: string } => {
    try {
      const parseResult = parseGradebookCSV(csvContent);
      if (!parseResult.success) {
        return { success: false, count: 0, message: parseResult.message };
      }

      parseResult.results.forEach(res => {
        addResult(res);
      });

      return {
        success: true,
        count: parseResult.count,
        message: parseResult.message
      };
    } catch (err: any) {
      return { success: false, count: 0, message: `Parse Error: ${err.message || 'Unknown error'}` };
    }
  };

  const syncAllResultsToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    try {
      if (!isSupabaseConfigured) {
        return { success: false, message: 'Supabase is not configured yet.' };
      }
      
      let count = 0;
      for (const result of results) {
        // Upsert student profile
        await supabase
          .from('student_profiles')
          .upsert({
            reg_number: result.studentProfile.regNumber,
            name: result.studentProfile.name,
            student_id: result.studentProfile.studentId,
            student_class: result.studentProfile.studentClass,
            gender: result.studentProfile.gender,
            academic_year: result.studentProfile.academicYear,
            term: result.term,
            passport_url: result.studentProfile.passportUrl || null
          });

        // Upsert student result
        const { data: resData, error: resErr } = await supabase
          .from('student_results')
          .upsert({
            reg_number: result.studentProfile.regNumber,
            academic_session: result.academicSession,
            term: result.term,
            total_score: result.totalScore,
            average_score: result.averageScore,
            position: result.position,
            class_standing: result.classStanding || 'Promoted',
            grade_point: result.gradePoint || null,
            attendance: result.attendance,
            principal_remark: result.principalRemark,
            teacher_remark: result.teacherRemark,
            is_published: result.isPublished
          }, {
            onConflict: 'reg_number,academic_session,term'
          })
          .select()
          .single();

        if (!resErr && resData) {
          // Delete old subject scores for this result ID
          await supabase
            .from('subject_scores')
            .delete()
            .eq('result_id', resData.id);

          // Insert new subject scores
          if (result.subjects && result.subjects.length > 0) {
            const scoresToInsert = result.subjects.map(s => ({
              result_id: resData.id,
              subject_name: s.subjectName,
              ca1_score: s.ca1Score,
              ca2_score: s.ca2Score,
              exam_score: s.examScore,
              total_score: s.totalScore,
              grade: s.grade,
              remarks: s.remarks
            }));
            await supabase.from('subject_scores').insert(scoresToInsert);
          }
        }
        count++;
      }
      return { success: true, message: `Successfully synchronized ${count} student term sheet(s) directly to Supabase!` };
    } catch (e: any) {
      console.error('Failed to manually sync results to Supabase:', e);
      return { success: false, message: `Manual sync failed: ${e.message}` };
    }
  };

  // Messages Operations
  const sendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const dateStr = new Date().toISOString().split('T')[0];
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg_${Date.now()}`,
      date: dateStr,
      read: false
    };
    setMessages(prev => [newMsg, ...prev]);
    if (isSupabaseConfigured) {
      supabase.from('contact_messages').insert({
        name: msg.name,
        email: msg.email,
        phone: msg.phone || null,
        message: msg.message,
        date: dateStr,
        read: false
      }).then(({ error }) => {
        if (error) console.error('Supabase sendMessage error:', error);
      });
    }
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('msg_', ''));
      if (!isNaN(numericId)) {
        supabase.from('contact_messages').update({ read: true }).eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase markMessageRead error:', error);
        });
      }
    }
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (isSupabaseConfigured) {
      const numericId = parseInt(id.replace('msg_', ''));
      if (!isNaN(numericId)) {
        supabase.from('contact_messages').delete().eq('id', numericId).then(({ error }) => {
          if (error) console.error('Supabase deleteMessage error:', error);
        });
      }
    }
  };

  return (
    <SchoolContext.Provider value={{
      stats,
      projects,
      gallery,
      news,
      documents,
      results,
      messages,
      isAdmin,
      isSupabaseLoading,
      supabaseConnectionStatus,
      isUsingCustomSupabase,
      activeSupabaseUrl,
      login,
      logout,
      updateStats,
      addNews,
      editNews,
      deleteNews,
      addProject,
      editProject,
      deleteProject,
      addGalleryItem,
      editGalleryItem,
      deleteGalleryItem,
      addDocument,
      editDocument,
      deleteDocument,
      addResult,
      editResult,
      deleteResult,
      importResultsCSV,
      syncAllResultsToSupabase,
      sendMessage,
      markMessageRead,
      deleteMessage
    }}>
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
