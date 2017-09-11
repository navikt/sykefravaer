import  { datoMedKlokkeslett, parseDato, erGyldigDatoformat, erGyldigDato, fraInputdatoTilJSDato } from "../../js/utils/datoUtils";
import chai from "chai";
import React from "react";
import {mount, shallow} from "enzyme";
import chaiEnzyme from "chai-enzyme";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("datoUtils", () => {
    it("skal formattere dato", () => {
        const datotekst = datoMedKlokkeslett("2017-02-16T11:00:00");
        expect(datotekst).to.be.equal('16/2 klokken 11:00')
    });

    it("skal formattere dato", () => {
        const datotekst = datoMedKlokkeslett("2017-02-02T11:00:00");
        expect(datotekst).to.be.equal('2/2 klokken 11:00')
    });

    it("skal ikke krasje ved bad input", () => {
        let datotekst = datoMedKlokkeslett(undefined);
        expect(datotekst).to.be.equal("");

        datotekst = datoMedKlokkeslett(null);
        expect(datotekst).to.be.equal("");
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
});

