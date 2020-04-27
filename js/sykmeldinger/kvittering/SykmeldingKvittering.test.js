import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import SykmeldingKvittering from './SykmeldingKvittering';
import Kvitteringsteg from './felles/Kvitteringsteg';
import SokOmSykepengerNaaKvittering from './varianter/SokOmSykepengerNaaKvittering';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('Sykmeldingkvittering', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: '/sykefravaer',
        };
    });

    it('Skal vise en SokOmSykepengerNaaKvittering hvis kvitteringtype er KVITTERING_MED_SYKEPENGER_SØK_NÅ', () => {
        const comp = shallow(<SykmeldingKvittering kvitteringtype="KVITTERING_MED_SYKEPENGER_SØK_NÅ" />);
        expect(comp.find(SokOmSykepengerNaaKvittering)).to.have.length(1);
    });

    describe('SokOmSykepengerNaaKvittering', () => {
        it('Skal vise to stk Kvitteringsteg', () => {
            const comp = shallow(<SokOmSykepengerNaaKvittering />);
            expect(comp.find(Kvitteringsteg)).to.have.length(2);
        });
    });

    describe('Kvitteringsteg', () => {
        let comp;

        beforeEach(() => {
            comp = shallow(<Kvitteringsteg nummer="1" tittel="Min fine tittel"><p>Hei på deg</p></Kvitteringsteg>);
        });

        it('Skal vise tall og tittel', () => {
            expect(comp.find('.js-tittel').text()).to.equal('1 Min fine tittel');
        });

        it('Skal vise children', () => {
            expect(comp.find('.js-tekst')).to.contain(<p>Hei på deg</p>);
        });
    });
});
