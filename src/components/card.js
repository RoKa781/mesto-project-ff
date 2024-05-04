import { initialCards } from "./cards";
import { closeModal, openModal } from "./modal";
import { openCard } from "./index";

export const cardList = document.querySelector(".places__list");

export function createCard(
  name,
  link,
  deleteCallback,
  likeCallback,
  openCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  cardItem.querySelector(".card__title").textContent = name;
  const cardImage = cardItem.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;
  cardItem
    .querySelector(".card__delete-button")
    .addEventListener("click", function (event) {
      deleteCallback(cardItem);
    });
  cardItem
    .querySelector(".card__like-button")
    .addEventListener("click", function (event) {
      likeCallback(cardItem);
    });
  cardImage.addEventListener("click", function () {
    openCallback({ name, link });
  });
  return cardItem;
}

export function deleteCard(card) {
  card.remove();
}

export function likeCard(card) {
  card
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");
}

initialCards.forEach(function (card) {
  cardList.append(
    createCard(card.name, card.link, deleteCard, likeCard, openCard)
  );
});
