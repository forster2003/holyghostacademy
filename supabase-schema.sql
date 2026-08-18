-- ====================================================================
-- SUPABASE / POSTGRESQL DATABASE SCHEMA
-- COPY AND PASTE THIS ENTIRE FILE INTO THE SUPABASE SQL EDITOR TO CREATE TABLES
-- ====================================================================

-- 1. School Stats Table
CREATE TABLE IF NOT EXISTS school_stats (
    id SERIAL PRIMARY KEY,
    students INT DEFAULT 0,
    teachers INT DEFAULT 0,
    graduates INT DEFAULT 0,
    awards INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial stats if empty
INSERT INTO school_stats (id, students, teachers, graduates, awards)
VALUES (1, 850, 42, 1200, 15)
ON CONFLICT (id) DO NOTHING;

-- 2. Ongoing Projects Table
CREATE TABLE IF NOT EXISTS ongoing_projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    budget TEXT,
    percentage_completion INT DEFAULT 0,
    start_date TEXT,
    expected_completion_date TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Gallery Items Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT NOT NULL, -- 'image' or 'video'
    embed_url TEXT,
    upload_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. News Posts Table
CREATE TABLE IF NOT EXISTS news_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    category TEXT NOT NULL,
    image_url TEXT,
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Legal Documents Table
CREATE TABLE IF NOT EXISTS legal_documents (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size TEXT DEFAULT '1.0 MB',
    download_url TEXT,
    upload_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    reg_number TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    student_id TEXT,
    student_class TEXT,
    gender TEXT,
    academic_year TEXT,
    term TEXT,
    passport_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Student Results Table
CREATE TABLE IF NOT EXISTS student_results (
    id SERIAL PRIMARY KEY,
    reg_number TEXT NOT NULL REFERENCES student_profiles(reg_number) ON DELETE CASCADE,
    academic_session TEXT NOT NULL,
    term TEXT NOT NULL,
    total_score NUMERIC DEFAULT 0,
    average_score NUMERIC DEFAULT 0,
    position TEXT,
    class_standing TEXT DEFAULT 'Promoted',
    grade_point NUMERIC,
    attendance TEXT,
    principal_remark TEXT,
    teacher_remark TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_session_term UNIQUE (reg_number, academic_session, term)
);

-- 8. Subject Scores Table (Cascade on result delete)
CREATE TABLE IF NOT EXISTS subject_scores (
    id SERIAL PRIMARY KEY,
    result_id INT NOT NULL REFERENCES student_results(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    ca1_score NUMERIC DEFAULT 0,
    ca2_score NUMERIC DEFAULT 0,
    exam_score NUMERIC DEFAULT 0,
    total_score NUMERIC DEFAULT 0,
    grade TEXT,
    remarks TEXT
);

-- 9. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT NOT NULL,
    date TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
