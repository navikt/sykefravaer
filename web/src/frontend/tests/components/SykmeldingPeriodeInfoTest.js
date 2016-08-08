import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;
import SykmeldingPeriodeInfo from "../../js/components/sykmeldinger/SykmeldingPeriodeInfo.js";

const periode = {
            "fom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            "tom": { year: 2016, monthValue: 5, dayOfMonth: 16 },
            "grad": 60,
            "behandlingsdager": null,
            "reisetilskudd": false,
            "avventende": null
          };

const getPeriode = (prd = {}) => {
    return Object.assign({}, periode, prd);
};

describe("SykmeldingPeriodeInfo", () => {

    describe("Vanlig sykmelding med arbeidsgiver og grad", () => {

        const grad = 75;
        const arbeidsgiver = "BEKK";

        it("Viser grad dersom sykmeldingen er gradert", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                grad: grad, 
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er 75 % sykmeldt fra BEKK i 16 dager");
        });        

        it("Viser grad dersom sykmeldingen er gradert og bare varer i én dag", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                "grad": grad, 
                "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er 75 % sykmeldt fra BEKK i 1 dag");
        });   

        it("Viser grad dersom grad === 100", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                grad: 100, 
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er 100 % sykmeldt fra BEKK i 16 dager");
        });        

        it("Viser grad dersom sykmeldingen er gradert og bare varer i én dag", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                "grad": 100, 
                "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er 100 % sykmeldt fra BEKK i 1 dag");
        }); 

    }); 

    describe("Vanlig sykmelding uten grad", () => {

        const grad = null;
        const arbeidsgiver = "BEKK";

        it("Viser ikke grad", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                grad: grad, 
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er sykmeldt fra BEKK i 16 dager");
        });        

        it("Viser ikke grad dersom sykmeldingen bare varer i én dag", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                "grad": grad, 
                "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er sykmeldt fra BEKK i 1 dag");
        });   

    });     

    describe("Vanlig sykmelding uten arbeidsgiver", () => {

        const arbeidsgiver = null; 

        it("Viser ikke arbeidsgiver", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode()} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er 60 % sykmeldt i 16 dager");
        });    

        it("Viser ikke arbeidsgiver dersom sykmeldingen bare varer i én dag", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
               "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            })} arbeidsgiver={null} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er 60 % sykmeldt i 1 dag");
        });

    });

    describe("Vanlig sykmelding uten arbeidsgiver og uten grad", () => {

        const arbeidsgiver = null; 
        const grad = null; 

        it("Viser ikke arbeidsgiver", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                grad
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er sykmeldt i 16 dager");
        });    

        it("Viser ikke arbeidsgiver dersom sykmeldingen bare varer i én dag", function () {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
                grad
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster}/>);
            expect(info.find(".js-periode").text()).to.equal("Du er sykmeldt i 1 dag");
        });

    });    
 
    describe("Behandlingsdager og arbeidsgiver", () => {

        const arbeidsgiver = "BEKK"

        it("Viser behandlingsdager dersom sykmeldingen har behandlingsdager", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                behandlingsdager: 5
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 5 behandlingsdager i løpet av 16 dager – BEKK");
        });

        it("Viser behandlingsdag dersom sykmeldingen har en behandlingsdag", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                behandlingsdager: 1
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 1 behandlingsdag i løpet av 16 dager – BEKK");
        });

        it("Viser behandlingsdag dersom sykmeldingen har én behandlingsdag", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                behandlingsdager: 1,
                "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 1 behandlingsdag i løpet av 1 dag – BEKK");
        });             
    });

    describe("Behandlingsdager uten arbeidsgiver", () => {

        const arbeidsgiver = null;

        it("Viser behandlingsdager dersom sykmeldingen har behandlingsdager", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                behandlingsdager: 5
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 5 behandlingsdager i løpet av 16 dager");
        });

        it("Viser behandlingsdag dersom sykmeldingen har en behandlingsdag", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                behandlingsdager: 1
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 1 behandlingsdag i løpet av 16 dager");
        });

        it("Viser behandlingsdag dersom sykmeldingen har én behandlingsdag", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                behandlingsdager: 1,
                "tom": { year: 2016, monthValue: 5, dayOfMonth: 1 },
            })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 1 behandlingsdag i løpet av 1 dag");
        });

        it("Viser behandlingsdag dersom sykmeldingen har én behandlingsdag og ingen grad", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                "fom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
                "tom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
                "grad": null,
                "behandlingsdager": 1,
                "reisetilskudd": null,
                "avventende": null
              })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 1 behandlingsdag i løpet av 1 dag");
        });   

        it("Viser behandlingsdag dersom sykmeldingen har 3 behandlingsdager og ingen grad", function () {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                "fom": { year: 2014, monthValue: 3, dayOfMonth: 26 },
                "tom": { year: 2014, monthValue: 3, dayOfMonth: 30 },
                "grad": null,
                "behandlingsdager": 3,
                "reisetilskudd": null,
                "avventende": null
              })} arbeidsgiver={arbeidsgiver} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har 3 behandlingsdager i løpet av 5 dager");
        });                

    });

    xit("Viser reisetilskudd dersom sykmeldingen er gradert med reisetilskudd", function() {
        const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
            reisetilskudd: true,
            grad: 88
        })}/>);
        expect(periode.find(".js-periode").text()).to.equal("Du er 88 % sykmeldt med reisetilskudd");
    });

    describe("Reisetilskudd", () => {
        it("Viser reisetilskudd dersom sykmeldingen er ugradert med reisetilskudd", function() {
            const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
                reisetilskudd: true,
                tom: { year: 2016, monthValue: 5, dayOfMonth: 10 }
            })} arbeidsgiver="BEKK" ledetekster={ledetekster}/>);
            expect(periode.find(".js-periode").text()).to.equal("Du har reisetilskudd i 10 dager");
        });        

        it("Viser ikke arbeidsgiver dersom arbeidsgiver ikke finnes og sykmeldingen varer i én dag", function() {
            const periode = shallow(<SykmeldingPeriodeInfo periode={{
                "fom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
                "tom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
                "grad": null,
                "behandlingsdager": null,
                "reisetilskudd": true,
                "avventende": null
              }} arbeidsgiver={null} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har reisetilskudd i 1 dag")
        });

        it("Viser ikke arbeidsgiver dersom arbeidsgiver ikke finnes og sykmeldingen varer i én dag og sykmeldingen er gradert", function() {
            const periode = shallow(<SykmeldingPeriodeInfo periode={{
                "fom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
                "tom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
                "grad": 55,
                "behandlingsdager": null,
                "reisetilskudd": true,
                "avventende": null
              }} arbeidsgiver={null} ledetekster={ledetekster} />);
            expect(periode.find(".js-periode").text()).to.equal("Du har reisetilskudd i 1 dag")
        });        
    });

    it("Viser avventende dersom sykmeldingen er avventende", function() {
        const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
            avventende: "Gi henne en bedre stol"
        })} arbeidsgiver="BEKK" ledetekster={ledetekster}/>);
        expect(periode.find(".js-periode").text()).to.equal("Du er avventende sykmeldt fra BEKK i 16 dager")
    });

    it("Viser avventende dersom sykmeldingen er avventende", function() {
        const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
            avventende: "Gi henne en bedre stol",
            tom: { year: 2016, monthValue: 5, dayOfMonth: 1 }
        })} arbeidsgiver="BEKK" ledetekster={ledetekster}/>);
        expect(periode.find(".js-periode").text()).to.equal("Du er avventende sykmeldt fra BEKK i 1 dag")
    });

    it("Viser avventende dersom perioden varer i én dag, er uten arbeidsgiver og uten grad", () => {
        const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
            "fom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
            "tom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
            "grad": null,
            "behandlingsdager": null,
            "reisetilskudd": null,
            "avventende": "4.1.3 InnspillTilArbeidsgiver"
          })} arbeidsgiver={null} ledetekster={ledetekster} />)
        expect(periode.find(".js-periode").text()).to.equal("Du er avventende sykmeldt i 1 dag")
    });

    it("Viser ikke arbeidsgiver dersom sykmeldingen er avventende uten arbeidsgiver", function() {
        const periode = shallow(<SykmeldingPeriodeInfo periode={getPeriode({
            avventende: "Gi henne en bedre stol",
            tom: { year: 2016, monthValue: 5, dayOfMonth: 1 }
        })} arbeidsgiver={null} ledetekster={ledetekster}/>);
        expect(periode.find(".js-periode").text()).to.equal("Du er avventende sykmeldt i 1 dag")
    });

    it("Min test", () => {
        const info = shallow(<SykmeldingPeriodeInfo periode={{
            "fom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
            "tom": { year: 2014, monthValue: 2, dayOfMonth: 26 },
            "grad": 100,
            "behandlingsdager": null,
            "reisetilskudd": null,
            "avventende": null
          }} ledetekster={ledetekster} arbeidsgiver={null} />)
        expect(info.find(".js-periode").text()).to.equal("Du er 100 % sykmeldt i 1 dag")
    });


});