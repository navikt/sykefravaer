import { expect } from 'chai';
import { post } from '@navikt/digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { hentVentetid } from '../../js/sagas/sykmeldingMetaSagas';
import * as actions from '../../js/actions/sykmeldingMeta_actions';

describe('ventetidSagas', () => {
    const SYKMELDING_ID = '4354ERWERHKQWJEHR387432434CDF';
    const action = actions.hentVentetid(SYKMELDING_ID);
    const generator = hentVentetid(action);

    it('Skal dispatche HENTER_VENTETID', () => {
        const nextPut = put(actions.henterVentetid(SYKMELDING_ID));
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal hente ventetid', () => {
        const nextCall = call(post, '/syforest/sykmeldinger/4354ERWERHKQWJEHR387432434CDF/actions/erUtenforVentetid');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal deretter dispatche ventetidHentet', () => {
        const nextPut = put(actions.ventetidHentet(SYKMELDING_ID, false));
        expect(generator.next(false).value).to.deep.equal(nextPut);
    });
});
