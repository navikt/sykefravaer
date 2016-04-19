var expect = require("chai").expect;
import Brodsmuler, {getSti} from "../../js/components/Brodsmuler.js";

xdescribe("getSti", () => { 

    it("Should return the proper path for Dine sykmeldinger", function () {
        expect(getSti("/app", {sykmeldingId: "3"})).to.deep.equal([{
            tittel: "Ditt NAV",
            erKlikkbar: true,
            sti: "/dittnav"
        }, {
            tittel: "Dine sykmeldinger",
            sti: "/app",
            erKlikkbar: false
        }])
    });

    it("Should return the proper path for Din sykmelding", function () {
        expect(getSti("/app/sykmeldinger/:sykmeldingId", {sykmeldingId: "3"})).to.deep.equal([{
            tittel: "Ditt NAV",
            erKlikkbar: true,
            sti: "/dittnav"
        }, {
            tittel: "Dine sykmeldinger",
            sti: "/app/sykmeldinger",
            erKlikkbar: true
        }, {
            tittel: "Sykmelding",
            sti: "/app/sykmeldinger/3",
            erKlikkbar: false
        }])
    });

}); 