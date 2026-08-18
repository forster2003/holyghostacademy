/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudentResult, SubjectScore } from '../types';

/**
 * Robust CSV Line Parser that handles quotes, escaped quotes, and commas inside fields.
 */
export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Helper to escape a value for CSV formatting.
 */
function escapeCSVField(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Generates standard sample CSV content template for Holy Ghost Academy gradebooks.
 */
export function generateResultsCSVTemplate(): string {
  const headers = [
    'Student Name',
    'Registration Number',
    'Class',
    'Gender',
    'Academic Session',
    'Term',
    'Subject',
    'CA1 Score',
    'CA2 Score',
    'Exam Score',
    'Class Position',
    'Class Standing',
    'Attendance',
    'Principal Remark',
    'Teacher Remark'
  ].join(',');

  const rows = [
    'Forster Anarado,HGASS/2025/001,SS 2,Male,2025/2026,2nd Term,Mathematics,18,17,55,1st out of 42,Promoted to SS 3,88 of 90 days,Exceptional academic performance.,Dedicated and highly disciplined.',
    'Forster Anarado,HGASS/2025/001,SS 2,Male,2025/2026,2nd Term,English Language,16,18,52,1st out of 42,Promoted to SS 3,88 of 90 days,Exceptional academic performance.,Dedicated and highly disciplined.',
    'Forster Anarado,HGASS/2025/001,SS 2,Male,2025/2026,2nd Term,Biology,19,19,54,1st out of 42,Promoted to SS 3,88 of 90 days,Exceptional academic performance.,Dedicated and highly disciplined.',
    'Chisom Obi,HGASS/2025/002,SS 2,Female,2025/2026,2nd Term,Mathematics,15,16,48,2nd out of 42,Promoted to SS 3,85 of 90 days,Very good term result.,Active and attentive learner.',
    'Chisom Obi,HGASS/2025/002,SS 2,Female,2025/2026,2nd Term,English Language,17,19,50,2nd out of 42,Promoted to SS 3,85 of 90 days,Very good term result.,Active and attentive learner.',
    'Chisom Obi,HGASS/2025/002,SS 2,Female,2025/2026,2nd Term,Chemistry,16,17,49,2nd out of 42,Promoted to SS 3,85 of 90 days,Very good term result.,Active and attentive learner.'
  ].join('\n');

  return `${headers}\n${rows}`;
}

/**
 * Downloads a pre-formatted Gradebook CSV Template to the user's browser.
 */
export function downloadCSVTemplate(): void {
  const csvContent = generateResultsCSVTemplate();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'HGASS_Gradebook_Import_Template.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports an array of StudentResult objects to a downloadable CSV file.
 */
export function exportResultsToCSV(results: StudentResult[], customFilename?: string): { success: boolean; count: number } {
  if (!results || results.length === 0) {
    return { success: false, count: 0 };
  }

  const headers = [
    'Student Name',
    'Registration Number',
    'Class',
    'Gender',
    'Academic Session',
    'Term',
    'Subject',
    'CA1 Score',
    'CA2 Score',
    'Exam Score',
    'Total Score',
    'Grade',
    'Remarks',
    'Terminal Total',
    'Terminal Average',
    'Class Position',
    'Class Standing',
    'Grade Point',
    'Attendance',
    'Principal Remark',
    'Teacher Remark',
    'Passport URL'
  ].join(',');

  const rows: string[] = [];

  results.forEach(res => {
    const profile = res.studentProfile;
    const subjects = res.subjects && res.subjects.length > 0 
      ? res.subjects 
      : [{
          subjectName: 'General Assessment',
          ca1Score: 0,
          ca2Score: 0,
          examScore: 0,
          totalScore: res.totalScore || 0,
          grade: 'N/A',
          remarks: 'Standard Evaluation'
        }];

    subjects.forEach(sub => {
      const row = [
        escapeCSVField(profile.name),
        escapeCSVField(profile.regNumber),
        escapeCSVField(profile.studentClass),
        escapeCSVField(profile.gender),
        escapeCSVField(res.academicSession),
        escapeCSVField(res.term),
        escapeCSVField(sub.subjectName),
        escapeCSVField(sub.ca1Score),
        escapeCSVField(sub.ca2Score),
        escapeCSVField(sub.examScore),
        escapeCSVField(sub.totalScore),
        escapeCSVField(sub.grade),
        escapeCSVField(sub.remarks),
        escapeCSVField(res.totalScore),
        escapeCSVField(res.averageScore),
        escapeCSVField(res.position),
        escapeCSVField(res.classStanding || ''),
        escapeCSVField(res.gradePoint || ''),
        escapeCSVField(res.attendance),
        escapeCSVField(res.principalRemark),
        escapeCSVField(res.teacherRemark),
        escapeCSVField(profile.passportUrl || '')
      ].join(',');
      rows.push(row);
    });
  });

  const csvContent = `${headers}\n${rows.join('\n')}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const timestamp = new Date().toISOString().split('T')[0];
  link.setAttribute('download', customFilename || `HGASS_Gradebooks_Export_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { success: true, count: results.length };
}

/**
 * Parses raw CSV string into StudentResult array.
 */
export function parseGradebookCSV(csvText: string): { 
  success: boolean; 
  results: StudentResult[]; 
  count: number; 
  message: string 
} {
  try {
    if (!csvText || !csvText.trim()) {
      return { success: false, results: [], count: 0, message: 'CSV text is empty.' };
    }

    // Normalize lines across CRLF and LF
    const rawLines = csvText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (rawLines.length < 2) {
      return { success: false, results: [], count: 0, message: 'CSV must contain a header row and at least one data row.' };
    }

    const groupResults: { [key: string]: StudentResult } = {};

    for (let i = 1; i < rawLines.length; i++) {
      const cols = parseCSVLine(rawLines[i]);
      if (cols.length < 7) continue; // Minimum required columns

      const name = cols[0] || 'Unnamed Student';
      const regNo = cols[1] || `HGASS/${new Date().getFullYear()}/${String(i).padStart(3, '0')}`;
      const sClass = cols[2] || 'SS 1';
      const gender = cols[3] || 'Male';
      const session = cols[4] || '2025/2026';
      const term = cols[5] || '1st Term';
      const subject = cols[6] || 'General Subject';
      const ca1 = parseInt(cols[7], 10) || 0;
      const ca2 = parseInt(cols[8], 10) || 0;
      const exam = parseInt(cols[9], 10) || 0;
      const position = cols[10] || 'In Review';
      const classStanding = cols[11] || 'Promoted';
      const attendance = cols[12] || '85 of 90 days';
      const principalRemark = cols[13] || 'Satisfactory academic conduct.';
      const teacherRemark = cols[14] || 'Good effort and dedication.';

      const total = ca1 + ca2 + exam;
      let grade = 'F';
      let remarks = 'Fail';
      if (total >= 80) { grade = 'A'; remarks = 'Distinction'; }
      else if (total >= 70) { grade = 'B'; remarks = 'Very Good'; }
      else if (total >= 55) { grade = 'C'; remarks = 'Good'; }
      else if (total >= 45) { grade = 'D'; remarks = 'Pass'; }
      else if (total >= 40) { grade = 'E'; remarks = 'Pass'; }

      const key = `${regNo.toLowerCase()}_${session}_${term}`;

      if (!groupResults[key]) {
        groupResults[key] = {
          studentProfile: {
            name,
            regNumber: regNo,
            studentId: regNo.replace(/\//g, '-'),
            studentClass: sClass,
            gender,
            academicYear: session,
            term,
            passportUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`
          },
          academicSession: session,
          term,
          subjects: [],
          totalScore: 0,
          averageScore: 0,
          position,
          classStanding,
          attendance,
          principalRemark,
          teacherRemark,
          isPublished: true
        };
      }

      // Check if subject already exists
      const existingSubIndex = groupResults[key].subjects.findIndex(
        s => s.subjectName.toLowerCase() === subject.toLowerCase()
      );

      const scoreObj: SubjectScore = {
        subjectName: subject,
        ca1Score: ca1,
        ca2Score: ca2,
        examScore: exam,
        totalScore: total,
        grade,
        remarks
      };

      if (existingSubIndex >= 0) {
        groupResults[key].subjects[existingSubIndex] = scoreObj;
      } else {
        groupResults[key].subjects.push(scoreObj);
      }
    }

    const parsedList = Object.values(groupResults);
    if (parsedList.length === 0) {
      return { success: false, results: [], count: 0, message: 'No valid student gradebook rows could be extracted.' };
    }

    // Compute grand totals and averages for each compiled student
    parsedList.forEach(res => {
      const subTotal = res.subjects.reduce((sum, item) => sum + item.totalScore, 0);
      res.totalScore = subTotal;
      res.averageScore = res.subjects.length > 0 ? parseFloat((subTotal / res.subjects.length).toFixed(1)) : 0;
    });

    return {
      success: true,
      results: parsedList,
      count: parsedList.length,
      message: `Successfully compiled ${parsedList.length} student gradebook(s) with ${parsedList.reduce((acc, r) => acc + r.subjects.length, 0)} total subject scores.`
    };
  } catch (err: any) {
    return {
      success: false,
      results: [],
      count: 0,
      message: `CSV parsing failure: ${err.message || 'Malformed CSV format'}`
    };
  }
}
