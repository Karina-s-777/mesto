import "./index.css";
import Api from "../scripts/components/Api.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import {
  initialCards,
  cardTemplateSelector,
  popupButtonOpenElementProfile,
  popupButtonOpenElementGalery,
  popupButtonOpenElementAvatar,
  formElementProfile,
  formElementGalery,
  formElementAvatar,
  popupElementDelete,
  profilePopupSelector,
  galeryPopupSelector,
  avatarPopupSelector,
  deletePopupSelector,
  imagePopupSelector,
  listImageSelector,
  validationConfig,
  formInfoConfig,
} from "../scripts/utils/data.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit.js";

const api = new Api({
  baseUrl: ' https://nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '1fed328b-ba19-401f-88c9-72db7b2bd0ae',
    'Content-Type': 'application/json'
  },
}
)

api.getUser()
.then(res => {
  console.log('getUser response', res)
});

api.getCards()
.then(res => {
  console.log('getCards response', res);
  section.renderItems(res);
});


console.log(api)

const userInfo = new UserInfo(formInfoConfig);

const profileFormValidator = new FormValidator(
  validationConfig,
  formElementProfile
);
const galleryFormsValidation = new FormValidator(
  validationConfig,
  formElementGalery
);

const avatarFormsValidation = new FormValidator(
  validationConfig,
  formElementAvatar
);

profileFormValidator.enableValidation();
galleryFormsValidation.enableValidation();
avatarFormsValidation.enableValidation();
// ----------------- //

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

/** создаем секцию с фотокарточками и внутрь добавляем генирацию карточек на страницу из указанного массива
объявим класс, который в конструктор принимает items и renderer*/
const section = new Section(
  {
    // items: initialCards, //надо это убирать?

    /**  функция renderer создает новую карточку через шаблон Card, берет введенные данные имени и ссылки,
   берет селектор тимплея для копирования разметки и приписывает функцию открытия конкретного попапа,
   созданного по шаблону PopupWithImage */
    renderer: (data) => {
      section.addItem(createNewCard(data));
    },
  },
  listImageSelector
);

/* начальные карточки при открытии страницы */

// section.renderItems(initialCards);

/** создаем новый попап с функцией удаления карточек, где element - это наша карточка. У неё уже есть слушатели удаления и т.д.,
мы только добавляем новую функцию deleteCard из обновленного Card.js. В итоге при нажатии на кнопку открывшегося попапа произойдет колбэк -
закрытие попапа и удаление карточки*/
const deleteCardPopup = new PopupWithSubmit(deletePopupSelector, (element) => {
  element.deleteCard();
  deleteCardPopup.close();
});

deleteCardPopup.setEventListeners()

/** создается карточка и на неё навешиваются все слушатели лайков, удаление и т.д. через createCard */
const createNewCard = (data) => {
  const card = new Card(data, cardTemplateSelector, popupImage.open, deleteCardPopup.open);
  return card.createCard();
};


// попап профиля
const popupProfile = new PopupWithForm(profilePopupSelector, (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});

popupProfile.setEventListeners();

// попап для добавления карточек в галерею
const popupFillGalery = new PopupWithForm(galeryPopupSelector, (data) => {
  section.addItem(createNewCard(data));
  popupFillGalery.close();
});

popupFillGalery.setEventListeners();

const popupEditAvatar = new PopupWithForm(avatarPopupSelector, (data) => {
  document.querySelector('.profile__avatar').src = data.avatar;
  popupEditAvatar.close();
});

popupEditAvatar.setEventListeners();


// ----------------- //

// Функция открытия попап профиль //
function openPopupProfile() {
  profileFormValidator.resetErrorOpenPopup();
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
}

// Функция открытия попап галерея //
function openPopupGalery(e) {
  galleryFormsValidation.resetErrorOpenPopup();
  popupFillGalery.open();
}

// Функция открытия попапа аватара//
function openPopupAvatar(e) {
  avatarFormsValidation.resetErrorOpenPopup();
  popupEditAvatar.open();
}

// Слушатели открытия попапов галерея и профиль //
popupButtonOpenElementProfile.addEventListener("click", openPopupProfile);
popupButtonOpenElementGalery.addEventListener("click", openPopupGalery);
popupButtonOpenElementAvatar.addEventListener("click", openPopupAvatar);

Promise.all([api.getUser(), api.getCards()])
  .then
