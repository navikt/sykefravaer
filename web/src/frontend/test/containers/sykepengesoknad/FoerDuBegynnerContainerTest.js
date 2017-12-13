import React from 'react';
import chai from 'chai';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { mapStateToProps, Container } from '../../../js/containers/sykepengesoknad/FoerDuBegynnerContainer';
import { SYKEPENGER_SKJEMANAVN } from '../../../js/components/sykepengesoknad/setup';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

describe("FoerDuBegynnerContainer", () => {

    let state;
    let ownProps;
    let destroy;
    let hentBerikelse;
    let actions;

    beforeEach(() => {
        destroy = sinon.spy();
        hentBerikelse = sinon.spy();
        actions = { destroy, hentBerikelse };
        state = {
            vedlikehold: {
                data: {}
            },
            sykepengesoknader: {}
        };
        ownProps = {
            params: {
                sykepengesoknadId: "123"
            }
        }
    })

    it("Skal ikke kalle på destroy dersom bruker ikke har vært på en søknad før", () => {
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />)
        expect(destroy.called).to.be.false;
    });

    it("Skal ikke kalle på destroy dersom bruker har vært på denne søknaden før", () => {
        state.form = {};
        state.form[SYKEPENGER_SKJEMANAVN] = {
            values: {
                id: "123"
            }
        };
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />)
        expect(destroy.called).to.be.false;
    });

    it("Skal kalle på destroy dersom bruker har vært på en annen søknad før", () => {
        state.form = {};
        state.form[SYKEPENGER_SKJEMANAVN] = {
            values: {
                id: "456"
            }
        };
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />)
        expect(destroy.called).to.be.true;
    });

    it("Skal hente berikelse", () => {
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />)
        expect(hentBerikelse.called).to.be.true;
    });

});