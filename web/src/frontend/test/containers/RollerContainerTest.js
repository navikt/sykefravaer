import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { RollerSide, mapStateToProps } from "../../js/containers/RollerContainer";
import Artikkel from '../../js/components/Artikkel';

describe("RollerContainer", () => {

    describe("mapStateToProps", () => {

        it("Skal returnere brødsmuler", function () {
            const res = mapStateToProps({ ledetekster: {} });
            expect(typeof res.brodsmuler).to.equal("object");
            expect(typeof res.brodsmuler.length).to.equal("number");
        });

        it("Skal returnere ledetekster", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {
                        "min.tekst": "Dette er en test"
                    }
                },
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            });
        });

    });

    describe("RollerSide", () => {

        it("Skal vise en artikkel", () => {
            let component = shallow(<RollerSide ledetekster={ledetekster} brodsmuler={[]}/>);
            expect(component.find(Artikkel)).to.have.length(1);
        });
    })

}); 