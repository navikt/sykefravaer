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
            });
            expect(res.sykepengesoknader).to.deep.equal([
                { id: 1 },
            ]);
            expect(res.soknaderHentet).to.equal(true);
        });

        it('skal returnere soknaderHentet når søknader ikke er hente', () => {
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
                    hentet: false,
                },
            });
            expect(res.soknaderHentet).to.equal(false);
        });
    });

    describe('SoknaderSide', () => {
        let dispatch;
        let actions;
        let hentSykepengesoknader;

        beforeEach(() => {
            dispatch = sinon.spy();
            hentSykepengesoknader = sinon.spy();
            actions = { hentSykepengesoknader };
        });

        it('Skal vise feilmelding om henting feilet', () => {
            const component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it('Skal vise spinner om vi venter på data', () => {
            const component = shallow(<SoknaderSide actions={actions} soknader={[]} henter hentingFeilet={false} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise Soknaderside', () => {
            const component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(1);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it('Skal hente søknader hvis søknader ikke er hentet', () => {
            shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(hentSykepengesoknader.called).to.equal(true);
        });

        it('Skal ikke hente søknader hvis søknader er hentet', () => {
            shallow(<SoknaderSide soknaderHentet actions={actions} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(hentSykepengesoknader.called).to.equal(false);
        });
    });
});
