import chai from 'chai';
import sinon from 'sinon';
import {
    erOppfolgingsdialogOpprettbarDirekte,
    finnNyesteTidligereOppfolgingsdialogMedVirksomhet,
    oppgaverOppfoelgingsdialoger,
} from '../../js/utils/oppfolgingsdialogUtils';
import {
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingGyldigForOppfoelging,
} from '../mock/mockSykmeldinger';
import getOppfolgingsdialog, {

    hentOppfolgingsdialogTidligere,
} from '../mock/mockOppfolgingsdialoger';

const expect = chai.expect;

describe('OppfolgingdialogUtils', () => {
    let klokke;
    const dagensDato = new Date('2017-01-01');

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
        klokke.restore();
    });

    describe('oppgaverOppfoelgingsdialoger', () => {
        let sykmeldingsykmeldingUgyldig;
        let sykmeldingGyldig;
        let oppfolgingsdialogUnderArbeid;

        beforeEach(() => {
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

        describe('med aktiv sykmelding', () => {
            it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
                expect(oppgaverOppfoelgingsdialoger([], [sykmeldingGyldig])).to.deep.equal({
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
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
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
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
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
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingGyldig])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [dialog],
                });
            });
        });

        describe('uten aktiv sykmelding', () => {
            it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
                expect(oppgaverOppfoelgingsdialoger([], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
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
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
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
                expect(oppgaverOppfoelgingsdialoger([dialog], [sykmeldingsykmeldingUgyldig])).to.deep.equal({
                    nyePlaner: [],
                    avventendeGodkjenninger: [],
                });
            });
        });
    });

    describe('erOppfolgingsdialogOpprettbarDirekte', () => {
        let arbeidsgiver;
        let oppfolgingsdialogTidligere;
        let oppfolgingsdialogIkkeTidligere;

        beforeEach(() => {
            arbeidsgiver = {};
            oppfolgingsdialogTidligere = hentOppfolgingsdialogTidligere(dagensDato);
            oppfolgingsdialogIkkeTidligere = getOppfolgingsdialog({
                godkjentplan: null,
            });
        });

        it('Skal returneren false, om det er flere enn 1 AG og det er tidligere godkjent plan', () => {
            expect(erOppfolgingsdialogOpprettbarDirekte([arbeidsgiver, arbeidsgiver], [oppfolgingsdialogTidligere])).to.equal(false);
        });

        it('Skal returneren false, om det kun er 1 AG og det er tidligere godkjent plan', () => {
            expect(erOppfolgingsdialogOpprettbarDirekte([arbeidsgiver], [oppfolgingsdialogTidligere])).to.equal(false);
        });

        it('Skal returneren true, om det kun er 1 AG og det ikke er tidligere godkjent plan', () => {
            expect(erOppfolgingsdialogOpprettbarDirekte([arbeidsgiver], [oppfolgingsdialogIkkeTidligere])).to.equal(true);
        });
    });

    describe('finnNyesteTidligereOppfolgingsdialogMedVirksomhet', () => {
        let oppfolgingsdialogTidligere;
        let oppfolgingsdialogIkkeTidligere;
        let virksomhet;

        beforeEach(() => {
            virksomhet = { virksomhetsnummer: '12345678' };
            oppfolgingsdialogTidligere = {
                ...hentOppfolgingsdialogTidligere(dagensDato),
                virksomhet,
            };
            oppfolgingsdialogIkkeTidligere = {
                ...getOppfolgingsdialog(),
                virksomhet,
                godkjentplan: null,
            };
        });

        it('Skal ikke returnere tidligere dialog med virksomhet, om det det er plan med virksomhet som ikker er tidligere godkjent', () => {
            expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogIkkeTidligere], virksomhet.virksomhetsnummer)).to.equal(undefined);
        });

        it('Skal ikke returnere tidligere dialog med virksomhet, om det det er tidligere godkjente plan med annen virksomhet', () => {
            expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogTidligere], '1')).to.equal(undefined);
        });

        it('Skal returnere tidligere dialog med virksomhet, om det det er tidligere godkjente plan med virksomhet', () => {
            expect(finnNyesteTidligereOppfolgingsdialogMedVirksomhet([oppfolgingsdialogTidligere], virksomhet.virksomhetsnummer)).to.deep.equal(oppfolgingsdialogTidligere);
        });
    });
});
