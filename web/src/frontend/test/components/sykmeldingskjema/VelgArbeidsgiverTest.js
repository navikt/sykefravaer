import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Field } from 'redux-form';
import getSykmelding from "../../mockSykmeldinger";
import ledetekster from '../../mockLedetekster';
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import VelgArbeidsgiver, { RendreVelgArbeidsgiver, Tilleggsinfo, ArbeidsgiverRadioknapper, visTilleggssporsmal, SkrivUt } from "../../../js/components/sykmeldingskjema/VelgArbeidsgiver";
import ForskuttererArbeidsgiver from '../../../js/components/sykmeldingskjema/ForskuttererArbeidsgiver';
import ErLederRiktig from '../../../js/components/sykmeldingskjema/ErLederRiktig';
import SporsmalMedTillegg from '../../../js/components/skjema/SporsmalMedTillegg';
import Radioknapper from '../../../js/components/skjema/Radioknapper';
import { Hjelpetekst } from 'digisyfo-npm';

describe("VelgArbeidsgiver", () => {

    let component;
    let arbeidsgivere;
    let skjemaData; 
    let sykmelding;
    let input; 
    let props;

    beforeEach(() => {
        skjemaData = {};
        skjemaData.values = {};
        skjemaData.values.opplysningeneErRiktige = true;
        skjemaData.values.valgtArbeidssituasjon = 'arbeidstaker';
        arbeidsgivere = [{
            orgnummer: "123456789",
            navn: "Mortens frukt og grønt"
        }, {
            orgnummer: "0", 
            navn: "Annen arbeidsgiver"
        }];
        input = {
            value: ""
        }
        sykmelding = getSykmelding();
        props = {
            skjemaData,
            arbeidsgivere,
            sykmelding,
            input,
        }
        setLedetekster(ledetekster);
        component = shallow(<VelgArbeidsgiver {...props} />);
    });

    it("Skal inneholde et Field med riktige props", () => {
        expect(component.find(Field).prop("component")).to.deep.equal(RendreVelgArbeidsgiver);
        expect(component.find(Field).prop("name")).to.equal("valgtArbeidsgiver");
        expect(component.find(Field).prop("sykmelding")).to.deep.equal(sykmelding);
        expect(component.find(Field).prop("arbeidsgivere")).to.deep.equal(arbeidsgivere);
        expect(component.find(Field).prop("parse")("123456789")).to.deep.equal({
            orgnummer: "123456789",
            navn: "Mortens frukt og grønt"
        })
    });

    describe("RendreVelgArbeidsgiver", () => {

        beforeEach(() => {
            component = shallow(<RendreVelgArbeidsgiver {...props} />)
        });

        it("Skal sende props videre til SporsmalMedTillegg", () => {
            expect(component.find(SporsmalMedTillegg)).to.have.length(1);
            expect(component.find(SporsmalMedTillegg).prop("skjemaData")).to.deep.equal(props.skjemaData);
            expect(component.find(SporsmalMedTillegg).prop("arbeidsgivere")).to.deep.equal(props.arbeidsgivere);
            expect(component.find(SporsmalMedTillegg).prop("sykmelding")).to.deep.equal(props.sykmelding);
            expect(component.find(SporsmalMedTillegg).prop("Sporsmal")).to.deep.equal(<ArbeidsgiverRadioknapper {...props} />);
            expect(component.find(SporsmalMedTillegg).find(Tilleggsinfo)).to.have.length(1);
        });

    });

    describe("ArbeidsgiverRadioknapper", () => {
        beforeEach(() => {
            component = shallow(<ArbeidsgiverRadioknapper {...props} />)
        });

        it("Skal inneholde Radioknapper med riktig name", () => {
            expect(component.find(Radioknapper)).to.have.length(1);
            expect(component.find(Radioknapper).prop("name")).to.equal("valgtArbeidsgiver");
        });

        it("Skal inneholde Radioknapper med hjelpetekst", () => {
            expect(component.find(Radioknapper).prop("hjelpetekst")).to.be.defined;
        });

        it("Skal inneholde en input for hver arbeidsgiver", () => {
            expect(component.find("input")).to.have.length(2);
        });

        it("Skal dekorere navn med orgnummer på format 123 456 789", () => {
            expect(component.find("input").first().prop("labelSekundaer")).to.contain("123 456 789");
        });

    })

    describe("Tilleggsinfo", () => {

        it("Skal returnere SkrivUt hvis bruker har valgt annen arbeidsgiver ", () => {
            props.input.value = {
                orgnummer: '0'
            }
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(SkrivUt)).to.have.length(1);
        });

        it("Skal ikke inneholde SkrivUt hvis value.orgnummer === '123'", () => {
            props.input.value = {
                orgnummer: '123'
            }
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(SkrivUt)).to.have.length(0);
        });

        it("Skal inneholde ErLederRiktig hvis value.naermesteLeder === {navn: 'navn'}", () => {
            props.input.value = {
                naermesteLeder: {
                    navn: "Ole"
                }
            };
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(ErLederRiktig)).to.have.length(1);
            expect(component.contains(<ErLederRiktig naermesteLeder={props.input.value.naermesteLeder} />)).to.be.true;
        });

        it("Skal inneholde ErLederRiktig hvis value.naermesteLeder === null", () => {
            props.input.value = {
                naermesteLeder: null
            };
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(ErLederRiktig)).to.have.length(0);
        });

        it("Skal inneholde ForskuttererArbeidsgiver hvis pilotSykepenger === true og det er valgt en arbeidsgiver", () => {
            props.pilotSykepenger = true;
            props.input.value = {
                orgnummer: "1234"
            };
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(ForskuttererArbeidsgiver)).to.have.length(1); 
        });

        it("Skal ikke inneholde ForskuttererArbeidsgiver hvis pilotSykepenger === true og det ikke er valgt en arbeidsgiver", () => {
            props.pilotSykepenger = true;
            props.input.value = {};
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(ForskuttererArbeidsgiver)).to.have.length(0); 
        });


        it("Skal ikke inneholde ForskuttererArbeidsgiver hvis pilotSykepenger === true og det ikke er valgt en arbeidsgiver", () => {
            props.pilotSykepenger = true;
            props.input.value = undefined;
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(ForskuttererArbeidsgiver)).to.have.length(0); 
        });

        it("Skal inneholde ForskuttererArbeidsgiver hvis pilotSykepenger === false og det er valgt en arbeidsgiver", () => {
            props.pilotSykepenger = false;
            props.input.value = {
                orgnummer: "1234"
            };
            component = shallow(<Tilleggsinfo {...props} />)
            expect(component.find(ForskuttererArbeidsgiver)).to.have.length(0); 
        });


    }); 

    describe("visTilleggssporsmal", () => {

        let props;

        beforeEach(() => {
            props = {
                pilotSykepenger: false,
                input: {
                    value: {}
                }
            } 
        })

        it("Skal returnere false hvis det ikke finnes value", () => {
            props.input.value = undefined;
            const res = visTilleggssporsmal(props);
            expect(res).to.be.false;
        });


        it("Skal returnere true hvis value.orgnummer === '0'", () => {
            props.input.value.orgnummer = '0';
            const res = visTilleggssporsmal(props);
            expect(res).to.be.true;
        });

        it("Skal returnere true hvis value.orgnummer !== '0' og brukeren er med i pilot", () => {
            props.input.value.orgnummer = '123';
            props.pilotSykepenger = true;
            const res = visTilleggssporsmal(props);
            expect(res).to.be.true;
        });

        it("Skal returnere true hvis brukeren har nærmeste leder", () => {
            props.input.value.naermesteLeder = {
                navn: "Ole"
            };
            expect(visTilleggssporsmal(props)).to.be.true;
        });

        it("Skal returnere false hvis brukeren ikke har nærmeste leder", () => {
            props.input.value.naermesteLeder = null;
            expect(visTilleggssporsmal(props)).to.be.false;
        })

    })
 
}); 