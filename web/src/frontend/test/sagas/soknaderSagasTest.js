import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import { hentSoknader, sendSoknad, opprettSoknadUtland, avbrytSoknad, togglesHentet } from '../../js/sagas/soknaderSagas';
import { get, post } from '../../js/gateway-api';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader from '../mockSoknader';
import { OPPHOLD_UTLAND } from '../../js/enums/soknadtyper';
import { toggleSykepengesoknadUtland, toggleSelvstendigSoknad } from '../../js/selectors/unleashTogglesSelectors';

describe('soknaderSagas', () => {
    describe('Henting av søknader når det er togglet på', () => {
        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal sjekke om toggles er hentet', () => {
            const nextSelect = select(togglesHentet);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal sjekke om selvstendig-søknad er skrudd på', () => {
            const nextSelect = select(toggleSelvstendigSoknad);
            expect(generator.next(true).value).to.deep.equal(nextSelect);
        });

        it('Skal sjekke om utenlands-søknad er skrudd på', () => {
            const nextSelect = select(toggleSykepengesoknadUtland);
            expect(generator.next(true).value).to.deep.equal(nextSelect);
        });

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
        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal sjekke om toggles er hentet', () => {
            const nextSelect = select(togglesHentet);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal sjekke om selvstendig-søknad er skrudd på', () => {
            const nextSelect = select(toggleSelvstendigSoknad);
            expect(generator.next(true).value).to.deep.equal(nextSelect);
        });

        it('Skal sjekke om utenlands-søknad er skrudd på', () => {
            const nextSelect = select(toggleSykepengesoknadUtland);
            expect(generator.next(false).value).to.deep.equal(nextSelect);
        });

        it('Skal oppføre seg som om det ble returnert ingen søknader', () => {
            const nextPut = put(actions.soknaderHentet([]));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('Innsending av søknad', () => {
        const soknadData = { test: 'data', soknadstype: OPPHOLD_UTLAND };
        const action = actions.sendSoknad(soknadData);
        const generator = sendSoknad(action);

        it('Skal sjekke om selvstendig-søknad er skrudd på', () => {
            const nextSelect = select(toggleSelvstendigSoknad);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal sjekke om utenlands-søknad er skrudd på', () => {
            const nextSelect = select(toggleSykepengesoknadUtland);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal dispatche SENDER_SOKNAD', () => {
            const nextPut = put(actions.senderSoknad());
            expect(generator.next(true).value).to.deep.equal(nextPut);
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
        const generator = opprettSoknadUtland();
        const soknadData = { test: 'data' };

        it('Skal sjekke om utenlands-søknad er skrudd på', () => {
            const nextSelect = select(toggleSykepengesoknadUtland);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal dispatche OPPRETTER_SOKNADUTLAND', () => {
            const nextPut = put(actions.oppretterSoknadUtland());
            expect(generator.next(true).value).to.deep.equal(nextPut);
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

    describe('Avbryting av søknad', () => {
        const soknadData = { test: 'data', soknadstype: OPPHOLD_UTLAND };
        const action = actions.avbrytSoknad(soknadData);
        const generator = avbrytSoknad(action);

        it('Skal sjekke om selvstendig-søknad er skrudd på', () => {
            const nextSelect = select(toggleSelvstendigSoknad);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal sjekke om utenlands-søknad er skrudd på', () => {
            const nextSelect = select(toggleSykepengesoknadUtland);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal dispatche AVBRYTER_SOKNAD', () => {
            const nextPut = put(actions.avbryterSoknad());
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal avbryte søknad', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfoapi/rest/soknad/avbrytSoknad', soknadData);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SYKEPENGESOKNAD_AVBRUTT', () => {
            const nextPut = put(actions.soknadAvbrutt(action.soknad));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
