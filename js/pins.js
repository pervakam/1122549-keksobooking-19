'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var inputAdres = document.getElementById('address');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pinAfter = getComputedStyle(mapPinMain, '::after').getPropertyValue('border-top-width');
  var pinAfterTop = parseInt(pinAfter, 10);
  var fragment = document.createDocumentFragment();

  var defaultMainPinPosition = function () {
    mapPinMain.style.left = parseFloat(window.util.DEFAULT_PIN_POSITION.x) + 'px';
    mapPinMain.style.top = parseFloat(window.util.DEFAULT_PIN_POSITION.y) + 'px';
  };

  var generatePin = function (pinCard) {
    var pinElement = mapPin.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    var pinPositionLeft = (pinCard.location.x - (PIN_WIDTH / 2)) + 'px';
    var pinPositionTop = (pinCard.location.y - PIN_HEIGHT) + 'px';

    pinElement.style.left = pinPositionLeft;
    pinElement.style.top = pinPositionTop;
    pinImage.src = pinCard.author.avatar;
    pinImage.alt = pinCard.offer.title;
    pinElement.classList.add('map__pin-new');

    var pinClick = function () {
      var mapCard = map.querySelector('.map__card');
      if (mapCard) {
        window.card.closeCard();
      }
      window.card.createCard(pinCard);
      pinElement.classList.add('map__pin--active');
    };

    pinElement.addEventListener('click', pinClick);
    return pinElement;
  };

  var generatePins = function (pinCard) {
    var maxLength = pinCard.length > window.util.PINS_QUANTITY ? 5 : pinCard.length;

    for (var i = 0; i < maxLength; i++) {
      var pinElement = generatePin(pinCard[i]);

      fragment.appendChild(pinElement);
    }

    mapPins.appendChild(fragment);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };
      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetLeft > map.offsetWidth - mapPinMain.offsetWidth) {
        mapPinMain.style.left = (map.offsetWidth - mapPinMain.offsetWidth) + 'px';
      } else if (mapPinMain.offsetTop > map.offsetHeight - mapPinMain.offsetHeight - pinAfterTop) {
        mapPinMain.style.top = (map.offsetHeight - mapPinMain.offsetHeight - pinAfterTop) + 'px';
      } else if (mapPinMain.offsetTop < map.offsetTop) {
        mapPinMain.style.top = map.offsetTop + 'px';
      } else if (mapPinMain.offsetLeft < map.offsetTop) {
        mapPinMain.style.left = map.offsetTop + 'px';
      }
    };

    map.addEventListener('mousemove', function () {
      inputAdres.value = startCoords.x + ',' + startCoords.y;
    }
    );

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var removePins = function () {
    var mapPinsNew = mapPins.querySelectorAll('.map__pin-new');

    for (var i = 0; i < mapPinsNew.length; i++) {
      mapPinsNew[i].remove();
    }
  };

  window.pins = {
    generatePins: generatePins,
    removePins: removePins,
    defaultMainPinPosition: defaultMainPinPosition
  };
}
)();
