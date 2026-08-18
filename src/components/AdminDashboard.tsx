/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  BarChart, FileText, Image, Video, File, FolderPlus, Plus, Edit, Trash2, 
  Upload, UploadCloud, Cloud, Sliders, Smartphone, Check, MessageSquare, AlertCircle, 
  FileSpreadsheet, Download, FileDown, FileUp, Search, Filter, CheckCircle2, RefreshCw, Eye
} from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { OngoingProject, GalleryItem, NewsPost, LegalDocument, StudentResult, SubjectScore } from '../types';
import { downloadCSVTemplate, exportResultsToCSV } from '../utils/csvUtils';

export const AdminDashboard: React.FC = () => {
  const {
    stats, updateStats,
    projects, addProject, editProject, deleteProject,
    gallery, addGalleryItem, editGalleryItem, deleteGalleryItem,
    news, addNews, editNews, deleteNews,
    documents, addDocument, editDocument, deleteDocument,
    results, addResult, editResult, deleteResult, importResultsCSV, syncAllResultsToSupabase,
    isUsingCustomSupabase, activeSupabaseUrl,
    messages, markMessageRead, deleteMessage
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'projects' | 'gallery' | 'documents' | 'results' | 'messages'>('overview');

  // --- STATS EDITING ---
  const [studentsCount, setStudentsCount] = useState(stats.students);
  const [teachersCount, setTeachersCount] = useState(stats.teachers);
  const [graduatesCount, setGraduatesCount] = useState(stats.graduates);
  const [awardsCount, setAwardsCount] = useState(stats.awards);
  const [statsSaved, setStatsSaved] = useState(false);

  // Synchronize local edit state when context stats loads/changes
  React.useEffect(() => {
    setStudentsCount(stats.students);
    setTeachersCount(stats.teachers);
    setGraduatesCount(stats.graduates);
    setAwardsCount(stats.awards);
  }, [stats]);

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats({
      students: Number(studentsCount),
      teachers: Number(teachersCount),
      graduates: Number(graduatesCount),
      awards: Number(awardsCount),
    });
    setStatsSaved(true);
    setTimeout(() => setStatsSaved(false), 3000);
  };

  // --- NEWS FORM ---
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('Announcement');
  const [newsImage, setNewsImage] = useState('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800');
  const [editNewsId, setEditNewsId] = useState<string | null>(null);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editNewsId) {
      editNews(editNewsId, {
        title: newTitle,
        summary: newSummary,
        content: newContent,
        category: newCategory,
        imageUrl: newsImage,
      });
      setEditNewsId(null);
    } else {
      addNews({
        title: newTitle,
        summary: newSummary,
        content: newContent,
        category: newCategory,
        imageUrl: newsImage,
        date: new Date().toISOString().split('T')[0],
      });
    }

    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  // --- ONGOING PROJECTS FORM ---
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projBudget, setProjBudget] = useState('₦');
  const [projProgress, setProjProgress] = useState(50);
  const [projStart, setProjStart] = useState('');
  const [projEnd, setProjEnd] = useState('');
  const [projImg, setProjImg] = useState('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800');
  const [editProjId, setEditProjId] = useState<string | null>(null);

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;

    if (editProjId) {
      editProject(editProjId, {
        title: projTitle,
        description: projDesc,
        budget: projBudget,
        percentageCompletion: Number(projProgress),
        startDate: projStart,
        expectedCompletionDate: projEnd,
        image: projImg,
      });
      setEditProjId(null);
    } else {
      addProject({
        title: projTitle,
        description: projDesc,
        budget: projBudget,
        percentageCompletion: Number(projProgress),
        startDate: projStart || new Date().toISOString().split('T')[0],
        expectedCompletionDate: projEnd || "2026-12-31",
        image: projImg,
      });
    }

    setProjTitle('');
    setProjDesc('');
    setProjBudget('₦');
    setProjProgress(50);
    setProjStart('');
    setProjEnd('');
  };

  // --- GALLERY IMAGES & VIDEOS ---
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('School Activities');
  const [galType, setGalType] = useState<'image' | 'video'>('image');
  const [galUrl, setGalUrl] = useState('');
  const [galVideoEmbed, setGalVideoEmbed] = useState('');
  const [editGalId, setEditGalId] = useState<string | null>(null);

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle.trim()) return;

    let finalUrl = galUrl;
    if (galType === 'video' && !finalUrl) {
      finalUrl = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800";
    }

    if (editGalId) {
      editGalleryItem(editGalId, {
        title: galTitle,
        category: galCategory,
        type: galType,
        url: finalUrl,
        embedUrl: galType === 'video' ? galVideoEmbed : undefined,
      });
      setEditGalId(null);
    } else {
      addGalleryItem({
        title: galTitle,
        category: galCategory,
        type: galType,
        url: finalUrl,
        embedUrl: galType === 'video' ? galVideoEmbed : undefined,
      });
    }

    setGalTitle('');
    setGalUrl('');
    setGalVideoEmbed('');
    setGalType('image');
    setGalCategory('School Activities');
  };

  const handleImageUploadHelper = (e: React.ChangeEvent<HTMLInputElement>, type: 'news' | 'project' | 'gallery') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === 'news') setNewsImage(base64);
        else if (type === 'project') setProjImg(base64);
        else if (type === 'gallery') setGalUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- DOCUMENT MANAGER ---
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState('Prospectus');
  const [docType, setDocType] = useState<'pdf' | 'docx' | 'xlsx'>('pdf');
  const [docSize, setDocSize] = useState('1.2 MB');
  const [editDocId, setEditDocId] = useState<string | null>(null);

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const finalName = docName.endsWith(`.${docType}`) ? docName : `${docName}.${docType}`;

    if (editDocId) {
      editDocument(editDocId, {
        name: finalName,
        category: docCategory,
        fileType: docType,
        fileSize: docSize,
      });
      setEditDocId(null);
    } else {
      addDocument({
        name: finalName,
        category: docCategory,
        fileType: docType,
        fileSize: docSize,
        downloadUrl: '#',
      });
    }

    setDocName('');
    setDocSize('1.2 MB');
    setDocCategory('Prospectus');
    setDocType('pdf');
  };

  // --- RESULTS MANAGEMENT (DIRECT ADD, CSV IMPORT & EXPORT) ---
  const [csvPaste, setCsvPaste] = useState('');
  const [csvSuccess, setCsvSuccess] = useState('');
  const [csvError, setCsvError] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState('');
  const [syncError, setSyncError] = useState('');
  
  // CSV Import State
  const [importMode, setImportMode] = useState<'file' | 'paste'>('file');
  const [selectedCsvFile, setSelectedCsvFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [exportFeedback, setExportFeedback] = useState('');

  // Results Filter State
  const [searchStudentQuery, setSearchStudentQuery] = useState('');
  const [filterClass, setFilterClass] = useState('All');
  const [filterTerm, setFilterTerm] = useState('All');
  const [filterSession, setFilterSession] = useState('All');

  // Manual student details addition
  const [studentName, setStudentName] = useState('');
  const [studentReg, setStudentReg] = useState('');
  const [studentClass, setStudentClass] = useState('SS 2');
  const [studentGender, setStudentGender] = useState('Male');
  const [resSession, setResSession] = useState('2025/2026');
  const [resTerm, setResTerm] = useState('2nd Term');
  const [studentPassportUrl, setStudentPassportUrl] = useState('');
  const [subName, setSubName] = useState('Mathematics');
  const [subCA1, setSubCA1] = useState<number>(15);
  const [subCA2, setSubCA2] = useState<number>(15);
  const [subExam, setSubExam] = useState<number>(50);
  const [subGrade, setSubGrade] = useState('');
  const [subRemarks, setSubRemarks] = useState('');
  const [manualSubjects, setManualSubjects] = useState<SubjectScore[]>([]);

  // Metadata overrides
  const [classPlacement, setClassPlacement] = useState('');
  const [classStanding, setClassStanding] = useState('');
  const [gradePoint, setGradePoint] = useState('');
  const [accreditedGradeBracket, setAccreditedGradeBracket] = useState('');
  const [principalRemark, setPrincipalRemark] = useState('');
  const [teacherRemark, setTeacherRemark] = useState('');
  const [grossTotalOverride, setGrossTotalOverride] = useState('');
  const [avgOverride, setAvgOverride] = useState('');

  const handleAddSubjectToManualList = () => {
    if (!subName.trim()) return;
    const total = Number(subCA1) + Number(subCA2) + Number(subExam);
    let computedGrade = 'F';
    let computedRemarks = 'Fail';
    if (total >= 80) { computedGrade = 'A'; computedRemarks = 'Distinction'; }
    else if (total >= 70) { computedGrade = 'B'; computedRemarks = 'Very Good'; }
    else if (total >= 55) { computedGrade = 'C'; computedRemarks = 'Good'; }
    else if (total >= 40) { computedGrade = 'E'; computedRemarks = 'Pass'; }

    setManualSubjects(prev => [
      ...prev.filter(s => s.subjectName !== subName),
      {
        subjectName: subName,
        ca1Score: Number(subCA1),
        ca2Score: Number(subCA2),
        examScore: Number(subExam),
        totalScore: total,
        grade: subGrade.trim() || computedGrade,
        remarks: subRemarks.trim() || computedRemarks,
      }
    ]);
    setSubName('');
    setSubGrade('');
    setSubRemarks('');
  };

  const handleLoadResultForEdit = (result: StudentResult) => {
    setStudentName(result.studentProfile.name);
    setStudentReg(result.studentProfile.regNumber);
    setStudentClass(result.studentProfile.studentClass);
    setStudentGender(result.studentProfile.gender);
    setResSession(result.academicSession);
    setResTerm(result.term);
    setStudentPassportUrl(result.studentProfile.passportUrl || '');
    setManualSubjects([...result.subjects]);
    setClassPlacement(result.position || '');
    setClassStanding(result.classStanding || '');
    setGradePoint(result.gradePoint || '');
    setAccreditedGradeBracket(result.accreditedGradeBracket || '');
    setPrincipalRemark(result.principalRemark || '');
    setTeacherRemark(result.teacherRemark || '');
    setGrossTotalOverride(result.totalScore?.toString() || '');
    setAvgOverride(result.averageScore?.toString() || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleManualResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentReg.trim() || manualSubjects.length === 0) {
      alert("Provide Student Name, Reg Number, and at least one subject score.");
      return;
    }

    const computedTotalMarks = manualSubjects.reduce((sum, s) => sum + s.totalScore, 0);
    const computedAvg = parseFloat((computedTotalMarks / manualSubjects.length).toFixed(1));

    addResult({
      studentProfile: {
        name: studentName,
        regNumber: studentReg,
        studentId: studentReg.replace(/\//g, '-'),
        studentClass,
        gender: studentGender,
        academicYear: resSession,
        term: resTerm,
        passportUrl: studentPassportUrl.trim() || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(studentName)}`
      },
      academicSession: resSession,
      term: resTerm,
      subjects: manualSubjects,
      totalScore: grossTotalOverride ? Number(grossTotalOverride) : computedTotalMarks,
      averageScore: avgOverride ? Number(avgOverride) : computedAvg,
      position: classPlacement || "Awaiting calculation",
      classStanding: classStanding || "",
      gradePoint: gradePoint || "",
      accreditedGradeBracket: accreditedGradeBracket || "",
      attendance: "85 of 90 days", // Currently hardcoded
      teacherRemark: teacherRemark || "Good performance overall.",
      principalRemark: principalRemark || "Disciplined and focused student.",
      isPublished: true,
    });

    setStudentName('');
    setStudentReg('');
    setStudentPassportUrl('');
    setManualSubjects([]);
    alert("Manual result successfully published!");
  };

  const handleCsvFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
        setCsvError('Please select a valid .csv file format.');
        setSelectedCsvFile(null);
        return;
      }
      setSelectedCsvFile(file);
      setCsvError('');
      setCsvSuccess('');
    }
  };

  const handleProcessCsvFile = () => {
    if (!selectedCsvFile) {
      setCsvError('Please select a .csv file first.');
      return;
    }

    setIsProcessingFile(true);
    setCsvError('');
    setCsvSuccess('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text || !text.trim()) {
          setCsvError('The chosen CSV file is empty.');
          setIsProcessingFile(false);
          return;
        }

        const res = importResultsCSV(text);
        if (res.success) {
          setCsvSuccess(res.message);
          setSelectedCsvFile(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          setCsvError(res.message);
        }
      } catch (err: any) {
        setCsvError(`File processing error: ${err.message || 'Unknown error'}`);
      } finally {
        setIsProcessingFile(false);
      }
    };

    reader.onerror = () => {
      setCsvError('Error reading the selected CSV file.');
      setIsProcessingFile(false);
    };

    reader.readAsText(selectedCsvFile);
  };

  const handleCSVUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCsvSuccess('');
    setCsvError('');

    if (!csvPaste.trim()) {
      setCsvError('Please paste your CSV rows into the text area.');
      return;
    }

    const res = importResultsCSV(csvPaste);
    if (res.success) {
      setCsvSuccess(res.message);
      setCsvPaste('');
    } else {
      setCsvError(res.message);
    }
  };

  const handleExportAll = () => {
    if (results.length === 0) {
      setExportFeedback('No student gradebooks available to export.');
      setTimeout(() => setExportFeedback(''), 4000);
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const res = exportResultsToCSV(results, `HGASS_All_Gradebooks_${today}.csv`);
    if (res.success) {
      setExportFeedback(`Exported ${res.count} student gradebooks to CSV successfully!`);
      setTimeout(() => setExportFeedback(''), 5000);
    }
  };

  const handleExportFiltered = () => {
    if (filteredResults.length === 0) {
      setExportFeedback('No gradebooks match your current search/filter criteria.');
      setTimeout(() => setExportFeedback(''), 4000);
      return;
    }
    const safeClass = filterClass !== 'All' ? filterClass.replace(/\s+/g, '_') : 'AllClasses';
    const safeTerm = filterTerm !== 'All' ? filterTerm.replace(/\s+/g, '_') : 'AllTerms';
    const filename = `HGASS_Gradebooks_${safeClass}_${safeTerm}.csv`;
    const res = exportResultsToCSV(filteredResults, filename);
    if (res.success) {
      setExportFeedback(`Exported ${res.count} filtered student gradebooks to CSV!`);
      setTimeout(() => setExportFeedback(''), 5000);
    }
  };

  const handleExportSingleStudent = (result: StudentResult) => {
    const safeName = result.studentProfile.name.replace(/[^a-zA-Z0-9]/g, '_');
    const safeTerm = result.term.replace(/\s+/g, '_');
    const filename = `HGASS_Gradebook_${safeName}_${safeTerm}.csv`;
    exportResultsToCSV([result], filename);
    setExportFeedback(`Exported gradebook for ${result.studentProfile.name}`);
    setTimeout(() => setExportFeedback(''), 4000);
  };

  const filteredResults = results.filter(r => {
    const query = searchStudentQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      r.studentProfile.name.toLowerCase().includes(query) ||
      r.studentProfile.regNumber.toLowerCase().includes(query);
    
    const matchesClass = filterClass === 'All' || r.studentProfile.studentClass === filterClass;
    const matchesTerm = filterTerm === 'All' || r.term === filterTerm;
    const matchesSession = filterSession === 'All' || r.academicSession === filterSession;

    return matchesSearch && matchesClass && matchesTerm && matchesSession;
  });

  const handleSyncAllResults = async () => {
    setSyncLoading(true);
    setSyncSuccess('');
    setSyncError('');
    try {
      const res = await syncAllResultsToSupabase();
      if (res.success) {
        setSyncSuccess(res.message);
      } else {
        setSyncError(res.message);
      }
    } catch (err: any) {
      setSyncError(err.message || 'An error occurred during database sync');
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <div id="hgass_admin_panel" className="animate-fade-in py-8 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-800 gap-6">
          <div className="space-y-2">
            <div className="inline-flex bg-brand-green py-1 px-3 rounded text-[10px] font-heading font-extrabold tracking-widest uppercase">
              Operational Command Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight leading-none text-white">
              Academic & General Dashboard
            </h1>
            <p className="text-xs text-slate-400 font-light max-w-xl leading-relaxed">
              Logistics workspace: Edit campus statistics counters, publish newsletter articles, add ongoing budgets, upload resources, and parse digital student grade books.
            </p>
          </div>
          <div className="text-xs font-mono bg-slate-800 p-3 rounded border border-slate-700/50 shrink-0 uppercase tracking-widest select-none text-brand-yellow">
            🔑 ADMIN: ACTIVE SECURE SESSION
          </div>
        </div>

        {/* Outer Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column A: Tab menu lists */}
          <div className="lg:col-span-3 bg-white border border-slate-200/60 p-4 rounded-xl shadow-xs space-y-1.5 flex flex-col">
            {[
              { id: 'overview', label: 'Overview & Stats', icon: <BarChart size={16} /> },
              { id: 'news', label: 'Announcements News', icon: <FileText size={16} /> },
              { id: 'projects', label: 'Major Budgets & Projects', icon: <Sliders size={16} /> },
              { id: 'gallery', label: 'Photo & Video Gallery', icon: <Image size={16} /> },
              { id: 'documents', label: 'PDF Library Upload', icon: <File size={16} /> },
              { id: 'results', label: 'Terminal Grade Books', icon: <FileSpreadsheet size={16} /> },
              { id: 'messages', label: `Support Tickets (${messages.filter(m => !m.read).length})`, icon: <MessageSquare size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCsvSuccess('');
                  setCsvError('');
                }}
                className={`w-full flex items-center space-x-3 text-left py-3 px-4 rounded text-xs font-heading font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Column B: Active Workspace content */}
          <div className="lg:col-span-9 bg-white border border-slate-200/60 rounded-xl p-6 sm:p-10 shadow-xs space-y-8">
            
            {/* 1. OVERVIEW & STATS WORKSPACE */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-heading font-extrabold text-slate-800 border-b border-slate-100 pb-3">
                  Statistics counters & Overview
                </h3>

                {/* Counter Totals */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 bg-slate-50 border rounded-lg text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">STUDENTS</span>
                    <span className="text-xl font-heading font-black text-brand-green">{stats.students}</span>
                  </div>
                  <div className="p-4 bg-slate-50 border rounded-lg text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">STAFF</span>
                    <span className="text-xl font-heading font-black text-slate-800">{stats.teachers}</span>
                  </div>
                  <div className="p-4 bg-slate-50 border rounded-lg text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">PROJECTS</span>
                    <span className="text-xl font-heading font-black text-slate-800">{projects.length}</span>
                  </div>
                  <div className="p-4 bg-slate-50 border rounded-lg text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">NEWS/EVENTS</span>
                    <span className="text-xl font-heading font-black text-slate-800">{news.length}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 p-4 bg-slate-50 border rounded-lg text-center">
                    <span className="text-[10px] text-slate-400 block font-mono">DOWNLOADS</span>
                    <span className="text-xl font-heading font-black text-slate-800">{documents.length}</span>
                  </div>
                </div>

                {/* Edit forms */}
                <form onSubmit={handleSaveStats} className="space-y-6 pt-4 border-t border-slate-50">
                  <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Modify Statistics Counters</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-medium font-heading">Total Students</label>
                      <input 
                        type="number" 
                        value={studentsCount} 
                        onChange={(e) => setStudentsCount(Number(e.target.value))}
                        className="w-full bg-slate-50 p-2 border rounded text-xs text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-medium font-heading">Total Teachers</label>
                      <input 
                        type="number" 
                        value={teachersCount} 
                        onChange={(e) => setTeachersCount(Number(e.target.value))}
                        className="w-full bg-slate-50 p-2 border rounded text-xs text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-medium font-heading">Total Graduates</label>
                      <input 
                        type="number" 
                        value={graduatesCount} 
                        onChange={(e) => setGraduatesCount(Number(e.target.value))}
                        className="w-full bg-slate-50 p-2 border rounded text-xs text-slate-800"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-600 font-medium font-heading">Trophies/Awards</label>
                      <input 
                        type="number" 
                        value={awardsCount} 
                        onChange={(e) => setAwardsCount(Number(e.target.value))}
                        className="w-full bg-slate-50 p-2 border rounded text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="submit"
                      className="py-2.5 px-5 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase tracking-wider rounded"
                    >
                      Sync Stats Counters
                    </button>
                    {statsSaved && (
                      <span className="text-emerald-600 text-xs flex items-center space-x-1 animate-fade-in font-medium">
                        <Check size={14} />
                        <span>Synced successfully!</span>
                      </span>
                    )}
                  </div>
                </form>

              </div>
            )}

            {/* 2. NEWS/ANNOUNCEMENT MANAGEMENT */}
            {activeTab === 'news' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-800">
                    Announcements & School News
                  </h3>
                  {editNewsId && (
                    <button 
                      onClick={() => { setEditNewsId(null); setNewTitle(''); setNewSummary(''); setNewContent(''); }}
                      className="text-xs font-semibold text-brand-green underline"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Article Title</label>
                      <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Science Fair scheduled for third term exam list"
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Category Tag</label>
                      <select 
                        value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      >
                        <option value="Announcement">Announcement</option>
                        <option value="Achievement">Achievement</option>
                        <option value="Event">Event</option>
                        <option value="Academic">Academic</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Brief Summary</label>
                    <input 
                      type="text" 
                      value={newSummary} 
                      onChange={(e) => setNewSummary(e.target.value)}
                      placeholder="One-line summary for article listing cards..."
                      className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Detailed Article Content</label>
                    <textarea 
                      value={newContent} 
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={5}
                      placeholder="Write rich, informative paragraphs for newsletters..."
                      className="w-full bg-slate-50 p-2.5 border rounded text-xs resize-none"
                    />
                  </div>

                  {/* Image Selector & File converter */}
                  <div className="border border-dashed border-slate-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="text-xs font-heading font-bold text-slate-900">Upload Banner Image</p>
                      <p className="text-[10px] text-slate-400 font-light">Supported formats: PNG, JPG, WEBP. Drag-and-drop compatible</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="py-2 px-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-heading font-semibold rounded shadow-xs cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUploadHelper(e, 'news')}
                          className="hidden" 
                        />
                        <span>Select File</span>
                      </label>
                      <div className="h-10 w-16 bg-slate-100 rounded overflow-hidden relative border">
                        <img src={newsImage} alt="News Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase rounded shadow-xs"
                  >
                    {editNewsId ? 'Update Article' : 'Publish Article'}
                  </button>
                </form>

                {/* Published Listings */}
                <div className="border-t border-slate-50 pt-6 space-y-3">
                  <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Published Articles ({news.length})</h4>
                  <div className="divide-y divide-slate-100">
                    {news.map((n) => (
                      <div key={n.id} className="py-3 flex justify-between items-center gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold py-0.5 px-2 rounded font-mono uppercase">{n.category}</span>
                          <h5 className="text-xs sm:text-sm font-heading font-bold text-slate-800 line-clamp-1">{n.title}</h5>
                        </div>
                        <div className="flex space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              setEditNewsId(n.id);
                              setNewTitle(n.title);
                              setNewSummary(n.summary);
                              setNewContent(n.content);
                              setNewCategory(n.category);
                              if (n.imageUrl) setNewsImage(n.imageUrl);
                            }}
                            className="p-1 px-2 border rounded-md text-xs text-slate-500 hover:bg-slate-50 hover:text-slate-800 flex items-center space-x-1"
                          >
                            <Edit size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteNews(n.id)}
                            className="p-1 px-2 border rounded-md text-xs text-brand-oxblood hover:bg-rose-50 flex items-center space-x-1"
                          >
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 3. PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-800">
                    Ongoing Campus Projects
                  </h3>
                  {editProjId && (
                    <button 
                      onClick={() => { setEditProjId(null); setProjTitle(''); setProjDesc(''); setProjBudget('₦'); setProjProgress(50); }}
                      className="text-xs font-semibold text-brand-green underline"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Project Title</label>
                      <input 
                        type="text" 
                        value={projTitle} 
                        onChange={(e) => setProjTitle(e.target.value)}
                        placeholder="e.g. Modern Physics Lab Upgrade"
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Budget (auditable Naira ₦ value)</label>
                      <input 
                        type="text" 
                        value={projBudget} 
                        onChange={(e) => setProjBudget(e.target.value)}
                        placeholder="e.g. ₦6,800,000"
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Project Description</label>
                    <textarea 
                      value={projDesc} 
                      onChange={(e) => setProjDesc(e.target.value)}
                      rows={3}
                      placeholder="Specify material lists, scope of lab upgrades, etc..."
                      className="w-full bg-slate-50 p-2.5 border rounded text-xs resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-heading">
                      <label className="text-xs font-bold text-slate-700">Kickoff Date</label>
                      <input 
                        type="date" 
                        value={projStart} 
                        onChange={(e) => setProjStart(e.target.value)}
                        className="w-full bg-slate-50 p-2 border rounded text-xs text-slate-700"
                      />
                    </div>
                    <div className="space-y-1.5 font-heading">
                      <label className="text-xs font-bold text-slate-700">Expected Handover Date</label>
                      <input 
                        type="date" 
                        value={projEnd} 
                        onChange={(e) => setProjEnd(e.target.value)}
                        className="w-full bg-slate-50 p-2 border rounded text-xs text-slate-700"
                      />
                    </div>
                  </div>

                  {/* Progress completion slider */}
                  <div className="space-y-2 p-4 bg-slate-50 rounded-lg border">
                    <div className="flex justify-between text-xs font-heading font-bold text-slate-800">
                      <span>Percent Completion Index</span>
                      <span className="text-brand-green">{projProgress}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={projProgress} 
                      onChange={(e) => setProjProgress(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                    />
                  </div>

                  {/* Banner Image upload section */}
                  <div className="border border-dashed border-slate-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="text-xs font-heading font-bold text-slate-900">Upload Project Photo</p>
                      <p className="text-[10px] text-slate-400 font-light">Supported formats: PNG, JPG, WEBP. Drag-and-drop compatible</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="py-2 px-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-heading font-semibold rounded shadow-xs cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUploadHelper(e, 'project')}
                          className="hidden" 
                        />
                        <span>Select File</span>
                      </label>
                      <div className="h-10 w-16 bg-slate-100 rounded overflow-hidden relative border">
                        <img src={projImg} alt="Proj Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase rounded shadow-xs"
                  >
                    {editProjId ? 'Update project' : 'Create project'}
                  </button>
                </form>

                {/* Listing of school projects */}
                <div className="border-t border-slate-50 pt-6 space-y-3">
                  <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Auditable Ongoing Projects ({projects.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                    {projects.map((p) => (
                      <div key={p.id} className="p-3 bg-slate-50 border rounded-lg flex justify-between items-center gap-4 text-xs font-medium">
                        <div className="space-y-0.5">
                          <h5 className="font-heading font-bold text-slate-800 text-xs sm:text-sm">{p.title}</h5>
                          <p className="text-slate-400 text-[10px]">Budget framework: <span className="text-brand-green font-bold">{p.budget}</span> • Progress: {p.percentageCompletion}%</p>
                        </div>
                        <div className="flex space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              setProjTitle(p.title);
                              setProjDesc(p.description);
                              setProjBudget(p.budget);
                              setProjProgress(p.percentageCompletion);
                              setProjStart(p.startDate);
                              setProjEnd(p.expectedCompletionDate);
                              setProjImg(p.image);
                              setEditProjId(p.id);
                            }}
                            className="p-1 px-2 border rounded text-[10px] sm:text-xs text-slate-600 bg-white hover:bg-slate-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProject(p.id)}
                            className="p-1 px-2 border rounded text-[10px] sm:text-xs text-brand-oxblood bg-white hover:bg-rose-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 4. PHOTO & VIDEO GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-800">
                    {editGalId ? 'Edit Media Asset' : 'Visual Media Gallery'}
                  </h3>
                  {editGalId && (
                    <button 
                      onClick={() => {
                        setEditGalId(null);
                        setGalTitle('');
                        setGalUrl('');
                        setGalVideoEmbed('');
                        setGalType('image');
                        setGalCategory('School Activities');
                      }}
                      className="text-xs font-semibold text-brand-green underline"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                <form onSubmit={handleGallerySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Display Caption</label>
                      <input 
                        type="text" 
                        value={galTitle} 
                        onChange={(e) => setGalTitle(e.target.value)}
                        placeholder="e.g. Annual Cultural Day Anambra Traditional Dancers"
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 font-heading">Asset Type</label>
                      <select 
                        value={galType} 
                        onChange={(e) => setGalType(e.target.value as any)}
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      >
                        <option value="image">Photo Image</option>
                        <option value="video">YouTube / Drive Video</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-heading">
                      <label className="text-xs font-bold text-slate-700">Selection Category</label>
                      <select 
                        value={galCategory} 
                        onChange={(e) => setGalCategory(e.target.value)}
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      >
                        <option value="School Activities">School Activities</option>
                        <option value="Sports">Sports</option>
                        <option value="Academics">Academics</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Cultural Events">Cultural Events</option>
                        <option value="Projects">Projects</option>
                      </select>
                    </div>

                    {galType === 'video' ? (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">YouTube Embed Link (iframe compatible)</label>
                        <input 
                          type="text" 
                          value={galVideoEmbed} 
                          onChange={(e) => setGalVideoEmbed(e.target.value)}
                          placeholder="e.g. https://www.youtube.com/embed/..."
                          className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                        />
                      </div>
                    ) : null}
                  </div>

                  {galType === 'image' && (
                    <div className="border border-dashed border-slate-200 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center bg-slate-50/50 gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="text-xs font-heading font-bold text-slate-900">Upload Album Photo</p>
                        <p className="text-[10px] text-slate-400 font-light">Supported formats: PNG, JPG, WEBP. Convert on-the-fly</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <label className="py-2 px-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-heading font-semibold rounded shadow-xs cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUploadHelper(e, 'gallery')}
                            className="hidden" 
                          />
                          <span>Select Photo File</span>
                        </label>
                        <div className="h-10 w-16 bg-slate-100 rounded overflow-hidden relative border">
                          <img src={galUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=200"} alt="Upload Preview" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase rounded shadow-xs"
                  >
                    {editGalId ? 'Update Media Asset' : 'Publish Media Asset'}
                  </button>
                </form>

                {/* Published listings */}
                <div className="border-t border-slate-50 pt-6 space-y-3">
                  <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Media Repository Elements ({gallery.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((g) => (
                      <div key={g.id} className="p-3 bg-slate-50 border rounded-lg flex justify-between items-center gap-3">
                        <div className="flex items-center space-x-3 overflow-hidden text-xs">
                          <div className="h-10 w-12 bg-slate-100 rounded overflow-hidden shrink-0">
                            <img src={g.url} alt="Minipreview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="overflow-hidden space-y-0.5">
                            <h5 className="font-heading font-bold text-slate-800 truncate">{g.title}</h5>
                            <span className="text-[10px] font-mono text-slate-400">{g.category} • {g.type}</span>
                          </div>
                        </div>
                        <div className="flex space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditGalId(g.id);
                              setGalTitle(g.title);
                              setGalCategory(g.category);
                              setGalType(g.type);
                              setGalUrl(g.url);
                              setGalVideoEmbed(g.embedUrl || '');
                            }}
                            className="p-1 px-2 border rounded bg-white text-slate-600 hover:bg-slate-100 text-[10px] font-medium shrink-0 flex items-center space-x-1"
                          >
                            <Edit size={10} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteGalleryItem(g.id)}
                            className="p-1 px-2 border rounded bg-white text-brand-oxblood hover:bg-rose-50 hover:text-brand-oxblood text-[10px] font-medium shrink-0 flex items-center space-x-1"
                          >
                            <Trash2 size={10} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 5. PDF DOCUMENTS LIBRARY */}
            {activeTab === 'documents' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-heading font-extrabold text-slate-800">
                    {editDocId ? 'Edit Library Resource' : 'Campus Resources & PDF Library'}
                  </h3>
                  {editDocId && (
                    <button 
                      onClick={() => {
                        setEditDocId(null);
                        setDocName('');
                        setDocSize('1.2 MB');
                        setDocCategory('Prospectus');
                        setDocType('pdf');
                      }}
                      className="text-xs font-semibold text-brand-green underline"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                <form onSubmit={handleDocumentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Resource Name</label>
                      <input 
                        type="text" 
                        value={docName} 
                        onChange={(e) => setDocName(e.target.value)}
                        placeholder="e.g. Student-Moral-Conduct-Handbook-2026"
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs focus:ring-1 focus:ring-brand-green"
                      />
                    </div>
                    <div className="space-y-1.5 font-heading">
                      <label className="text-xs font-bold text-slate-700">Document Type</label>
                      <select 
                        value={docType} 
                        onChange={(e) => setDocType(e.target.value as any)}
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      >
                        <option value="pdf">PDF Certificate (.pdf)</option>
                        <option value="docx">Word Document (.docx)</option>
                        <option value="xlsx">Excel Sheet Workbook (.xlsx)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Resource Category</label>
                      <select 
                        value={docCategory} 
                        onChange={(e) => setDocCategory(e.target.value)}
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      >
                        <option value="Prospectus">Prospectus booklet</option>
                        <option value="Syllabus">Subjects Syllabus</option>
                        <option value="Term Circular">Administrative Circular</option>
                        <option value="Assigns">Syllabus assignment lists</option>
                        <option value="Handbook">School code Handbook</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">File Byte Size</label>
                      <input 
                        type="text" 
                        value={docSize} 
                        onChange={(e) => setDocSize(e.target.value)}
                        placeholder="e.g. 1.2 MB or 450 KB"
                        className="w-full bg-slate-50 p-2.5 border rounded text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-heading font-bold uppercase rounded shadow-xs"
                  >
                    {editDocId ? 'Update Library Resource' : 'Include Library resource'}
                  </button>
                </form>

                {/* Published Listings */}
                <div className="border-t border-slate-50 pt-6 space-y-3">
                  <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">PDF Library Resource listings ({documents.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {documents.map((d) => (
                      <div key={d.id} className="p-3 bg-slate-50 border rounded-lg flex justify-between items-center gap-3 text-xs">
                        <div className="overflow-hidden space-y-0.5">
                          <h5 className="font-heading font-bold text-slate-800 truncate">{d.name}</h5>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">{d.category} • {d.fileType} • {d.fileSize}</span>
                        </div>
                        <div className="flex space-x-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditDocId(d.id);
                              // Remove the extension from name for easier editing
                              const cleanName = d.name.endsWith(`.${d.fileType}`) 
                                ? d.name.slice(0, -(d.fileType.length + 1)) 
                                : d.name;
                              setDocName(cleanName);
                              setDocCategory(d.category);
                              setDocType(d.fileType);
                              setDocSize(d.fileSize);
                            }}
                            className="p-1 px-2 border rounded bg-white text-slate-600 hover:bg-slate-100 text-[10px] font-medium shrink-0 flex items-center space-x-1"
                          >
                            <Edit size={10} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteDocument(d.id)}
                            className="p-1 px-2 border rounded bg-white text-brand-oxblood hover:bg-rose-50 shrink-0 text-[10px] font-medium flex items-center space-x-1"
                          >
                            <Trash2 size={10} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 6. STUDENT RESULTS PUBLISHING (DIRECT, CSV IMPORT & EXPORT) */}
            {activeTab === 'results' && (
              <div className="space-y-8 animate-fade-in text-xs sm:text-sm">
                
                {/* Header with Quick Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-heading font-extrabold text-slate-800">
                      Terminal Grade Book Management
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1">
                      Compile and publish student grade sheets manually, upload bulk CSV class rosters from Excel/Sheets, or export complete results databases.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={downloadCSVTemplate}
                      className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-heading font-bold text-xs uppercase rounded shadow-xs inline-flex items-center space-x-1.5 transition-colors"
                      title="Download a pre-formatted CSV template file to open in Excel or Google Sheets"
                    >
                      <FileSpreadsheet size={14} className="text-brand-green" />
                      <span>Download CSV Template</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportAll}
                      className="py-2 px-3 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-bold text-xs uppercase rounded shadow-xs inline-flex items-center space-x-1.5 transition-colors"
                      title="Export all compiled student gradebooks into a single CSV spreadsheet"
                    >
                      <Download size={14} />
                      <span>Export All CSV ({results.length})</span>
                    </button>
                  </div>
                </div>

                {exportFeedback && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 font-medium flex items-center justify-between shadow-xs animate-fade-in">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span>{exportFeedback}</span>
                    </div>
                    <button 
                      onClick={() => setExportFeedback('')}
                      className="text-emerald-500 hover:text-emerald-800 text-xs font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* TAB SELECTOR INSIDE RESULTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* WORKBOOK 1: SPREADSHEET CSV BULK UPLOADER & IMPORTER */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                        <div className="flex items-center space-x-2 text-brand-green font-heading font-bold">
                          <FileSpreadsheet size={20} />
                          <span className="text-sm">CSV Gradebook Importer</span>
                        </div>
                        
                        {/* Import mode toggle */}
                        <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-[10px] font-heading font-bold">
                          <button
                            type="button"
                            onClick={() => setImportMode('file')}
                            className={`py-1 px-2.5 rounded-md transition-all flex items-center space-x-1 ${
                              importMode === 'file' 
                                ? 'bg-white text-slate-900 shadow-xs' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            <FileUp size={11} />
                            <span>Upload File</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setImportMode('paste')}
                            className={`py-1 px-2.5 rounded-md transition-all flex items-center space-x-1 ${
                              importMode === 'paste' 
                                ? 'bg-white text-slate-900 shadow-xs' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                          >
                            <Edit size={11} />
                            <span>Paste Text</span>
                          </button>
                        </div>
                      </div>

                      {importMode === 'file' ? (
                        /* Mode A: File Upload */
                        <div className="space-y-3">
                          <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                            Upload a <strong>.csv</strong> file exported from Microsoft Excel or Google Sheets. The system compiles all rows into student term gradebooks.
                          </p>

                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                              selectedCsvFile 
                                ? 'border-brand-green bg-emerald-50/40 text-emerald-800' 
                                : 'border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50/80 text-slate-500'
                            }`}
                          >
                            <input 
                              ref={fileInputRef}
                              type="file" 
                              accept=".csv,text/csv" 
                              onChange={handleCsvFileSelect}
                              className="hidden" 
                            />
                            
                            {selectedCsvFile ? (
                              <div className="space-y-2">
                                <div className="inline-flex p-3 bg-emerald-100 text-brand-green rounded-full">
                                  <FileSpreadsheet size={24} />
                                </div>
                                <div>
                                  <p className="font-heading font-bold text-slate-800 text-xs">{selectedCsvFile.name}</p>
                                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    {(selectedCsvFile.size / 1024).toFixed(1)} KB • Ready to compile
                                  </p>
                                </div>
                                <span className="inline-block text-[10px] text-brand-green font-bold underline">
                                  Click to select a different file
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <div className="inline-flex p-3 bg-slate-100 text-slate-400 rounded-full">
                                  <UploadCloud size={24} />
                                </div>
                                <div>
                                  <p className="font-heading font-bold text-slate-700 text-xs">
                                    Click to browse or drag & drop .csv file
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">
                                    Standard CSV format with student scores and details
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={!selectedCsvFile || isProcessingFile}
                              onClick={handleProcessCsvFile}
                              className="flex-1 py-2.5 px-4 bg-brand-green hover:bg-brand-green-hover disabled:bg-slate-300 text-white font-heading font-bold text-xs uppercase rounded transition-colors shadow-xs flex items-center justify-center space-x-1.5"
                            >
                              <FileUp size={14} />
                              <span>{isProcessingFile ? 'Processing...' : 'Upload & Compile CSV File'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={downloadCSVTemplate}
                              className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-heading font-bold text-xs uppercase rounded transition-colors flex items-center space-x-1"
                              title="Download template"
                            >
                              <FileSpreadsheet size={13} className="text-brand-green" />
                              <span>Template</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Mode B: Copy Paste Text */
                        <form onSubmit={handleCSVUploadSubmit} className="space-y-3">
                          <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                            Copy and paste your student result table cells from Excel or raw CSV format. The system automatically computes grade flags and inserts them.
                          </p>

                          <textarea 
                            value={csvPaste}
                            onChange={(e) => setCsvPaste(e.target.value)}
                            rows={6}
                            placeholder="Student Name,Registration Number,Class,Gender,Academic Session,Term,Subject,CA1,CA2,Exam,Class Position,Class Standing,Attendance,Principal Remark,Teacher Remark&#10;Forster Anarado,HGASS/2025/001,SS 2,Male,2025/2026,2nd Term,Biology,18,17,55,1st out of 42,Promoted to SS 3,88 of 90 days,Exceptional academic performance.,Dedicated student.&#10;Forster Anarado,HGASS/2025/001,SS 2,Male,2025/2026,2nd Term,English Language,16,18,52,1st out of 42,Promoted to SS 3,88 of 90 days,Exceptional academic performance.,Dedicated student."
                            className="w-full font-mono bg-white p-2.5 border rounded-lg text-[10px] leading-normal resize-none focus:outline-brand-green"
                          />

                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold text-xs uppercase rounded transition-colors shadow-xs"
                            >
                              Compile Pasted CSV Rows
                            </button>
                            <button
                              type="button"
                              onClick={downloadCSVTemplate}
                              className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 font-heading font-bold text-xs uppercase rounded transition-colors flex items-center space-x-1"
                              title="Download template"
                            >
                              <FileSpreadsheet size={13} className="text-brand-green" />
                              <span>Template</span>
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Format Reference Helper */}
                      <details className="text-[10px] text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200/70">
                        <summary className="font-heading font-bold text-slate-700 cursor-pointer select-none">
                          📋 CSV Columns Format Guide
                        </summary>
                        <div className="mt-2 space-y-1 text-slate-600 font-mono text-[9px] bg-slate-50 p-2 rounded">
                          <p className="font-bold text-slate-800">Expected Columns Order:</p>
                          <p>1. Student Name</p>
                          <p>2. Registration Number (e.g. HGASS/2025/001)</p>
                          <p>3. Class (e.g. SS 2, JSS 1)</p>
                          <p>4. Gender (Male / Female)</p>
                          <p>5. Academic Session (e.g. 2025/2026)</p>
                          <p>6. Term (1st Term / 2nd Term / 3rd Term)</p>
                          <p>7. Subject (e.g. Mathematics)</p>
                          <p>8. CA1 Score (max 20)</p>
                          <p>9. CA2 Score (max 20)</p>
                          <p>10. Exam Score (max 60)</p>
                          <p>11. Position (optional, e.g. 1st out of 42)</p>
                          <p>12. Class Standing (optional, e.g. Promoted)</p>
                          <p>13. Attendance (optional, e.g. 88 of 90 days)</p>
                          <p>14. Principal Remark (optional)</p>
                          <p>15. Teacher Remark (optional)</p>
                        </div>
                      </details>
                    </div>

                    <div className="space-y-2 pt-2">
                      {csvSuccess && (
                        <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200 font-medium flex items-center space-x-2">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <span>{csvSuccess}</span>
                        </div>
                      )}
                      {csvError && (
                        <div className="p-3 bg-rose-50 text-brand-oxblood text-xs rounded-lg border border-brand-oxblood/20 font-medium flex items-center space-x-2">
                          <AlertCircle size={16} className="text-brand-oxblood shrink-0" />
                          <span>{csvError}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WORKBOOK 2: MANUAL SINGLE STUDENT SCORER */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 space-y-4">
                    <div className="flex items-center space-x-2 text-[#5C0000] font-heading font-bold border-b border-slate-200/60 pb-3">
                      <Plus size={18} />
                      <span className="text-sm">Single Student Manual Compiler</span>
                    </div>

                    <form onSubmit={handleManualResultSubmit} className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">Student Full Name</label>
                        <input 
                          type="text" 
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Amadi Chukwudi"
                          className="w-full bg-white p-2 border rounded"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">Registration Number</label>
                        <input 
                          type="text" 
                          value={studentReg}
                          onChange={(e) => setStudentReg(e.target.value)}
                          placeholder="e.g. HGASS/2025/005"
                          className="w-full bg-white p-2 border rounded font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Class</label>
                          <select value={studentClass} onChange={(e) => setStudentClass(e.target.value)} className="w-full bg-white p-1.5 border rounded">
                            <option value="JSS 1">JSS 1</option>
                            <option value="JSS 2">JSS 2</option>
                            <option value="JSS 3">JSS 3</option>
                            <option value="SS 1">SS 1</option>
                            <option value="SS 2">SS 2</option>
                            <option value="SS 3">SS 3</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Term</label>
                          <select value={resTerm} onChange={(e) => setResTerm(e.target.value)} className="w-full bg-white p-1.5 border rounded">
                            <option value="1st Term">1st Term</option>
                            <option value="2nd Term">2nd Term</option>
                            <option value="3rd Term">3rd Term</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Sex (Gender)</label>
                          <select value={studentGender} onChange={(e) => setStudentGender(e.target.value)} className="w-full bg-white p-1.5 border rounded">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Academic Session</label>
                          <div className="flex space-x-1">
                            <input 
                              type="text" 
                              value={resSession}
                              onChange={(e) => setResSession(e.target.value)}
                              placeholder="e.g. 2025/2026"
                              className="w-full bg-white p-1 border rounded text-[10px]"
                            />
                            <select 
                              onChange={(e) => setResSession(e.target.value)}
                              className="bg-white p-1 border rounded text-[10px] w-16 shrink-0"
                              value={resSession}
                            >
                              <option value="">Select...</option>
                              <option value="2023/2024">2023/2024</option>
                              <option value="2024/2025">2024/2025</option>
                              <option value="2025/2026">2025/2026</option>
                              <option value="2026/2027">2026/2027</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">Student Picture (URL)</label>
                        <div className="flex space-x-1.5">
                          <input 
                            type="text" 
                            value={studentPassportUrl}
                            onChange={(e) => setStudentPassportUrl(e.target.value)}
                            placeholder="e.g. https://i.ibb.co/..."
                            className="w-full bg-white p-2 border rounded font-mono text-[10px]"
                          />
                          <button
                            type="button"
                            onClick={() => setStudentPassportUrl(`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(studentName || 'student')}`)}
                            className="px-2 bg-slate-200 hover:bg-slate-300 rounded text-[9px] shrink-0 font-medium whitespace-nowrap"
                          >
                            Generate Avatar
                          </button>
                        </div>
                      </div>

                      {/* Overrides and Metadata */}
                      <div className="p-2.5 bg-slate-100 border rounded space-y-2">
                        <p className="text-[10px] text-slate-500 uppercase font-mono font-bold">Metadata Overrides</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Class Placement</label>
                            <input type="text" value={classPlacement} onChange={(e) => setClassPlacement(e.target.value)} placeholder="e.g. 1st out of 42" className="w-full bg-white p-1 border rounded" />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Class Standing</label>
                            <input type="text" value={classStanding} onChange={(e) => setClassStanding(e.target.value)} placeholder="e.g. Promoted to SS3" className="w-full bg-white p-1 border rounded" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Grade Point</label>
                            <input type="text" value={gradePoint} onChange={(e) => setGradePoint(e.target.value)} placeholder="e.g. 4.5" className="w-full bg-white p-1 border rounded" />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Accredited Grade Bracket</label>
                            <input type="text" value={accreditedGradeBracket} onChange={(e) => setAccreditedGradeBracket(e.target.value)} placeholder="e.g. Distinction" className="w-full bg-white p-1 border rounded" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Gross Total Marks (Override)</label>
                            <input type="number" value={grossTotalOverride} onChange={(e) => setGrossTotalOverride(e.target.value)} placeholder="Auto-calculated if empty" className="w-full bg-white p-1 border rounded text-[10px]" />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Terminal Average (Override)</label>
                            <input type="number" step="0.1" value={avgOverride} onChange={(e) => setAvgOverride(e.target.value)} placeholder="Auto-calculated if empty" className="w-full bg-white p-1 border rounded text-[10px]" />
                          </div>
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Principal's Remark</label>
                            <input type="text" value={principalRemark} onChange={(e) => setPrincipalRemark(e.target.value)} placeholder="Disciplined and focused student." className="w-full bg-white p-1 border rounded" />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-500 font-bold block">Teacher's Remark</label>
                            <input type="text" value={teacherRemark} onChange={(e) => setTeacherRemark(e.target.value)} placeholder="Good performance overall." className="w-full bg-white p-1 border rounded" />
                          </div>
                        </div>
                      </div>

                      {/* Manual subject elements */}
                      <div className="p-2.5 bg-white border rounded">
                        <p className="text-[10px] text-slate-400 uppercase font-mono font-bold mb-2">Subject Scorings</p>
                        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
                          <input type="text" value={subName} onChange={(e) => setSubName(e.target.value)} placeholder="Maths" className="col-span-1 p-1 bg-slate-50 border text-[10px] rounded" />
                          <input type="number" value={subCA1} onChange={(e) => setSubCA1(Number(e.target.value))} placeholder="CA1" className="p-1 bg-slate-50 border text-[10px] rounded text-center" />
                          <input type="number" value={subCA2} onChange={(e) => setSubCA2(Number(e.target.value))} placeholder="CA2" className="p-1 bg-slate-50 border text-[10px] rounded text-center" />
                          <input type="number" value={subExam} onChange={(e) => setSubExam(Number(e.target.value))} placeholder="Exam" className="p-1 bg-slate-50 border text-[10px] rounded text-center" />
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                          <input type="text" value={subGrade} onChange={(e) => setSubGrade(e.target.value)} placeholder="Grade (e.g. A, auto-computed if empty)" className="w-full p-1 bg-slate-50 border text-[10px] rounded" />
                          <input type="text" value={subRemarks} onChange={(e) => setSubRemarks(e.target.value)} placeholder="Remarks (auto-computed if empty)" className="w-full p-1 bg-slate-50 border text-[10px] rounded" />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddSubjectToManualList}
                          className="w-full py-1 mt-2 border border-brand-green bg-emerald-50 text-brand-green font-heading font-semibold text-[10px] rounded hover:bg-emerald-100 transition-all uppercase"
                        >
                          + Append Subject score ({manualSubjects.length})
                        </button>
                        
                        {manualSubjects.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {manualSubjects.map((s, idx) => (
                              <div key={idx} className="flex justify-between items-center text-[10px] bg-slate-50 p-1 rounded border">
                                <span>{s.subjectName} ({s.ca1Score} + {s.ca2Score} + {s.examScore} = {s.totalScore})</span>
                                <button 
                                  type="button"
                                  onClick={() => setManualSubjects(prev => prev.filter((_, i) => i !== idx))}
                                  className="text-brand-oxblood hover:text-rose-700 font-bold px-1"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-brand-green hover:bg-brand-green-hover text-white font-heading font-bold text-xs uppercase rounded shadow-xs"
                      >
                        Publish Student Term Sheet
                      </button>
                    </form>
                  </div>

                </div>

                {/* Published Listings & Export Center */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  {/* Active Database Connection Status Banner */}
                  <div className={`p-4 rounded-xl border ${isUsingCustomSupabase ? 'bg-emerald-50/50 border-emerald-200/60 text-emerald-800' : 'bg-amber-50/50 border-amber-200/60 text-amber-900'} text-xs flex flex-col md:flex-row md:items-center justify-between gap-3`}>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold font-heading uppercase text-[10px] tracking-wider">
                        <span className={`h-2 w-2 rounded-full ${isUsingCustomSupabase ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
                        <span>{isUsingCustomSupabase ? 'Connected to Your Supabase' : 'Connected to Shared Sandbox Supabase'}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {isUsingCustomSupabase 
                          ? `All data inputs and student gradebooks will sync directly to your personal project: ${activeSupabaseUrl}`
                          : 'Currently saving data to the pre-configured sandbox database. To view input items in your own personal Supabase project, simply add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the Secrets panel in the AI Studio settings.'
                        }
                      </p>
                    </div>
                    {!isUsingCustomSupabase && (
                      <div className="bg-amber-100/70 text-amber-900 px-2.5 py-1 rounded font-bold text-[10px] select-none self-start md:self-auto shrink-0 border border-amber-200/60 uppercase font-mono">
                        Sandbox Mode
                      </div>
                    )}
                  </div>

                  {/* Search, Filter and Export Toolbar */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-sm font-heading font-extrabold text-slate-800 flex items-center space-x-2">
                          <span>Compiled Gradebooks Registry</span>
                          <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                            {filteredResults.length} / {results.length}
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">
                          Search by student name or registration number, apply class filters, and export results directly to CSV.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleExportFiltered}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold text-xs uppercase rounded transition-colors inline-flex items-center space-x-1.5"
                          title="Export currently filtered students to CSV"
                        >
                          <FileDown size={13} className="text-brand-green" />
                          <span>Export Filtered ({filteredResults.length})</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleExportAll}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold text-xs uppercase rounded transition-colors inline-flex items-center space-x-1.5"
                          title="Export all database records to CSV"
                        >
                          <Download size={13} />
                          <span>Export All ({results.length})</span>
                        </button>
                        <button
                          type="button"
                          disabled={syncLoading}
                          onClick={handleSyncAllResults}
                          className="px-3 py-1.5 bg-brand-green hover:bg-brand-green-hover disabled:bg-slate-300 text-white font-heading font-bold text-xs uppercase rounded transition-colors inline-flex items-center space-x-1.5"
                        >
                          <Cloud size={13} className={syncLoading ? 'animate-pulse' : ''} />
                          <span>{syncLoading ? 'Syncing...' : 'Sync Supabase'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Filter controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                      <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={searchStudentQuery}
                          onChange={(e) => setSearchStudentQuery(e.target.value)}
                          placeholder="Search student or Reg No..."
                          className="w-full bg-slate-50 pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-brand-green"
                        />
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0">Class:</span>
                        <select
                          value={filterClass}
                          onChange={(e) => setFilterClass(e.target.value)}
                          className="w-full bg-slate-50 p-1.5 border border-slate-200 rounded text-xs font-medium"
                        >
                          <option value="All">All Classes</option>
                          <option value="JSS 1">JSS 1</option>
                          <option value="JSS 2">JSS 2</option>
                          <option value="JSS 3">JSS 3</option>
                          <option value="SS 1">SS 1</option>
                          <option value="SS 2">SS 2</option>
                          <option value="SS 3">SS 3</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0">Term:</span>
                        <select
                          value={filterTerm}
                          onChange={(e) => setFilterTerm(e.target.value)}
                          className="w-full bg-slate-50 p-1.5 border border-slate-200 rounded text-xs font-medium"
                        >
                          <option value="All">All Terms</option>
                          <option value="1st Term">1st Term</option>
                          <option value="2nd Term">2nd Term</option>
                          <option value="3rd Term">3rd Term</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] text-slate-400 uppercase font-mono font-bold shrink-0">Session:</span>
                        <select
                          value={filterSession}
                          onChange={(e) => setFilterSession(e.target.value)}
                          className="w-full bg-slate-50 p-1.5 border border-slate-200 rounded text-xs font-medium"
                        >
                          <option value="All">All Sessions</option>
                          <option value="2025/2026">2025/2026</option>
                          <option value="2024/2025">2024/2025</option>
                          <option value="2023/2024">2023/2024</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {syncSuccess && (
                    <div className="p-2.5 bg-emerald-50 text-emerald-600 text-xs rounded border border-emerald-100 font-medium leading-none">
                      {syncSuccess}
                    </div>
                  )}
                  {syncError && (
                    <div className="p-2.5 bg-rose-50 text-brand-oxblood text-xs rounded border border-brand-oxblood/15 font-medium leading-none">
                      {syncError}
                    </div>
                  )}

                  {/* List of Gradebooks */}
                  {filteredResults.length > 0 ? (
                    <div className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
                      {filteredResults.map((r, i) => (
                        <div key={`${r.studentProfile.regNumber}-${r.academicSession}-${r.term}-${i}`} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={r.studentProfile.passportUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.studentProfile.name)}`} 
                              alt={r.studentProfile.name} 
                              className="w-10 h-10 rounded-full border border-slate-200 bg-slate-100 object-cover shrink-0"
                            />
                            <div className="space-y-0.5">
                              <div className="flex items-center space-x-2">
                                <h5 className="font-heading font-bold text-slate-800 text-xs sm:text-sm">
                                  {r.studentProfile.name}
                                </h5>
                                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded font-mono">
                                  {r.studentProfile.studentClass}
                                </span>
                                {r.position && (
                                  <span className="text-[10px] text-slate-500 font-medium">
                                    • Pos: {r.position}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 font-mono">
                                Reg: <span className="text-slate-600 font-semibold">{r.studentProfile.regNumber}</span> • {r.academicSession} • {r.term} • Avg: <span className="text-brand-green font-bold">{r.averageScore}%</span> ({r.subjects?.length || 0} subjects)
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => handleExportSingleStudent(r)}
                              className="py-1 px-2.5 border border-slate-200 rounded-md bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-[10px] font-semibold flex items-center space-x-1 transition-colors"
                              title="Export this student's gradebook as CSV"
                            >
                              <Download size={11} className="text-brand-green" />
                              <span>CSV</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleLoadResultForEdit(r)}
                              className="py-1 px-2.5 border border-slate-200 rounded-md bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 text-[10px] font-semibold flex items-center space-x-1 transition-colors"
                            >
                              <Edit size={11} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteResult(r.studentProfile.regNumber, r.academicSession, r.term)}
                              className="py-1 px-2.5 border border-rose-200 rounded-md bg-white text-brand-oxblood hover:bg-rose-50 hover:text-brand-oxblood text-[10px] font-semibold flex items-center space-x-1 transition-colors"
                            >
                              <Trash2 size={11} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                      <FileSpreadsheet size={32} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-500 font-heading font-medium">No student gradebooks match your search filter.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Try changing your search terms or upload a new CSV class roster.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* 7. PARENTS FEEDBACK TICKETS REVIEW */}
            {activeTab === 'messages' && (
              <div className="space-y-8 animate-fade-in text-xs sm:text-sm">
                <h3 className="text-xl font-heading font-extrabold text-slate-800 border-b border-slate-100 pb-3">
                  Received Parent Inquiries
                </h3>

                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((m) => (
                      <div 
                        key={m.id} 
                        className={`p-6 rounded-xl border relative shadow-xs flex flex-col justify-between space-y-4 ${
                          m.read ? 'bg-slate-50 border-slate-200' : 'bg-white border-brand-green/20 ring-1 ring-brand-green/5'
                        }`}
                      >
                        {/* Upper line metadata */}
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h4 className="font-heading font-extrabold text-slate-900 text-base">{m.name}</h4>
                            <p className="text-[10px] font-mono text-slate-400">{m.date} • Link: {m.email} • {m.phone}</p>
                          </div>
                          {!m.read ? (
                            <span className="bg-brand-oxblood text-white font-heading font-bold uppercase py-0.5 px-2 rounded-full tracking-wider text-[9px] animate-pulse shrink-0">
                              unread ticket
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-500 font-heading py-0.5 px-2 rounded font-mono text-[9px] uppercase tracking-wide shrink-0">
                              Archived read
                            </span>
                          )}
                        </div>

                        {/* Speech bubble */}
                        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed italic bg-slate-50/50 p-3 rounded">
                          "{m.message}"
                        </p>

                        {/* Actions */}
                        <div className="flex space-x-2 self-start border-t border-slate-100/60 pt-3 w-full">
                          {!m.read && (
                            <button
                              onClick={() => markMessageRead(m.id)}
                              className="py-1 px-3 border border-brand-green/30 bg-emerald-50 text-brand-green font-heading font-bold text-[10px] rounded uppercase"
                            >
                              ✓ Mark ticket as resolved
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(m.id)}
                            className="py-1 px-3 border rounded text-[10px] text-slate-500 hover:bg-slate-50 font-bold uppercase"
                          >
                            Purge ticket
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200/80">
                    <MessageSquare size={36} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-heading font-medium">No active parent support tickets found inside state registry.</p>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
