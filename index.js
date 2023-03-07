// вводим переменную popupElement, которой присваиваем селектор .popup//
const popupElement = document.querySelector(".popup")
const popupButtonCloseElement = popupElement.querySelector(".popup__button-close")
const popupButtonOpenElement = document.querySelector(".profile__edit-button")

const nameInput = popupElement.querySelector(".popup__item-name")
const jobInput = popupElement.querySelector(".popup__item-about")
const nameProfile = document.querySelector(".profile__user-name")
const jobProfile = document.querySelector(".profile__user-info")
const formElement = popupElement.querySelector(".popup__form")

const popupOpen = function () {
    popupElement.classList.add("popup_opened")
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

const popupClose = function () {
  popupElement.classList.remove("popup_opened")
}

popupButtonOpenElement.addEventListener('click', popupOpen)
popupButtonCloseElement.addEventListener('click', popupClose)

const handleFormSubmit = function (evt) {
    evt.preventDefault();
    jobProfile.textContent = jobInput.value;
    nameProfile.textContent = nameInput.value;
    popupClose ()
}

formElement.addEventListener('submit', handleFormSubmit);


