import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

import arbeidsgivere from './arbeidsgivere';
import { aktuelleArbeidsgivereHentet, hentAktuelleArbeidsgivereFeilet, henterAktuelleArbeidsgivere } from './arbeidsgivereActions';
import { setErUtlogget } from '../../../actions/brukerinfo_actions';

describe('arbeidsgivere', () => {
    it('håndterer HENTER_AKTUELLE_ARBEIDSGIVERE', () => {
        const initialState = deepFreeze({});
        const nextState = arbeidsgivere(initialState, henterAktuelleArbeidsgivere(55));
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
        const nextState = arbeidsgivere(initialState, hentAktuelleArbeidsgivereFeilet(88));
        expect(nextState).to.deep.equal({
            hentingFeilet: true,
            henter: false,
            data: [],
            sykmeldingId: 88,
        });
    });

    it('håndterer AKTUELLE_ARBEIDSGIVERE_HENTET', () => {
        const initialState = deepFreeze({});
        const action = aktuelleArbeidsgivereHentet(23, [{
            orgnr: 12345678,
            navn: 'Hansens Frisørsalong',
        }, {
            orgnr: 87654321,
            navn: 'Oslo Sykkelbutikk',
        }, {
            orgnr: 32165478,
            navn: 'Bergen Malingsfabrikk',
        }]);
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
        const action = setErUtlogget();
        const nextState = arbeidsgivere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [],
        });
    });
});
