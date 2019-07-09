import chai from 'chai';
import sinon from 'sinon';
import beregnOppgaverOppfoelgingsdialoger from '../../js/utils/beregnOppgaverOppfoelgingsdialoger';
import {
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingGyldigForOppfoelging,
} from '../mock/mockSykmeldinger';

const { expect } = chai;

describe('beregnOppgaverOppfoelgingsdialoger', () => {
    let sykmeldingsykmeldingUgyldig;
    let sykmeldingGyldig;
    let oppfolgingsdialogUnderArbeid;
    let klokke;
    const dagensDato = new Date('2017-01-01');

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        sykmeldingsykmeldingUgyldig = hentSykmeldingIkkeGyldigForOppfoelging(dagensDato);
        sykmeldingGyldig = hentSykmeldingGyldigForOppfoelging(dagensDato);
        oppfolgingsdialogUnderArbeid = {
            status: 'UNDER_ARBEID',
            virksomhet: {
                virksomhetsnummer: sykmeldingGyldig.orgnummer,
            },
            godkjenninger: [],
            sistEndretAv: {
                fnr: 'arbedsgiverFnr',
            },
        };
    });

    afterEach(() => {
        klokke.restore();
    });

    describe('med aktiv sykmelding', () => {
        it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
            expect(beregnOppgaverOppfoelgingsdialoger([], [sykmeldingGyldig])).to.deep.equal({
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
            expect(beregnOppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
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
            expect(beregnOppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
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
            expect(beregnOppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
                nyePlaner: [],
                avventendeGodkjenninger: [dialog],
            });
        });
    });

    describe('uten aktiv sykmelding', () => {
        it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
            expect(beregnOppgaverOppfoelgingsdialoger([], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
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
            expect(beregnOppgaverOppfoelgingsdialoger([dialog], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
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
            expect(beregnOppgaverOppfoelgingsdialoger([dialog], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
                nyePlaner: [],
                avventendeGodkjenninger: [],
            });
        });
    });
});
