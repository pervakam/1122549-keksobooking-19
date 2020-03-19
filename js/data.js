'use strict';

(function () {
  var cardTitle = [];
  var cardPriceMin = 0;
  var cardPriceMax = 1000000;
  var cardType = ['palace', 'flat', 'house', 'bungalo'];
  var cardRooms = [1, 2, 3, 100];
  var cardGuests = [1, 2, 3, 0];
  var cardCheckin = ['12:00', '13:00', '14:00'];
  var cardCheckout = ['12:00', '13:00', '14:00'];
  var cardFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var cardDescription = [];
  var cardPhotos = [];
  var cardLocationXMin = 0;
  var cardLocationXMax = 1200;
  var cardLocationYMin = 130;
  var cardLocationYMax = 630;
  var cards = [];
  var cardLength = 10;
  var serverData = null;

  var getRandomInteger = window.util.getRandomInteger;
  var getRandomElement = window.util.getRandomElement;
  var getRandomArray = window.util.getRandomArray;

  window.data = {
    serverData: serverData
  };
})();
