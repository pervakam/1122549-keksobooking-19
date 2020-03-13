'use strict';

(function () {
  var baseCard = document.querySelector('#card').content.querySelector('.popup');
  var popupPhoto = document.querySelector('#card').content.querySelector('.popup__photo');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var mapCard;
  var offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createCard = function (card) {
    var fragment = document.createDocumentFragment();
    var cardElement = baseCard.cloneNode(true);
    var closeCardButton = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = (card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей');
    cardElement.querySelector('.popup__text--time').textContent = ('Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout);
    cardElement.querySelector('.popup__features').replaceWith(createFeatures(card));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').replaceWith(createPhotos(card));

    fragment.appendChild(cardElement);
    map.insertBefore(fragment, filterContainer);
    mapCard = cardElement;

    var skipPinMark = function () {
      var mapPin = document.querySelectorAll('.map__pin-new');
      for (var i = 0; i < mapPin.length; i++) {
        mapPin[i].classList.remove('map__pin--active');
      }
    };

    window.addEventListener('keydown', closeCardByKey);
    closeCardButton.addEventListener('click', closeCard);
    window.addEventListener('keydown', skipPinMark);
    closeCardButton.addEventListener('click', skipPinMark);
  };

  var closeCardByKey = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      closeCard();
    }
  };

  var closeCard = function () {
    if (mapCard) {
      mapCard.remove();
      mapCard = null;
    }

  };

  var createFeatures = function (card) {
    var fragment = document.createDocumentFragment();
    card.offer.features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      fragment.appendChild(featureItem);
    });
    return fragment;
  };

  var createPhotos = function (card) {
    var fragment = document.createDocumentFragment();
    card.offer.photos.forEach(function (it) {
      var photoItem = popupPhoto.cloneNode(true);
      photoItem.src = it;
      fragment.appendChild(photoItem);
    });
    return fragment;
  };

  window.card = {
    createCard: createCard,
    closeCardByKey: closeCardByKey,
    closeCard: closeCard
  };
})();
