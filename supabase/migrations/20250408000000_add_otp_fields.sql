-- Add OTP fields to auth.users or your custom users table
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS otp VARCHAR(6);
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS otp_expiry TIMESTAMP WITH TIME ZONE;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;