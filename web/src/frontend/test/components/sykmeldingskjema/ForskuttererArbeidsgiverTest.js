import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mockLedetekster';

chai.use(chaiEnzyme());
const expect = chai.expect;

import ForskuttererArbeidsgiver, { RendreForskuttererArbeidsgiver, ForskuttererSporsmal } from '../../../js/components/sykmeldingskjema/ForskuttererArbeidsgiver';
import { Radioknapp } from '../../../js/components/skjema/Radioknapper';
import SporsmalMedTillegg from '../../../js/components/skjema/SporsmalMedTillegg';
import { FieldArray, Field } from 'redux-form';

describe("ForskuttererArbeidsgiver", () => {

    let props;
    let component; 

    beforeEach(() => {
        props = {
            arbeidsgiver: {
                navn: "BEKK"
            },
            meta: {
                touched: true,
                error: "123"
            },
            ledetekster: {},
        };
    });

    it("Skal inneholde et Field med riktig component", () => {
        component = shallow(<ForskuttererArbeidsgiver {...props} />);
        expect(component.find(Field).prop("name")).to.equal("arbeidsgiverForskutterer");
        expect(component.find(Field).prop("arbeidsgiver")).to.deep.equal(props.arbeidsgiver);
        expect(component.find(Field).prop("component")).to.deep.equal(RendreForskuttererArbeidsgiver);
    });

    describe("ForskuttererSporsmal", () => {
        it("Skal inneholde tre radioknapper", () => {
            component = shallow(<ForskuttererSporsmal {...props} />);
            expect(component.find(Radioknapp)).to.have.length(3);
        })
    });

    describe("RendreForskuttererArbeidsgiver", () => {

        beforeEach(() => {
            component = shallow(<RendreForskuttererArbeidsgiver {...props} ledetekster={{}}/>);
        });

        it("Skal inneholde et SporsmalMedTillegg", () => {
            expect(component.find(SporsmalMedTillegg)).to.have.length(1);
        });

        it("Skal inneholde et SporsmalMedTillegg med riktig Sporsmal", () => {
            expect(component.find(SporsmalMedTillegg).prop("Sporsmal")).to.deep.equal(<ForskuttererSporsmal {...props} />)
        });

        describe("visTillegg", () => {
            it("Skal returnere true hvis svar === VET_IKKE", () => {
                props.input = {
                    value: "VET_IKKE"
                }
                expect(component.find(SporsmalMedTillegg).prop("visTillegg")(props)).to.be.true;
            });

            it("Skal returnere false hvis svar === JA", () => {
                props.input = {
                    value: "JA"
                }
                expect(component.find(SporsmalMedTillegg).prop("visTillegg")(props)).to.be.false;
            });

            it("Skal returnere true hvis svar === NEI", () => {
                props.input = {
                    value: "NEI"
                }
                expect(component.find(SporsmalMedTillegg).prop("visTillegg")(props)).to.be.true;
            });
        })



    });

})