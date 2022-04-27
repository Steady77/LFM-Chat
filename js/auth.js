export function sendEmail(email) {
  const URL = 'https://mighty-cove-31255.herokuapp.com/api/user';

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(email),
  });
}

export function Email(email) {
  this.email = email;
}
