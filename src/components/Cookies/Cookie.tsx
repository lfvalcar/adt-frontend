import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string, options = {}): void => {
  Cookies.set(name, value, options);
};

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export const cookieExpiration = (minutes: number): Date => {
  const now = new Date();
  now.setTime(now.getTime() + minutes * 60000); // Convertir minutos a milisegundos
  return now;
};
