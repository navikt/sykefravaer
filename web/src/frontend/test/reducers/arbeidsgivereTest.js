import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actiontyper from '../../js/actions/actiontyper';

import arbeidsgivere from '../../js/reducers/arbeidsgivere';

describe('arbeidsgivere', () => {
    it('håndterer HENTER_AKTUELLE_ARBEIDSGIVERE', () => {
        const initialState = deepFreeze({});
        const action = {
            type: actiontyper.HENTER_AKTUELLE_ARBEIDSGIVERE,
            sykmeldingId: 55,
        };
        const nextState = arbeidsgivere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            data: [],
            sykmeldingId: 55,
        });
    });

    it('håndterer HENT_AKTUELLE_ARBEIDSGIVERE_FEILET', () => {
        const initialState = deepFreeze({
            henter: true,
        });
        const action = {
            type: actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FEILET,
            sykmeldingId: 88,
        };
        const nextState = arbeidsgivere(initialState, action);
        expect(nextState).to.deep.equal({
            hentingFeilet: true,
            henter: false,
            data: [],
            sykmeldingId: 88,
        });
    });

    it('håndterer SET_AKTUELLE_ARBEIDSGIVERE', () => {
        const initialState = deepFreeze({});
        const action = {
            type: actiontyper.SET_AKTUELLE_ARBEIDSGIVERE,
            arbeidsgivere: [{
                orgnr: 12345678,
                navn: 'Hansens Frisørsalong',
            }, {
                orgnr: 87654321,
                navn: 'Oslo Sykkelbutikk',
            }, {
                orgnr: 32165478,
                navn: 'Bergen Malingsfabrikk',
            }],
            sykmeldingId: 23,
        };
        const nextState = arbeidsgivere(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            sykmeldingId: 23,
            data: [{
                orgnr: 12345678,
                navn: 'Hansens Frisørsalong',
            }, {
                orgnr: 87654321,
                navn: 'Oslo Sykkelbutikk',
            }, {
                orgnr: 32165478,
                navn: 'Bergen Malingsfabrikk',
            }],
        });
    });

    it('Håndterer BRUKER_ER_UTLOGGET', () => {
        const initialState = deepFreeze({
            data: [{ navn: 'Olsens sykkelbud' }],
            henter: false,
            hentingFeilet: false,
        });
        const action = {
            type: actiontyper.BRUKER_ER_UTLOGGET,
        };
        const nextState = arbeidsgivere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [],
        });
    });
});
