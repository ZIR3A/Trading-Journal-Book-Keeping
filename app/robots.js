export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/analytics/', '/settings/', '/trades/', '/api/'],
    },
    sitemap: 'https://tradingjournal.app/sitemap.xml',
  };
}
