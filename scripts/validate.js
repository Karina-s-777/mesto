const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-retention',
  inactiveButtonClass: 'popup__button-retention_disabled',
  inputErrorClass: 'popup__input_type_error',
   /* класс активации ошибки спан */
  errorClass: 'popup__input-error_active',
}

const enableValidation = ({formSelector, ...rest}) => {
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
 setEventListeners(fieldSet, rest);
   });
 });
};


const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  /* inputList — массив из всех элементов с классом popup__input, которые есть в форме */
 const inputList = Array.from(formElement.querySelectorAll(inputSelector));
 const buttonElement = formElement.querySelector(submitButtonSelector);
 /* Проверяем состояние кнопки при первой загрузке страницы. Кнопка перестанет быть активной до ввода данных в одно из полей. */
 toggleButtonState(inputList, buttonElement, rest);

 inputList.forEach((inputElement, {inputErrorClass, errorClass}) => {
inputElement.addEventListener('input', function () {
  checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass});
  /* Проверяем состояние кнопки при каждом изменении символа в любом из полей. */
  toggleButtonState(inputList, buttonElement, rest);
});
 });
}

/* Функция отключения кнопки ('disabled') */

const disableButton = (buttonElement, {inactiveButtonClass}) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true)
}

  /* Функцию, которая отвечает за блокировку кнопки «Отправить» */
  const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, ...rest}) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, {inactiveButtonClass})
   } else {
     buttonElement.classList.remove(inactiveButtonClass);
     buttonElement.removeAttribute('disabled', false)
   }
   }

   /* Функция обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?». */
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    }
  /* Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input. Если все поля валидны — false */

  /* checkInputValidity функция проверяет inputElement на корректность введённых данных и вызывает либо hideInputError, либо showInputError . */
  const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    if (!inputElement.validity.valid) {
     return showInputError (formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass} );
    } else {
      return hideInputError (formElement, inputElement, {inputErrorClass, errorClass});
    }
   };

const showInputError = function (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) {
  /*  Переменная errorElement = значение этой переменной — ошибка, которая найдена внутри formElement */
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    /*Добавить класс ошибки для input*/
  inputElement.classList.add(inputErrorClass)
  /*Устанавливаем параметр errorMessage значением свойства textContent для элемента formError. Так текст ошибки попадёт в нужное место.*/
  errorElement.textContent = errorMessage;
  /* добавьте элементу ошибки класс popup____input-error_active. Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.*/
  /* т.е. необходимо дать этому классу свойства видимости и не забыть подклбчить его в page.css*/
  errorElement.classList.add(errorClass);
  }

  const hideInputError = function (formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    /*Убрать класс ошибки для input*/
    inputElement.classList.remove(inputErrorClass)
    /* Наоборот убираем текст ошибки, когда поле становится валидным */
    errorElement.classList.remove(errorClass)
    errorElement.textContent = ' ';
  }

 const resetErrorOpenPopup = function (formElement) {
  console.log(formElement)
  formElement.querySelectorAll(validationConfig.inputSelector).forEach((inputElement) => {
    console.log(inputElement)
  if (!inputElement.validity.valid) {
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass)
 }
})
}
