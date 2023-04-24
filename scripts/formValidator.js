export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = form.querySelectorAll(this._inputSelector);
    this._buttonElement = form.querySelector(this._submitButtonSelector);
  }

  _showInputError = function (errorElement, inputElement) {
    /*Добавить класс ошибки для input*/
    inputElement.classList.add(this._inputErrorClass)
    /*Устанавливаем параметр errorMessage значением свойства textContent для элемента formError. Так текст ошибки попадёт в нужное место.*/
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.errorClass);
    }

  _hideInputError = function (errorElement, inputElement) {
      /*Убрать класс ошибки для input*/
      inputElement.classList.remove(this._inputErrorClass)
      /* Наоборот убираем текст ошибки, когда поле становится валидным */
      errorElement.textContent = ' ';
      errorElement.classList.remove(this._errorClass)
    }

  _hasInvalidInput = () => {
      return Array.from(this._inputList).some((inputElement) => {
        return !inputElement.validity.valid;
      });
      }

  _disableButton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true)
      }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton(this._buttonElement)
   } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', false)
   }
  }

  _checkInputValidity = (inputElement) => {
    /*  Переменная errorElement = значение этой переменной — ошибка, которая найдена внутри formElement */
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    if (!inputElement.validity.valid) {
     return this._showInputError (errorElement, inputElement);
    } else {
      return  this._hideInputError (errorElement, inputElement);
    }
   };

  _setEventListeners () {
    /* inputList — массив из всех элементов с классом popup__input, которые есть в форме */
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        /* Проверяем состояние кнопки при каждом изменении символа в любом из полей. */
        this._toggleButtonState();
  });
   });
  }

  enableValidation ()  {
    /* fieldsetList -массив из всех элементов с классом popup__contact-info внутри текущей формы — formElement */
      this._setEventListeners();
    };

  resetErrorOpenPopup () {
      this._inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
      if (!inputElement.validity.valid) {
        this._hideInputError(errorElement, inputElement)
    }
  })
  }
}
