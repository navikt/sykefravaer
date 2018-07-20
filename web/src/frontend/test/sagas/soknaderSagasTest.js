import { expect } from 'chai';
import sinon from 'sinon';
import { put, call } from 'redux-saga/effects';
import { hentSoknader, sendSoknad, opprettSoknadUtland } from '../../js/sagas/soknaderSagas';
import { get, post } from '../../js/gateway-api';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader from '../mockSoknader';
import * as toggles from '../../js/toggles';
import { OPPHOLD_UTLAND } from '../../js/enums/soknadtyper';
import { toggleSykepengesoknadUtland } from '../../js/toggles';

describe('soknaderSagas', () => {
    describe('Henting av søknader når det er togglet på', () => {
        let toggleSelvstendigSoknad;

        beforeEach(() => {
            toggleSelvstendigSoknad = sinon.stub(toggles, 'toggleSelvstendigSoknad').returns(true);
        });

        afterEach(() => {
            toggleSelvstendigSoknad.restore();
        });

        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal dispatche HENTER_SOKNADER', () => {
            const nextPut = put(actions.henterSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal hente søknader', () => {
            const nextCall = call(get, 'https://syfoapi-q.nav.no/syfoapi/rest/soknad/soknader');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNADER_HENTET', () => {
            const nextPut = put(actions.soknaderHentet(mockSoknader));
            expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
        });
    });

    describe('Henting av søknader når det er togglet av', () => {
        let toggleSelvstendigSoknad;

        beforeEach(() => {
            toggleSelvstendigSoknad = sinon.stub(toggles, 'toggleSelvstendigSoknad').returns(false);
        });

        afterEach(() => {
            toggleSelvstendigSoknad.restore();
        });

        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal oppføre seg som om det ble returnert ingen søknader', () => {
            const nextPut = put(actions.soknaderHentet([]));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('Innsending av søknad', () => {
        let toggleInnsendingAvSelvstendigSoknad;
        let toggleSykepengesoknadUtland;
        const soknadData = { test: 'data', soknadstype: OPPHOLD_UTLAND };
        const action = actions.sendSoknad(soknadData);
        const generator = sendSoknad(action);

        beforeEach(() => {
            toggleInnsendingAvSelvstendigSoknad = sinon.stub(toggles, 'toggleInnsendingAvSelvstendigSoknad').returns(true);
            toggleSykepengesoknadUtland = sinon.stub(toggles, 'toggleSykepengesoknadUtland').returns(true);
        });

        afterEach(() => {
            toggleInnsendingAvSelvstendigSoknad.restore();
            toggleSykepengesoknadUtland.restore();
        });

        it('Skal dispatche SENDER_SOKNAD', () => {
            const nextPut = put(actions.senderSoknad());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal sende søknad', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfoapi/rest/soknad/sendSoknad', soknadData);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNAD_SENDT', () => {
            const nextPut = put(actions.soknadSendt(soknadData));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('Oppretting av søknad utland', () => {
        let toggleSykepengesoknadUtland;
        const generator = opprettSoknadUtland();
        const soknadData = { test: 'data' };

        beforeEach(() => {
            toggleSykepengesoknadUtland = sinon.stub(toggles, 'toggleSykepengesoknadUtland').returns(true);
        });

        afterEach(() => {
            toggleSykepengesoknadUtland.restore();
        });

        it('Skal dispatche OPPRETTER_SOKNADUTLAND', () => {
            const nextPut = put(actions.oppretterSoknadUtland());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal opprette søknad', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfoapi/rest/soknad/opprettSoknadUtland');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dispatche SOKNADUTLAND_OPPRETTET', () => {
            const nextPut = put(actions.soknadUtlandOpprettet(soknadData));
            expect(generator.next(soknadData).value).to.deep.equal(nextPut);
        });
    });
});
