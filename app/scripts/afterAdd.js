const fs = require('fs');

const fileSizes = ["ldpi", "mdpi", "hdpi", "xhdpi", "xxhdpi", "xxxhdpi"];

function copyFile(origin, dest, type, size) {
	console.log(`started copying ${size} to ${type}`);

	fs.copyFile(
		origin,
		`${dest}-${type}-${size}/smallicon.png`,
		function (err) {
			if (err) {
				console.error(`Error copying ${size} to port: `, err);
			} else {
				console.error(`Finished copying ${size} to port: `);
			}
		}
	);
}

module.exports = function (ctx) {
	// Make sure android platform is part of build
	if (!ctx.opts.platforms.includes('android')) {
		return;
	}

	const originPath = `${ctx.opts.projectRoot}/resources/android/smallIcon/drawable-`
	const destPath = `${ctx.opts.projectRoot}/platforms/android/app/src/main/res`;

	console.log("Building android, attempting to copy small icons...");

	let size, from;
	for (size of fileSizes) {
		from = `${originPath}${size}/smallicon.png`;

		copyFile(from, `${destPath}/drawable`, "port", size);
		copyFile(from, `${destPath}/drawable`, "land", size);
	}

	return;
};
