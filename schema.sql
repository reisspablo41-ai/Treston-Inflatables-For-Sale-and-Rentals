-- Create Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

-- Create Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    dimensions VARCHAR(50),
    base_price DECIMAL(10, 2),
    is_wet BOOLEAN DEFAULT FALSE,
    requires_staff BOOLEAN DEFAULT FALSE,
    stock_quantity INT DEFAULT 1,
    status VARCHAR(20) CHECK (status IN ('active', 'maintenance', 'retired')) DEFAULT 'active',
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create Product Images Table
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INT,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create Content Management Table for Policy Pages
CREATE TABLE company_content (
    id SERIAL PRIMARY KEY,
    page_title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Supabase Storage Configuration & Policies
-- ==========================================
-- Note: You should have a public bucket created called "slide"

-- Policy: Allow anyone to view/read objects in the "slide" bucket
CREATE POLICY "Allow public reads for slide bucket" 
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'slide');

-- Policy: Allow uploads to the "slide" bucket
CREATE POLICY "Allow public uploads to slide bucket" 
ON storage.objects FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'slide');

-- Policy: Allow object deletions in the "slide" bucket
CREATE POLICY "Allow public deletions in slide bucket" 
ON storage.objects FOR DELETE 
TO public 
USING (bucket_id = 'slide');

-- Policy: Allow object updates in the "slide" bucket
CREATE POLICY "Allow public updates in slide bucket" 
ON storage.objects FOR UPDATE 
TO public 
USING (bucket_id = 'slide');