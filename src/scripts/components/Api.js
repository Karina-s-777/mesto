export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getUser() {
    return (
      fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization,
        },
      })
        /*then значит дождись выполнения предыдущей строчки и что-то сделай с аргументом res*/
        .then(this._checkResponse)
    );
  }

  getCards() {
    /* заправшиваем данные с указанного сервера с помощью fetch */
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  setNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.nameImage,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameUser,
        about: data.aboutUser,
      }),
    }).then(this._checkResponse);
  }

  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }
}


