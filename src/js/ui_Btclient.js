(function () {
'use strict';

Btclient.UI = {};

Btclient.UI.setup = function () {
    // Do some initial setup to the UI
    // ...

    // Add event listeners
    $('a.submit-tx').on('click', function (e) {
        // ...
        console.log('[Btclient] Transaction sent.');
    });

    //...
};

window.onload = function () {
    Btclient.UI.setup();
};

})();
