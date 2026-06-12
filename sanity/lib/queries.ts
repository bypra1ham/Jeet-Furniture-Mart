// Fetch all products
export const allProductsQuery = `*[_type == "product"] | order(createdAt desc)`;

// Fetch featured products for homepage highlighting
export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(createdAt desc)`;

// Fetch products in a specific category
export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(createdAt desc)`;

// Fetch a single product by category and slug
export const productBySlugQuery = `*[_type == "product" && category == $category && slug.current == $slug][0]`;

// Fetch all slugs and categories for static generation (generateStaticParams)
export const productSlugsQuery = `*[_type == "product"] { category, "slug": slug.current }`;

// Fetch all approved testimonials
export const approvedTestimonialsQuery = `*[_type == "testimonial" && approved == true] | order(_createdAt desc)`;

// Fetch top 5 most viewed products
export const topViewedProductsQuery = `*[_type == "product"] | order(viewCount desc)[0...5] {
  _id,
  name,
  category,
  viewCount,
  slug
}`;

// Fetch category view count aggregations
export const categoryViewsQuery = `*[_type == "product"] {
  category,
  viewCount
}`;
