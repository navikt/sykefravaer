import chai from 'chai';
const expect = chai.expect;

import { lagDesimaltall, lagHeltall, getObjectValueByString } from '../../js/utils';

describe("utils", () => {
    
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

    describe("lagHeltall", () => {
        it("Skal fjerne bokstaver", () => {
            const n = lagHeltall("12f");
            expect(n).to.equal("12");
        });

        it("Skal fjerne bindestrek", () => {
            const n = lagHeltall("12f-");
            expect(n).to.equal("12");
        });

        it("Skal fjerne .", () => {
            const n = lagHeltall("12.4");
            expect(n).to.equal("12");
        });

        it("Skal fjene . når . er på slutten av argumentet", () => {
            const n = lagHeltall("12.");
            expect(n).to.equal("12");
        });

        it("Skal returnere tom streng", () => {
            const n = lagHeltall("");
            expect(n).to.equal("");
        });

        it("Skal fjerne komma hvis det står først", () => {
            const n = lagHeltall(",");
            expect(n).to.equal("");
        });

        it("Skal fjerne komma hvis det står først", () => {
            const n = lagHeltall(",,");
            expect(n).to.equal("");
        });

        it("Skal fjerne , for tall under 10", () => {
            const n = lagHeltall("1,145");
            expect(n).to.equal("1");
        });

        it("Skal fjerne desimaler for tall over 10", () => {
            const n = lagHeltall("11,1451");
            expect(n).to.equal("11");
        });

        it("Skal fjerne desimaler for tall over 100", () => {
            const n = lagHeltall("456,1451");
            expect(n).to.equal("456");
        });

    });

});