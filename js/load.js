'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var SERVER_MESSAGES = {
    errorConnect: 'Произошла ошибка соединения',
    errorTimeout: 'Запрос не успел выполниться за ',
    responseStatus: 'Статус ответа: '
  };
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(SERVER_MESSAGES.responseStatus + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(SERVER_MESSAGES.errorConnect);
    });
    xhr.addEventListener('timeout', function () {
      onError(SERVER_MESSAGES.errorTimeout + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var loadCardContent = function (onSuccess, onError) {
    var xhr = load(onSuccess, onError);

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var sendForm = function (data, onSuccess, onError) {
    var xhr = load(onSuccess, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.load = {
    loadCardContent: loadCardContent,
    sendForm: sendForm
  };
})();
