import chai from 'chai';
import React from 'react';
import { setLedetekster } from '@navikt/digisyfo-npm';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../../test/mock/mockLedetekster';
import getSykmelding from '../../../test/mock/mockSykmeldinger';
import Sidetopp from '../../components/Sidetopp';
import Sykmeldinger from './Sykmeldinger';
import SykmeldingTeasere from './SykmeldingTeasere';

chai.use(chaiEnzyme());
const { expect } = chai;

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
        component = shallow(<Sykmeldinger smSykmeldinger={[]} sykmeldinger={sykmeldinger} />);
        expect(component.find(Sidetopp).prop('tittel')).to.equal('Dine sykmeldinger');
    });

    it('Skal rendre to SykmeldingTeasere dersom man både har nye og gamle sykmeldinger', () => {
        component = shallow(<Sykmeldinger smSykmeldinger={[]} sykmeldinger={sykmeldinger} />);
        expect(component.find(SykmeldingTeasere)).to.have.length(2);
    });

    it('Skal rendre én SykmeldingTeasere dersom man ikke har sykmeldinger', () => {
        component = shallow(<Sykmeldinger smSykmeldinger={[]} sykmeldinger={[]} />);
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
        component = shallow(<Sykmeldinger smSykmeldinger={[]} sykmeldinger={sykmeldinger} />);
        expect(component.find(SykmeldingTeasere)).to.have.length(1);
    });
});
