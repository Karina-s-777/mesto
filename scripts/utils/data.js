const initialCards = [
  {
    nameImage: 'Рыбная деревня',
    link: './images/kaliningrad_fish.jpg',
  },
  {
    nameImage: 'Королевские ворота',
    link: './images/korolevskie-vorota.jpg',
  },
  {
    nameImage: 'Куршская коса',
    link: './images/kurskaj-kosa.jpg',
  },
  {
    nameImage: 'Зеленоградск',
    link: './images/zelenogradsk.jpg',
  },
  {
    nameImage: 'Зеленоградск',
    link: './images/zelenogradsk-cat.jpg',
  },
  {
    nameImage: 'Светлогорск',
    link: './images/Svetlogorsk.jpg',
  }
];

// вводим переменную popupElement, которой присваиваем селектор .popup//
const popupElementGalery = document.querySelector(".popup_galery")
const popupElementProfile = document.querySelector(".popup_profile")

// Создаем переменные со ссылкой на элементы Templat и Elements (на блок с карточками)//
const selectorTemplate = '#image-template';

const popupButtonOpenElementProfile = document.querySelector(".profile__edit-button")
const popupButtonOpenElementGalery = document.querySelector(".profile__add-button")

// вводим переменную = нашей форме попапа//
const formElementProfile = popupElementProfile.querySelector(".popup__form")
const formElementGalery = popupElementGalery.querySelector(".popup__form")

const profilePopupSelector = '.popup_profile'
const galeryPopupSelector = '.popup_galery'
const imagePopupSelector = '.popup_open-image-galery'
const listImageSelector = '.elements__items'

// ----------------- //
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-retention',
  inactiveButtonClass: 'popup__button-retention_disabled',
  inputErrorClass: 'popup__input_type_error',
   /* класс активации ошибки спан */
  errorClass: 'popup__input-error_active',
}

const formInfoConfig = {
  nameUserInfo: ".profile__user-name",
  informationUserInfo: ".profile__user-info"
}

export {
  initialCards,
  popupElementGalery,
  popupElementProfile,
  selectorTemplate,
  popupButtonOpenElementProfile,
  popupButtonOpenElementGalery,
  formElementProfile,
  formElementGalery,
  profilePopupSelector,
  galeryPopupSelector,
  imagePopupSelector,
  listImageSelector,
  validationConfig,
  formInfoConfig
}
