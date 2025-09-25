// Cloudflare Worker for edge-side optimizations
// This runs at the Cloudflare edge for maximum performance

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Add security headers at the edge
  const response = await fetch(request)

  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response)

  // Add Cloudflare-specific security headers
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('X-XSS-Protection', '1; mode=block')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newResponse.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  // Optimize caching for static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)$/)) {
    newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    newResponse.headers.set('CDN-Cache-Control', 'max-age=31536000')
  }

  // Short cache for HTML to allow updates
  if (url.pathname.match(/\.(html|htm)$/)) {
    newResponse.headers.set('Cache-Control', 'public, max-age=0, s-maxage=300, must-revalidate')
    newResponse.headers.set('CDN-Cache-Control', 'max-age=300')
  }

  // Add performance monitoring
  if (url.pathname === '/') {
    // Track performance metrics
    const cfRay = request.cf?.ray || 'unknown'
    console.log(`Request served from ${cfRay} for ${url.pathname}`)
  }

  return newResponse
}

// Optional: Add URL transformations for linktree-style redirects
// Uncomment and customize as needed:
/*
async function handleRedirects(url) {
  const redirects = {
    '/linkedin': 'https://www.linkedin.com/in/brasileiro',
    '/github': 'https://github.com/yourusername',
    '/twitter': 'https://twitter.com/yourusername',
  }

  if (redirects[url.pathname]) {
    return Response.redirect(redirects[url.pathname], 301)
  }
}
*/
