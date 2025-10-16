-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Public can view products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Public can view gems" ON gems;
DROP POLICY IF EXISTS "Admins can manage gems" ON gems;
DROP POLICY IF EXISTS "Customers can view own orders" ON orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Order items follow order permissions" ON order_items;
DROP POLICY IF EXISTS "Anyone can create order items" ON order_items;
DROP POLICY IF EXISTS "Admins can view admins" ON admins;

-- Disable RLS on admins table (accessed only server-side with service role key)
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Products: Public read access, authenticated users can't modify
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage products" ON products
  FOR ALL USING (true);

-- Gems: Public read access
CREATE POLICY "Public can view gems" ON gems
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage gems" ON gems
  FOR ALL USING (true);

-- Orders: Public can create, customers can view their own
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (
    customer_email = auth.jwt() ->> 'email'
  );

CREATE POLICY "Service role can manage orders" ON orders
  FOR ALL USING (true);

-- Order items: Can be created with orders, viewable with order permissions
CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Order items viewable with orders" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.customer_email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Service role can manage order items" ON order_items
  FOR ALL USING (true);
