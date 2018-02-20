import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { oppgaverOppfoelgingsdialoger } from '../../js/utils/oppfolgingsdialogUtils';
import {
    hentsykmeldingUtgaattOver4mnd,
    hentSykmeldingAktiv,
} from './sykmeldingUtilsTest';

const expect = chai.expect;

describe('OppfolgingdialogUtils', () => {
    describe('oppgaverOppfoelgingsdialoger', () => {
        let clock;
        let sykmeldingUtgaattOver4mnd;
        let sykmeldingAktiv;
        let oppfolgingsdialogUnderArbeid;
        const dagensDato = new Date('2017-01-01');

        beforeEach(() => {
            clock = sinon.useFakeTimers(dagensDato.getTime());
            sykmeldingUtgaattOver4mnd = hentsykmeldingUtgaattOver4mnd(dagensDato);
            sykmeldingAktiv = hentSykmeldingAktiv(dagensDato);
            oppfolgingsdialogUnderArbeid = {
                status: 'UNDER_ARBEID',
                virksomhet: {
                    virksomhetsnummer: sykmeldingAktiv.orgnummer,
                },
                godkjenninger: [],
                sistEndretAv: {
                    fnr: 'arbedsgiverFnr',
                },
            };
        });

        afterEach(() => {
            clock.restore();
        });

        describe('med aktiv sykmelding', () => {
            it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
                expect(oppgaverOppfoelgingsdialoger([], [sykmeldingAktiv])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner ny plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: null,
                    },
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingAktiv])).to.deep.equal({
                    nyePlaner: [dialog],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner godkjent plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: new Date('2017-08-14'),
                    },
                    godkjenninger: [{
                        godkjent: true,
                        godkjentAv: {
                            fnr: 'arbedsgiverFnr',
                        },
                    }],
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingAktiv])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [dialog],
                });
            });

            it('Ny og godkjent plan telles bare som en', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: null,
                    },
                    godkjenninger: [{
                        godkjent: true,
                        godkjentAv: {
                            fnr: 'arbedsgiverFnr',
                        },
                    }],
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingAktiv])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [dialog],
                });
            });
        });

        describe('uten aktiv sykmelding', () => {
            it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
                expect(oppgaverOppfoelgingsdialoger([], [sykmeldingUtgaattOver4mnd])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner ikke ny plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: null,
                    },
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingUtgaattOver4mnd])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });

            it('Finner ikke godkjent plan', () => {
                const dialog = {
                    ...oppfolgingsdialogUnderArbeid,
                    arbeidstaker: {
                        fnr: 'fnr',
                        sistInnlogget: new Date('2017-08-14'),
                    },
                    godkjenninger: [{
                        godkjent: true,
                        godkjentAv: {
                            fnr: 'arbedsgiverFnr',
                        },
                    }],
                };
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingUtgaattOver4mnd])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });
        });
    });
});
