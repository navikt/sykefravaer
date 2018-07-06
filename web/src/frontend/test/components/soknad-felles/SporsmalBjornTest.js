import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import {shallow} from "enzyme";
import { Bjorn } from 'digisyfo-npm';
import { mapStateToProps, SporsmalBjornComponent } from "../../../js/components/soknad-felles/SporsmalBjorn";
import {genererParseForEnkeltverdi} from "../../../js/components/soknad-felles/fieldUtils";
import { JA, NEI } from "../../../js/enums/svarEnums";
import { SYKMELDINGSGRAD } from "../../../js/enums/tagtyper";
import { OPPHOLD_UTLAND_SKJEMA } from '../../../js/enums/skjemanavn';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SporsmalBjorn', () => {

    let state;
    let parse = genererParseForEnkeltverdi("1");

    beforeEach(() => {
        state = {
            form: {
                [OPPHOLD_UTLAND_SKJEMA]: {
                    values: {
                        [SYKMELDINGSGRAD]: parse(NEI),
                    }
                }
            }
        }
    });

    it('Skal opprette en SporsmalBjorn ved tag SYKEMELDINGSGRAD og svar NEI', () => {
        const props = mapStateToProps(state, {tag: SYKMELDINGSGRAD});
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(1);
    });

    it('Skal ikke opprette en SporsmalBjorn ved tag SYKEMELDINGSGRAD og svar JA', () => {
        state.form[OPPHOLD_UTLAND_SKJEMA].values[SYKMELDINGSGRAD] = parse(JA);
        const props = mapStateToProps(state, {tag: SYKMELDINGSGRAD});
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(0);
    });

    it('Skal ikke opprette SporsmalBjorn ved ukjent tag', () => {
       const props = mapStateToProps(state, {tag: "asdf"});
       const component = shallow(<SporsmalBjornComponent {...props} />);
       expect(component.find(Bjorn)).to.have.length(0);
    });

});
