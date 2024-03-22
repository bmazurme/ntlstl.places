const WHITE_LIST = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:3005',
  'http://localhost:3000',
  'http://51.250.9.33:8081',
  'https://51.250.9.33:8081',
  'https://places.ntlstl.dev',
];

const METHODS = [
  'GET',
  'HEAD',
  'PUT',
  'PATCH',
  'POST',
  'DELETE',
];

const ALLOWED_HEADERS = [
  'Content-Type',
  'origin',
  'x-access-token',
  'X-Requested-With',
  'Accept',
];

export { METHODS, ALLOWED_HEADERS, WHITE_LIST };
