import chai from 'chai';
import React from 'react';
import { oppgaverOppfoelgingsdialoger } from '../../js/utils/oppfolgingsdialogUtils';

const expect = chai.expect;

describe('OppfolgingdialogUtils', () => {
    describe('oppgaverOppfoelgingsdialoger', () => {
        it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
            expect(oppgaverOppfoelgingsdialoger([])).to.deep.equal({
                nyePlaner: [],
                avventendeGodkjenninger: [],
            });
        });

        it('Finner ny plan', () => {
            const dialog = {
                arbeidstaker: {
                    fnr: 'fnr',
                    sistInnlogget: null,
                },
                status: 'UNDER_ARBEID',
                sistEndretAv: {
                    fnr: 'arbedsgiverFnr',
                },
                godkjenninger: [],
            };
            expect(oppgaverOppfoelgingsdialoger([dialog])).to.deep.equal({
                nyePlaner: [dialog],
                avventendeGodkjenninger: [],
            });
        });

        it('Finner godkjent plan', () => {
            const dialog = {
                arbeidstaker: {
                    fnr: 'fnr',
                    sistInnlogget: new Date("2017-08-14"),
                },
                status: 'UNDER_ARBEID',
                sistEndretAv: {
                    fnr: 'arbedsgiverFnr',
                },
                godkjenninger: [{
                    godkjent: true,
                    godkjentAv: {
                        fnr: 'arbedsgiverFnr',
                    }
                }],
            };
            expect(oppgaverOppfoelgingsdialoger([dialog], 'fnr')).to.deep.equal({
                nyePlaner: [],
                avventendeGodkjenninger: [dialog],
            });
        });

        it('Ny og godkjent plan telles bare som en', () => {
            const dialog = {
                arbeidstaker: {
                    fnr: 'fnr',
                    sistInnlogget: null,
                },
                status: 'UNDER_ARBEID',
                sistEndretAv: {
                    fnr: 'arbedsgiverFnr',
                },
                godkjenninger: [{
                    godkjent: true,
                    godkjentAv: {
                        fnr: 'arbedsgiverFnr',
                    }
                }],
            };
            expect(oppgaverOppfoelgingsdialoger([dialog])).to.deep.equal({
                nyePlaner: [],
                avventendeGodkjenninger: [dialog],
            });
        });
    });
});