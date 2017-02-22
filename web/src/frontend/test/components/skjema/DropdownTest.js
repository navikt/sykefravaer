import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Dropdown from "../../../js/components/skjema/Dropdown";

describe("Dropdown", () => { 

    it("Skal rendre riktig antall options", function () {
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

    it("Skal vise korrekt verdi og innhold i options", function () {
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

    it("Valg verdi skal være valgt i dropdown-viewet", function() {
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

    it("Skal kalle på innsendt funksjon med valgt alternativ når alternativ velges", function() {
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