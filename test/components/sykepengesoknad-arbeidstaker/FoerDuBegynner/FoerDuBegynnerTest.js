import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import FoerDuBegynner, {
    FoerDuBegynnerSkjema,
} from '../../../../js/components/sykepengesoknad-arbeidstaker/FoerDuBegynner/FoerDuBegynner';
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad-arbeidstaker/AvbrytSoknadContainer';
import { getSoknad } from '../../../mock/mockSykepengesoknader';
import DetFinnesEldreSoknader from '../../../../js/components/sykepengesoknad-arbeidstaker/FoerDuBegynner/DetFinnesEldreSoknader';
import ForsteSoknadIntro from '../../../../js/components/sykepengesoknad-arbeidstaker/FoerDuBegynner/ForsteSoknadIntro';
import SoknadIntro from '../../../../js/components/sykepengesoknad-arbeidstaker/FoerDuBegynner/SoknadIntro';
import TidligSoknad from '../../../../js/components/sykepengesoknad-arbeidstaker/FoerDuBegynner/TidligSoknad';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('FoerDuBegynner', () => {
    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
        component = shallow(<FoerDuBegynnerSkjema
            utfyllingStartet={sinon.spy()}
            handleSubmit={sinon.spy()}
            sykepengesoknad={sykepengesoknad} />);
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
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.equal(true);
    });

    it('Skal ikke inneholde en TidligSoknad - Ikke tidlig', () => {
        sykepengesoknad.status = 'NY';
        sykepengesoknad.tom = new Date();
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.equal(false);
    });

    it('Skal ikke inneholde en TidligSoknad - Ikke NY søknad', () => {
        sykepengesoknad.status = 'SENDT';
        sykepengesoknad.tom = new Date().setDate(new Date().getDate() + 1);
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.equal(false);
    });
});

describe('ForsteSoknadIntro', () => {
    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
    });

    it('Skal inneholde en ForsteSoknadIntro hvis erForsteSoknad === true', () => {
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} erForsteSoknad />);
        expect(component.contains(<ForsteSoknadIntro />)).to.equal(true);
        expect(component.contains(<SoknadIntro />)).to.equal(false);
    });

    it('Skal inneholde en SoknadIntro hvis erForsteSoknad === false', () => {
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} erForsteSoknad={false} />);
        expect(component.contains(<ForsteSoknadIntro />)).to.equal(false);
        expect(component.contains(<SoknadIntro />)).to.equal(true);
    });
});

describe('DetFinnesEldreSoknader', () => {
    let component;
    let sykepengesoknad;

    beforeEach(() => {
        sykepengesoknad = getSoknad();
    });

    it('Skal inneholde en DetFinnesEldreSoknader hvis detFinnesEldreSoknader === true', () => {
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} detFinnesEldreSoknader />);
        expect(component.contains(<DetFinnesEldreSoknader />)).to.equal(true);
    });

    it('Skal ikke inneholde en DetFinnesEldreSoknader hvis detFinnesEldreSoknader === false', () => {
        component = shallow(<FoerDuBegynner utfyllingStartet={sinon.spy()} sykepengesoknad={sykepengesoknad} detFinnesEldreSoknader={false} />);
        expect(component.contains(<DetFinnesEldreSoknader />)).to.equal(false);
    });
});
