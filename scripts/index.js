// вводим переменную popupElement, которой присваиваем селектор .popup//
const popupElement = document.querySelector(".popup")
const popupElementGalery = document.querySelector(".popup-galery")
const popupElementProfile = document.querySelector(".popup-profile")

const cardTemplat = document.querySelector('#image-template').content;
const listImage = document.querySelector('.elements__items');

// вводим остальные переменные, необходимые для работы: закрытие из попапа, открытие из профиля//
const popupButtonCloseElementProfile = popupElement.querySelector(".popup__button-close")
const popupButtonOpenElementProfile = document.querySelector(".profile__edit-button")

const popupButtonOpenElementGalery = document.querySelector(".profile__add-button")

// код пр5 //
// const popupButtonOpenElementTo = document.querySelector(".profile__add-button") //

// вводим переменные - поля имя и описания в карточке пользователя в попап //
const nameInput = popupElement.querySelector(".popup__input_type_name")
const jobInput = popupElement.querySelector(".popup__input_type_about")

const imageInputGalery = popupElementGalery.querySelector(".popup__input_type_name-image")
const linkInputGalery = popupElementGalery.querySelector(".popup__input_type_link")
// вводим переменные - поля имя и описания в карточке пользователя в профиле//
const nameProfile = document.querySelector(".profile__user-name")
const jobProfile = document.querySelector(".profile__user-info")

const imageInputTemplate = cardTemplat.querySelector(".elements__mesto-name")
const linkInputTemplate = cardTemplat.querySelector(".elements__mask-group")
// вводим переменную = нашей форме попапа//
const formElement = popupElement.querySelector(".popup__form")

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

   // imageInputGalery.value = imageInputTemplate.textContent;//
  //linkInputGalery.value = linkInputTemplate.textContent;//

// вводим переменную = функции, которая при нажатии на соответствующию кнопку убирает класс попапа (класс видимости)//
const popupClose = function () {
  popupElement.classList.remove("popup_opened")
}

// вводим условия, при котором при нажатии на кнопки открытия и закрытия срабатывают описанные выше функции//

popupButtonCloseElementProfile.addEventListener('click', popupClose)

// код пр5 //
 //popupButtonOpenElementTo.addEventListener('click', popupOpen) //

// Создаем условия, при которых измененный нами в попап текст попадает в профиль после нажатия кнопки "сохранить" (При отправке формы срабатывает событие submit //
const handleFormSubmit = function (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    popupClose ()
}

formElement.addEventListener('submit', handleFormSubmit);

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
    name: 'Куршская коса"',
    link: './images/kurskaj-kosa.jpg',
    alt: 'фотография с изображением Куршской косы"'
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

// Создаем переменные со ссылкой на элементы Templat и Elements (на блок с карточками)//



// Создаем функцию, при которой у нас клонируется в новую переменную наш тимплей, а далее в клона попадают соответствующие значения фото и подписи)//

const createCard = function (name, link, alt) {
const cardElement = cardTemplat.querySelector('.elements__element').cloneNode(true);

cardElement.querySelector('.elements__heart').addEventListener('click', function (evt) {
  const eventTarget = evt.target;
  evt.target.classList.toggle('elements__heart_active');
});

cardElement.querySelector('.elements__mesto-name').textContent = name;
cardElement.querySelector('.elements__mask-group').src = link;
cardElement.querySelector('.elements__mask-group').alt = alt;

// Делаем так, чтобы наши клоны попадали в соответствующее место - в UL)//
listImage.append(cardElement);
}
// Теперь по порядку в карточки попадают данные из нашего массива с помощью функции и становятся на места аргументов функции createCard)//
initialCards.forEach(function (item) {
  createCard(item.name, item.link, item.alt)
});







