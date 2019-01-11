import { expect } from 'chai';
import { post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import {
    sendSvar as sendSvarAction,
    senderSvar,
} from '../../js/actions/moter_actions';
import { sendSvar } from '../../js/sagas/svarSagas';

describe('svarSagas', () => {
    const action = sendSvarAction('minFineMoteUuid', 'arbeidsgiver', [1, 2]);

    const generator = sendSvar(action);

    it('Skal dispatche SENDER_SVAR', () => {
        const nextPut = put(senderSvar());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal poste svar', () => {
        const nextCall = call(post, '/moterest/api/v2/moter/actions/minFineMoteUuid/send', {
            valgteAlternativIder: [1, 2],
            deltakertype: 'arbeidsgiver',
        });
        expect(generator.next().value).to.deep.equal(nextCall);
    });
});
