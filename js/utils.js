import Cookies from 'js-cookie';

export function isEmpty(inputValue) {
  return !inputValue;
}

export function isAuth() {
  return Cookies.get('auth-key') && Cookies.get('email');
}
