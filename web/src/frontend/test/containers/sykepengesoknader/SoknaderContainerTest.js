import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Feilmelding from '../../../js/components/Feilmelding';
import { SoknaderSide, mapStateToProps } from '../../../js/containers/sykepengesoknader/SoknaderContainer';
import Soknader from '../../../js/components/sykepengesoknader/Soknader';
import AppSpinner from '../../../js/components/AppSpinner';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SoknaderContainer', () => {
    describe('mapStateToProps', () => {
        it('skal returnere soknader', () => {
            const res = mapStateToProps({
                ledetekster: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                },
                sykepengesoknader: {
                    data: [{
                        id: 1,
                    }],
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                },
                soknader: {
                    data: [],
                },
            });
            expect(res.sykepengesoknader).to.deep.equal([
                { id: 1 },
            ]);
        });
    });

    describe('SoknaderSide', () => {
        let actions;
        let hentSykepengesoknader;
        let hentSoknader;
        let state;

        beforeEach(() => {
            state = {
                sykepengesoknader: {
                    data: [],
                    henter: false,
                    hentingFeilet: false,
                    hentet: false,
                },
                ledetekster: {

                },
                soknader: {
                    data: [],
                    henter: false,
                    hentingFeilet: false,
                    hentet: false,
                },
            }
            hentSykepengesoknader = sinon.spy();
            hentSoknader = sinon.spy();
            actions = { hentSykepengesoknader, hentSoknader };
        });

        it('Skal vise feilmelding om henting av sykepengesøknader feiler', () => {
            state.sykepengesoknader.hentingFeilet = true;
            const props = mapStateToProps(state);
            const component = shallow(<SoknaderSide {...props} actions={actions} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it('Skal vise feilmelding om henting av søknader feiler', () => {
            state.soknader.hentingFeilet = true;
            const props = mapStateToProps(state);
            const component = shallow(<SoknaderSide {...props} actions={actions} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it('Skal vise spinner om vi henter søknader', () => {
            state.soknader.henter = true;
            const props = mapStateToProps(state);
            const component = shallow(<SoknaderSide {...props} actions={actions} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise spinner om vi henter sykepengersøknader', () => {
            state.sykepengesoknader.henter = true;
            const props = mapStateToProps(state);
            const component = shallow(<SoknaderSide {...props} actions={actions} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise Soknaderside om alt er hentet', () => {
            state.sykepengesoknader.hentet = true;
            state.soknader.hentet = true;
            const props = mapStateToProps(state);
            const component = shallow(<SoknaderSide {...props} actions={actions} />);
            expect(component.find(Soknader)).to.have.length(1);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it('Skal hente sykepengesøknader hvis sykepengesøknader ikke er hentet', () => {
            const props = mapStateToProps(state);
            shallow(<SoknaderSide {...props} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(true);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader er hentet', () => {
            state.sykepengesoknader.hentet = true;
            const props = mapStateToProps(state);
            shallow(<SoknaderSide {...props} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(false);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader hentes', () => {
            state.sykepengesoknader.henter = true;
            const props = mapStateToProps(state);
            shallow(<SoknaderSide {...props} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(false);
        });

        it('Skal hente sykepengesøknader hvis sykepengesøknader ikke er hentet', () => {
            const props = mapStateToProps(state);
            shallow(<SoknaderSide {...props} actions={actions} />);
            expect(hentSoknader.called).to.equal(true);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader er hentet', () => {
            state.soknader.hentet = true;
            const props = mapStateToProps(state);
            shallow(<SoknaderSide {...props} actions={actions} />);
            expect(hentSoknader.called).to.equal(false);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader hentes', () => {
            state.soknader.henter = true;
            const props = mapStateToProps(state);
            shallow(<SoknaderSide {...props} actions={actions} />);
            expect(hentSoknader.called).to.equal(false);
        });
    });
});
