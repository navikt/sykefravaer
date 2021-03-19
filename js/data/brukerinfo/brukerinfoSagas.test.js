import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import { get, getAjax } from '../../digisyfoNpm';
import { hentBrukerinfo, sjekkInnlogging } from './brukerinfoSagas';
import { skalHenteBrukerinfoSelector } from './brukerinfoSelectors';
import {
    henterBrukerinfo, brukerinfoHentet, setErInnlogget, sjekkerInnlogging,
} from './brukerinfo_actions';

describe('brukerinfoSagas', () => {
    describe('hentBrukerinfo', () => {
        const generator = hentBrukerinfo();

        it('Skal sjekke om get skal utføres', () => {
            const nextSelect = select(skalHenteBrukerinfoSelector);
            expect(generator.next().value).to.deep.equal(nextSelect);
        });

        it('Skal dispatche HENTER_BRUKERINFO', () => {
            const nextPut = put(henterBrukerinfo());
            const skalHente = true;
            expect(generator.next(skalHente).value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente brukerinfo', () => {
            const nextCall = call(get, 'https://sykmeldinger-backend-proxy.dev.nav.no/api/v1/syforest/brukerinformasjon');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette brukerinfo', () => {
            const nextPut = put(brukerinfoHentet({
                navn: 'Ole Olsen',
            }));
            expect(generator.next({
                navn: 'Ole Olsen',
            }).value).to.deep.equal(nextPut);
        });
    });

    describe('sjekkInnlogging', () => {
        const generator = sjekkInnlogging();

        it('Skal dispatche SJEKKER_INNLOGGING', () => {
            const nextPut = put(sjekkerInnlogging());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest sjekke om brukeren er innlogget', () => {
            const nextCall = call(getAjax, '/sykefravaer/');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette status for innlogging', () => {
            const nextPut = put(setErInnlogget());
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
