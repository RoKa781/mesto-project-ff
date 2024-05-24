function showInputError(popupElement, inputElement, config, errorMessage) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(config.errorClass);
}

function hideInputError(popupElement, inputElement, config) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  inputError.classList.remove(config.errorClass);
  inputError.textContent = "";
}

function isValid(popupElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      popupElement,
      inputElement,
      config,
      inputElement.validationMessage
    );
  } else {
    hideInputError(popupElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, submitButton, config) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(popupElement, config) {
  const inputList = Array.from(
    popupElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = popupElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(popupElement, inputElement, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
}

export function enableValidation(config) {
  const popupList = Array.from(document.querySelectorAll(config.formSelector));
  popupList.forEach((popupElement) => {
    setEventListeners(popupElement, config);
  });
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, submitButton, config);
}
