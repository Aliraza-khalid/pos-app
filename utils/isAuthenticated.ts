export const isAuthenticated = () => {
  const value = localStorage.getItem('accessToken');
  return !!value;
}