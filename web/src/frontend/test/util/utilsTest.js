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