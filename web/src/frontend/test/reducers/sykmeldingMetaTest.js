import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/sykmeldingMeta_actions'
import sykmeldingMeta from '../../js/reducers/sykmeldingMeta';

describe("sykmeldingMeta", () => {

    let state = {};
    const SYKMELDING_ID = "12345674";

    it("Håndterer henterVentetid()", () => {
        const action = actions.henterVentetid(SYKMELDING_ID);
        state = sykmeldingMeta(state, action);
        expect(state).to.deep.equal({
            [SYKMELDING_ID]: {
                henterVentetid: true,
            }
        });
    });

    it("Håndterer hentVentetidFeilet ved 500-feil", () => {
        const action = actions.hentVentetidFeilet(SYKMELDING_ID);
        state = sykmeldingMeta(state, action);
        expect(state).to.deep.equal({
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            }
        });
    });

    it("Håndterer henterVentetid()", () => {
        const action = actions.henterVentetid("banan");
        state = sykmeldingMeta(state, action);
        expect(state).to.deep.equal({
            "banan": {
                henterVentetid: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            }
        });
    });

    it("Håndterer hentVentetidFeilet()", () => {
        const action = actions.hentVentetidFeilet("banan");
        state = sykmeldingMeta(state, action);
        expect(state).to.deep.equal({
            "banan": {
                henterVentetid: false,
                hentVentetidFeilet: true,
            },
            [SYKMELDING_ID]: {
                henterVentetid: false,
                hentVentetidFeilet: true,
            }
        });
    });

});