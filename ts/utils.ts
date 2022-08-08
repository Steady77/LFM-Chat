import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns';

export function isEmpty(inputValue: string): boolean {
  return !inputValue;
}

export function isTokenAuth(): boolean {
  return !!Cookies.get('auth-key');
}

export function isEmailAuth(): boolean {
  return !!Cookies.get('email');
}

export function setTime(data: string): string {
  return format(parseISO(data), 'HH:mm');
}

export function getToken(): string {
  return `Bearer ${Cookies.get('auth-key')}`;
}

export function hidePreloader(elem: HTMLElement) {
  elem.classList.remove('preloader--active');
}

export function showPreloader(elem: HTMLElement) {
  elem.classList.add('preloader--active');
}

export function throttle(func: Function, timeout: number) {
  let timer: number | null = null;

  return function perform(...args: []) {
    if (timer) return;

    timer = setTimeout(() => {
      func(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}
