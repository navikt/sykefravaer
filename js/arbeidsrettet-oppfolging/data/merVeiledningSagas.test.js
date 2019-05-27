import { expect } from 'chai';
import { all, call, put } from 'redux-saga/effects';
import * as actions from './merVeiledningActions';
import * as hendelseActions from '../../landingsside/data/hendelser/hendelserActions';
import { bekreftMerVeiledning, lagUrl } from './merVeiledningSagas';
import { post } from '../../data/gateway-api/index';

describe('merVeiledning', () => {
    const callback = () => {};
    const generator = bekreftMerVeiledning(actions.bekreftMerVeiledning([1, 2], callback));


    it('Skal dispatche BEKREFTER_MER_VEILEDNING', () => {
        const nextPut = put(actions.bekrefterMerVeiledning());
        expect(generator.next(true).value).to.deep.equal(nextPut);
    });

    it('Skal poste for hver hendelse', () => {
        const firstCall = call(post, lagUrl(1));
        const secondCall = call(post, lagUrl(2));

        const nextCall = all([firstCall, secondCall]);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dispatche bekreftet', () => {
        const nextPut = put(actions.merVeiledningBekreftet());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dispatche hentHendelser', () => {
        const nextPut = put(hendelseActions.hentHendelser());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dispatche hentHendelser', () => {
        const nextCall = call(callback);
        expect(generator.next().value).to.deep.equal(nextCall);
    });
});
