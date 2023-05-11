export default class UserInfo {
  constructor(config) {
    this._nameElement = document.querySelector(config.nameUserInfo);
    this._informationElement = document.querySelector(
      config.informationUserInfo
    );
  }

  //метод getUserInfo, который возвращает объект с данными пользователя.
  //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  //возвращает текущие значения из разметки. то есть textContent свойство двух элементов в виде объекта
  getUserInfo() {
    return {
      nameUser: this._nameElement.textContent,
      aboutUser: this._informationElement.textContent,
    };
  }

  // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  //получает объект с ключами и устанавливает их в разметку (то есть делает наоборот в отличие от getUserInfo)
  setUserInfo(userData) {
    this._nameElement.textContent = userData.nameUser;
    this._informationElement.textContent = userData.aboutUser;
  }
}
