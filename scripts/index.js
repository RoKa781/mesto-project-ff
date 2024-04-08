// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(name, link, deleteCallback) {
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__title').textContent = name;
    cardItem.querySelector('.card__image').src = link;
    cardItem.querySelector('.card__delete-button').addEventListener('click', function (event) {
        deleteCallback(cardItem);
});
    return cardItem;
}
 // @todo: Функция удаления карточки
function deleteCard(card) {
    card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    cardList.append(addCard(card.name, card.link, deleteCard));
});