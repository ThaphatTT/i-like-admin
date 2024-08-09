function auth({ next, router }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return router.push({ name: 'sign-in' });
  }

  return next();
}

export default auth