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

**Alice** is meant to send 5 satoshis to **Bob**. She has only the QRcode
that contais the Bitcoin address of **Bob**.
...
