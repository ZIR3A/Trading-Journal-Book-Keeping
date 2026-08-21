export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/analytics/', '/settings/', '/trades/', '/api/'],
    },
    sitemap: 'https://trading-journal-book-keeping.vercel.app/sitemap.xml',
  };
}
