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
  baseUrl: " https://nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "1fed328b-ba19-401f-88c9-72db7b2bd0ae",
    "Content-Type": "application/json",
  },
});

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
    /**  функция renderer создает новую карточку через шаблон Card, берет введенные данные имени и ссылки,
   берет селектор тимплея для копирования разметки и приписывает функцию открытия конкретного попапа,
   созданного по шаблону PopupWithImage */
    renderer: (data) => {
      section.addItem(createNewCard(data));
    },
  },
  listImageSelector
);

/** создаем новый попап с функцией удаления карточек, где element - это наша карточка. У неё уже есть слушатели удаления и т.д.,
мы только добавляем новую функцию deleteCard из обновленного Card.js. В итоге при нажатии на кнопку открывшегося попапа произойдет колбэк -
закрытие попапа и удаление карточки*/
const deleteCardPopup = new PopupWithSubmit(
  deletePopupSelector,
  ({ element, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        element.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
  }
);

/** создается карточка и на неё навешиваются все слушатели лайков, удаление и т.д. через createCard */
const createNewCard = (data) => {
  const card = new Card(
    data,
    cardTemplateSelector,
    popupImage.open,
    deleteCardPopup.open,
    (likeItem, cardId) => {
      /** если карточка уже имеет активный класс, то мы его при нажатии убираем через api.deleteLikeCard(cardId) */
      if (likeItem.classList.contains("elements__heart_active")) {
        api
          .deleteLikeCard(cardId)
          .then((res) => {
            console.log(res);
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка ${err}`));
        /** соответственно, наоборот */
      } else {
        api
          .addLikeCard(cardId)
          .then((res) => {
            console.log(res);
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка ${err}`));
      }
    }
  );
  return card.createCard();
};

/* Подключаем попапы к серверу */

/* попап профиля. принимающий на вход инпуты из PopupWithForm */
const popupProfile = new PopupWithForm(profilePopupSelector, (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        nameUser: res.name,
        aboutUser: res.about,
        avatar: res.avatar,
      });
      popupProfile.close();
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => popupProfile.revertDefaultValue());
});

const popupFillGalery = new PopupWithForm(galeryPopupSelector, (data) => {
  api.setNewCard(data)
    .then((dataCard) => {
      dataCard.mypersonalid = userInfo.getId();
      section.addItem(createNewCard(dataCard));
      popupFillGalery.close();
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => popupFillGalery.revertDefaultValue());
});

const popupEditAvatar = new PopupWithForm(avatarPopupSelector, (data) => {
  api
    .setUserAvatar(data)
    .then((res) => {
      userInfo.setUserInfo({
        nameUser: res.name,
        aboutUser: res.about,
        avatar: res.avatar,
      });
      popupEditAvatar.close();
    })
    .catch((err) => console.error(`Ошибка ${err}`))
    .finally(() => popupEditAvatar.revertDefaultValue());
});

/* Структурируем код и переносим все евентлист. в одно место*/
deleteCardPopup.setEventListeners();
deleteCardPopup.setEventListeners();
popupProfile.setEventListeners();
popupFillGalery.setEventListeners();
popupEditAvatar.setEventListeners();

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

/* Используем Promise.all, чтобы параллельно запустить и загрузку информации по юзеру, и загрузку карточек.
Что следует учитывать - судя по теории, в случае 1 ошибки, остальные результаты игнорируются.
В таком случае можно на будущее рассматривать метод Promise.allSettled, но он поддерживается не всеми браузерами, есть пути*/

Promise.all([api.getUser(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    /* проходимся по dataCards и определеяем, на каких карточках нам надо отрисовывать мусорку, а на каких нет. Где mypersonalid - мой id, который мы присваиваем всем карточкам */
    dataCard.forEach(dataCard => dataCard.mypersonalid = dataUser._id);
    /* присваиваем своим значениям пользователя (nameUser и т.д.) серверные соответствующие значения */
    userInfo.setUserInfo({
      nameUser: dataUser.name,
      aboutUser: dataUser.about,
      avatar: dataUser.avatar,
    });
    userInfo.setId(dataUser._id);
    section.renderItems(dataCard);
  })
  .catch((err) => console.log(`Ошибка ${err}`));


