(function () {
'use strict';

Btclient.UI = {};

Btclient.UI.start = function () {
    // Do some initial setup to the UI
    // ...

    // Add event listeners
    $('a.send-tx').on('click', function (e) {
        Btclient.settings.key = bitcoin.ECKey.fromWIF($('input[name="sender-key"]').val());
        Btclient.settings.fromaddress = Btclient.settings.key.pub.getAddress().toString();
        Btclient.settings.toaddress = $('input[name="receiver-address"]').val();
        Btclient.settings.amount = parseInt($('input[name="amount"]').val());
        Btclient.unspentoutputs(Btclient.settings.fromaddress, function (err, unspent) {
            if (err) {
                throw err;
            }
            Btclient.createtx(Btclient.settings.fromaddress, Btclient.settings.toaddress, Btclient.settings.amount, unspent, function (err, tx) {
                if (err) {
                    throw err;
                }
                Btclient.signtx(Btclient.settings.key, tx, function (err, signedtx) {
                    if (err) {
                        throw err;
                    }
                    console.log('signedtx' + JSON.stringify(signedtx));
                    /*
                     *Btclient.broadcasttx(signedtx, function (err, res) {
                     *    if (err) {
                     *        throw err;
                     *    }
                     *    console.log('[Btclient] Transaction sent.');
                     *    console.log(res);
                     *});
                     */
                });
            });
        });
    });

    //...
};

window.onload = function () {
    Btclient.UI.start();
};

})();
