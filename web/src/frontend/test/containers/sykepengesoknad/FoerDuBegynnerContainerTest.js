import chai from 'chai';
import React from 'react'
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import FoerDuBegynner from '../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import { FoerDuBegynnerContainer, Controller } from '../../../js/containers/sykepengesoknad/FoerDuBegynnerContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';
import SendtSoknad from '../../../js/components/sykepengesoknad/SendtSoknad';
import Feilmelding from '../../../js/components/Feilmelding';

import { getSoknad } from '../../mockSoknader';

describe("FoerDuBegynnerContainer", () => {

    let component;
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);

    beforeEach(() => {
        component = shallow(<FoerDuBegynnerContainer />);
    });

    it("Skal inneholde en Controller med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(Controller);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

    it("Skal vise planlagt vedlikehold ved vedlikehold", () => {
        const sykepengesoknad = getSoknad({
            status: 'SENDT',
        });
        const comp = shallow(<Controller sykepengesoknad={sykepengesoknad} vedlikehold={{ datospennMedTid: { fom: 'a', tom: 'b'} }} />);
        expect(comp.find(Feilmelding)).to.have.length(1);
    });

    it("Skal vise en SendtSoknad hvis sykepengesoknad.status === 'SENDT'", () => {
        const sykepengesoknad = getSoknad({
            status: 'SENDT',
        });
        const component = shallow(<Controller sykepengesoknad={sykepengesoknad} vedlikehold={{datospennMedTid: null}} />);
        expect(component.find(SendtSoknad)).to.have.length(1);
        expect(component.find(FoerDuBegynner)).to.have.length(0);
    });

    it("Skal vise en FoerDuBegynner hvis sykepengesoknad.status === 'NY'", () => {
        const sykepengesoknad = getSoknad({
            status: 'NY'
        });
        const component = shallow(<Controller sykepengesoknad={sykepengesoknad} vedlikehold={{datospennMedTid: null}} />);
        expect(component.find(FoerDuBegynner)).to.have.length(1);
        expect(component.find(SendtSoknad)).to.have.length(0);
    });

    it("Skal hente berikelse", () => {
        const berikelse = sinon.spy();

        getState = {
            vedlikehold: {
                data: {}
            },
            sykepengesoknader: {
                data: [getSoknad()],
                henter: false,
            },
            ledetekster: {
                henter: false,
            },
            brukerinfo: {
                bruker: {
                    hentingFeilet: false,
                },
                innlogging: {}
            }

        };

        store = mockStore(getState);

        mount(<Provider store={store}><FoerDuBegynnerContainer hentBerikelse={berikelse} brodsmuler={[]} henter={false} params={{sykepengesoknadId: 'id'}} sykepengesoknadId={'id'} vedlikehold={{datospennMedTid: null}} /></Provider>);
        expect(berikelse.calledOnce).to.be.true;
    });
});