import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mockLedetekster';

chai.use(chaiEnzyme());
const expect = chai.expect;

import ErLederRiktig, { RendreErLederRiktig } from '../../../js/components/sykmeldingskjema/ErLederRiktig';
import Radioknapper from '../../../js/components/skjema/Radioknapper';
import { FieldArray, Field } from 'redux-form';

describe("ErLederRiktig", () => {

    it("Skal inneholde et Field med name = beOmNyNaermesteLeder", () => {
        let component = shallow(<ErLederRiktig />)
        expect(component.find(Field).prop("name")).to.equal("beOmNyNaermesteLeder")
    });

    describe("RendreErLederRiktig", () => {

        let c;
        let props;

        beforeEach(() => {
            props = {
                input: {test: "test"},
                meta: {test2: "test2"},
                ledetekster,
                naermesteLeder: {}
            };
            c = shallow(<RendreErLederRiktig {...props} />)
        });

        it("Skal inneholde to radioknapper", () => {
            expect(c.find("input")).to.have.length(2);
            expect(c.find("input").first().prop("value")).to.equal(false);
            expect(c.find("input").last().prop("value")).to.equal(true);
        });

        it("Skal inneholde Radioknapper", () => {
            expect(c.find(Radioknapper).prop("input")).to.deep.equal(props.input)
            expect(c.find(Radioknapper).prop("meta")).to.deep.equal(props.meta)
        })

    });

});