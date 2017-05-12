import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actiontyper from '../../js/actions/actiontyper';
import { parseDatofelter, sorterAktiviteterEldsteFoerst } from '../../js/reducers/sykepengesoknader';
import sykepengesoknader from '../../js/reducers/sykepengesoknader';
import * as actions from '../../js/actions/sykepengesoknader_actions';
import sinon from 'sinon';

describe('sykepengesoknader', () => {

    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    })

    afterEach(() => {
        clock.restore();
    })

    describe('henter', () => {

        let initialState = deepFreeze({
            data: [],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it('håndterer SYKEPENGESOKNADER_HENTET', () => {
            const action = {
                type: actiontyper.SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [getSoknad()],
            };
            const nextState = sykepengesoknader(initialState, action);

            expect(nextState).to.deep.equal({
                data: [getParsetSoknad()],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
        });

        it("håndterer HENTER_SYKEPENGESOKNADER", () => {
            const action = actions.henterSykepengesoknader();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
        });

        it("håndterer HENT_SYKEPENGESOKNADER_FEILET", () => {
            const soknad = {
                id: '1',
            };

            initialState = deepFreeze({
                data: [soknad],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });

            const action = actions.hentSykepengesoknaderFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                henter: false,
                hentingFeilet: true,
                sender: false,
                sendingFeilet: false,
            });
        });
    });

    describe("innsending", () => {

        const soknad = {
            id: '1',
        };

        let initialState = deepFreeze({
            data: [soknad],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it("håndterer SENDER_SYKEPENGESOKNAD", () => {
            const action = {
                type: actiontyper.SENDER_SYKEPENGESOKNAD
            };
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SEND_SYKEPENGESOKNAD_FEILET", () => {
            const action = actions.sendSykepengesoknadFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SYKEPENGESOKNAD_SENDT", () => {
            let initialState = deepFreeze({
                data: [{id: '1'},{id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.sykepengesoknadSendt("1", getSoknad());
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [getParsetSoknad(), {
                    id: '2'
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

    });

    describe("parsing", () => {
        it("parser datofelter i aktivitet og beholder resten av feltene", () => {
            const _soknad = parseDatofelter(getSoknad());
            expect(_soknad.aktiviteter[0].periode.fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.aktiviteter[0].periode.tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
            expect(_soknad.aktiviteter[0].grad).to.be.equal(100);
        });

        it("parser datofelter i egenmeldingsperioder", () => {
            const soknad = Object.assign({},getSoknad(), { egenmeldingsperioder: [
                {
                    fom: "2016-07-15",
                    tom: "2017-01-19",
                }, {
                    fom: "2016-07-15",
                    tom: "2017-01-19",
                },
            ]});
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.egenmeldingsperioder[0].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.egenmeldingsperioder[0].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i ferie", () => {
            const soknad = Object.assign({},getSoknad(), { ferie: [
                {
                    fom: "2016-07-15",
                    tom: "2017-01-19",
                }, {
                    fom: "2016-07-15",
                    tom: "2017-01-19",
                },
            ]});

            const _soknad = parseDatofelter(soknad);
            expect(_soknad.ferie[1].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.ferie[1].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i permisjon", () => {
            const soknad = Object.assign({},getSoknad(),
                {
                    permisjon: [
                        {
                            fom: "2016-07-15",
                            tom: "2017-01-19",
                        }, {
                            fom: "2016-07-15",
                            tom: "2017-01-19",
                        },
                    ]
                });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.permisjon[1].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.permisjon[1].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i utenlandsopphold", () => {
            const soknad = Object.assign({},getSoknad(),
                {
                    utenlandsopphold: {
                        soektOmSykepengerIPerioden: false,
                        perioder: [
                        {
                            fom: "2016-07-15",
                            tom: "2017-01-19",
                        }, {
                            fom: "2016-07-15",
                            tom: "2017-01-19",
                        },
                    ]
                    } 
                });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.utenlandsopphold.soektOmSykepengerIPerioden).to.be.equal(false);
            expect(_soknad.utenlandsopphold.perioder[1].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.utenlandsopphold.perioder[1].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i utdanning", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    utdanning: {
                        utdanningStartdato: "2017-01-01",
                        erUtdanningFulltidsstudium: true,
                    }
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.utdanning.utdanningStartdato.getTime()).to.be.equal(new Date("2017-01-01").getTime());
            expect(_soknad.utdanning.erUtdanningFulltidsstudium).to.be.equal(true);
        });

        it("parser gjenopptattArbeidFulltUtDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    gjenopptattArbeidFulltUtDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.gjenopptattArbeidFulltUtDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser identdato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    identdato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.identdato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser sendtTilArbeidsgiverDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sendtTilArbeidsgiverDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sendtTilArbeidsgiverDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser sendtTilNAVDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sendtTilNAVDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sendtTilNAVDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser opprettetDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    opprettetDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.opprettetDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser sykmeldingSkrevetDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sykmeldingSkrevetDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sykmeldingSkrevetDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("Funker hvis sendtTilNAVDato og/eller sendtTilArbeidsgiverDato ikke finnes på søknaden", () => {
            const soknad = getSoknad();
            delete(soknad.sendtTilNAVDato);
            delete(soknad.sendtTilArbeidsgiverDato);
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sendtTilNAVDato).to.be.undefined;
            expect(_soknad.sendtTilArbeidsgiverDato).to.be.undefined;
        });

        it("parser forrigeSykeforloepTom", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    forrigeSykeforloepTom: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.forrigeSykeforloepTom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

    });

    describe("sorterAktiviteterEldsteFoerst", () => {

        it("Sorterer aktiviteter", () => {
            const soknad = {
                aktiviteter: [{
                    avvik: null,
                    grad: 100,
                    periode: {
                        fom: new Date("2016-07-25"),
                        tom: new Date("2016-07-28"),
                    }
                }, {
                    avvik: null,
                    grad: 100,
                    periode: {
                        fom: new Date("2016-07-10"),
                        tom: new Date("2016-07-20"),
                    }
                }, {
                    avvik: null,
                    grad: 100,
                    periode: {
                        fom: new Date("2016-07-10"),
                        tom: new Date("2016-07-21"),
                    }
                }]
            };
            expect(sorterAktiviteterEldsteFoerst(soknad).aktiviteter).to.deep.equal([{
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-10"),
                    tom: new Date("2016-07-20"),
                }
            }, {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-10"),
                    tom: new Date("2016-07-21"),
                }
            }, {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-25"),
                    tom: new Date("2016-07-28"),
                }
            }])
        });

    })
});

const getSoknad = () => {
    return soknad = {
        aktiviteter: [
            {
                avvik: null,
                grad: 100,
                periode: {
                    fom: "2016-07-15",
                    tom: "2017-01-19",
                }
            },
        ],
        egenmeldingsperioder: [],
        ferie: [],
        gjenopptattArbeidFulltUtDato: null,
        identdato: null,
        permisjon: [],
        utdanning: null,
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        opprettetDato: "2017-01-01",
        sendtTilArbeidsgiverDato: null,
        sendtTilNAVDato: null,
        sykmeldingSkrevetDato: "2017-02-15",
        forrigeSykeforloepTom: "2017-01-18",
        id: "1"
    };
};

const getParsetSoknad = () => {
    return {
        aktiviteter: [
            {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-15"),
                    tom: new Date("2017-01-19"),
                }
            },
        ],
        egenmeldingsperioder: [],
        ferie: [],
        gjenopptattArbeidFulltUtDato: null,
        identdato: null,
        permisjon: [],
        utdanning: null,
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        opprettetDato: new Date("2017-01-01"),
        sendtTilArbeidsgiverDato: null,
        sendtTilNAVDato: null,
        sykmeldingSkrevetDato: new Date("2017-02-15"),
        forrigeSykeforloepTom: new Date("2017-01-18"),
        id: "1"
    };
};


