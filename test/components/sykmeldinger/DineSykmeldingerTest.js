import chai from 'chai';
import React from 'react';
import { setLedetekster } from 'digisyfo-npm';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import getSykmelding from '../../mock/mockSykmeldinger';
import Sidetopp from '../../../js/components/Sidetopp';
import DineSykmeldinger from '../../../js/components/sykmeldinger/DineSykmeldinger';
import SykmeldingTeasere from '../../../js/components/sykmeldinger/SykmeldingTeasere';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Dine sykmeldinger', () => {
    let component;
    let sykmeldinger;

    beforeEach(() => {
        sykmeldinger = [
            getSykmelding({
                status: 'NY',
            }),
            getSykmelding({
                status: 'BEKREFTET',
            }),
            getSykmelding({
                status: 'SENDT',
            }),
        ];
        setLedetekster(ledetekster);
    });

    it("Skal vise overskrift for 'Dine sykmeldinger'", () => {
        component = shallow(<DineSykmeldinger sykmeldinger={sykmeldinger} />);
        expect(component.find(Sidetopp).prop('tittel')).to.equal('Dine sykmeldinger');
    });

    it('Skal rendre to SykmeldingTeasere dersom man både har nye og gamle sykmeldinger', () => {
        component = shallow(<DineSykmeldinger sykmeldinger={sykmeldinger} />);
        expect(component.find(SykmeldingTeasere)).to.have.length(2);
    });

    it('Skal rendre én SykmeldingTeasere dersom man ikke har sykmeldinger', () => {
        component = shallow(<DineSykmeldinger sykmeldinger={[]} />);
        expect(component.find(SykmeldingTeasere)).to.have.length(1);
    });

    it('Skal rendre én SykmeldingTeasere dersom man bare har nye sykmeldinger', () => {
        sykmeldinger = [
            getSykmelding({
                status: 'NY',
            }),
            getSykmelding({
                status: 'NY',
            }),
            getSykmelding({
                status: 'NY',
            }),
        ];
        component = shallow(<DineSykmeldinger sykmeldinger={sykmeldinger} />);
        expect(component.find(SykmeldingTeasere)).to.have.length(1);
    });
});
