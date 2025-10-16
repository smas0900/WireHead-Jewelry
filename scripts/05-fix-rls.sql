-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view admins" ON admins;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage gems" ON gems;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

-- Disable RLS on admins table to avoid recursion
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Simplified admin policies using direct auth check
CREATE POLICY "Authenticated users can manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gems" ON gems
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update orders" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');
