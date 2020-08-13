// core modules
const fs = require('fs');
const path = require('path');

function _filePred(file) {
	// eslint-disable-next-line no-undef
	if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
		return false;
	}
	return /\.js$/.test(file) && !/^index\.js$/.test(file);
}

// eslint-disable-next-line no-undef
const files = fs.readdirSync(__dirname).filter(f => _filePred(f));
const collection = files.reduce((p, f) => {
	let name = f.substr(0, f.length - 3);
	// eslint-disable-next-line no-undef
	return { ...p, [name]: require(path.join(__dirname, f)) };
}, {});

module.exports = collection;
