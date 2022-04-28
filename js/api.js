import Cookies from 'js-cookie';

const BASE_URL = 'https://mighty-cove-31255.herokuapp.com/api/user';

export const API = {
  sendEmail(email) {
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email: email }),
    });
  },

  sendName(name) {
    fetch(BASE_URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
      body: JSON.stringify({ name: name }),
    });
  },

  me() {
    const URL = `${BASE_URL}/me`;

    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });
  },
};
