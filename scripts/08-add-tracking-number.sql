-- Add tracking_number column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT UNIQUE;

-- Create index for faster tracking number lookups
CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON orders(tracking_number);
