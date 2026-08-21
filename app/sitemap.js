export default function sitemap() {
  const baseUrl = 'https://tradingjournal.app';
  
  const routes = [
    '',
    '/product',
    '/how-it-works',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Legal routes should have lower priority
  const legalRoutes = [
    '/privacy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...routes, ...legalRoutes];
}
