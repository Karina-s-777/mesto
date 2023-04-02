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

const setEventListeners = (formElement) => {
   /* inputList — массив из всех элементов с классом popup__input, которые есть в форме */
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
   checkInputValidity(formElement, inputElement);
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

    setEventListeners(formElement);
});
}

enableValidation ()














