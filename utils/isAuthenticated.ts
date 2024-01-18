const isAuthenticated = () => {
  const value = localStorage.getItem('accessToken');
  return !!value;
}

export default isAuthenticated;