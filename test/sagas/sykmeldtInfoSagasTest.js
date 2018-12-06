import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from '../../js/gateway-api';
import { hentSykmeldtInfo } from '../../js/sagas/sykmeldtInfoSagas';
import { henterSykmeldtInfo, sykmeldtInfoHentet } from '../../js/actions/sykmeldtInfo_actions';

describe('sykmeldtInfo', () => {
    const generator = hentSykmeldtInfo();

    it('Skal dispatche HENTER_SYKMELDT_INFO', () => {
        const action = henterSykmeldtInfo();
        const nextPut = put(action);
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente sykmeldtInfo', () => {
        const nextCall = call(get, '/veilarbregistrering/api/sykmeldtinfodata');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette sykmeldtInfo', () => {
        const data = {
            maksDato: '13.12.2018',
            erArbeidsrettetOppfolgingSykmeldtInngangAktiv: false,
        };
        const action = sykmeldtInfoHentet(data);
        const nextPut = put(action);
        expect(generator.next(data).value).to.deep.equal(nextPut);
    });
});
