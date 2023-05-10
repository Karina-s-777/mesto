import "./index.css";

import Card from "./scripts/components/card.js";
import FormValidator from "./scripts/components/formValidator.js";
import PopupWithImage from "./scripts/components/popupWithImage.js";
import Section from "./scripts/components/section.js";
import {
  initialCards,
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
  formInfoConfig,
} from "./scripts/utils/data.js";
import UserInfo from "./scripts/components/userInfo.js";
import PopupWithForm from "./scripts/components/popupWithForm.js";

const popupUserInfo = new UserInfo(formInfoConfig);

const validationNewConfigFormsProfile = new FormValidator(
  validationConfig,
  formElementProfile
);
const validationNewConfigFormsGalery = new FormValidator(
  validationConfig,
  formElementGalery
);

validationNewConfigFormsProfile.enableValidation();
validationNewConfigFormsGalery.enableValidation();
// ----------------- //

const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

// создаем секцию с фотокарточками и внутрь добавляем генирацию карточек на страницу из указанного массива
//// объявим класс, который в конструктор принимает items и renderer
const section = new Section(
  {
    items: initialCards,
    // функция renderer создает новую карточку через шаблон Card, берет введенные данные имени и ссылки,
    // берет селектор тимплея для копирования разметки и приписывает функцию открытия конкретного попапа,
    // созданного по шаблону PopupWithImage
    renderer: (data) => {
      const card = new Card(data, selectorTemplate, popupImage.open);
      return card.createCard();
    },
  },
  listImageSelector
);

// добавили метод и вызвали его после создания экземпляра класса
section.renderItems();

// попап профиля
const popupProfile = new PopupWithForm(profilePopupSelector, (data) => {
  popupUserInfo.setUserInfo(data);
  popupProfile.close();
});

popupProfile.setEventListeners();

// попап для добавления карточек в галерею
const popupFillGalery = new PopupWithForm(galeryPopupSelector, (data) => {
  section.addItem(section.renderer(data));
  popupFillGalery.close();
});

popupFillGalery.setEventListeners();

// ----------------- //

// Функция открытия попап профиль //
function openPopupProfile() {
  validationNewConfigFormsProfile.resetErrorOpenPopup();
  popupProfile.setInputValues(popupUserInfo.getUserInfo());
  popupProfile.open();
}

// Функция открытия попап галерея //
function openPopupGalery(e) {
  validationNewConfigFormsGalery.resetErrorOpenPopup();
  popupFillGalery.open();
}

// Слушатели открытия попапов галерея и профиль //
popupButtonOpenElementProfile.addEventListener("click", openPopupProfile);
popupButtonOpenElementGalery.addEventListener("click", openPopupGalery);
