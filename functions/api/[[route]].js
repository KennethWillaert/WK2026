export async function onRequest(context) {
  const url = new URL(context.request.url);
  const workerUrl = 'https://wk2026-api.djduuub.workers.dev' + url.pathname + url.search;

  return fetch(workerUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });
}
