-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

DROP POLICY IF EXISTS "Anyone can view gems" ON gems;
DROP POLICY IF EXISTS "Admins can insert gems" ON gems;
DROP POLICY IF EXISTS "Admins can update gems" ON gems;
DROP POLICY IF EXISTS "Admins can delete gems" ON gems;

DROP POLICY IF EXISTS "Anyone can view orders" ON orders;
DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
DROP POLICY IF EXISTS "Anyone can insert order items" ON order_items;

DROP POLICY IF EXISTS "Admins can view admins" ON admins;
DROP POLICY IF EXISTS "Admins can insert admins" ON admins;

-- Disable RLS on admins table to prevent recursion
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Create simple policies without admin checks
-- Products: public read, no write restrictions for now
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public can insert products" ON products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update products" ON products
  FOR UPDATE USING (true);

CREATE POLICY "Public can delete products" ON products
  FOR DELETE USING (true);

-- Gems: public read, no write restrictions for now
CREATE POLICY "Public can view gems" ON gems
  FOR SELECT USING (true);

CREATE POLICY "Public can insert gems" ON gems
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update gems" ON gems
  FOR UPDATE USING (true);

CREATE POLICY "Public can delete gems" ON gems
  FOR DELETE USING (true);

-- Orders: public access for now
CREATE POLICY "Public can view orders" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Public can insert orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can update orders" ON orders
  FOR UPDATE USING (true);

-- Order items: public access
CREATE POLICY "Public can view order_items" ON order_items
  FOR SELECT USING (true);

CREATE POLICY "Public can insert order_items" ON order_items
  FOR INSERT WITH CHECK (true);
