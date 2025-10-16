-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gems ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Products: Public read access, admin write access
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins WHERE admins.id = auth.uid()
    )
  );

-- Gems: Public read access, admin write access
CREATE POLICY "Public can view gems" ON gems
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage gems" ON gems
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admins WHERE admins.id = auth.uid()
    )
  );

-- Orders: Customers can view their own orders, admins can view all
CREATE POLICY "Customers can view own orders" ON orders
  FOR SELECT USING (customer_email = auth.jwt() ->> 'email' OR EXISTS (
    SELECT 1 FROM admins WHERE admins.id = auth.uid()
  ));

CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admins WHERE admins.id = auth.uid()
    )
  );

-- Order items: Follow order permissions
CREATE POLICY "Order items follow order permissions" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.customer_email = auth.jwt() ->> 'email' OR EXISTS (
        SELECT 1 FROM admins WHERE admins.id = auth.uid()
      ))
    )
  );

CREATE POLICY "Anyone can create order items" ON order_items
  FOR INSERT WITH CHECK (true);

-- Admins: Only admins can view admin table
CREATE POLICY "Admins can view admins" ON admins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admins WHERE admins.id = auth.uid()
    )
  );
