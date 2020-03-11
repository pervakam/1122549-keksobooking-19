'use strict';

(function () {
  var baseCard = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');


  var createCard = function (cardContain) {
    var cardElement = baseCard.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = cardContain.author.avatar;
    cardElement.querySelector('.popup__title').textContent = cardContain.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardContain.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardContain.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = cardContain.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = (cardContain.offer.rooms + ' комнаты для ' + cardContain.offer.guests + ' гостей');
    cardElement.querySelector('.popup__text--time').textContent = ('Заезд после ' + cardContain.offer.checkin + ', выезд до ' + cardContain.offer.checkout);
    cardElement.querySelector('.popup__features').push = cardContain.offer.features;
    cardElement.querySelector('.popup__description').textContent = cardContain.offer.description;
    cardElement.querySelector('.popup__photos').src = cardContain.offer.photos;

    map.insertBefore(cardElement, filterContainer);
    window.card.popupCard = cardElement;
    return cardElement;
  };

  var resetCard = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      window.card.popupCard.remove();
    }
  };

  window.addEventListener('keydown', resetCard);











  window.card = {
    createCard: createCard,
  }
})();



