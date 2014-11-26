QUnit.test("Encoding HTTP parameters", function (assert) {
    'use strict';
    var parameters = { 'lorem': 'ipsum', 'name': 'binny' };
    var encodedhttpparameters = 'lorem=ipsum&name=binny';
    assert.equal(
        encodedhttpparameters,
        Btclient.util.encodehttpparameters(parameters),
        "HTTP parameters correctly encoded."
    );
});
