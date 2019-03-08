import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { Bjorn } from '@navikt/digisyfo-npm';
import { mapStateToProps, SporsmalBjornComponent } from './SporsmalBjornKondisjonell';
import { genererParseForEnkeltverdi } from './fieldUtils';
import { JA, NEI } from '../../enums/svarEnums';
import { FERIE, SYKMELDINGSGRAD } from '../../enums/tagtyper';
import { SKJEMANAVN_OPPHOLD_UTLAND } from '../../../enums/skjemanavn';
import { parsetSoknadUtland1 } from '../../../../test/mock/mockSoknadUtland';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SporsmalBjorn', () => {
    let state;
    const parse = genererParseForEnkeltverdi();

    beforeEach(() => {
        state = {
            form: {
                [SKJEMANAVN_OPPHOLD_UTLAND]: {
                    values: {
                        [SYKMELDINGSGRAD]: parse(NEI),
                        [FERIE]: parse(JA),
                    },
                },
            },
        };
    });

    it('Skal opprette en SporsmalBjorn ved tag SYKEMELDINGSGRAD og svar NEI', () => {
        const props = mapStateToProps(state, { tag: SYKMELDINGSGRAD, soknad: parsetSoknadUtland1 });
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(1);
    });

    it('Skal ikke opprette en SporsmalBjorn ved tag SYKEMELDINGSGRAD og svar JA', () => {
        state.form[SKJEMANAVN_OPPHOLD_UTLAND].values[SYKMELDINGSGRAD] = parse(JA);
        const props = mapStateToProps(state, { tag: SYKMELDINGSGRAD, soknad: parsetSoknadUtland1 });
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(0);
    });

    it('Skal opprette en SporsmalBjorn ved tag FERIE og svar JA', () => {
        const props = mapStateToProps(state, { tag: FERIE, soknad: parsetSoknadUtland1 });
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(1);
    });

    it('Skal ikke opprette en SporsmalBjorn ved tag FERIE og svar NEI', () => {
        state.form[SKJEMANAVN_OPPHOLD_UTLAND].values[FERIE] = parse(NEI);
        const props = mapStateToProps(state, { tag: FERIE, soknad: parsetSoknadUtland1 });
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(0);
    });

    it('Skal ikke opprette SporsmalBjorn ved ukjent tag', () => {
        const props = mapStateToProps(state, { tag: 'asdf', soknad: parsetSoknadUtland1 });
        const component = shallow(<SporsmalBjornComponent {...props} />);
        expect(component.find(Bjorn)).to.have.length(0);
    });
});
