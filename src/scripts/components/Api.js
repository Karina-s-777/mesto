export default class Api {

  constructor(options) {
    this._headers = options.headers;
    this._url = options.baseUrl;
    this._authorization = options.headers.authorization;
  }

getUser() {
  return fetch(`${this._url}/users/me`, {
    headers: {
      authorization: this._authorization
    }
 })
 /*then значит дождись выполнения предыдущей строчки и что-то сделай с аргументом res*/
 .then(res => {
  /* если запрос выполнился удачно, мы говорим res.json (данные теперь доступны в нужном формате) и переходим к следующему then
  Если же нет - Promise.reject */
    return res.ok ? res.json() : Promise.reject();
  })
}

getCards() {
  /* заправшиваем данные с указанного сервера с помощью fetch */
  return fetch(`${this._url}/cards`, {
    headers: {
      authorization: this._authorization
    }
})

  .then(res => {
    return res.ok ? res.json() : Promise.reject();
  })
}

}

