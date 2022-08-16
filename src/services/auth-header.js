// to access protected resource, HTTP request needs Authorisation header
export default function authHeader() {
    // checks Local Storage for user item
    const user = JSON.parse(localStorage.getItem('user'));
  
    // if there is a logged in user with accessToken (JWT), return HTTP Authorization header
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
    // return an empty object
      return {};
    }
}