import Card from "./card.js";
import FormValidator from "./formValidator.js";
import {initialCards} from "./data.js";


// вводим переменную popupElement, которой присваиваем селектор .popup//
const popupElement = document.querySelector(".popup")
const popupElementGalery = document.querySelector(".popup_galery")
const popupElementProfile = document.querySelector(".popup_profile")
const popupElementImage = document.querySelector('.popup_open-image-galery')

// Создаем переменные со ссылкой на элементы Templat и Elements (на блок с карточками)//
const selectorTemplate = '#image-template';
const listImage = document.querySelector('.elements__items');

// вводим остальные переменные, необходимые для работы: закрытие из попапа, открытие из профиля//
const popupButtonCloseElementProfile = popupElement.querySelector(".popup__button-close")
const popupButtonOpenElementProfile = document.querySelector(".profile__edit-button")

const popupButtonOpenElementGalery = document.querySelector(".profile__add-button")
const popupButtonCloseElementGalery = popupElementGalery.querySelector(".popup__button-close")

const popupButtonCloseElementImage = popupElementImage.querySelector('.popup__button-close')
// переменная = кнопке "создать" в попапе галереи //
const popupButtonCloseCreate = popupElementGalery.querySelector(".popup__button-retention")

// вводим переменные - поля имя и описания в карточке пользователя в попап //
const nameInput = popupElement.querySelector(".popup__input_type_name")
const jobInput = popupElement.querySelector(".popup__input_type_about")

const imageInputGalery = popupElementGalery.querySelector(".popup__input_type_name-image")
const linkInputGalery = popupElementGalery.querySelector(".popup__input_type_link")
// вводим переменные - поля имя и описания в карточке пользователя в профиле//
const nameProfile = document.querySelector(".profile__user-name")
const jobProfile = document.querySelector(".profile__user-info")


// вводим переменную = нашей форме попапа//
const formElementProfile = popupElementProfile.querySelector(".popup__form")
const formElementGalery = popupElementGalery.querySelector(".popup__form")

const imageOpenPopup = document.querySelector('.popup__image-open');
const imageOpenPopupText = document.querySelector('.popup__text-open');

// ----------------- //
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-retention',
  inactiveButtonClass: 'popup__button-retention_disabled',
  inputErrorClass: 'popup__input_type_error',
   /* класс активации ошибки спан */
  errorClass: 'popup__input-error_active',
}

const validationNewConfigFormsProfile = new FormValidator (validationConfig, formElementProfile);
const validationNewConfigFormsGalery = new FormValidator (validationConfig, formElementGalery);
console.log(validationNewConfigFormsProfile)
validationNewConfigFormsProfile.enableValidation()
validationNewConfigFormsGalery.enableValidation()
// ----------------- //

// вводим переменную = фунции, которая добавляет класс попапу с соответствующими стилями + заполняет значения в попам = значениям текста в соответветствующих полях в профиле//
const openPopup = function (popupElemen) {
  document.addEventListener('keydown', closePopupByClickOnEscape);
  popupElemen.classList.add("popup_opened")
}

// Функция открытия попап профиль //
function openPopupProfile () {
  validationNewConfigFormsProfile.resetErrorOpenPopup()
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupElementProfile)
}

// Функция открытия попап галерея //
function openPopupGalery (e) {
  validationNewConfigFormsGalery.resetErrorOpenPopup()
  formElementGalery.reset();
  openPopup(popupElementGalery)
}

// Слушатели открытия попапов галерея и профиль //
popupButtonOpenElementProfile.addEventListener('click', openPopupProfile)
popupButtonOpenElementGalery.addEventListener('click', openPopupGalery)

// ----------------- //

// вводим переменную = функции, которая при нажатии на соответствующию кнопку убирает класс попапа (класс видимости) - раздел ЗАКРЫТИЕ//
const closePopup = function (popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupByClickOnEscape);
}

const closePopupProfile = function (popupElement) {
  closePopup(popupElementProfile)
}

const closePopupGalery = function (popupElement) {
  closePopup(popupElementGalery)
}

const closePopupImage = function (popupElement) {
  closePopup(popupElementImage)
}


popupButtonCloseElementProfile.addEventListener('click', closePopupProfile)
popupButtonCloseElementGalery.addEventListener('click', closePopupGalery)
popupButtonCloseElementImage.addEventListener('click', closePopupImage)


// Закрытие по оверлэй //
const popupList = Array.from(document.querySelectorAll('.popup'))

const closePopupByClickOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget)
  }
}

popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', closePopupByClickOnOverlay)
})

// Закрытие на Escape//
const closePopupByClickOnEscape = (event) => {
      if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened)
      }
      }

// ----------------- //

// Клонирование в новую переменную тимплей => в клон попадают соответствующие значения фото и подписи через функцию creatcard )//

function createCardNew (data) {
  const card = new Card (data, selectorTemplate, openPopupImage);
  const cardElementNew = card.createCard();
  return cardElementNew;
}

// ----------------- //

// Создаем условия, при которых измененный нами в попап текст попадает в профиль после нажатия кнопки "сохранить" (При отправке формы срабатывает событие submit //
const handleFormSubmitProfile = function (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    closePopupProfile ()
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

// ----------------- //

// Функция открытия попапа с картинкой //
function openPopupImage (data) {
  imageOpenPopup.src = data.link;
  imageOpenPopup.alt = data.name;
  imageOpenPopupText.textContent = data.name;
  openPopup(popupElementImage)
}

// Мы переделали функцию, чтобы при переборе у нас из класса Card создавались карточки при загрузке//
initialCards.forEach(data => {
// Делаем так, чтобы наши клоны попадали в соответствующее место - в UL)//
 listImage.append(createCardNew(data));
});

// ----------------- //

// самбит для галереи (создаем карточку, добавляем в ul, отключам кнопку и закрываем попап) //
const handleFormSubmitGalery = function (evt) {
  evt.preventDefault();
  const cardElementGalery = {name:imageInputGalery.value, link:linkInputGalery.value}
  listImage.prepend(createCardNew(cardElementGalery));
  closePopupGalery ()
  evt.target.reset()
}

formElementGalery.addEventListener('submit', handleFormSubmitGalery);

