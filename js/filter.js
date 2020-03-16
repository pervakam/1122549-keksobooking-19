'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('select, fieldset');
  var housingType = document.querySelector('#housing-type');

  var blockedFilter = function () {
    filterFields.forEach(function (filterFields) {
      filterFields.setAttribute('disabled', 'disabled')
    });
  }

  var activateFilter = function (fields) {
    fields.forEach(function (fields) {
      fields.removeAttribute('disabled', 'disabled')
    });
  }

  blockedFilter();

  var isFeaturesMatched = function (arr, filterValue) {
    var reply = false;

    reply = arr.some(function (element) {
      return element === filterValue;
    });

    return reply;
  };

  var filterAdvertisement = function (data) {
    housingType.addEventListener('change', function () {

      var filteredArray = data;

      var sameHousingType = filteredArray.filter(function (element) {
        return element.offer.type === 'flat';
      })
      console.log(sameHousingType);
      // window.pins.generatePins(filteredArray);
      window.pins.generatePins(sameHousingType);
    }
    ) };
  // housingType.addEventListener('change', filterAdvertisement);
    // var filteredObjects = filterAdvertisement(window.map.serverData);
    // console.log(sameHousingType);
    // window.pins.generatePins(sameHousingType);
  // );



  // var filteredPins = window.pins.list.filter(function (it) {
  //   return it.offer.type === value;
  // });
  // var uniquePins = filteredPins.filter(function (it, i) {
  //   return filteredPins.indexOf(it) === i;
  // });
  // console.log(window.pins.list);
  //


  window.filter = {
    blockedFilter: blockedFilter,
    activateFilter: activateFilter,
    filterData: filterAdvertisement
  }
})();
