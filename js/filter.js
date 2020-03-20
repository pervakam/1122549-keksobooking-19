'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('select, fieldset');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var allFeatures = housingFeatures.querySelectorAll('input[name="features"]');

  var lastTimeout;

  var blockedFilter = function () {
    filterForm.reset();

    filterFields.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    })
  };

  var activateFilter = function (fields) {
    fields.forEach(function (fields) {
      fields.removeAttribute('disabled', 'disabled');
    })
  };

  blockedFilter();

  var checkFeatures = function (data, filterValue) {
    var reply = false;

    reply = data.some(function (element) {
      return element === filterValue;
    });

    return reply;
  };

  var filterOptions = function (data) {
    var filteredServerData = data;

    if (housingType.value !== 'any') {
      filteredServerData = filteredServerData.filter(function (element) {
        return element.offer.type === housingType.value;
      });
    }

    if (housingPrice.value === 'low') {
      filteredServerData = filteredServerData.filter(function (element) {
        return element.offer.price < 10000;
      });
    }

    if (housingPrice.value === 'middle') {
      filteredServerData = filteredServerData.filter(function (element) {
        return element.offer.price >= 10000 && element.offer.price <= 50000;
      });
    }

    if (housingPrice.value === 'high') {
      filteredServerData = filteredServerData.filter(function (element) {
        return element.offer.price > 50000;
      });
    }

    if (housingRooms.value !== 'any') {
      filteredServerData = filteredServerData.filter(function (element) {
        return Number(element.offer.rooms) === Number(housingRooms.value);
      });
    }

    if (housingGuests.value !== 'any') {
      filteredServerData = filteredServerData.filter(function (element) {
        return Number(element.offer.guests) === Number(housingGuests.value);
      });
    }

    var choseFeature = function (feature) {
      if (feature.checked) {
        filteredServerData = filteredServerData.filter(function (element) {
          return checkFeatures(element.offer.features, feature.value);
        });
      }
    };

    allFeatures.forEach(function (it) {
      choseFeature(it);
    });

    return filteredServerData;
  };

  var filterPins = function (data) {
    window.card.closeCard();
    window.pins.removePins(data);
    var filteredObjects = filterOptions(window.load.serverData);

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.pins.generatePins(filteredObjects);
    }, window.util.TIMEOUT);
  };

  filterForm.addEventListener('change', filterPins);

  window.filter = {
    blockedFilter: blockedFilter,
    activateFilter: activateFilter,
    filterData: filterOptions,
    filterPins: filterPins
  };
})();
