-- Seed categories for Treston Inflatable for Sale and Rentals
INSERT INTO categories (name, slug, description, image_url) VALUES
  (
    'Bounce Houses',
    'bounce-houses',
    'Classic inflatable bounce houses perfect for birthday parties, school events, and backyard fun. Safe, clean, and delivered on time.',
    NULL
  ),
  (
    'Water Slides',
    'water-slides',
    'Beat the heat with our thrilling water slides. From gentle slopes for toddlers to massive drops for teens and adults.',
    NULL
  ),
  (
    'Obstacle Courses',
    'obstacle-courses',
    'Action-packed inflatable obstacle courses that challenge kids and adults alike. Great for competitive events and team-building.',
    NULL
  ),
  (
    'Mechanical Bulls',
    'mechanical-bulls',
    'The ultimate crowd-pleaser. Our mechanical bulls are safe, adjustable, and guaranteed to bring laughs to any event.',
    NULL
  ),
  (
    'Combo Units',
    'combo-units',
    'Get more bang for your buck with our combo inflatables that combine bounce houses, slides, and obstacle features in one.',
    NULL
  ),
  (
    'Interactive Games',
    'interactive-games',
    'From giant Jenga to inflatable sports games, our interactive options keep guests engaged and entertained all event long.',
    NULL
  )
ON CONFLICT (slug) DO NOTHING;
