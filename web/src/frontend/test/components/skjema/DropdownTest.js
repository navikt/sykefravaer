import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Dropdown from '../../../js/components/skjema/Dropdown';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Dropdown', () => {
    it('Skal rendre riktig antall options', () => {
        const alternativer = [{
            tekst: 'Velg',
        }, {
            tekst: 'Epler',
            verdi: 'epler',
        }, {
            tekst: 'Appelsiner',
            verdi: 'appelsiner',
        }];
        const componentOne = shallow(<Dropdown alternativer={alternativer} />);
        expect(componentOne.find('option').length).to.equal(3);

        const flereAlternativer = [{
            tekst: 'Velg',
        }, {
            tekst: 'Epler',
            verdi: 'epler',
        }, {
            tekst: 'Appelsiner',
            verdi: 'appelsiner',
        }, {
            tekst: 'Druer',
            verdi: 'duer',
        }, {
            tekst: 'Bananer',
            verdi: 'bananer',
        }];
        const componentTwo = shallow(<Dropdown alternativer={flereAlternativer} />);
        expect(componentTwo.find('option').length).to.equal(5);
    });

    it('Skal vise korrekt verdi og innhold i options', () => {
        const alternativer = [{
            tekst: 'Velg',
        }, {
            tekst: 'Epler',
            verdi: 'epler',
        }, {
            tekst: 'Appelsiner',
            verdi: 'appelsiner',
        }];
        const component = shallow(<Dropdown alternativer={alternativer} />);
        expect(component.find('option').at(0).text()).to.equal('Velg');
        expect(component.find('option').at(1).text()).to.equal('Epler');
        expect(component.find('option').at(2).text()).to.equal('Appelsiner');
    });

    it('Valg verdi skal være valgt i dropdown-viewet', () => {
        const alternativer = [{
            tekst: 'Velg',
        }, {
            tekst: 'Epler',
            verdi: 'epler',
        }, {
            tekst: 'Appelsiner',
            verdi: 'appelsiner',
        }];
        const valgtAlternativ = 'epler';
        const component = mount(<Dropdown alternativer={alternativer} valgtAlternativ={valgtAlternativ} />);
        expect(component.find('option').at(1)).to.be.selected();
        expect(component.find('option').at(2)).not.to.be.selected();
    });

    it('Skal kalle på innsendt funksjon med valgt alternativ når alternativ velges', () => {
        const alternativer = [{
            tekst: 'Velg',
        }, {
            tekst: 'Epler',
            verdi: 'epler',
        }, {
            tekst: 'Appelsiner',
            verdi: 'appelsiner',
        }, {
            tekst: 'Druer',
            verdi: 'druer',
        }, {
            tekst: 'Fiken',
            verdi: 'fiken',
        }];
        const onChange = sinon.spy();
        const component = shallow(<Dropdown alternativer={alternativer} onChange={onChange} />);
        component.find('select').simulate('change', {
            target: {
                value: 'druer',
            },
        });
        expect(onChange.calledOnce).to.equal(true);
        expect(onChange.getCall(0).args[0]).to.equal('druer');
    });
});
