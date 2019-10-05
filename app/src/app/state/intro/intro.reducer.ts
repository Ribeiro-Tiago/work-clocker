import * as IntroActions from "./intro.actions";
import { Intro, Action } from './intro.model';

const initState: Intro = {
    isDone: false
};

export function IntroReducer(state: Intro = initState, action: Action) {
    const { payload, type } = action;

    switch (type) {
        case IntroActions.SET_INTRO: {
            return { isDone: payload };
        }

        default:
            return state;
    }
}