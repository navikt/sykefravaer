import {expect} from 'chai';

import tidslinjer, { settHendelseIder, leggTilTidshendelser, sorterHendelser } from '../../js/reducers/tidslinjer.js';

describe('tidslinjer', () => {

    describe("settHendelseIder", () => {
        it("Setter ID", () => {
            const tidslinjer = [{
                hendelser: [{}, {}]
            }, {
                hendelser: [{}, {}, {}]
            }]
            const res = settHendelseIder(tidslinjer);
            expect(res).to.deep.equal([{
                hendelser: [{id: "00"}, {id: "01"}]
            }, {
                hendelser: [{id: "10"}, {id: "11"}, {id: "12"}]
            }])
        });
    });

    describe("leggTilTidshendelser", () => {
        it("Legger til tidshendelser", () => {
            const data = [{
                hendelser: [{
                    antallDager: 0
                }, {
                    antallDager: 28
                }, {
                    antallDager: 49
                }]
            }];
            const res = leggTilTidshendelser(data);
            expect(res).to.deep.equal([{
                hendelser: [{
                    antallDager: 0,
                    type: "TITTEL",
                    "tekstkey": "tidslinje.sykefravaeret-starter"
                }, {
                    antallDager: 28,
                }, {
                    antallDager: 28,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.4"
                }, {
                    antallDager: 49
                }, {
                    antallDager: 49,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.7"
                }, {
                    antallDager: 56,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.8"
                }, {
                    antallDager: 182,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.26"
                }, {
                    antallDager: 273,
                    type: "TID",
                    tekstkey: "tidslinje.antall-uker.39"
                }]
            }])
        });
    });


    it("Håndterer HENT_TIDSLINJER_FEILET", () => {
        const initiellState = {};
        const action = {
            type: "HENT_TIDSLINJER_FEILET"
        }
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false, 
            hentingFeilet: true
        })
    });

    it("Håndterer HENTER_TIDSLINJER", () => {
        const initiellState = {};
        const action = {
            type: "HENTER_TIDSLINJER"
        }
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true, 
            hentingFeilet: false,
        })
    });

    it("Sorterer hendelser", () => {
        const hendelser = [{antallDager: 52}, { antallDager: 0}, {antallDager: 80}];
        const res = sorterHendelser(hendelser);
        expect(res).to.deep.equal([{antallDager: 0}, { antallDager: 52}, {antallDager: 80}])
    });

    it("Håndterer SET_TIDSLINJER når sykeforløpet har en startdato", () => {
        const initiellState = {};
        const action = {
            type: "SET_TIDSLINJER",
            tidslinjer: [{
                "startdato": {
                    "year": 2016,
                    "month": "JUNE",
                    "dayOfMonth": 12,
                    "dayOfWeek": "SUNDAY",
                    "dayOfYear": 164,
                    "leapYear": true,
                    "monthValue": 6,
                    "era": "CE",
                    "chronology": {
                        "id": "ISO",
                        "calendarType": "iso8601"
                    }
                },
                "hendelser": [{
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.sykefravaeret-starter"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.med-arbeidsgiver.aktivitetskrav"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-nav"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.med-arbeidsgiver.langtidssykmeldt"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.med-arbeidsgiver.sluttfasen"
                }]
            }]
         };
        const nextState = tidslinjer(initiellState, action);
        expect(nextState.data).to.deep.equal([{
                "startdato": {
                    "year": 2016,
                    "month": "JUNE",
                    "dayOfMonth": 12,
                    "dayOfWeek": "SUNDAY",
                    "dayOfYear": 164,
                    "leapYear": true,
                    "monthValue": 6,
                    "era": "CE",
                    "chronology": {
                        "id": "ISO",
                        "calendarType": "iso8601"
                    }
                },
                "hendelser": [{
                    "id": "00",
                    "inntruffetdato": null,
                    "type": "FØRSTE_SYKMELDINGSDAG",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.forste-sykmeldingsdag",
                    "data": {
                        startdato: {
                            "year": 2016,
                            "month": "JUNE",
                            "dayOfMonth": 12,
                            "dayOfWeek": "SUNDAY",
                            "dayOfYear": 164,
                            "leapYear": true,
                            "monthValue": 6,
                            "era": "CE",
                            "chronology": {
                                "id": "ISO",
                                "calendarType": "iso8601"
                            }
                        }
                    }
                }, {
                    "id": "01",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen4uker.svg'
                }, {
                    "id": "02",
                    "type": "TID",
                    "antallDager": 28,
                    "tekstkey": "tidslinje.antall-uker.4"
                }, {
                    "id": "03",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen7uker.svg'
                }, {
                    "id": "04",
                    "type": "TID",
                    "antallDager": 49,
                    "tekstkey": "tidslinje.antall-uker.7"
                }, {
                    "id": "05",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.med-arbeidsgiver.aktivitetskrav",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen8uker.svg',
                }, {
                    "id": "06",
                    "type": "TID",
                    "antallDager": 56,
                    "tekstkey": "tidslinje.antall-uker.8"
                }, {
                    "id": "07",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-nav",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen26uker.svg'
                }, {
                    "id": "08",
                    "type": "TID",
                    "antallDager": 182,
                    "tekstkey": "tidslinje.antall-uker.26"
                }, {
                    "id": "09",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.med-arbeidsgiver.langtidssykmeldt",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen39uker.svg'
                }, {
                    "id": "010",
                    "type": "TID",
                    "antallDager": 273,
                    "tekstkey": "tidslinje.antall-uker.39"
                }, {
                    "id": "011",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.med-arbeidsgiver.sluttfasen",
                    "bilde": '/sykefravaer/img/tidslinje/sluttfasen-3.svg'
                }]
            }])
    });

    it("Håndterer SET_TIDSLINJER når sykeforløpet ikke har en startdato", () => {
        const initiellState = {};
        const action = {
            type: "SET_TIDSLINJER",
            tidslinjer: [{
                startdato: null,
                "hendelser": [{
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.med-arbeidsgiver.sykefravaer.startet"
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver",
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver",
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.med-arbeidsgiver.aktivitetskrav",
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-nav",
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.med-arbeidsgiver.langtidssykmeldt",
                }, {
                    "id": null,
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.med-arbeidsgiver.sluttfasen",
                }]
            }]
         };
        const nextState = tidslinjer(initiellState, action);
        expect(nextState.data).to.deep.equal([{
                "startdato": null,
                "hendelser": [{
                    "id": "00",
                    "inntruffetdato": null,
                    "type": "TITTEL",
                    "antallDager": 0,
                    "tekstkey": "tidslinje.sykefravaeret-starter",
                }, {
                    "id": "01",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 27,
                    "tekstkey": "tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver",
                    "bilde": "/sykefravaer/img/tidslinje/med-arbeidsgiver/innen4uker.svg"
                }, {
                    "id": "02",
                    "type": "TID",
                    "antallDager": 28,
                    "tekstkey": "tidslinje.antall-uker.4"
                }, {
                    "id": "03",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 48,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen7uker.svg',
                }, {
                    "id": "04",
                    "type": "TID",
                    "antallDager": 49,
                    "tekstkey": "tidslinje.antall-uker.7"
                }, {
                    "id": "05",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 55,
                    "tekstkey": "tidslinje.med-arbeidsgiver.aktivitetskrav",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen8uker.svg'
                }, {
                    "id": "06",
                    "type": "TID",
                    "antallDager": 56,
                    "tekstkey": "tidslinje.antall-uker.8"
                }, {
                    "id": "07",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 181,
                    "tekstkey": "tidslinje.med-arbeidsgiver.dialogmote-nav",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen26uker.svg',
                }, {
                    "id": "08",
                    "type": "TID",
                    "antallDager": 182,
                    "tekstkey": "tidslinje.antall-uker.26"
                }, {
                    "id": "09",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 272,
                    "tekstkey": "tidslinje.med-arbeidsgiver.langtidssykmeldt",
                    "bilde": '/sykefravaer/img/tidslinje/med-arbeidsgiver/innen39uker.svg',
                }, {
                    "id": "010",
                    "type": "TID",
                    "antallDager": 273,
                    "tekstkey": "tidslinje.antall-uker.39"
                }, {
                    "id": "011",
                    "inntruffetdato": null,
                    "type": "BOBLE",
                    "antallDager": 364,
                    "tekstkey": "tidslinje.med-arbeidsgiver.sluttfasen",
                    "bilde": '/sykefravaer/img/tidslinje/sluttfasen-3.svg'
                }]
            }])
    });


    it("Håndterer ÅPNE_HENDELSER", () => {
        const initiellState = {
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: false
                }, {
                    id: 1,
                    erApen: false
                }, {
                    id: 2,
                    erApen: false
                }, {
                    id: 3,
                    erApen: false
                }, {
                    id: 4,
                    erApen: false
                }]
            }],
            henter: false,
            hentingFeilet: false
        };
        const action = {
            type: 'ÅPNE_HENDELSER',
            hendelseIder: [0, 2, 3]
        };
        const nextState = tidslinjer(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true,
                    hoyde: "auto",
                    visBudskap: true
                }, {
                    id: 1,
                    erApen: false,
                }, {
                    id: 2,
                    erApen: true,
                    hoyde: "auto",
                    visBudskap: true
                }, {
                    id: 3,
                    erApen: true,
                    hoyde: "auto",
                    visBudskap: true
                }, {
                    id: 4,
                    erApen: false,
                }]
            }],
            henter: false,
            hentingFeilet: false,
        });
    }); 


    it("Håndterer SET_HENDELSEDATA", () => {
        const initiellState = {
            data: [{
                hendelser: [{
                    id: 0,
                    erApen: true
                }, {
                    id: 1,
                    erApen: true
                }, {
                    id: 2,
                    erApen: false
                }]
            }],
            henter: false,
            hentingFeilet: false,
        };
        const action = {
            type: 'SET_HENDELSEDATA',
            hendelseId: 1,
            data: {
                ikon: "helge.jpg",
                hoyde: 55
            }
        };
        const nextState = tidslinjer(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                    hendelser: [{
                    id: 0,
                    erApen: true
                }, {
                    id: 1,
                    erApen: true,
                    ikon: "helge.jpg",
                    hoyde: 55
                }, {
                    id: 2,
                    erApen: false
                }]
            }],
            henter: false,
            hentingFeilet: false
        });
    });

}); 
