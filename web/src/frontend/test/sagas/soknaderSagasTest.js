import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import {
    avbrytSoknad,
    hentSoknader,
    opprettSoknadUtland,
    opprettUtkastTilKorrigering,
    sendSoknad,
} from '../../js/sagas/soknaderSagas';
import { get, post } from '../../js/gateway-api';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader from '../mockSoknader';
import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../../js/enums/soknadtyper';
import { UTKAST_TIL_KORRIGERING } from '../../js/enums/soknadstatuser';

describe('soknaderSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            SYFOSOKNAD_ROOT: 'https://syfoapi-q.nav.no/syfosoknad/api',
        };
    });

    describe('Henting av søknader når det er togglet på', () => {
        const action = actions.hentSoknader();
        const generator = hentSoknader(action);

        it('Skal dispatche HENTER_SOKNADER', () => {
            const nextPut = put(actions.henterSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal hente søknader', () => {
            const nextCall = call(get, 'https://syfoapi-q.nav.no/syfosoknad/api/soknader');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNADER_HENTET', () => {
            const nextPut = put(actions.soknaderHentet(mockSoknader));
            expect(generator.next(mockSoknader).value).to.deep.equal(nextPut);
        });
    });

    describe('Innsending av søknad', () => {
        const soknadData = { test: 'data', soknadstype: OPPHOLD_UTLAND };
        const action = actions.sendSoknad(soknadData);
        const generator = sendSoknad(action);

        it('Skal dispatche SENDER_SOKNAD', () => {
            const nextPut = put(actions.senderSoknad());
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal sende søknad', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfosoknad/api/sendSoknad', soknadData);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SOKNAD_SENDT', () => {
            const nextPut = put(actions.soknadSendt(soknadData));
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal deretter dispatche HENT_SOKNADER', () => {
            const nextPut = put(actions.hentSoknader());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('Oppretting av søknad utland', () => {
        const generator = opprettSoknadUtland();
        const soknadData = { test: 'data' };

        it('Skal dispatche OPPRETTER_SOKNADUTLAND', () => {
            const nextPut = put(actions.oppretterSoknadUtland());
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal opprette søknad', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfosoknad/api/opprettSoknadUtland');
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

        it('Skal dispatche AVBRYTER_SOKNAD', () => {
            const nextPut = put(actions.avbryterSoknad());
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });

        it('Skal avbryte søknad', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfosoknad/api/avbrytSoknad', soknadData);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal deretter dispatche SYKEPENGESOKNAD_AVBRUTT', () => {
            const nextPut = put(actions.soknadAvbrutt(action.soknad));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });

    describe('Utkast til korrigering', () => {
        const utkast = { id: 'utkastsid', soknadstype: SELVSTENDIGE_OG_FRILANSERE, status: UTKAST_TIL_KORRIGERING };
        const action = actions.opprettUtkastTilKorrigeringForespurt('id');
        const generator = opprettUtkastTilKorrigering(action);

        it('Skal dispatche OPPRETTER_UTKAST_TIL_KORRIGERING', () => {
            const nextPut = put(actions.oppretterKorrigering());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dispatche UTKAST_TIL_KORRIGERING_OPPRETTET', () => {
            const nextCall = call(post, 'https://syfoapi-q.nav.no/syfosoknad/api/soknader/id/korriger');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest dispatche UTKAST_TIL_KORRIGERING_OPPRETTET', () => {
            const nextPut = put(actions.korrigeringOpprettet(utkast));
            expect(generator.next(utkast).value).to.deep.equal(nextPut);
        });
    });
});
