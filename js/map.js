'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var notice = document.querySelector('.notice');
  var noticeFieldset = notice.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('select, fieldset');

  var activatePageHandler = function (data) {
    window.load.serverData = data;
    window.filter.filterData(data);
    window.filter.activateFilter(filterFields);
    window.pins.generatePins(data);
  };

  var activateMap = function () {
    window.load.loadCardContent(activatePageHandler, window.messages.errorMessage);
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    noticeFieldset.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });

    mapPinMain.removeEventListener('keydown', activateMapHandler);
    mapPinMain.removeEventListener('mousedown', activateMapHandler);
  };

  var activateMapHandler = function (evt) {
    if (evt.key === window.util.ENTER_KEY || evt.button === window.util.MOUSE_LEFT) {
      activateMap();
      window.form.setHandlers();
    }
  };

  var initialState = function () {
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pins.removePins();
    window.pins.defaultMainPinPosition();
    window.card.closeCard();
    window.form.announcementFormDisabled();
    window.form.defaultAddressValue();
    window.filter.blockedFilter();

    mapPinMain.addEventListener('keydown', activateMapHandler);
    mapPinMain.addEventListener('mousedown', activateMapHandler);
  };


  mapPinMain.addEventListener('keydown', activateMapHandler);
  mapPinMain.addEventListener('mousedown', activateMapHandler);

  window.map = {
    initialState: initialState
  };

})();

