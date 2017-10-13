import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import OpprettOppfolgingsdialog from "../../../js/components/oppfolgingsdialoger/OpprettOppfolgingsdialog";
import ArbeidsgiverSkjemaForm from "../../../js/components/oppfolgingsdialoger/ArbeidsgiverSkjema";
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Oppfolgingsdialoger", () => {

    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Skal vise et ArbeidsgiverSkjema", () => {
        component = shallow(<OpprettOppfolgingsdialog
            sykmeldinger={[]}
            naermesteLedere={[]}
        />);
        expect(component.find(ArbeidsgiverSkjemaForm)).to.have.length(1);
    });

});