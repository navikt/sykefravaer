import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import * as actions from './sykmeldingMetaActions';
import sykmeldingMeta from './sykmeldingMeta';

describe('sykmeldingMeta', () => {
    let state = {};
    const SYKMELDING_ID = '12345674';

    it('Håndterer henterVentetid()', () => {
        const action = actions.henterVentetid(SYKMELDING_ID);
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            [SYKMELDING_ID]: {
                henterVentetid: true,
            },
        });
    });

    it('Håndterer hentVentetidFeilet ved 500-feil', () => {
        const action = actions.hentVentetidFeilet(SYKMELDING_ID);
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
        });
    });

    it('Håndterer henterVentetid()', () => {
        const action = actions.henterVentetid('banan');
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            banan: {
                henterVentetid: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
        });
    });

    it('Håndterer hentVentetidFeilet()', () => {
        const action = actions.hentVentetidFeilet('banan');
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            banan: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
        });
    });

    it('Håndterer ventetidHentet()', () => {
        const action = actions.ventetidHentet(SYKMELDING_ID, true);
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            banan: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: false,
                erUtenforVentetid: true,
                ventetidHentet: true,
            },
        });
    });

    it('Håndterer ventetidHentet()', () => {
        const action = actions.ventetidHentet(SYKMELDING_ID, false);
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            banan: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: false,
                erUtenforVentetid: false,
                ventetidHentet: true,
            },
        });
    });

    it('Håndterer skalOppretteSoknadHentet()', () => {
        const action = actions.skalOppretteSoknadHentet(SYKMELDING_ID, false);
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            banan: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: false,
                erUtenforVentetid: false,
                skalOppretteSoknad: false,
                ventetidHentet: true,
            },
        });
    });

    it('Håndterer skalOppretteSoknadHentet()', () => {
        const action = actions.skalOppretteSoknadHentet(SYKMELDING_ID, true);
        state = sykmeldingMeta(deepFreeze(state), action);
        expect(state).to.deep.equal({
            banan: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: false,
                erUtenforVentetid: false,
                skalOppretteSoknad: true,
                ventetidHentet: true,
            },
        });
    });
});
