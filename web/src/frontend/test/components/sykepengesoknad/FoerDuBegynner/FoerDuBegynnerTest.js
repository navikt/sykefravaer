import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import FoerDuBegynner, { FoerDuBegynnerSkjema, TidligSoknad, ForsteSoknad } from '../../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad/AvbrytSoknadContainer';
import { getSoknad } from '../../../mockSoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('FoerDuBegynner', () => {
    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
        component = shallow(<FoerDuBegynnerSkjema handleSubmit={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
    });

    it('Skal inneholde en AvbrytSoknadContainer', () => {
        expect(component.contains(<AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />)).to.equal(true);
    });
});

describe('TidligSoknad', () => {
    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
    });

    it('Skal inneholde en TidligSoknad', () => {
        sykepengesoknad.status = 'NY';
        sykepengesoknad.tom = new Date().setDate(new Date().getDate() + 1);
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.equal(true);
    });

    it('Skal ikke inneholde en TidligSoknad - Ikke tidlig', () => {
        sykepengesoknad.status = 'NY';
        sykepengesoknad.tom = new Date();
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.equal(false);
    });

    it('Skal ikke inneholde en TidligSoknad - Ikke NY søknad', () => {
        sykepengesoknad.status = 'SENDT';
        sykepengesoknad.tom = new Date().setDate(new Date().getDate() + 1);
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.equal(false);
    });
});

describe('ForsteSoknad', () => {
    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
    });

    it('Skal inneholde en ForsteSoknad hvis erForsteSoknad === true', () => {
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} erForsteSoknad />);
        expect(component.contains(<ForsteSoknad />)).to.equal(true);
    });

    it('Skal ikke inneholde en ForsteSoknad hvis erForsteSoknad === false', () => {
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} erForsteSoknad={false} />);
        expect(component.contains(<ForsteSoknad />)).to.equal(false);
    });
});
