
prepublish:
	@webpack --config webpack.prod.js
	@babel lib --out-dir build
	@rm build/*.map

.PHONY: prepublish
