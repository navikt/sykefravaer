import { expect } from 'chai';
import { hentArbeidsgiversSykmeldinger } from '../../js/sagas/arbeidsgiversSykmeldingerSagas';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("arbeidsgiversSykmeldingerSagas", () => {

    window.APP_SETTINGS = {
        REST_ROOT: "http://tjenester.nav.no/syforest"
    }

    const generator = hentArbeidsgiversSykmeldinger();

    it("Skal dispatche HENTER_ARBEIDSGIVERS_SYKMELDINGER", () => {
        const nextPut = put({type: 'HENTER_ARBEIDSGIVERS_SYKMELDINGER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente arbeidsgivers sykmeldinger", () => {
        const nextCall = call(get, "http://tjenester.nav.no/syforest/sykmeldinger?type=arbeidsgiver");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest sette arbeidsgivers sykmeldinger", () => {
        const nextPut = put({
            type: 'SET_ARBEIDSGIVERS_SYKMELDINGER',
            sykmeldinger: [{
                id: 1,
                diagnose: "Alt vel"
            }]
        })
        expect(generator.next([{
            id: 1,
            diagnose: "Alt vel"
        }]).value).to.deep.equal(nextPut);
    });

});