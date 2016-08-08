import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";


chai.use(chaiEnzyme());
const expect = chai.expect;
import SykmeldingPeriode from "../../js/components/sykmeldingOpplysninger/SykmeldingPeriode";
import SykmeldingPerioder from "../../js/components/sykmeldingOpplysninger/SykmeldingPerioder";

describe("SykmeldingPerioder", () => {

    it("Viser ingen perioder dersom man ikke har noen perioder", function () {
        const component = shallow(<SykmeldingPerioder perioder={[]} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPeriode)).to.have.length(0);
    });

    it("Viser en periode per periode dersom man har perioder", function () {
        const perioder = [
            {
                "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                "tom": { year: 2015, monthValue: 4, dayOfMonth: 18 },
                "grad": "100"
            }, {
                "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                "tom": { year: 2015, monthValue: 4, dayOfMonth: 18 },
                "grad": "100"
            }, {
                "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
                "tom": { year: 2015, monthValue: 4, dayOfMonth: 18 },
                "grad": "100"
            }];
        const component = shallow(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPeriode)).to.have.length(3);
    });

    it("Viser perioder sortert på eldste først", function () {
        const perioder = [{
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 8 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 18 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 7 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 14 },
            "grad": "100"
        }];

        const component = mount(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPeriode).at(0).props().periode).to.deep.equal(
            {
                "fom": { year: 2015, monthValue: 4, dayOfMonth: 7 },
                "tom": { year: 2015, monthValue: 4, dayOfMonth: 14 },
                "grad": "100"
            }
        );
    });

    it("Viser korteste perioder først ved samme FOM", function () {
        const perioder = [{
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 7 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 13 },
            "grad": "100"
        }, {
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 7 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 16 },
            "grad": "100"
        }];

        const component = mount(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingPeriode).first().props().periode).to.deep.equal({
            "fom": { year: 2015, monthValue: 4, dayOfMonth: 7 },
            "tom": { year: 2015, monthValue: 4, dayOfMonth: 13 },
            "grad": "100"
        });
    })
});