import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;
import SykmeldingPeriode from "../../js/components/SykmeldingPeriode.js";

describe("SykmeldingPeriode", () => {

    it("Viser grad dersom sykmeldingen er gradert", function () {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": 60,
            "behandlingsdager": null,
            "reisetilskudd": false,
            "avventende": null
          }}/>);
        expect(periode.find(".js-grad").text()).to.equal("60 % sykmeldt");
    });

    it("Viser grad dersom sykmeldingen er ugradert (100 % sykmeldt)", function () {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": 100,
            "behandlingsdager": null,
            "reisetilskudd": false,
            "avventende": null
          }}/>);
        expect(periode.find(".js-grad").text()).to.equal("100 % sykmeldt");
    });    

    it("Viser ikke grad, men behandlingsdager, dersom sykmeldingen har behandlingsdager", function () {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": null,
            "behandlingsdager": 5,
            "reisetilskudd": false,
            "avventende": null
          }}/>);
        expect(periode.find(".js-grad").length).to.equal(0);
        expect(periode.find(".js-behandlingsdager").length).to.equal(1);
        expect(periode.find(".js-behandlingsdager").text()).to.equal("5 behandlingsdager");
    });

    it("Viser ikke behandlingsdager, dersom sykmeldingen ikke har behandlingsdager", function () {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": null,
            "behandlingsdager": null,
            "reisetilskudd": false,
            "avventende": null
          }}/>);
        expect(periode.find(".js-grad").length).to.equal(0);
        expect(periode.find(".js-behandlingsdager").length).to.equal(0);
    });    

    it("Viser reisetilskudd dersom sykmeldingen er gradert med reisetilskudd", function() {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": 45,
            "behandlingsdager": 5,
            "reisetilskudd": true,
            "avventende": null
          }}/>);
        expect(periode.find(".js-grad").text()).to.equal("45 % sykmeldt med reisetilskudd");
    });

    it("Viser reisetilskudd dersom sykmeldingen er ugradert med reisetilskudd", function() {
        const periode1 = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": null,
            "behandlingsdager": null,
            "reisetilskudd": true,
            "avventende": null
          }}/>);
        expect(periode1.find(".js-grad").length).to.equal(0);
        expect(periode1.find(".js-reisetilskudd").text()).to.equal("Reisetilskudd");
    });

    it("Viser ikke reisetilskudd dersom sykmeldingen ikke har reisetilskudd", function() {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": 45,
            "behandlingsdager": 5,
            "reisetilskudd": null,
            "avventende": null
          }}/>);
        expect(periode.find(".js-grad").text()).to.equal("45 % sykmeldt");
        expect(periode.find(".js-reisetilskudd").length).to.equal(0);        
    });

    it("Viser avventende + innspill til arbeidsgiver dersom sykmeldingen er avventende", function() {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": null,
            "behandlingsdager": 5,
            "reisetilskudd": true,
            "avventende": "Gi henne en ny og bedre stol"
          }}/>);
        expect(periode.find(".js-grad").length).to.equal(0);
        expect(periode.find(".js-avventende").text()).to.equal("Avventende sykmelding");
        expect(periode.text()).to.contain("Innspill til arbeidsgiver om tilrettelegging")
        expect(periode.text()).to.contain("Gi henne en ny og bedre stol")
    });

    it("Viser ikke avventende dersom sykmeldingen ikke er avventende", function() {
        const periode = shallow(<SykmeldingPeriode periode={{
            "fom": "2016-05-01T22:00:00.000Z",
            "tom": "2016-05-16T22:00:00.000Z",
            "grad": 45,
            "behandlingsdager": 5,
            "reisetilskudd": true,
            "avventende": null
          }}/>);
        expect(periode.find(".js-avventende").length).to.equal(0);
    });    

});