'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var activateMap = function (evt) {
    var map = document.querySelector('.map');
    var MOUSE_LEFT = 0;
    var ENTER_KEY = 'Enter';

    if (evt.key === ENTER_KEY) {
      map.classList.remove('map--faded');
    }
    if (evt.button === MOUSE_LEFT) {
      map.classList.remove('map--faded');
    }
    console.log();
  };

  mapPinMain.addEventListener('keydown', activateMap);
  mapPinMain.addEventListener('mousedown', activateMap);
})();
