import { tilDato, parseDatoerPeriode, parseDatoerPeriodeListe } from '../../../js/utils/serialisering/dato';
import { expect } from 'chai';

describe("dato", () => {
    it("oppretter datoobjekter i en periode", () => {
        const periode = {
            fom: "2017-01-01",
            tom: "2017-01-02",
        };

        const periodeMedDatoer = parseDatoerPeriode(periode);
        expect(periodeMedDatoer.fom.getTime()).to.be.equal(new Date("2017-01-01").getTime());
        expect(periodeMedDatoer.tom.getTime()).to.be.equal(new Date("2017-01-02").getTime());
    });

    it("oppretter datoobjekter i periodeListe", () => {
        const perioder = [{
            fom: "2017-01-01",
            tom: "2017-01-02",
        }, {
            fom: "2017-02-06",
            tom: "2017-02-12",
        }];

        const perioderMedDatoer = parseDatoerPeriodeListe(perioder);
        expect(perioderMedDatoer.length).to.be.equal(2);
        expect(perioderMedDatoer[0].fom.getTime()).to.be.equal(new Date("2017-01-01").getTime());
        expect(perioderMedDatoer[1].tom.getTime()).to.be.equal(new Date("2017-02-12").getTime());
    });

    it("oppretter datoobjekt for dato", () => {
        expect(tilDato("2017-01-01").getTime()).to.be.equal(new Date("2017-01-01").getTime())
    });

    it("oppretter ikke datoobjekt om datostrenge er null", () => {
        expect(tilDato(null)).to.be.equal(null)
    });
});