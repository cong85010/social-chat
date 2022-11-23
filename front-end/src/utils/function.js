export const getToken = () => JSON.parse(localStorage.getItem('accessToken')) || '';
