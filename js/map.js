'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var activateMap = function (evt) {
    var map = document.querySelector('.map');

    if (evt.key === window.util.ENTER_KEY) {
      map.classList.remove('map--faded');
      window.pins.generatePin();

    }
    if (evt.button === window.util.MOUSE_LEFT) {
      map.classList.remove('map--faded');
      window.pins.generatePin();
    }
  };

  mapPinMain.addEventListener('keydown', activateMap);
  mapPinMain.addEventListener('mousedown', activateMap);
})();
