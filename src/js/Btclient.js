Btclient = {};

// Retrieve the unspent outputs for a given Bitcoin address.
// Input:
//  - A Bitcoin address
//  - A callback passed with an array of Object's
Btclient.unspentoutputs = function (address, cb) {
    'use strict';
    var url = 'http://blockchain.info/unspent';
    Btclient.util.ajax('GET', url, {'active': address}, 'text', function (err, res) {
        if (err) {
            return cb(err);
        }
        var uots = [];
        var unspentoutputs = JSON.parse(res).unspent_outputs;
        unspentoutputs.forEach(function (uot) {
            uots.push({
                'hash': uo.tx_hash,
                'n': uo.tx_output_n,
                'value': uo.value
            });
        });
        cb(null, uots);
    });
};

// Create a new Bitcoin Tx
// Input: 
//  - Bitcoin address of the sender
//  - Bitcoin address of the receiver
//  - Amount of bitcoin involved in the Tx
//  - A callback passed with the Tx created
Btclient.createtx = function (fromaddress, toaddress, amount, unspent, cb) {
    var tx = new bitcoin.Transaction();
    var sum = 0;
    unspent.forEach(function (u) {
        if (sum < amount) {
            tx.addInput(u.hash, u.n);
            sum += u.value;
        }
    });
    tx.addOutput(toaddress, amount);
    tx.addOutput(fromaddress, sum - amount);
    if (sum < amount) {
        cb(new Error("Not enough money, bro."));
    }
    else {
        cb(null, tx);
    }
};

// Sign the given Bitcoin Tx with the passed key
// Input:
//  - Bitcoin key to sign the Tx
//  - Tx to sign off
//  - A callback passed with the Tx, now signed
Btclient.signtx = function (key, tx, cb) {
    for (var i in tx.ins) {
        if (typeof i == "number") { tx.sign(key, i); }
    }
    cb(null, tx);
};

// Broadcast the Tx to the network, using blockchain.info/pushtx's form
// Input:
//  - A signed Bitcoin Tx
//  - A callback passed with the response of the POST req
Btclient.broadcasttx = function (tx, cb) {
    Btclient.util.ajax('POST', 'https://blockchain.info/pushtx', {'tx': tx.toHex()}, 'text', function (err, res) {
        if (err) {
            cb(err);
        }
        cb(null, res);
    });
};

Btclient.util = {};

// Encode parameters such to fit in the URL spec
// Input:
//  - An Object of the form { 'parameter': 'value', ... }
// Output:
//  - A string of the form 'parameter=value&...'
Btclient.util.encodehttpparameters = function (httpparameters) {
    'use strict';
    var encodedhttpparameters = '';
    for (var parameter in httpparameters) {
        if (encodedhttpparameters.length > 0) { encodedhttpparameters += '&'; }
        encodedhttpparameters += parameter + '=' + httpparameters[parameter];
    }
    return encodedhttpparameters;
};

// Make an Ajax call to url specified
// Input:
//  - HTTP method to use (only ['GET','POST'] tested!)
//  - URL of the server
//  - Parameters to send (properly encoded)
//  - Response type (only ['text', 'arraybuffer'] tested!)
//  - A callback passed with the HTTP response
Btclient.util.ajax = function (httpmethod, url, parameters, responsetype, cb) {
    'use strict';
    var xhr = new XMLHttpRequest();
    xhr.responseType = responsetype;
    var encodedhttpparameters = Btclient.util.encodehttpparameters(parameters);
    if (Object.keys(parameters).length > 0) {
        if (httpmethod == 'POST') {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Content-length", encodedhttpparameters.length);
            xhr.setRequestHeader("Connection", "close");
        }
    }
    xhr.onload = function () {
        if (xhr.status != 200) {
            return cb(new Error(xhr.statusText));
        }
        cb(null, xhr.response);
    };
    xhr.onerror = function (e) {
        cb(e.error);
    };
    if (Object.keys(parameters).length > 0) {
        url = httpmethod == 'GET' ? url + '?' + encodedhttpparameters : url;
    }
    xhr.open(httpmethod, url, true);
    xhr.send(httpmethod == 'POST' ? encodedhttpparameters : null);
};

// Convert an ArrayBuffer to a dataURL
// Input:
//  - ArrayBuffer to use as a seed
//  - MIMEtype of the blob
//  - base64: [true,false]
//  - A callback passed with the dataURL 
Btclient.util.arraybuffertodataURL = function (arraybuffer, MIMEtype, base64, cb) {
    'use strict';
    if (!arraybuffer) {
        return cb(new Error("No ArrayBuffer seed specified."));
    }
    var out = 'data:' + MIMEtype;
    if (base64) { out += ';base64'; }
    out += ',' + nacl.util.encodeBase64(new Uint8Array(arraybuffer));
    cb(null, out);
};

// Decode the dataURL of a QR code
// Input:
//  - dataURL of the QR code to decode
//  - A callback passed with the string wrapped by the QR code
Btclient.util.decodeQR = function (dataURL, cb) {
    'use strict';
    qrcode.callback = function (data) {
        cb(null, data);
    };
    qrcode.decode(dataURL);
};

Btclient.settings = {};

// Default Bitcoin address to use as the sender
Btclient.settings.fromaddress = '';

// Default Bitcoin address to use as the receiver
Btclient.settings.toaddress = '';

// Default Bitcoin amount to use in a Tx
Btclient.settings.amount = 0;
