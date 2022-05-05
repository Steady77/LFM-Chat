import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns';

export function isEmpty(inputValue) {
  return !inputValue;
}

export function isAuth() {
  return Cookies.get('auth-key') && Cookies.get('email');
}

export function setTime(data) {
  return format(parseISO(data), 'HH:mm');
}

export function getToken() {
  return `Bearer ${Cookies.get('auth-key')}`;
}
