QUnit.asyncTest("Decoding QR code", function (assert) {
    'use strict';
    expect(1);
    var btcaddress = '1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F';
    Btclient.util.ajax('GET', '/test/files/btcaddress.qr', {}, 'arraybuffer', function (err, res) {
        if (err) {
            throw err;
        }
        var qrcode_Uint8Array = new Uint8Array(res);
        var qrcode_Base64 = nacl.util.encodeBase64(qrcode_Uint8Array);
        var qrcode_dataURL = "data:image/png;base64," + qrcode_Base64;
        Btclient.util.decodeQR(qrcode_dataURL, function (err, res) {
            if (err) {
                throw err;
            }
            assert.equal(res, btcaddress, "Correctly decoded \"1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F\" from QR code");
            QUnit.start();
        });
    });
});
