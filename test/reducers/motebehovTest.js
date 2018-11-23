import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/motebehov_actions';
import motebehov from '../../js/reducers/motebehov';

describe('motebehov', () => {
    const initState = deepFreeze({
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForbudt: false,
        hentingForsokt: false,
        data: [],
    });

    it('håndterer HENT_MOTEBEHOV_HENTER', () => {
        const action = actions.hentMotebehovHenter();
        const nextState = motebehov(initState, action);
        expect(nextState).to.deep.equal({
            henter: true,
            hentet: false,
            hentingFeilet: false,
            hentingForbudt: false,
            hentingForsokt: false,
            data: [],
        });
    });

    it('håndterer HENT_MOTEBEHOV_HENTET', () => {
        const action = actions.hentMotebehovHentet([{ motebehovSvar: null }]);
        const nextState = motebehov(initState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentet: true,
            hentingFeilet: false,
            hentingForbudt: false,
            hentingForsokt: true,
            data: [{
                motebehovSvar: null,
            }],
        });
    });

    it('håndterer HENT_MOTEBEHOV_FEILET', () => {
        const action = actions.hentMotebehovFeilet();
        const nextState = motebehov(initState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentet: false,
            hentingFeilet: true,
            hentingForbudt: false,
            hentingForsokt: true,
            data: [],
        });
    });

    it('håndterer HENT_MOTEBEHOV_FORBUDT', () => {
        const action = actions.hentMotebehovForbudt();
        const nextState = motebehov(initState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentet: false,
            hentingFeilet: false,
            hentingForbudt: true,
            hentingForsokt: true,
            data: [],
        });
    });
});
