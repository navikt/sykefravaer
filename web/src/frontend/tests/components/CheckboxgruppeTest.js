import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Checkboxgruppe from "../../js/components/skjema/Checkboxgruppe.js";
import Checkbox from "../../js/components/skjema/Checkbox.js";

describe("Checkboxgruppe", () => {

    it("Skal vise spørsmål", () => {
        let component = shallow(<Checkboxgruppe spoersmaal="Hvilke frukter liker du?" />);
        expect(component.find(".js-sporsmal").text()).to.equal("Hvilke frukter liker du?")
    });

    it("Skal vise spørsmål med riktig overskriftsnivå", () => {
        let component = shallow(<Checkboxgruppe name="frukt" spoersmaal="Hvilke frukter liker du?" Overskrift="H4" />);
        expect(component.find("H4").text()).to.equal("Hvilke frukter liker du?")
    });

    it("Skal rendre en Checkbox per alternativ", () => {
        let component = shallow(<Checkboxgruppe spoersmaal="Hvilke frukter liker du?">
                <input value="appelsin" name="appelsin" label="Appelsin" />
                <input value="eple" name="appelsin" label="Eple" />
            </Checkboxgruppe>);
        expect(component.find(Checkbox)).to.have.length(2);
    });

    it("Skal vise feilmelding dersom erFeil === true", () => {
        let component = shallow(<Checkboxgruppe spoersmaal="Hvilke frukter liker du?" feilmelding="Vennligst velg minst én frukt" erFeil={true} onChange={undefined}>
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Checkboxgruppe>); 
        expect(component.text()).to.contain("Vennligst velg minst én frukt");
    }); 

    it("Skal ikke vise feilmelding dersom erFeil === false", () => {
        let component = shallow(<Checkboxgruppe spoersmaal="Hvilke frukter liker du?" feilmelding="Vennligst velg en frukt" erFeil={false}>
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Checkboxgruppe>);
        expect(component.text()).not.to.contain("Vennligst velg en frukt"); 
    });

}); 