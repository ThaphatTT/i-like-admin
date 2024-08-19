export function hasToken() {
  return !!localStorage.getItem('token');
}

export function auth({ next, router }) {
  if (!hasToken()) {
    return router.push({ name: 'sign-in' });
  }
  return next();
}