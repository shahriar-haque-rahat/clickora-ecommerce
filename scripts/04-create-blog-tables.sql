-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample blog categories
INSERT INTO blog_categories (name, slug, description) VALUES
('Technology', 'technology', 'Latest tech news and reviews'),
('Product Reviews', 'product-reviews', 'In-depth product reviews'),
('Buying Guides', 'buying-guides', 'Help you make the right purchase'),
('Industry News', 'industry-news', 'Electronics industry updates');
