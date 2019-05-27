import { expect } from 'chai';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';
import * as actions from './motebehov_actions';
import motebehov from './motebehov';
import { MOTEBEHOVSVAR_GYLDIG_VARIGHET_DAGER } from '../../utils/motebehovUtils';
import { leggTilDagerPaaDato } from '../../utils/datoUtils';

describe('motebehov', () => {
    const initState = deepFreeze({
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForbudt: false,
        hentingForsokt: false,
        data: [],
    });

    let clock;
    beforeEach(() => {
        const dagensDato = new Date('2019-02-23');
        clock = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
        clock.restore();
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
        const opprettetDato = leggTilDagerPaaDato(new Date(), -MOTEBEHOVSVAR_GYLDIG_VARIGHET_DAGER);
        const action = actions.hentMotebehovHentet([{
            opprettetDato,
            motebehovSvar: {},
        }]);
        const nextState = motebehov(initState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentet: true,
            hentingFeilet: false,
            hentingForbudt: false,
            hentingForsokt: true,
            data: [{
                opprettetDato,
                motebehovSvar: {},
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
