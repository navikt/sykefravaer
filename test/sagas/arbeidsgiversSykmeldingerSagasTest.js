import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { hentArbeidsgiversSykmeldinger } from '../../js/sagas/arbeidsgiversSykmeldingerSagas';
import * as actiontyper from '../../js/actions/actiontyper';

describe('arbeidsgiversSykmeldingerSagas', () => {
    const generator = hentArbeidsgiversSykmeldinger();

    it('Skal dispatche HENTER_ARBEIDSGIVERS_SYKMELDINGER', () => {
        const nextPut = put({ type: actiontyper.HENTER_ARBEIDSGIVERS_SYKMELDINGER });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente arbeidsgivers sykmeldinger', () => {
        const nextCall = call(get, '/syforest/sykmeldinger?type=arbeidsgiver');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette arbeidsgivers sykmeldinger', () => {
        const nextPut = put({
            type: actiontyper.SET_ARBEIDSGIVERS_SYKMELDINGER,
            sykmeldinger: [{
                id: 1,
                diagnose: 'Alt vel',
            }],
        });
        expect(generator.next([{
            id: 1,
            diagnose: 'Alt vel',
        }]).value).to.deep.equal(nextPut);
    });
});
