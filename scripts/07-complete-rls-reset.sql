-- Complete RLS Reset - Fixes infinite recursion
-- Run this script to remove all problematic policies and start fresh

-- Drop ALL existing policies on all tables
DROP POLICY IF EXISTS "Anyone can view products" ON products;
DROP POLICY IF EXISTS "Admins can insert products" ON products;
DROP POLICY IF EXISTS "Admins can update products" ON products;
DROP POLICY IF EXISTS "Admins can delete products" ON products;

DROP POLICY IF EXISTS "Anyone can view gems" ON gems;
DROP POLICY IF EXISTS "Admins can insert gems" ON gems;
DROP POLICY IF EXISTS "Admins can update gems" ON gems;
DROP POLICY IF EXISTS "Admins can delete gems" ON gems;

DROP POLICY IF EXISTS "Anyone can view orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

DROP POLICY IF EXISTS "Anyone can view order items" ON order_items;
DROP POLICY IF EXISTS "Authenticated users can create order items" ON order_items;

DROP POLICY IF EXISTS "Admins can view admins" ON admins;
DROP POLICY IF EXISTS "Admins can insert admins" ON admins;

-- Disable RLS on admins table completely
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;

-- Disable RLS on all tables for now (simplest solution)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE gems DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- If you want basic security later, you can enable RLS and add simple policies
-- For now, this removes all recursion issues
