import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import VelgArbeidsgiver from '../../js/components/sykmelding/VelgArbeidsgiver.js';
import Radiogruppe from '../../js/components/skjema/Radiogruppe.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

let component;
let props; 

describe("VelgArbeidsgiver", () => { 

    beforeEach(() => {
        let ledeteksterDekorert = Object.assign({}, ledetekster, {
            'send-til-arbeidsgiver.annen-arbeidsgiver.tekst': "<p>Min fine tekst</p>"
        });
        props = {
            valgtArbeidsgiverOrgnummer: undefined,
            arbeidsgivere: [{
                orgnummer: "123456789",
                navn: "Mortens frukt og grønt"
            }],
            ledetekster: ledeteksterDekorert,
            fields: {
                valgtArbeidsgiver: {
                    value: '',
                }
            }
        }
    })

    it("Skal inneholde en Radiogruppe", () => {
        component = shallow(<VelgArbeidsgiver {...props} />)
        expect(component.find(Radiogruppe)).to.have.length(1);
    }); 

    it("Skal sende feilmelding, erFeil og valgtArbeidsgiverOrgnummer videre til Radiogruppe", () => {
        props.fields.valgtArbeidsgiver.error = "Feilmelding";
        props.fields.valgtArbeidsgiver.value = {
            orgnummer: "banan"
        }
        props.fields.valgtArbeidsgiver.touched = true;
        component = shallow(<VelgArbeidsgiver {...props} />)
        expect(component.find(Radiogruppe).prop("feilmelding")).to.equal("Feilmelding")
        expect(component.find(Radiogruppe).prop("erFeil")).to.equal(true);
        expect(component.find(Radiogruppe).prop("valgtVerdi")).to.equal(JSON.stringify({
            orgnummer: "banan"
        }));
    });

    it("Skal dekorere navn med orgnummer på format 123 456 789", () => {
        component = render(<VelgArbeidsgiver {...props} />)
        expect(component.text()).to.contain("Orgnr: 123 456 789");
    }); 

});