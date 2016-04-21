import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import ledetekster from "../ledetekster_mock.js";
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Dropdown from "../../js/components/Dropdown.js";

describe("Dropdown", () => { 

    it("Should render correct number of options", function () {
        let alternativer = [{
            tekst: "Velg",
        }, {
            tekst: "Epler",
            verdi: "epler",
        }, {
            tekst: "Appelsiner",
            verdi: "appelsiner",
        }]
        let componentOne = shallow(<Dropdown alternativer={alternativer} />);
        expect(componentOne.find("option").length).to.equal(3);

        let flereAlternativer = [{
            tekst: "Velg",
        }, {
            tekst: "Epler",
            verdi: "epler",
        }, {
            tekst: "Appelsiner",
            verdi: "appelsiner",
        }, {
            tekst: "Druer", 
            verdi: "duer",
        }, {
            tekst: "Bananer",
            verdi: "bananer"
        }]
        let componentTwo = shallow(<Dropdown alternativer={flereAlternativer} />);
        expect(componentTwo.find("option").length).to.equal(5);        
    });

    it("Should display the correct value and label of the options", function () {
        let alternativer = [{
            tekst: "Velg",
        }, {
            tekst: "Epler",
            verdi: "epler",
        }, {
            tekst: "Appelsiner",
            verdi: "appelsiner",
        }]
        let component = shallow(<Dropdown alternativer={alternativer} />);
        expect(component.find("option").at(0).text()).to.equal("Velg"); 
        expect(component.find("option").at(1).text()).to.equal("Epler"); 
        expect(component.find("option").at(2).text()).to.equal("Appelsiner"); 
    });

    it("Should select the chosen value", function() {
        let alternativer = [{
            tekst: "Velg",
        }, {
            tekst: "Epler",
            verdi: "epler",
        }, {
            tekst: "Appelsiner",
            verdi: "appelsiner",
        }];
        let valgtAlternativ = "epler";
        let component = mount(<Dropdown alternativer={alternativer} valgtAlternativ={valgtAlternativ} />);
        expect(component.find("option").at(1)).to.be.selected();
        expect(component.find("option").at(2)).not.to.be.selected();
    });

    it("Should call passed-in function with chosen option when option is selected", function() {
        let alternativer = [{
            tekst: "Velg",
        }, {
            tekst: "Epler",
            verdi: "epler",
        }, {
            tekst: "Appelsiner",
            verdi: "appelsiner",
        }, {
            tekst: "Druer",
            verdi: "druer",
        }, {
            tekst: "Fiken",
            verdi: "fiken",
        }];
        const onChange = sinon.spy();
        let component = shallow(<Dropdown alternativer={alternativer} onChange={onChange} />);
        component.find("select").simulate("change", {
            target: {
                value: "druer"
            }
        });
        expect(onChange.calledOnce).to.equal(true);
        expect(onChange.getCall(0).args[0]).to.equal("druer");        
    });    

}); 