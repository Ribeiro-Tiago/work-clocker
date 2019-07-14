import langs from "src/configs/langs";

export default {
    dateFormats: [
        { key: "dd/mm/yyyy", label: "21/03/2018" },
        { key: "mm/dd/yyyy", label: "09/21/2018" },
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
    workDuration: [
        4,
        5,
        8,
        10,
        11,
        12
    ],
    legalities: [
        { labelId: "settings.privacyPolicy", link: "https://www.google.pt" },
        { labelId: "settings.userAgreement", link: "https://www.google.pt" },
        { labelId: "settings.adPolicy", link: "https://www.google.pt" },
        { labelId: "settings.version", version: "1.0.0" },
    ]
};