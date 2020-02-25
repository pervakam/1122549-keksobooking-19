'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  window.util = {
    getRandomInteger: function (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (elements) {
      return elements[getRandomInteger(0, elements.length - 1)];
    },
    getRandomArray: function (items) {
      return items.slice(0, getRandomInteger(0, items.length - 1));
    }
  };
})();
