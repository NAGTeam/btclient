# btclient

A very naif bitcoin client that can be used using QR-codes for sharing
a bunch of satoshis. We'd expect to write few lines of code, keeping lots
of logic in the hand of good javascript libraries.

The client should **only** broadcast the transaction to the network, course.

Before the first line of code to be pushed, few ideas about the design of this
client should be written down.
Development should be very git-oriented, using branches and pull-requests.
Discussion happens on github issue tracker.

## Technologies to use
Bitcoin, Javascript, bitcoin.js, bower, karma, tweetnacl.js, jshint [, ...]

## User flow
Every week, Alice's grandmother sends Alice 1 satoshi to address `A` using some crazy crypto software that Alice has no clue on how to use it.

She has (thanks to her grandmother) a paper wallet where both the address `A` and the private key `key(A)` are printed as QR codes.

Assume we're using [this](https://github.com/edi9999/jsqrcode) library for instance
```
var qr = new QrCode();
qr.callback = function (res) { return res; };
var fromaddress = qr.decode(<DataURL of the QR for Alice's address>);
var key = qr.decode(<DataURL of the QR for the private key>);
```
(using [DataURL](http://tools.ietf.org/html/rfc2397)s we can easily handle blobs).

Alice is meant to send 5 satoshis to Bob. She has only the QR code that contains the Bitcoin address of Bob.

Then, she decodes Bob's QR code too
```
var toaddress = qr.decode(<DataURL of the QR for Bob's address>)
```

(Bob owns a KFC franchise, and for 5 satoshis he gives you a pair of nasty chicken wings).

She queries the blockchain such to retrieve a list of hashes relative to unspent transactions using its address A.
```
var xhr = new XMLHttpRequest();
var url = 'https://blockchain.info/address/' + fromaddress + '?format=json&cors=true';
xhr.open('GET', url, true);
xhr.onload = function () {
    var responseJSON = JSON.parse(xhr.responseText);
    var enoughmoney = responseJSON['final_balance'] >= 5;
    if (!enoughmoney) { throw "Not enough money, bro."; }
    var txhints = {};
    txhints.balance = 0;
    responseJSON['txs'].forEach(function (tx) {
        // Fill the txhints object such to have a list of txs
        // and the relative balance.
        //...
        if (txhints.balance >= 5) {
            break;
        }
    });
    //...
};
xhr.send();
```
She creates a Bitcoin transaction <del>putting together as input her unspent transactions until they sum up to the 5 satoshis needed</del>
using the `txhints` as a hint for a `createTx({})` function that's just some sugar on top of BitcoinJS's `bitcoin.Transaction()`,
using as output both Bob's address and her address A to have her change back (if any).
<del>She signs the transaction scanning her private key key(A) from the paper wallet.</del>
```
var createTx = function (fromaddress, toaddress, amount, txhints) {
    var tx = bitcoin.Transaction();
    txhints['inputs'].forEach(function (in) { ...; });
    tx.addOutput(toaddress, 5);
    tx.addOutput(fromaddrss, 5 - txhints['balance']);
    for (var i = 0; i < txhints.ninputs; i++) {
        tx.sign(i, key);
    }
    //...
    return tx;
};
```

She broadcasts the transaction to the Bitcoin network.
```
// Send a POST request to https://blockchain.info/pushtx
// where the tx parameter is set to tx.toHex()
```
*Note that it's very likely this last HTTP request won't be sent due to
the same-origin-policy protection. That shouln't be a problem, assuming we can
grant enough privileges from the browser, e.g. packaging this app as
or a firefoxos one*.

She waits 10 minutes, then transaction is confirmed and she bites her chicken wings.
*It would be nice to query the blockchain again after 10 minutes to check if some
errors occurred*.

EDIT: for the record, sending less than 5430 satoshis is not possibile.
