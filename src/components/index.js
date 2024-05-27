import "../pages/index.css";
import { createCard } from "./card";
import { closeModal, openModal, setEventListeners } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfo,
  getCards,
  deleteOwnCard,
  updateAvatar,
  postCard,
  editProfileInfo,
} from "./api";

const addButton = document.querySelector(".profile__add-button");
const profileButton = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.name;
const jobInput = profileForm.description;
const cardForm = document.forms["new-place"];
const cardFormLink = cardForm.link;
const cardFormName = cardForm["place-name"];
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.avatar;
const buttonOpenPopupCard = document.querySelector(".popup_type_new-card");
const buttonOpenPopupProfile = document.querySelector(".popup_type_edit");
const buttonOpenPopupAvatar = document.querySelector(".popup_type_avatar_edit");
const imagePopup = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardList = document.querySelector(".places__list");
const userName = document.querySelector(".profile__title");
const userAvatar = document.querySelector(".profile__image");
const userAbout = document.querySelector(".profile__description");
const avatarButton = document.querySelector(".profile__avatar-button");
const popupDeleteCard = document.querySelector(".popup_type_confirm_delete");
const formDeleteCard = document.forms["delete-card"];
let userId;
let cardToDelete;
let cardToDeleteId;

addButton.addEventListener("click", function () {
  openModal(buttonOpenPopupCard);
  clearValidation(cardForm, validationConfig);
});

profileButton.addEventListener("click", function () {
  openModal(buttonOpenPopupProfile);
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

avatarButton.addEventListener("click", function () {
  openModal(buttonOpenPopupAvatar);
  avatarInput.value = "";
  clearValidation(avatarForm, validationConfig);
});

export function openCard(card) {
  openModal(imagePopup);
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupImgCaption.textContent = card.name;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);

  editProfileInfo({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(buttonOpenPopupProfile);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() =>{
      renderLoading(false, popupElement);
    })
  }

profileForm.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);

  postCard({
    name: cardFormName.value,
    link: cardFormLink.value,
  })
    .then((newCard) => {
      cardList.prepend(
        createCard(
          newCard.name,
          newCard.link,
          newCard.likes,
          newCard.owner._id,
          newCard._id,
          userId,
          openDeleteForm,
          openCard
        )
      );
    })
    .then(() => {
      closeModal(buttonOpenPopupCard);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() =>{
      renderLoading(false, popupElement);
    })
  cardForm.reset();
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoading(true, popupElement);  

  updateAvatar(avatarInput.value)
    .then((data) => {
      userAvatar.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(buttonOpenPopupAvatar);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoading(false, popupElement);
    });
});


formDeleteCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(cardToDelete, cardToDeleteId);
});

setEventListeners();

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

window.addEventListener('load', function () {
  enableValidation(validationConfig);
});

function openDeleteForm(card, cardId) {
  openModal(popupDeleteCard);
  cardToDelete = card;
  cardToDeleteId = cardId;
}

function deleteCard(card, cardId) {
  const popupElement = document.querySelector(".popup_is-opened");
  renderLoadingDelete(true, popupElement);  

  deleteOwnCard(cardId)
    .then(() => {
      card.remove();
      closeModal(popupDeleteCard);
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error);
    })
    .finally(() => {
      renderLoadingDelete(false, popupElement)
    })
}

function renderLoading(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
  if (isLoading) {
    activeButton.textContent = "Сохранение...";
  } else {
    activeButton.textContent = "Сохранить";
  }
}

function renderLoadingDelete(isLoading, popupElement) {
  const activeButton = popupElement.querySelector(".popup__button");
    if (isLoading) {
      activeButton.textContent = "Удаление...";
    } else {
      activeButton.textContent = "Да";
    }
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardData]) => {
    userAbout.textContent = userData.about;
    userName.textContent = userData.name;
    userAvatar.style = `background-image: url('${userData.avatar}')`;
    userId = userData._id;

    cardData.forEach(function (card) {
      cardList.append(
        createCard(
          card.name,
          card.link,
          card.likes,
          card.owner._id,
          card._id,
          userId,
          openDeleteForm,
          openCard
        )
      );
    });
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
  });
