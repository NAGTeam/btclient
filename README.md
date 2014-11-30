# btclient

[![Build Status](https://travis-ci.org/NAGTeam/btclient.svg)](https://travis-ci.org/NAGTeam/btclient)

# Please read before any push, bro!

A very naif bitcoin client that can be used using QR-codes for sending
a bunch of satoshis. We'd expect to write few lines of code, keeping lots
of logic in the hand of good javascript libraries.

The client should **only** broadcast the transaction to the network, course.

Development should be very git-oriented, using branches
and pull-requests that has to be voted up by all the active members.
Discussion happens on github issue tracker. Put there any code snippets,
ideas, references you find useful. :)

## Technologies to use
Bitcoin, Javascript, bitcoin.js, bower, <del>karma</del>QUnit, tweetnacl.js, jshint [, ...]

## User flow
Every week, Alice's grandmother sends Alice 1 satoshi to address `A` using some crazy crypto software that Alice has no clue on how to use it.

She has (thanks to her grandmother) a paper wallet where both the address `A` and the private key `key(A)` are printed as QR codes.

Assume we're using some magic library for decoding QR codes
```
var qr = new QrCode();
qr.callback = function (res) { return res; };
var fromaddress = qr.decode(<DataURL of the QR for Alice's address>);
var key = qr.decode(<DataURL of the QR for the private key>);
```
(using [dataURL](http://tools.ietf.org/html/rfc2397)s we can easily handle blobs).

Alice is meant to send 5 satoshis to Bob. She has only the QR code that contains the Bitcoin address of Bob.

Then, she decodes Bob's QR code too
```
var toaddress = qr.decode(<DataURL of the QR for Bob's address>)
```

(Bob owns a KFC franchise, and for 5 satoshis he gives you a pair of nasty chicken wings).

She queries the blockchain such to retrieve a list of hashes relative to unspent transactions using its address A.

She creates a Bitcoin transaction <del>putting together as input her unspent transactions until they sum up to the 5 satoshis needed</del>
using the `txhints` as a hint for a `createTx({})` function that's just some sugar on top of BitcoinJS's `bitcoin.Transaction()`,
using as output both Bob's address and her address A to have her change back (if any).
<del>She signs the transaction scanning her private key key(A) from the paper wallet.</del>

She broadcasts the transaction to the Bitcoin network.
```
// Send a POST request to https://blockchain.info/pushtx
// where the tx parameter is set to tx.toHex()
```
*Note that it's very likely this last HTTP request won't be sent due to
the same-origin-policy protection. That shouln't be a problem, assuming we can
grant enough privileges from the browser, e.g. packaging this app as
a firefoxos one*.

She waits 10 minutes, then transaction is confirmed and she bites her chicken wings.
*It would be nice to query the blockchain again after 10 minutes to check if some
errors occurred*.

**EDIT**: for the record, sending less than 5430 satoshis is not possibile.

## Contributing

Course, we would be very glad if you think this project is worth something
and if you want to give us some help: **any** kind of help is appreciated.

We lack a UI, so even reporting bugs would be difficult if you're not a developer.

For those who want to contribute to the codebase, you should setup a development
environment. You can use the script pushed on Github (**check what it does before running!!**)
```
$ curl -L https://raw.githubusercontent.com/NAGTeam/btclient/master/setupenv_Btclient.sh | sh
```
then setup a HTTP server using as the root directory the cloned repository.
You can use the `python2` module
```
$ cd btclient
$ python2 -m SimpleHTTPServer
```
Now, hack on the project! :)

```
https://www.youtube.com/watch?v=3L4YrGaR8E4
```
