const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
);

const API_URL = isLocalhost
  ? 'http://localhost:3000'
  : 'https://iiuc-eventera-server.onrender.com';

export default API_URL;
