-- Add password column to admins table if it doesn't exist
ALTER TABLE admins ADD COLUMN IF NOT EXISTS password TEXT;

-- Update existing admin with a default password (CHANGE THIS!)
-- Default password: admin123 (you MUST change this after first login)
UPDATE admins SET password = 'admin123' WHERE email = 'admin@example.com';

-- Insert a default admin if none exists
INSERT INTO admins (email, password, created_at)
VALUES ('admin@example.com', 'admin123', NOW())
ON CONFLICT (email) DO NOTHING;
