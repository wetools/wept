
prepublish:
	@webpack --config webpack.prod.js
	@babel lib --out-dir build

.PHONY: prepublish
