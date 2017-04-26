import chai from 'chai';
const expect = chai.expect;

import { parseDato, lagHeltall, lagDesimaltall, erGyldigDato, fraInputdatoTilJSDato, erGyldigDatoformat, getObjectValueByString } from '../../js/utils';

describe("utils", () => {

    describe("lagHeltall", () => {
        it("Skal fjerne bokstaver", () => {
            const n = lagHeltall("12f");
            expect(n).to.equal("12");
        });

        it("Skal fjerne bindestrek", () => {
            const n = lagHeltall("12f-");
            expect(n).to.equal("12");
        });

        it("Skal fjerne komma", () => {
            const n = lagHeltall("12,4");
            expect(n).to.equal("124");
        });
    });

    describe("lagDesimaltall", () => {
        it("Skal fjerne bokstaver", () => {
            const n = lagDesimaltall("12f");
            expect(n).to.equal("12");
        });

        it("Skal fjerne bindestrek", () => {
            const n = lagDesimaltall("12f-");
            expect(n).to.equal("12");
        });

        it("Skal erstatte . med komma når . er midt i argumentet", () => {
            const n = lagDesimaltall("12.4");
            expect(n).to.equal("12,4");
        });

        it("Skal erstatte . med komma når . er på slutten av argumentet", () => {
            const n = lagDesimaltall("12.");
            expect(n).to.equal("12,");
        });

        it("Skal ikke fjerne komma når komma er midt i argumentet", () => {
            const n = lagDesimaltall("12,4");
            expect(n).to.equal("12,4");
        });

        it("Skal ikke fjerne komma når komma er på slutten av argumentet", () => {
            const n = lagDesimaltall("12,");
            expect(n).to.equal("12,");
        });

        it("Skal returnere tom streng", () => {
            const n = lagDesimaltall("");
            expect(n).to.equal("");
        });

        it("Skal fjerne komma hvis det står først", () => {
            const n = lagDesimaltall(",");
            expect(n).to.equal("");
        });

        it("Skal fjerne komma hvis det står først", () => {
            const n = lagDesimaltall(",,");
            expect(n).to.equal("");
        });

        it("Skal kun godta to desimaler for tall under 10", () => {
            const n = lagDesimaltall("1,145");
            expect(n).to.equal("1,14");
        });

        it("Skal kun godta to desimaler for tall over 10", () => {
            const n = lagDesimaltall("11,1451");
            expect(n).to.equal("11,14");
        });

        it("Skal kun godta to desimaler for tall over 100", () => {
            const n = lagDesimaltall("456,1451");
            expect(n).to.equal("456,14");
        });

    });

    describe("parseDato", () => {

        it("Skal returnere dato dersom dato er på riktig format", () => {
            var dato = parseDato("08.02.1985");
            expect(dato).to.equal("08.02.1985");
        });

        it("Skal returnere dato dersom dato er på feil format, uten punktum", () => {
            var dato = parseDato("08021964");
            expect(dato).to.equal("08.02.1964");
        });


        it("Skal returnere dato dersom dato er på riktig format uten årstall", () => {
            var dato = parseDato("08.02.85");
            expect(dato).to.equal("08.02.85");
        });

        it("Skal returnere dato dersom dato er på feil format, uten punktum", () => {
            var dato = parseDato("080264");
            expect(dato).to.equal("08.02.64");
        });

        it("Skal sette inn punktum på riktig sted selv om strengen ikke består av 8 tegn", () => {
            var dato = parseDato("08");
            expect(dato).to.equal("08");

            var dato1 = parseDato("23.");
            expect(dato1).to.equal("23.");

            var dato2 = parseDato("010");
            expect(dato2).to.equal("01.0");

            var dato3 = parseDato("0202");
            expect(dato3).to.equal("02.02");

            var dato4 = parseDato("03028");
            expect(dato4).to.equal("03.02.8");

            var dato4 = parseDato("04.04.");
            expect(dato4).to.equal("04.04.");
        });

        it("Skal fjerne spesialtegn unntatt punktum", () => {
            var dato = parseDato("08:");
            expect(dato).to.equal("08");
        });

        it("Skal fjerne bokstaver unntatt punktum", () => {
            var dato = parseDato("34w");
            expect(dato).to.equal("34");
        });

    });

    describe("erGyldigDatoformat", () => {
        it("Skal returnere true ved 12.02.2017", () => {
            const d = erGyldigDatoformat("12.02.2017");
            expect(d).to.be.true;
        });

        it("Skal returnere false ved dd.mm.yy", () => {
            const d = erGyldigDatoformat("02.01.17");
            expect(d).to.be.false;
        })

        it("Skal returnere false ved aa.bb.cccc", () => {
            const d = erGyldigDatoformat("aa.bb.cccc");
            expect(d).to.be.false;
        });

        it("Skal returnere false ved 02.02.____", () => {
            const d = erGyldigDatoformat("02.02.____");
            expect(d).to.be.false;
        });

        it("Skal returnere false ved 02.0a.1234", () => {
            const d = erGyldigDatoformat("02.02.____");
            expect(d).to.be.false;
        });

        it("Skal returnere true ved 42.01.2020", () => {
            const d = erGyldigDatoformat("42.01.2020");
            expect(d).to.be.true;
        })
    });

    describe("erGyldigDato", () => {
        it("Skal returnere false ved 'dd.mm.yy'", () => {
            const d = erGyldigDato("02.01.17");
            expect(d).to.be.false;
        });

        it("Skal returnere true ved 'dd.mm.yyyy'", () => {
            const d = erGyldigDato("02.01.2017");
            expect(d).to.be.true;
        });

        it("Skal returnere false ved ugyldige datoer", () => {
            const d = erGyldigDato("31.11.2017");
            expect(d).to.be.false;
        });
    });

    describe("fraInputdatoTilJSDato", () => {
        it("Skal håndtere dd.mm.åååå", () => {
            const dato = "12.02.2017";
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date("2017-02-12").getTime());
        });

        it("Skal håndtere dd.mm.åå", () => {
            const dato = "12.02.17";
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date("2017-02-12").getTime());
        });
    })

    describe("getObjectValueByString", () => {
        it("Returnerer verdi fra streng", () => {
            const o = {
                "person": {
                    fornavn: "Eli",
                    adresse: {
                        gate: "Portveien",
                        nummer: "2"
                    }
                }
            };
            expect(getObjectValueByString(o, "person.adresse.nummer")).to.equal("2")
        });

        it("Returnerer verdi fra streng ved array av strenger", () => {
            const o = {
                "person": {
                    fornavn: "Eli",
                    adresse: {
                        gate: "Portveien",
                        nummer: "2"
                    },
                    hobbyer: ["hage", "giraffer", "jarl"]
                }
            };
            expect(getObjectValueByString(o, "person.hobbyer[0]")).to.equal("hage")
        });

        it("Returnerer verdi fra streng ved array av objekter", () => {
            const o = {
                "person": {
                    fornavn: "Eli",
                    adresse: {
                        gate: "Portveien",
                        nummer: "2"
                    },
                    hobbyer: ["hage", "giraffer", "jarl"],
                    barn: [{
                        fornavn: "Titten",
                        etternavn: "Tei"
                    }, {
                        fornavn: "Ole",
                        etternavn: "Tei"
                    }]
                }
            };
            expect(getObjectValueByString(o, "person.barn[1].fornavn")).to.equal("Ole")
            expect(getObjectValueByString(o, "person.barn[1].etternavn")).to.equal("Tei")
        });
    })

});