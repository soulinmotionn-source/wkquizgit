/**
 * Cloudflare Worker Entry Point
 * Serves static assets from dist/ directory (HTML, CSS, JS, and question-bank JSON).
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try serving the requested static asset directly from dist
    let response = await env.ASSETS.fetch(request);

    // If route not found and not a question-bank JSON file, serve index.html (SPA fallback)
    if (response.status === 404 && !url.pathname.includes("/question-bank/")) {
      const indexRequest = new Request(new URL("/index.html", request.url), request);
      response = await env.ASSETS.fetch(indexRequest);
    }

    return response;
  }
};
