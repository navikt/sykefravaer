import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Soknadsdatoliste, { soknadsdatoremse } from '../../../js/components/sykmeldingkvittering/Soknadsdatoliste';
chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Soknadsdatoliste", () => {
    let comp;

    let soknad1 = {
        tom: new Date("2017-10-14"),
    };

    let soknad2 = {
        tom: new Date("2017-10-12"),
    };

    let soknad3 = {
        tom: new Date("2017-10-13"),
    }

    beforeEach(() => {
        
    });

    it("Skal sortere etter tom", () => {
        comp = shallow(<Soknadsdatoliste sykepengesoknader={[soknad1, soknad2, soknad3]} />)
        expect(comp.find("li").at(0).text()).to.equal("12.10.2017");
        expect(comp.find("li").at(1).text()).to.equal("13.10.2017");
        expect(comp.find("li").at(2).text()).to.equal("14.10.2017");
    });

    describe("soknadsdatoremse", () => {
        it("Skal gi én dato hvis det bare finnes én søknad", () => {
            expect(soknadsdatoremse([soknad1])).to.equal("<strong>14.10.2017</strong>");
        });

        it("Skal gi to datoer separert av 'og' hvis det finnes to søknader", () => {
            expect(soknadsdatoremse([soknad1, soknad2])).to.equal("<strong>12.10.2017</strong> og <strong>14.10.2017</strong>");
        });

        it("Skal gi tre datoer separert av komma og 'og' hvis det finnes tre søknader", () => {
            expect(soknadsdatoremse([soknad1, soknad2, soknad3])).to.equal("<strong>12.10.2017</strong>, <strong>13.10.2017</strong> og <strong>14.10.2017</strong>");
        });
    });

})
