import langs from "src/configs/langs";

export default {
	dateFormats: [
		{ key: "dd/mm/yyyy", hour: "HH:mm", label: "20:31 21/03/2018" },
		{ key: "mm/dd/yyyy", hour: "hh:mm A", label: "10:01 AM 09/21/2018" },
	],
	langs,
	lunchDuration: [
		0,
		15,
		20,
		30,
		45,
		60,
		90,
		120,
	],
	lunchTypes: [
		{ label: "settings.auto", value: "auto" },
		{ label: "settings.manual", value: "manual" },
	],
	workDuration: [
		4,
		5,
		8,
		10,
		11,
		12
	],
	legalities: [
		{ labelId: "settings.privacyPolicy", name: "pp" },
		{ labelId: "settings.userAgreement", name: "eula" }
	],
	notifs: {
		defaultTime: { enabled: false, time: new Date().toISOString() },
		ids: {
			clockIn: 1,
			clockOut: 2,
			lunchIn: 3,
			lunchOut: 4
		}
	}
};
