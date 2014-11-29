lint:
	@/bin/echo -n "[btclient] Linting... "
	@node_modules/.bin/jshint --verbose \
		src/js/*.js \
		test/tests/*.js
	@/bin/echo ""

build:
	@/bin/echo -n "[btclient] Building..."
	@mkdir -p src/lib/bitcoinjs-lib
	@node_modules/.bin/browserify \
		node_modules/bitcoinjs-lib/src/index.js -s bitcoin \
		-o src/lib/bitcoinjs-lib/bitcoinjs-lib.js
	@/bin/echo ""
