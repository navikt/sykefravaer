import { expect } from 'chai';
import { post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { svarActions } from 'moter-npm';
import { sendSvar } from '../../js/sagas/svarSagas';

describe('svarSagas', () => {
    const action = svarActions.sendSvar('minFineMoteUuid', 'Bruker', [1, 2]);

    const generator = sendSvar(action);

    it('Skal dispatche SENDER_SVAR', () => {
        const nextPut = put(svarActions.senderSvar());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal poste svar', () => {
        const nextCall = call(post, '/moterest/api/v2/moter/actions/minFineMoteUuid/send', {
            valgteAlternativIder: [1, 2],
            deltakertype: 'Bruker',
        });
        expect(generator.next().value).to.deep.equal(nextCall);
    });
});
