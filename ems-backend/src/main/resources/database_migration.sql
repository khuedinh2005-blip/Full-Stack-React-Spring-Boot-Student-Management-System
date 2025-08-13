-- Migration script to add student_id column to students table
-- Run this script if you need to manually add the student_id column

-- Add student_id column to students table (nullable for existing records)
ALTER TABLE students ADD COLUMN student_id VARCHAR(255) UNIQUE AFTER id;

-- Optional: Add an index for better search performance
CREATE INDEX idx_student_id ON students(student_id);

-- Auto-generate student IDs for existing records that don't have them
UPDATE students SET student_id = CONCAT('STU', LPAD(id, 6, '0')) WHERE student_id IS NULL OR student_id = '';

-- Note: With spring.jpa.hibernate.ddl-auto=update, 
-- this migration should happen automatically when you restart the application.
-- However, existing records will need student IDs assigned manually or through this script.