import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Radiogruppe from "../../js/components/Radiogruppe.js";
import Radioknapp from "../../js/components/Radioknapp.js";

describe("Radiogruppe", () => {


    it("Skal vise spørsmål", () => {
        let component = shallow(<Radiogruppe name="frukt" spoersmaal="Hvilken frukt er best?">
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Radiogruppe>);
        expect(component.find(".skjema-sporsmal").text()).to.equal("Hvilken frukt er best?")
    });

    it("Skal vise spørsmål med riktig overskriftsnivå", () => {
        let component = shallow(<Radiogruppe name="frukt" spoersmaal="Hvilken frukt er best?" Overskrift="H4">
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Radiogruppe>);
        expect(component.find("H4").text()).to.equal("Hvilken frukt er best?")
    });

    it("Skal rendre en radioknapp per alternativ", () => {
        let component = shallow(<Radiogruppe name="frukt">
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Radiogruppe>);
        expect(component.find(Radioknapp)).to.have.length(2);
    });

    it("Skal sende videre name-attributtet til radioknappene", () => {
       let component = mount(<Radiogruppe name="frukt" valgtVerdi="eple">
               <input value="appelsin" label="Appelsin" />
               <input value="eple" label="Eple" />
           </Radiogruppe>);
       expect(component.contains(<Radioknapp value="appelsin" label="Appelsin" name="frukt" erValgt={false} onChange={undefined} id="appelsin" />)).to.be.true;
    });

    it("Skal sende videre valgtVerdi-attributtet til radioknappene som en bool", () => {
        let component = mount(<Radiogruppe name="frukt" valgtVerdi="appelsin">
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Radiogruppe>);
        expect(component.contains(<Radioknapp id="appelsin" value="appelsin" label="Appelsin" name="frukt" erValgt={true} onChange={undefined} />)).to.be.true
        expect(component.contains(<Radioknapp id="eple" value="eple" label="Eple" name="frukt" erValgt={false} onChange={undefined} />)).to.be.true
    });

    it("Skal vise feilmelding dersom erFeil === true", () => {
        let component = shallow(<Radiogruppe name="frukt" valgtVerdi="eple" feilmelding="Vennligst velg en frukt" erFeil={true} onChange={undefined}>
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Radiogruppe>); 
        expect(component.text()).to.contain("Vennligst velg en frukt");
    }); 

    it("Skal ikke vise feilmelding dersom erFeil === false", () => {
        let component = shallow(<Radiogruppe name="frukt" valgtVerdi="eple" feilmelding="Vennligst velg en frukt" erFeil={false}>
                <input value="appelsin" label="Appelsin" />
                <input value="eple" label="Eple" />
            </Radiogruppe>);
        expect(component.text()).not.to.contain("Vennligst velg en frukt"); 
    });

    it("Skal kalle på onChange når man velger en radioknapp", () => {
        let onChange = sinon.spy(); 
        let component = mount(<Radiogruppe name="frukt" valgtVerdi="eple" feilmelding="Vennligst velg en frukt" erFeil={false} onChange={onChange}>
                <input value="appelsin" label="Appelsin" id="appelsin" />
                <input value="eple" label="Eple" id="eple" />
            </Radiogruppe>);
        component.find("#radio-eple").simulate("change");
        expect(onChange.calledOnce).to.be.true;
        expect(onChange.getCall(0).args[0]).to.equal("eple");

        component.find("#radio-appelsin").simulate("change");
        expect(onChange.calledTwice).to.be.true;
        expect(onChange.getCall(1).args[0]).to.equal("appelsin");
    });


}); 