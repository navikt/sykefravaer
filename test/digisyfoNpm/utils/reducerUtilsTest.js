import { expect } from 'chai';
import { parseSykmelding, parseSykepengesoknad } from '../../../js/digisyfoNpm/utils/reducerUtils';
import getSykmelding, { getParsetSykmelding } from '../mock/mockSykmeldinger';
import { getSoknad, getParsetSoknad } from '../mock/mockSoknader';


describe('reducerUtils', () => {
    describe('parseSykmelding', () => {
        it('Skal parse felter', () => {
            expect(parseSykmelding(getSykmelding())).to.deep.equal(getParsetSykmelding());
        });
    });

    describe('parseSykepengesoknad', () => {
        it('Skal parse felter', () => {
            expect(parseSykepengesoknad(getSoknad())).to.deep.equal(getParsetSoknad());
        });

        it('parser datofelter i aktivitet og beholder resten av feltene', () => {
            const _soknad = parseSykepengesoknad(getSoknad());
            expect(_soknad.aktiviteter[0].periode.fom).to.deep.equal(new Date('2017-01-01'));
            expect(_soknad.aktiviteter[0].periode.tom).to.deep.equal(new Date('2017-01-15'));
            expect(_soknad.aktiviteter[0].grad).to.deep.equal(100);
        });

        it('parser datofelter i egenmeldingsperioder', () => {
            const soknad = Object.assign({}, getSoknad(), {
                egenmeldingsperioder: [
                    {
                        fom: '2016-07-15',
                        tom: '2017-01-19',
                    }, {
                        fom: '2016-07-15',
                        tom: '2017-01-19',
                    },
                ],
            });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.egenmeldingsperioder[0].fom).to.deep.equal(new Date('2016-07-15'));
            expect(_soknad.egenmeldingsperioder[0].tom).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser datofelter i ferie', () => {
            const soknad = Object.assign({}, getSoknad(), {
                ferie: [
                    {
                        fom: '2016-07-15',
                        tom: '2017-01-19',
                    }, {
                        fom: '2016-07-15',
                        tom: '2017-01-19',
                    },
                ],
            });

            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.ferie[1].fom).to.deep.equal(new Date('2016-07-15'));
            expect(_soknad.ferie[1].tom).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser datofelter i permisjon', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    permisjon: [
                        {
                            fom: '2016-07-15',
                            tom: '2017-01-19',
                        }, {
                            fom: '2016-07-15',
                            tom: '2017-01-19',
                        },
                    ],
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.permisjon[1].fom).to.deep.equal(new Date('2016-07-15'));
            expect(_soknad.permisjon[1].tom).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser datofelter i utenlandsopphold', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    utenlandsopphold: {
                        soektOmSykepengerIPerioden: false,
                        perioder: [
                            {
                                fom: '2016-07-15',
                                tom: '2017-01-19',
                            }, {
                                fom: '2016-07-15',
                                tom: '2017-01-19',
                            },
                        ],
                    },
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.utenlandsopphold.soektOmSykepengerIPerioden).to.deep.equal(false);
            expect(_soknad.utenlandsopphold.perioder[1].fom).to.deep.equal(new Date('2016-07-15'));
            expect(_soknad.utenlandsopphold.perioder[1].tom).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser datofelter i utdanning', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    utdanning: {
                        utdanningStartdato: '2017-01-01',
                        erUtdanningFulltidsstudium: true,
                    },
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.utdanning.utdanningStartdato).to.deep.equal(new Date('2017-01-01'));
            expect(_soknad.utdanning.erUtdanningFulltidsstudium).to.deep.equal(true);
        });

        it('parser gjenopptattArbeidFulltUtDato', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    gjenopptattArbeidFulltUtDato: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.gjenopptattArbeidFulltUtDato).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser identdato', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    identdato: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.identdato).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser sendtTilArbeidsgiverDato', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sendtTilArbeidsgiverDato: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.sendtTilArbeidsgiverDato).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser sendtTilNAVDato', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sendtTilNAVDato: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.sendtTilNAVDato).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser opprettetDato', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    opprettetDato: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.opprettetDato).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser sykmeldingSkrevetDato', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sykmeldingSkrevetDato: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.sykmeldingSkrevetDato).to.deep.equal(new Date('2017-01-19'));
        });

        it('Funker hvis sendtTilNAVDato og/eller sendtTilArbeidsgiverDato ikke finnes på søknaden', () => {
            const soknad = getSoknad();
            delete (soknad.sendtTilNAVDato);
            delete (soknad.sendtTilArbeidsgiverDato);
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.sendtTilNAVDato).to.equal(null);
            expect(_soknad.sendtTilArbeidsgiverDato).to.equal(null);
        });

        it('parser forrigeSykeforloepTom', () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    forrigeSykeforloepTom: '2017-01-19',
                });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.forrigeSykeforloepTom).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser fom', () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: '2017-01-19',
            });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.fom).to.deep.equal(new Date('2017-01-19'));
        });

        it('parser tom', () => {
            const soknad = Object.assign({}, getSoknad(), {
                tom: '2017-01-19',
            });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.tom).to.deep.equal(new Date('2017-01-19'));
        });

        it('Henter fom fra tidligsteFom dersom det ikke finnes fom', () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: null,
            });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.fom).to.deep.equal(new Date('2017-01-01'));
        });


        it('Henter tom fra senesteTom dersom det ikke finnes tom', () => {
            const soknad = Object.assign({}, getSoknad(), {
                tom: null,
            });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.tom).to.deep.equal(new Date('2017-01-25'));
        });

        it('Parser avbruttDato', () => {
            const soknad = Object.assign({}, getSoknad(), {
                avbruttDato: '2017-01-04',
            });
            const _soknad = parseSykepengesoknad(soknad);
            expect(_soknad.avbruttDato).to.deep.equal(new Date('2017-01-04'));
        });
    });
});
