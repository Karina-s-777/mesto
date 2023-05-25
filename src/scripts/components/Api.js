export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
  }

  getUser() {
    return (
      fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._authorization,
        },
      })
        /*then значит дождись выполнения предыдущей строчки и что-то сделай с аргументом res*/
        .then((res) => {
          /* если запрос выполнился удачно, мы говорим res.json (данные теперь доступны в нужном формате) и переходим к следующему then
  Если же нет - Promise.reject */
          return res.ok ? res.json() : Promise.reject();
        })
    );
  }

  getCards() {
    /* заправшиваем данные с указанного сервера с помощью fetch */
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  setNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.nameImage,
        link: data.link,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameUser,
        about: data.aboutUser,
      }),
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  addLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject();
    });
  }
}


