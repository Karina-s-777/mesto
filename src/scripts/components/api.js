/** export function getSection() {
  заправшиваем данные с указанного сервера
  return fetch('https://nomoreparties.co/v1/cohort-66/users/me', {
  headers: {
    authorization: '1fed328b-ba19-401f-88c9-72db7b2bd0ae'
  }
})
  then значит дождись выполнения предыдущей строчки
  .then(res => {
   /** если запрос выполнился удачно, мы говорим res.json (данные теперь доступны в нужном формате) и переходим к следующему then
     Если же нет - Promise.reject
    return res.ok ? res.json() : Promise.reject();
  })
} */

export function getCards() {
  /** заправшиваем данные с указанного сервера с помощью fetch*/
  return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
  headers: {
    authorization: '1fed328b-ba19-401f-88c9-72db7b2bd0ae'
  }
})
 /** then значит дождись выполнения предыдущей строчки и что-то сделай с аргументом res */
  .then(res => {
  /** если запрос выполнился удачно, мы говорим res.json (данные теперь доступны в нужном формате) и переходим к следующему then
  Если же нет - Promise.reject */
    return res.ok ? res.json() : Promise.reject();
  })
}

export function createItem(newCard) {
  /** заправшиваем данные с указанного сервера с помощью fetch*/
  return fetch(' https://mesto.nomoreparties.co/v1/cohort-66/cards', {
  method: 'POST',
  body: JSON.stringify({
    name: nameImage,
    link: link
  }),
  headers: {
    authorization: '1fed328b-ba19-401f-88c9-72db7b2bd0ae',
    'Content-Type': 'application/json'
  },
})
 /** then значит дождись выполнения предыдущей строчки и что-то сделай с аргументом res */
  .then(res => {
  /** если запрос выполнился удачно, мы говорим res.json (данные теперь доступны в нужном формате) и переходим к следующему then
  Если же нет - Promise.reject */
    return res.ok ? res.json() : Promise.reject();
  })
}
