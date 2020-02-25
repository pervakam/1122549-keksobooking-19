'use strict';

var card = document.querySelector('#card').content.querySelector('.popup');
var filterContainer = document.querySelector('.map__filters-container');

var createCard = function () {
  var cardElement = card.cloneNode(true);
  map.insertBefore(cardElement, filterContainer);

  var popupTitle = cardElement.querySelector('.popup__title');
  var popupTextAdress = cardElement.querySelector('.popup__text--address');
  var popupTextPrice = cardElement.querySelector('.popup__text--price');
  var popupType = cardElement.querySelector('.popup__type');
  var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  var popupTextTime = cardElement.querySelector('.popup__text--time');
  var popupDescription = cardElement.querySelector('.popup__description');
  var popupPhotos = cardElement.querySelector('.popup__photos');
  // var popupAvatar = cardElement.querySelector('.popup__avatar');

  var popupFeatureWifi = cardElement.querySelector('.popup__feature--wifi');
  var popupFeatureDishwasher = cardElement.querySelector('.popup__feature--dishwasher');
  var popupFeatureParking = cardElement.querySelector('.popup__feature--parking');
  var popupFeatureWasher = cardElement.querySelector('.popup__feature--washer');
  var popupFeatureElevator = cardElement.querySelector('.popup__feature--elevator');
  var popupFeatureConditioner = cardElement.querySelector('.popup__feature--conditioner');

  popupTitle.textContent = announcements[0].offer.title;
  popupTextAdress.textContent = announcements[0].offer.address;
  popupTextPrice.textContent = (announcements[0].offer.price + '₽/ночь');
  popupType.textContent = announcements[0].offer.type;
  popupTextCapacity.textContent = (announcements[0].offer.rooms + ' комнаты для ' + announcements[0].offer.guests + ' гостей');
  popupTextTime.textContent = ('Заезд после ' + announcements[0].offer.checkin + ', выезд до ' + announcements[0].offer.checkout);
  popupDescription.textContent = announcements[0].offer.description;
  popupPhotos.querySelector('img').src = announcements[0].offer.photos;
  card.querySelector('img').src = announcements[0].author.avatar;

  popupFeatureWifi.textContent = annoucementFeatures[0];
  popupFeatureDishwasher.textContent = annoucementFeatures[1];
  popupFeatureParking.textContent = annoucementFeatures[2];
  popupFeatureWasher.textContent = annoucementFeatures[3];
  popupFeatureElevator.textContent = annoucementFeatures[4];
  popupFeatureConditioner.textContent = annoucementFeatures[5];

};

createCard();

