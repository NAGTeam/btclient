lint:
	@/bin/echo -n "[btclient] Linting... "
	@node_modules/.bin/jshint --verbose \
		src/js/*.js \
		test/tests/*.js
	@/bin/echo ""
