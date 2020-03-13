'use strict';

(function () {
  var url = 'https://js.dump.academy/keksobooking/data';
  var serverMessages = {
    errorConnect: 'Произошла ошибка соединения',
    errorTimeout: 'Запрос не успел выполниться за ',
    responseStatus: 'Статус ответа: '
  };
  var statusOK = 200;
  var timeOut = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = timeOut;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOK) {
        onSuccess(xhr.response);
      } else {
        onError(serverMessages.responseStatus + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(serverMessages.errorConnect);
    });
    xhr.addEventListener('timeout', function () {
      onError(serverMessages.errorTimeout + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var loadCardContent = function (onSuccess, onError) {
    var xhr = load(onSuccess, onError);

    xhr.open('GET', url);
    xhr.send();
  };

  window.load = {
    loadCardContent: loadCardContent
  }
})();
