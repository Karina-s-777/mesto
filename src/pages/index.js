import "./index.css";
import {getSection} from "../scripts/components/api.js";

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
  profilePopupSelector,
  galeryPopupSelector,
  avatarPopupSelector,
  imagePopupSelector,
  listImageSelector,
  validationConfig,
  formInfoConfig,
} from "../scripts/utils/data.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";

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
    // items: initialCards, надо убрать?

    /**  функция renderer создает новую карточку через шаблон Card, берет введенные данные имени и ссылки,
   берет селектор тимплея для копирования разметки и приписывает функцию открытия конкретного попапа,
   созданного по шаблону PopupWithImage */
    renderer: (data) => {
      section.addItem(createNewCard(data));
    },
  },
  listImageSelector
);

getSection()
  .then(res => {
   console.log('res =>', res)
   // console.log(res)
    section.renderItems(res) /** добавила initialCards - пропала ошибка с пропис?? Верно ли сделала? */
  })

const createNewCard = (data) => {
  const card = new Card(data, cardTemplateSelector, popupImage.open);
  return card.createCard();
};

// добавили метод и вызвали его после создания экземпляра класса
// section.renderItems();


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

