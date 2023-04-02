const showInputError = function (formElement, inputElement, errorMessage) {
/*  Переменная errorElement = значение этой переменной — ошибка, которая найдена внутри formElement */
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  /*Добавить класс ошибки для input*/
inputElement.classList.add('popup__input_type_error')
/*Устанавливаем параметр errorMessage значением свойства textContent для элемента formError. Так текст ошибки попадёт в нужное место.*/
errorElement.textContent = errorMessage;
/* добавьте элементу ошибки класс popup____input-error_active. Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.*/
/* т.е. необходимо дать этому классу свойства видимости и не забыть подклбчить его в page.css*/
errorElement.classList.add('popup__input-error_active');
}

const hideInputError = function (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  /*Убрать класс ошибки для input*/
  inputElement.classList.remove('popup__input_type_error')
  /* Наоборот убираем текст ошибки, когда поле становится валидным */
  errorElement.classList.remove('popup__input-error_active')
  errorElement.textContent = ' ';
}

/* checkInputValidity функция проверяет inputElement на корректность введённых данных и вызывает либо hideInputError, либо showInputError . */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
   return showInputError (formElement, inputElement, inputElement.validationMessage );
  } else {
    return hideInputError (formElement, inputElement);
  }
 };

 /* Функция обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?». */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }
/* Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input. Если все поля валидны — false */

/* Функцию, которая отвечает за блокировку кнопки «Отправить» */
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
   buttonElement.classList.add('popup__button-retention_disabled');
 } else {
   buttonElement.classList.remove('popup__button-retention_disabled');
 }
 }

const setEventListeners = (formElement) => {
   /* inputList — массив из всех элементов с классом popup__input, которые есть в форме */
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-retention');
  /* Проверяем состояние кнопки при первой загрузке страницы. Кнопка перестанет быть активной до ввода данных в одно из полей. */
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
   checkInputValidity(formElement, inputElement);
   /* Проверяем состояние кнопки при каждом изменении символа в любом из полей. */
   toggleButtonState(inputList, buttonElement);
 });
  });
}

const enableValidation = () => {
   /* formList — массив всех элементов с классом popup__form */
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  /* обнуляем дефолтные значения браузера */
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
/* fieldsetList -массив из всех элементов с классом popup__contact-info внутри текущей формы — formElement */
  const fieldsetList = Array.from(formElement.querySelectorAll('.popup__contact-info'));
   fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
    });
  });
};


enableValidation ()













