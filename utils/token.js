export const setToken = token => {
  localStorage.setItem('GITHUB-token', token);
};

export const getToken = () => localStorage.getItem('GITHUB-token');
