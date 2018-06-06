import { expect } from 'chai';
import { get, post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import { hentSoknader, sendSoknad } from '../../js/sagas/soknaderSagas';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader from '../mockSoknader';

describe('soknaderSagas', () => {
    describe('Henting av søknader', () => {
        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal dispatche HENTER_SOKNADER', () => {
            const nextPut = put(actions.henterSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal hente søknader', () => {
            const nextCall = call(get, '/syfosoknad/soknader');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNADER_HENTET', () => {
            const nextPut = put(actions.soknaderHentet(mockSoknader));
            expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
        });
    });

    describe("Innsending av søknad", () => {
        const soknadData = { 'test': 'data' };
        const action = actions.sendSoknad(soknadData);
        const generator = sendSoknad(action);

        it("Skal dispatche SENDER_SOKNAD", () => {
            const nextPut = put(actions.senderSoknad());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal sende søknad", () => {
            const nextCall = call(post, '/syfosoknad/sendSoknad', soknadData);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal deretter dispatche SOKNAD_SENDT", () => {
            const nextPut = put(actions.soknadSendt(soknadData));
            expect(generator.next().value).to.deep.equal(nextPut);
        })

    });

});
