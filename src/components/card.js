import { userId } from "./index";
import { setLike, deleteLike, deleteOwnCard } from "./api";
import { openModal, closeModal } from "./modal";

const popupDeleteCard = document.querySelector(".popup_type_confirm_delete");
const formDeleteCard = document.forms["delete-card"];
let cardToDelete;
let cardToDeleteId;

export function createCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  deleteCallback,
  likeCallback,
  openCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardTitle = cardItem.querySelector(".card__title");
  const cardImage = cardItem.querySelector(".card__image");
  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  const cardLikesCount = cardItem.querySelector(".card__like-counter");
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikesCount.textContent = likes.length;

  if (ownerId !== userId) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.style.display = "none";
  }

  if (likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardDeleteButton.addEventListener("click", function (evt) {
    deleteCallback(cardItem, cardId);
  });
  cardLikeButton.addEventListener("click", function (evt) {
    handleLikeButton(cardLikeButton, cardId, cardLikesCount);
    likeCallback(cardItem);
  });
  cardImage.addEventListener("click", function () {
    openCallback({ name, link });
  });
  return cardItem;
}

export function openDeleteForm(card, cardId) {
  openModal(popupDeleteCard);
  cardToDelete = card;
  cardToDeleteId = cardId;
}

export function deleteCard(card, cardId) {
  deleteOwnCard(cardId)
    .then(() => {
      card.remove();
      closeModal(popupDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

formDeleteCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  deleteCard(cardToDelete, cardToDeleteId);
});

export function likeCard(cardItem) {
  cardItem.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
}

function handleLikeButton(cardLikeButton, cardId, cardLikesCount) {
  const likeAction = cardLikeButton.classList.contains("card__like-button_is-active") ? deleteLike : setLike;
  likeAction(cardId)
    .then((res) => {
      cardLikesCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
