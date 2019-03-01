import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { reducer as formReducer } from 'redux-form';
import SoknadSide, { Container, mapStateToProps } from './SoknadSide';
import AppSpinner from '../../components/AppSpinner';
import sykepengesoknader from '../../reducers/sykepengesoknader';
import soknader from '../data/soknader/soknader';
import dineSykmeldinger from '../../sykmeldinger/data/dine-sykmeldinger/dineSykmeldinger';
import SendtSoknadSelvstendig from '../soknad-selvstendig-frilanser/SendtSoknadSelvstendig';
import FoerDuBegynnerContainer from '../soknad-selvstendig-frilanser/for-du-begynner/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../soknad-selvstendig-frilanser/fravar-og-friskmelding/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer
    from '../soknad-selvstendig-frilanser/aktiviteter-i-sykmeldingsperioden/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../soknad-selvstendig-frilanser/oppsummering/OppsummeringContainer';
import mountWithStore from '../../../test/mountWithStore';
import { getNySoknadSelvstendig, getSendtSoknadSelvstendig } from '../../../test/mock/mockSoknadSelvstendig';
import reduxFormMeta from '../../reducers/reduxFormMeta';
import mockNySoknadArbeidstaker from '../../../test/mock/mockNySoknadArbeidstaker';
import { SykepengeskjemaForSelvstendige } from '../soknad-selvstendig-frilanser/SoknadSelvstendigNaeringsdrivende';
import NySoknadArbeidstaker from '../soknad-arbeidstaker/NySoknadArbeidstaker';
import NyFoerDuBegynnerArbeidstakerContainer from '../soknad-arbeidstaker/for-du-begynner/NyFoerDuBegynnerArbeidstakerContainer';
import NyFravaerOgFriskmeldingArbeidstakerContainer from '../soknad-arbeidstaker/fravar-og-friskmelding/NyFravaerOgFriskmeldingArbeidstakerContainer';
import SoknadKvitteringSjekker from '../felleskomponenter/SoknadKvitteringSjekker';
import soknadMeta from '../data/soknadMeta/soknadMeta';

chai.use(chaiEnzyme());

const expect = chai.expect;

describe('SoknadSideTest', () => {
    let state;
    let ownProps;
    let actions;
    let hentSykepengesoknader;
    let hentSoknader;
    let hentDineSykmeldinger;
    let opprettSoknadUtland;
    let initialize;

    beforeEach(() => {
        state = {};

        state.sykepengesoknader = sykepengesoknader();

        state.ledetekster = {};

        state.soknader = soknader();

        state.dineSykmeldinger = dineSykmeldinger();

        ownProps = {
            params: {
                sykepengesoknadId: 'soknadPt-id',
            },
            location: {
                pathname: '/',
            },
        };

        hentSykepengesoknader = sinon.spy();
        hentSoknader = sinon.spy();
        hentDineSykmeldinger = sinon.spy();
        opprettSoknadUtland = sinon.spy();
        initialize = sinon.spy();

        actions = {
            hentSykepengesoknader,
            hentSoknader,
            hentDineSykmeldinger,
            opprettSoknadUtland,
            initialize,
        };
    });

    describe('Henting av data', () => {
        it('Skal hente søknader hvis søknader ikke er hentet', () => {
            state.soknader = {
                ...state.soknader,
                hentet: false,
            };
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSoknader.called).to.equal(true);
        });

        it('Skal hente søknader hvis søknader er hentet', () => {
            state.soknader = {
                ...state.soknader,
                hentet: true,
            };
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSoknader.called).to.equal(true);
        });

        it('Skal hente sykepengesøknader', () => {
            state.soknader = {
                ...state.soknader,
                hentet: false,
                henter: false,
            };
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(true);
        });

        it('Skal hente søknad hvis det eksisterer en søknad', () => {
            state.soknader = {
                ...state.soknader,
                data: [{
                    id: 'soknadPt-id',
                }],
                henter: false,
            };
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSoknader.called).to.equal(true);
        });
    });

    describe('Visning', () => {
        beforeEach(() => {
            const hentetOk = {
                hentet: true,
                hentingFeilet: false,
            };
            state.dineSykmeldinger = {
                ...state.dineSykmeldinger,
                ...hentetOk,
            };
            state.soknader = {
                ...state.soknader,
                ...hentetOk,
            };
            state.sykepengesoknader = {
                ...state.sykepengesoknader,
                ...hentetOk,
            };
        });

        it('Skal vise spinner dersom det hentes søknader', () => {
            state.soknader.henter = true;
            const component = mountWithStore(<SoknadSide {...ownProps} />, state);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise spinner dersom det hentes sykepengesoknader', () => {
            state.sykepengesoknader.henter = true;
            const component = mountWithStore(<SoknadSide {...ownProps} />, state);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        describe('SoknadSelvstendigNaeringsdrivende', () => {
            describe('Når søknad er sendt', () => {
                beforeEach(() => {
                    state.soknader.data = [getSendtSoknadSelvstendig({
                        id: 'soknadPt-id',
                    })];
                });

                it('Skal vise kvittering dersom man står på kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/kvittering';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SoknadKvitteringSjekker)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på noe annet enn kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/olsen';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });
            });

            describe('Når søknad er NY', () => {
                beforeEach(() => {
                    state.soknader.data = [getNySoknadSelvstendig({
                        id: 'soknadPt-id',
                    })];
                    state.reduxFormMeta = reduxFormMeta();
                    state.form = formReducer();
                    state.soknadMeta = soknadMeta();
                });

                it('Skal vise FoerDuBegynnerContainer dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(FoerDuBegynnerContainer)).to.have.length(1);
                });

                it('Skal vise FravaerOgFriskmeldingContainer hvis man står på side 2', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/fravaer-og-friskmelding/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(component.find(FravaerOgFriskmeldingContainer)).to.have.length(1);
                });

                it('Skal vise AktiviteterISykmeldingsperiodenContainer hvis man står på side 3', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/aktiviteter-i-sykmeldingsperioden/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(component.find(AktiviteterISykmeldingsperiodenContainer)).to.have.length(1);
                });

                it('Skal vise oppsummering hvis man står på side 4', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/oppsummering/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(component.find(OppsummeringContainer)).to.have.length(1);
                });
            });
        });

        describe('Ny søknad for arbeidstakere', () => {
            describe('Når søknad er NY', () => {
                beforeEach(() => {
                    state.soknader.data = [mockNySoknadArbeidstaker({
                        id: 'soknadPt-id',
                    })];
                    state.reduxFormMeta = reduxFormMeta();
                    state.soknadMeta = soknadMeta();
                    state.form = formReducer();
                });

                it('Skal vise NySoknadArbeidstaker og NyFoerDuBegynnerArbeidstakerContainer på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(NySoknadArbeidstaker)).to.have.length(1);
                    expect(component.find(NyFoerDuBegynnerArbeidstakerContainer)).to.have.length(1);
                });

                it('Skal vise NySoknadArbeidstaker og NyFravaerOgFriskmeldingArbeidstakerContainer på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknadPt-id/fravaer-og-friskmelding/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(NySoknadArbeidstaker)).to.have.length(1);
                    expect(component.find(NyFravaerOgFriskmeldingArbeidstakerContainer)).to.have.length(1);
                });
            });
        });
    });
});

