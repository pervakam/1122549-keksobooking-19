'use strict';

var mapPin = document.querySelector('#pin').content.querySelector('button');
var pinWidth = 50;
var pinHeight = 70;
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var announcements = window.data.announcements;
var announcementLength = 8;

window.pins = {
  generatePin: function () {
    var item = document.createDocumentFragment();

    for (var k = 0; k < announcementLength; k++) {

      var createPin = function () {
        var pinElement = mapPin.cloneNode(true);
        var pinPosition = 'left: ' + (announcements[k].location.x - (pinWidth / 2)) + 'px; top: ' + (announcements[k].location.y - pinHeight) + 'px;';

        map.appendChild(pinElement);
        pinElement.style = pinPosition;
        pinElement.querySelector('img').src = announcements[k].author.avatar;
        pinElement.querySelector('img').alt = announcements[k].offer.title;
        return pinElement;
      };

      item.appendChild(createPin());

    }
    mapPins.appendChild(item);

  }
};




