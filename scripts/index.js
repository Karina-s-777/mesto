// вводим переменную popupElement, которой присваиваем селектор .popup//
const popupElement = document.querySelector(".popup")
const popupElementGalery = document.querySelector(".popup_galery")
const popupElementProfile = document.querySelector(".popup_profile")
const popupElementImage = document.querySelector('.popup_open-image-galery')

// Создаем переменные со ссылкой на элементы Templat и Elements (на блок с карточками)//
const cardTemplate = document.querySelector('#image-template').content;
const listImage = document.querySelector('.elements__items');

// вводим остальные переменные, необходимые для работы: закрытие из попапа, открытие из профиля//
const popupButtonCloseElementProfile = popupElement.querySelector(".popup__button-close")
const popupButtonOpenElementProfile = document.querySelector(".profile__edit-button")


const popupButtonOpenElementGalery = document.querySelector(".profile__add-button")
const popupButtonCloseElementGalery = popupElementGalery.querySelector(".popup__button-close")

const popupButtonCloseElementImage = popupElementImage.querySelector('.popup__button-close')

// вводим переменные - поля имя и описания в карточке пользователя в попап //
const nameInput = popupElement.querySelector(".popup__input_type_name")
const jobInput = popupElement.querySelector(".popup__input_type_about")

const imageInputGalery = popupElementGalery.querySelector(".popup__input_type_name-image")
const linkInputGalery = popupElementGalery.querySelector(".popup__input_type_link")
// вводим переменные - поля имя и описания в карточке пользователя в профиле//
const nameProfile = document.querySelector(".profile__user-name")
const jobProfile = document.querySelector(".profile__user-info")

const imageInputTemplate = cardTemplate.querySelector(".elements__mesto-name")
const linkInputTemplate = cardTemplate.querySelector(".elements__mask-group")
// вводим переменную = нашей форме попапа//
const formElementProfile = popupElementProfile.querySelector(".popup__form")
const formElementGalery = popupElementGalery.querySelector(".popup__form")

const imageOpenPopup = document.querySelector('.popup__image-open');
const imageOpenPopupText = document.querySelector('.popup__text-open');
// вводим переменную = фунции, которая добавляет класс попапу с соответствующими стилями + заполняет значения в попам = значениям текста в соответветствующих полях в профиле//
const popupOpen = function (popupElemen) {
  popupElemen.classList.add("popup_opened")
}

// открытие попап профиль //
function popupOpenProfile () {
  popupOpen(popupElementProfile)
}

popupButtonOpenElementProfile.addEventListener('click', popupOpenProfile)

// открытие попап галерея //
function popupOpenGalery () {
  popupOpen(popupElementGalery)
}

popupButtonOpenElementGalery.addEventListener('click', popupOpenGalery)

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

// вводим переменную = функции, которая при нажатии на соответствующию кнопку убирает класс попапа (класс видимости)//
const popupClose = function (popupElement) {
  popupElement.classList.remove("popup_opened")
}

const popupCloseProfile = function (popupElement) {
  popupClose(popupElementProfile)
}

popupButtonCloseElementProfile.addEventListener('click', popupCloseProfile)

const popupCloseGalery = function (popupElement) {
  popupClose(popupElementGalery)
}

popupButtonCloseElementGalery.addEventListener('click', popupCloseGalery)

// Создаем условия, при которых измененный нами в попап текст попадает в профиль после нажатия кнопки "сохранить" (При отправке формы срабатывает событие submit //
const handleFormSubmitProfile = function (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    popupCloseProfile ()
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile);

// Работа с п1 (фото и клонирование) //

// Создаем массив с данными //

const initialCards = [
  {
    name: 'Рыбная деревня',
    link: './images/kaliningrad_fish.jpg',
    alt: 'фотография с изображением Рыбной деревни в Калининграде'
  },
  {
    name: 'Королевские ворота',
    link: './images/korolevskie-vorota.jpg',
    alt: 'фотография с изображением Королевских ворот в Калининграде'
  },
  {
    name: 'Куршская коса',
    link: './images/kurskaj-kosa.jpg',
    alt: 'фотография с изображением Куршской косы'
  },
  {
    name: 'Зеленоградск',
    link: './images/zelenogradsk.jpg',
    alt: 'фотография с изображением города Зеленоградска'
  },
  {
    name: 'Зеленоградск',
    link: './images/zelenogradsk-cat.jpg',
    alt: 'фотография с изображением стрит-арта в городе Зеленоградске (города котов)'
  },
  {
    name: 'Светлогорск',
    link: './images/Svetlogorsk.jpg',
    alt: 'фотография с изображением города Светлогорск'
  }
];

// Создаем функцию, при которой у нас клонируется в новую переменную наш тимплей, а далее в клона попадают соответствующие значения фото и подписи)//

const createCard = function (item) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const nameMesto = cardElement.querySelector('.elements__mesto-name');
  const linkMesto = cardElement.querySelector('.elements__mask-group');


// лайк //
  cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    evt.target.classList.toggle('elements__heart_active');
  });

  setEventListeners (cardElement)

// Удаление //

  function handleDelete (evt) {
    const cardDelete = evt.target.closest('.elements__element')
    cardElement.remove()
  }

  function setEventListeners (cardElement) {
      cardElement.querySelector('.elements__trash').addEventListener('click', handleDelete);
  }

  linkMesto.addEventListener('click', function () {
      imageOpenPopup.src = item.link;
      imageOpenPopup.alt = item.name;
      imageOpenPopupText.textContent = item.name;
      popupOpen(popupElementImage)
  })

  const popupCloseImage = function (popupElement) {
    popupClose(popupElementImage)
  }

  popupButtonCloseElementImage.addEventListener('click', popupCloseImage)

  nameMesto.textContent = item.name;
  linkMesto.src = item.link;
  linkMesto.alt = item.name;
  return (cardElement)
  }

// Теперь по порядку в карточки попадают данные из нашего массива с помощью функции и становятся на места аргументов функции createCard)//
initialCards.forEach(function (item) {
  const card = createCard(item);
// Делаем так, чтобы наши клоны попадали в соответствующее место - в UL)//
  listImage.append(card);
});

// самбит для галереи //

const handleFormSubmitGalery = function (evt) {
  evt.preventDefault();
  const cardElementGalery = {name:imageInputGalery.value, link:linkInputGalery.value}
  listImage.prepend(createCard (cardElementGalery));
  popupCloseGalery ()
}

formElementGalery.addEventListener('submit', handleFormSubmitGalery);



