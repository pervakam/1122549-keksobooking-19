'use strict';

(function () {
  var MAIN_BUTTON_WIDTH = 65;
  var MAIN_BUTTON_HEIGHT = 65;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_PIN_MAIN_WIDTH = 62;
  var MAP_PIN_MAIN_HEIGHT = 80;
  var PINS_QUANTITY = 5;
  var MapHorizontalBorder = {
    TOP: 130,
    BOTTOM: 630
  };

  var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var inputAdres = document.getElementById('address');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var fragment = document.createDocumentFragment();

  var MainPinCenter = {
    X: Math.round(MAIN_BUTTON_WIDTH / 2),
    Y: Math.round(MAIN_BUTTON_HEIGHT / 2)
  };

  var DefaultPinPosition = {
    X: parseInt(mapPinMain.style.left, 10),
    Y: parseInt(mapPinMain.style.top, 10)
  };

  var defaultMainPinPosition = function () {
    mapPinMain.style.left = DefaultPinPosition.X + 'px';
    mapPinMain.style.top = DefaultPinPosition.Y + 'px';
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
    var maxLength = pinCard.length > PINS_QUANTITY ? 5 : pinCard.length;

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

      var PinMainPositionX = parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2;
      var PinMainPositionY = parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_HEIGHT;
      inputAdres.value = PinMainPositionX + ',' + PinMainPositionY;

      if (mapPinMain.offsetLeft > map.offsetWidth - mapPinMain.offsetWidth) {
        mapPinMain.style.left = (map.offsetWidth - mapPinMain.offsetWidth) + 'px';
      } else if (mapPinMain.offsetLeft < map.offsetTop) {
        mapPinMain.style.left = map.offsetTop + 'px';
      }

      if (mapPinMain.offsetTop > MapHorizontalBorder.BOTTOM) {
        mapPinMain.style.top = MapHorizontalBorder.BOTTOM + 'px';
      } else if (mapPinMain.offsetTop < MapHorizontalBorder.TOP) {
        mapPinMain.style.top = MapHorizontalBorder.TOP + 'px';
      }
    };

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

    mapPinsNew.forEach(function (newpin) {
      newpin.remove();
    });

  };

  window.pins = {
    generatePins: generatePins,
    removePins: removePins,
    DefaultPinPosition: DefaultPinPosition,
    defaultMainPinPosition: defaultMainPinPosition,
    MainPinCenter: MainPinCenter
  };
}
)();
