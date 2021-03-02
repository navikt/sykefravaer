import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { post } from '../../digisyfoNpm';
import { bekreftAktivitetskrav } from './aktivitetskravSagas';
import * as actions from './aktivitetskravActions';

describe('aktivitetskravSagas', () => {
    const action = actions.bekreftAktivitetskrav('min-id');

    const generator = bekreftAktivitetskrav(action);

    it('Skal dispatche bekrefterAktivitetskrav()', () => {
        const nextPut = put(actions.bekrefterAktivitetskrav());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest poste', () => {
        const nextCall = call(post, '/syforest/sykefravaersoppfoelging/actions/bekreft-aktivitetskrav');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal til slutt dispatche at aktivitetskravet er bekreftet', () => {
        const nextPut = put(actions.aktivitetskravBekreftet());
        expect(generator.next().value).to.deep.equal(nextPut);
    });
});
