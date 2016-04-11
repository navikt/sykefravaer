var expect = require("chai").expect;
import Brodsmuler, {getSti} from "../../js/components/Brodsmuler.js";

xdescribe("getSti", () => {

    it("Should return the proper path for Dine sykmeldinger", function () {
        expect(getSti("/dine-sykmeldinger", {sykmeldingId: "3"})).to.deep.equal([{
            tittel: "Ditt NAV",
            erKlikkbar: true,
            sti: "/"
        }, {
            tittel: "Dine sykmeldinger",
            sti: "/dine-sykmeldinger",
            erKlikkbar: false
        }])
    });

    it("Should return the proper path for Din sykmelding", function () {
        expect(getSti("/dine-sykmeldinger/:sykmeldingId", {sykmeldingId: "3"})).to.deep.equal([{
            tittel: "Ditt NAV",
            erKlikkbar: true,
            sti: "/"
        }, {
            tittel: "Dine sykmeldinger",
            sti: "/dine-sykmeldinger",
            erKlikkbar: true
        }, {
            tittel: "Sykmelding",
            sti: "/dine-sykmeldinger/3",
            erKlikkbar: false
        }])
    });

    it("Should return the proper path for Send til arbeidsgiver", function () {
        expect(getSti("/dine-sykmeldinger/:sykmeldingId/send-til-arbeidsgiver", {sykmeldingId: "3"})).to.deep.equal([{
            tittel: "Ditt NAV",
            erKlikkbar: true,
            sti: "/"
        }, {
            tittel: "Dine sykmeldinger",
            sti: "/dine-sykmeldinger",
            erKlikkbar: true
        }, {
            tittel: "Sykmelding",
            sti: "/dine-sykmeldinger/3",
            erKlikkbar: true
        }, {
            tittel: "Send til arbeidsgiver",
            sti: "/dine-sykmeldinger/3/send-til-arbeidsgiver",
            erKlikkbar: false
        }])
    });

});