import Cookies from 'js-cookie';

export const API = {
  sendEmail(email) {
    const URL = 'https://mighty-cove-31255.herokuapp.com/api/user';

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(email),
    });
  },

  sendName(name) {
    const URL = 'https://mighty-cove-31255.herokuapp.com/api/user';

    fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
      body: JSON.stringify(name),
    });
  },

  me() {
    const URL = 'https://mighty-cove-31255.herokuapp.com/api/user/me';

    fetch(URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('auth-key')}`,
      },
    });
  },
};

export function Email(email) {
  this.email = email;
}

export function Name(name) {
  this.name = name;
}
