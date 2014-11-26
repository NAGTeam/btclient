QUnit.asyncTest("Making a local ajax", function (assert) {
    'use strict';
    expect(1);
    Btclient.util.ajax('GET', '/test/files/hacker.txt', {}, 'text', function (err, res) {
        if (err) {
            throw err;
        }
        assert.equal(res, 'h4ck3r', "Correctly sent and received the ajax.");
        QUnit.start();
    });
});
