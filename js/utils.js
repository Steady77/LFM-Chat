import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns';

export function isEmpty(inputValue) {
  return !inputValue;
}

export function isTokenAuth() {
  return Cookies.get('auth-key');
}

export function isEmailAuth() {
  return Cookies.get('email');
}

export function setTime(data) {
  return format(parseISO(data), 'HH:mm');
}

export function getToken() {
  return `Bearer ${Cookies.get('auth-key')}`;
}

export function throttle(func, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      func(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
