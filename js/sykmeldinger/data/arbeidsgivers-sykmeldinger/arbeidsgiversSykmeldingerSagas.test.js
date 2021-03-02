import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import { get } from '../../../digisyfoNpm';
import { hentArbeidsgiversSykmeldinger } from './arbeidsgiversSykmeldingerSagas';
import { HENTER_ARBEIDSGIVERS_SYKMELDINGER, SET_ARBEIDSGIVERS_SYKMELDINGER } from './arbeidsgiversSykmeldingerActions';

describe('arbeidsgiversSykmeldingerSagas', () => {
    const generator = hentArbeidsgiversSykmeldinger();

    it('Skal dispatche HENTER_ARBEIDSGIVERS_SYKMELDINGER', () => {
        const nextPut = put({ type: HENTER_ARBEIDSGIVERS_SYKMELDINGER });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente arbeidsgivers sykmeldinger', () => {
        const nextCall = call(get, '/syforest/sykmeldinger?type=arbeidsgiver');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette arbeidsgivers sykmeldinger', () => {
        const nextPut = put({
            type: SET_ARBEIDSGIVERS_SYKMELDINGER,
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
