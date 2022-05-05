import { getToken } from './utils';

const BASE_URL = 'https://mighty-cove-31255.herokuapp.com/api/';
const JSON_TYPE = 'application/json;charset=utf-8';

export const API = {
  sendEmail(email) {
    const URL = `${BASE_URL}user`;

    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': JSON_TYPE,
      },
      body: JSON.stringify({ email }),
    });
  },

  sendName(name) {
    const URL = `${BASE_URL}user`;

    return fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': JSON_TYPE,
        Authorization: getToken(),
      },
      body: JSON.stringify({ name }),
    });
  },

  async getMessages() {
    const URL = `${BASE_URL}messages`;
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: getToken(),
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Данные небыли получены, ошибка ${response.status} ${response.statusText}`);
    }
  },

  me() {
    const URL = `${BASE_URL}user/me`;

    return fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: getToken(),
      },
    });
  },
};
