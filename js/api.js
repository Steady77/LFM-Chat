import Cookies from 'js-cookie';

const BASE_URL = 'https://mighty-cove-31255.herokuapp.com/api/';

export const API = {
  sendEmail(email) {
    const URL = `${BASE_URL}user`;

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email: email }),
    });
  },

  sendName(name) {
    const URL = `${BASE_URL}user`;

    fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
      body: JSON.stringify({ name: name }),
    });
  },

  async getMessages() {
    const URL = `${BASE_URL}messages`;
    const response = await fetch(URL);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Данные небыли получены, ошибка ${response.status} ${response.statusText}`);
    }
  },

  me() {
    const URL = `${BASE_URL}user/me`;

    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });
  },
};
