'use strict';
// 1
var annoucementTitle = ['Заголовок объявления 1', 'Заголовок объявления 2', 'Заголовок объявления 3', 'Заголовок объявления 4', 'Заголовок объявления 5', 'Заголовок объявления 6', 'Заголовок объявления 7', 'Заголовок объявления 8'];
var annoucementPriceMin = 0;
var annoucementPriceMax = 1000000;
var annoucementType = ['palace', 'flat', 'house', 'bungalo'];
var annoucementRooms = [1, 2, 3, 100];
var annoucementGuests = [1, 2, 3, 0];
var annoucementCheckin = ['12:00', '13:00', '14:00'];
var annoucementCheckout = ['12:00', '13:00', '14:00'];
var annoucementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var announcementDescription = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'];
var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcementLocationXMin = 0;
var announcementLocationXMax = 1200;
var announcementLocationYMin = 130;
var announcementLocationYMax = 630;
var announcements = [];
var announcementLength = 8;

annoucementType[0] = 'Дворец';
annoucementType[1] = 'Кваритра';
annoucementType[2] = 'Дом';
annoucementType[3] = 'Бунгало';

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};
var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};
var getRandomArray = function (items) {
  return items.slice(0, getRandomInteger(0, items.length - 1));
};

var createAnnoucementItem = function () {
  for (var j = 0; j < announcementLength; j++) {
    var randomPositionX = getRandomInteger(announcementLocationXMin, announcementLocationXMax);
    var randomPositionY = getRandomInteger(announcementLocationYMin, announcementLocationYMax);

    announcements.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (j + 1) + '.png'
          },
          offer: {
            title: getRandomElement(annoucementTitle),
            address: randomPositionX + ',' + randomPositionY,
            price: getRandomInteger(annoucementPriceMin, annoucementPriceMax),
            type: getRandomElement(annoucementType),
            rooms: getRandomElement(annoucementRooms),
            guests: getRandomElement(annoucementGuests),
            checkin: getRandomElement(annoucementCheckin),
            checkout: getRandomElement(annoucementCheckout),
            features: getRandomArray(annoucementFeatures),
            description: getRandomElement(announcementDescription),
            photos: getRandomElement(announcementPhotos)
          },
          location: {
            x: randomPositionX,
            y: randomPositionY
          }
        });
  }
};

createAnnoucementItem(announcementLength);

// 2

var mapPin = document.querySelector('#pin').content.querySelector('button');
var pinWidth = 50;
var pinHeight = 70;
var mapPins = document.querySelector('.map__pins');
var notice = document.querySelector('.notice');
var form = document.querySelector('.ad-form');
var noticeFieldset = notice.querySelectorAll('fieldset');
var inputAdres = document.getElementById('address');
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');

// var card = document.querySelector('#card').content.querySelector('.popup');
// var filterContainer = document.querySelector('.map__filters-container');

for (var i = 0; i < noticeFieldset.length; i++) {
  noticeFieldset[i].setAttribute('disabled', 'disabled');
}

var MAPPINWIDTH = 62;
var MAPPINHEIGHT = 84;
var MAPPINX = parseFloat(mapPinMain.style.left) + MAPPINWIDTH / 2;
var MAPPINY = parseFloat(mapPinMain.style.top) + MAPPINHEIGHT;
var MOUSE_LEFT = 0;
var ENTER_KEY = 'Enter';

inputAdres.setAttribute('placeholder', MAPPINX + ',' + MAPPINY);

// 4

var activateMap = function (evt) {
  if (evt.key === ENTER_KEY) {
    map.classList.remove('map--faded');
  }
  if (evt.button === MOUSE_LEFT) {
    map.classList.remove('map--faded');
  }

  var createPin = function (ad) {
    var pinElement = mapPin.cloneNode(true);
    var pinPosition = 'left: ' + (ad.location.x - (pinWidth / 2)) + 'px; top: ' + (ad.location.y - pinHeight) + 'px;';

    map.appendChild(pinElement);
    pinElement.style = pinPosition;
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var generatePin = function () {
    var item = document.createDocumentFragment();
    for (var k = 0; k < announcementLength; k++) {
      item.appendChild(createPin(announcements[k]));
    }

    mapPins.appendChild(item);
  };

  generatePin();

  form.classList.remove('ad-form--disabled');

  for (var a = 0; a < noticeFieldset.length; a++) {
    noticeFieldset[a].removeAttribute('disabled');
  }
  //
  // var createCard = function () {
  //   var cardElement = card.cloneNode(true);
  //   map.insertBefore(cardElement, filterContainer);
  //
  //   var popupTitle = cardElement.querySelector('.popup__title');
  //   var popupTextAdress = cardElement.querySelector('.popup__text--address');
  //   var popupTextPrice = cardElement.querySelector('.popup__text--price');
  //   var popupType = cardElement.querySelector('.popup__type');
  //   var popupTextCapacity = cardElement.querySelector('.popup__text--capacity');
  //   var popupTextTime = cardElement.querySelector('.popup__text--time');
  //   var popupDescription = cardElement.querySelector('.popup__description');
  //   var popupPhotos = cardElement.querySelector('.popup__photos');
  //   // var popupAvatar = cardElement.querySelector('.popup__avatar');
  //
  //   var popupFeatureWifi = cardElement.querySelector('.popup__feature--wifi');
  //   var popupFeatureDishwasher = cardElement.querySelector('.popup__feature--dishwasher');
  //   var popupFeatureParking = cardElement.querySelector('.popup__feature--parking');
  //   var popupFeatureWasher = cardElement.querySelector('.popup__feature--washer');
  //   var popupFeatureElevator = cardElement.querySelector('.popup__feature--elevator');
  //   var popupFeatureConditioner = cardElement.querySelector('.popup__feature--conditioner');
  //
  //   popupTitle.textContent = announcements[0].offer.title;
  //   popupTextAdress.textContent = announcements[0].offer.address;
  //   popupTextPrice.textContent = (announcements[0].offer.price + '₽/ночь');
  //   popupType.textContent = announcements[0].offer.type;
  //   popupTextCapacity.textContent = (announcements[0].offer.rooms + ' комнаты для ' + announcements[0].offer.guests + ' гостей');
  //   popupTextTime.textContent = ('Заезд после ' + announcements[0].offer.checkin + ', выезд до ' + announcements[0].offer.checkout);
  //   popupDescription.textContent = announcements[0].offer.description;
  //   popupPhotos.querySelector('img').src = announcements[0].offer.photos;
  //   card.querySelector('img').src = announcements[0].author.avatar;
  //
  //   popupFeatureWifi.textContent = annoucementFeatures[0];
  //   popupFeatureDishwasher.textContent = annoucementFeatures[1];
  //   popupFeatureParking.textContent = annoucementFeatures[2];
  //   popupFeatureWasher.textContent = annoucementFeatures[3];
  //   popupFeatureElevator.textContent = annoucementFeatures[4];
  //   popupFeatureConditioner.textContent = annoucementFeatures[5];
  //
  // };
  //
  // createCard();
};

mapPinMain.addEventListener('keydown', activateMap);
mapPinMain.addEventListener('mousedown', activateMap);


// 5

var roomNumber = document.getElementById('room_number');
var capacity = document.getElementById('capacity');
var selectCapacity = capacity.getElementsByTagName('option');

var setCapacity = function () {
  selectCapacity[1].classList.add('hidden');
  selectCapacity[2].classList.add('hidden');
  selectCapacity[3].classList.add('hidden');
};
setCapacity();

roomNumber.addEventListener('change', function () {
  if (roomNumber.value === '1') {
    setCapacity();
    selectCapacity[0].classList.remove('hidden');
  } else if (roomNumber.value === '2') {
    setCapacity();
    selectCapacity[0].classList.remove('hidden');
    selectCapacity[1].classList.remove('hidden');
  } else if (roomNumber.value === '3') {
    setCapacity();
    selectCapacity[0].classList.remove('hidden');
    selectCapacity[1].classList.remove('hidden');
    selectCapacity[2].classList.remove('hidden');
  } else if (roomNumber.value === '100') {
    setCapacity();
    selectCapacity[0].classList.add('hidden');
    selectCapacity[3].classList.remove('hidden');
  } else {
    setCapacity();
  }
});
