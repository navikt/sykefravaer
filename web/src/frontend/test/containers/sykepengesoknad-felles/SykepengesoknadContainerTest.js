import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { mapStateToProps, Container } from '../../../js/containers/sykepengesoknad-felles/SykepengesoknadContainer';

chai.use(chaiEnzyme());

const expect = chai.expect;

describe('SykepengesoknadContainerTest', () => {
    let state;
    let ownProps;
    let actions;
    let hentSykepengesoknader;
    let hentSoknader;

    beforeEach(() => {
        state = {};

        state.sykepengesoknader = {
            data: [],
        };

        state.ledetekster = {
            data: {},
        };

        state.soknader = {
            data: [],
        };

        ownProps = {
            params: {
                sykepengesoknadId: 'soknad-id',
            },
            location: {
                pathname: '/',
            },
        };

        hentSykepengesoknader = sinon.spy();
        hentSoknader = sinon.spy();

        actions = {
            hentSykepengesoknader,
            hentSoknader,
        };
    });

    describe('Henting av data', () => {
        it('Skal hente søknader hvis søknader ikke er hentet', () => {
            state.soknader.hentet = false;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />)
            expect(hentSoknader.called).to.equal(true);
        });

        it('Skal ikke hente søknader hvis søknader er hentet', () => {
            state.soknader.hentet = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />)
            expect(hentSoknader.called).to.equal(false);
        });

        it('Skal ikke hente søknader hvis søknader hentes', () => {
            state.soknader.henter = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />)
            expect(hentSoknader.called).to.equal(false);
        });

        it('Skal hente sykepengesøknader hvis sykepengesøknader ikke er hentet', () => {
            state.sykepengesoknader.hentet = false;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />)
            expect(hentSykepengesoknader.called).to.equal(true);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader er hentet', () => {
            state.sykepengesoknader.hentet = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />)
            expect(hentSykepengesoknader.called).to.equal(false);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader hentes', () => {
            state.sykepengesoknader.henter = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />)
            expect(hentSykepengesoknader.called).to.equal(false);
        });
    });
});

