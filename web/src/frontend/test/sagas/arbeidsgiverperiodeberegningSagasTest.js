import { expect } from 'chai';
import { hentArbeidsgiverperiodeberegning } from '../../js/sagas/beregnArbeidsgiverperiodeSagas.js';
import { post } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import * as actions from '../../js/actions/arbeidsgiverperiodeberegning_actions';

describe("arbeidsgiverperiodeberegningSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    });

    const sykepengesoknad = {
        id: "2"
    }
    const action = actions.hentArbeidsgiverperiodeberegning(sykepengesoknad);
    const generator = hentArbeidsgiverperiodeberegning(action);

    it("Skal dispatche HENTER_ARBEIDSGIVERPERIODEBEREGNING", () => {
        const nextPut = put(actions.henterArbeidsgiverperiodeberegning());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal sjekke",  () => {
        const nextCall = call(post, 'http://tjenester.nav.no/syforest/soknader/2/actions/beregn-arbeidsgiverperiode', sykepengesoknad);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal deretter dispatche arbeidsgiverperiodeberegningHentet", () => {
        const action = actions.arbeidsgiverperiodeberegningHentet({en: 'to'});
        const nextPut = put(action);
        expect(generator.next({en: 'to'}).value).to.deep.equal(nextPut);
    });
});