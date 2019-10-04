import { Action } from "@ngrx/store";
import { Setting } from "./settings.model";
import { ConfigOption } from "src/app/types/Misc";

export const UPDATE_SETTINGS = "[SETTINGS] Update settings";
export const UPDATE_INTRO_SETTINGS = "[SETTINGS] Update Intro settings";
export const UPDATE_LANG = "[SETTINGS] Update Lango";

export class Update implements Action {
	readonly type = UPDATE_SETTINGS;
	constructor(public payload: Setting) { }
}

export class UpdateIntroSettings implements Action {
	readonly type = UPDATE_INTRO_SETTINGS;
	constructor(public payload: Setting) { }
}

export class UpdateLang implements Action {
	readonly type = UPDATE_LANG;
	constructor(public payload: ConfigOption) { }
}
