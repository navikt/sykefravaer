import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { reducer as formReducer } from 'redux-form';
import SoknadSide, { Container, mapStateToProps } from '../../js/sider/SoknadSide';
import AppSpinner from '../../js/components/AppSpinner';
import sykepengesoknader from '../../js/reducers/sykepengesoknader';
import soknader from '../../js/reducers/soknader';
import dineSykmeldinger from '../../js/reducers/dineSykmeldinger';
import SendtSoknadSelvstendig from '../../js/components/sykepengesoknad-selvstendig/SendtSoknadSelvstendig';
import FoerDuBegynnerContainer from '../../js/containers/sykepengesoknad-selvstendig/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../../js/containers/sykepengesoknad-selvstendig/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../../js/containers/sykepengesoknad-selvstendig/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../../js/containers/sykepengesoknad-selvstendig/OppsummeringContainer';
import mountWithStore from '../mountWithStore';
import { getNySoknadSelvstendig, getSendtSoknadSelvstendig } from '../mock/mockSoknadSelvstendig';
import reduxFormMeta from '../../js/reducers/reduxFormMeta';
import mockNySoknadArbeidstaker from '../mock/mockNySoknadArbeidstaker';
import { SykepengeskjemaForSelvstendige } from '../../js/components/sykepengesoknad-selvstendig/SoknadSelvstendigNaeringsdrivende';
import NySoknadArbeidstaker from '../../js/sykepengesoknad/arbeidtaker/NySoknadArbeidstaker';
import NyFoerDuBegynnerArbeidstakerContainer from '../../js/sykepengesoknad/arbeidtaker/for-du-begynner/NyFoerDuBegynnerArbeidstakerContainer';
import NyFravaerOgFriskmeldingArbeidstakerContainer from '../../js/sykepengesoknad/arbeidtaker/fravar-og-friskmelding/NyFravaerOgFriskmeldingArbeidstakerContainer';
import SoknadKvitteringSjekker from '../../js/components/soknad-felles/SoknadKvitteringSjekker';
import soknadMeta from '../../js/reducers/soknadMeta';

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
                sykepengesoknadId: 'soknad-id',
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
                    id: 'soknad-id',
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
                        id: 'soknad-id',
                    })];
                });

                it('Skal vise kvittering dersom man står på kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/kvittering';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SoknadKvitteringSjekker)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på noe annet enn kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/olsen';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });
            });

            describe('Når søknad er NY', () => {
                beforeEach(() => {
                    state.soknader.data = [getNySoknadSelvstendig({
                        id: 'soknad-id',
                    })];
                    state.reduxFormMeta = reduxFormMeta();
                    state.form = formReducer();
                    state.soknadMeta = soknadMeta();
                });

                it('Skal vise FoerDuBegynnerContainer dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(FoerDuBegynnerContainer)).to.have.length(1);
                });

                it('Skal vise FravaerOgFriskmelding hvis man står på side 2', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/fravaer-og-friskmelding/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(component.find(FravaerOgFriskmeldingContainer)).to.have.length(1);
                });

                it('Skal vise AktiviteterISykmeldingsperiodenContainer hvis man står på side 3', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/aktiviteter-i-sykmeldingsperioden/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(component.find(AktiviteterISykmeldingsperiodenContainer)).to.have.length(1);
                });

                it('Skal vise Oppsummering hvis man står på side 4', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/oppsummering/';
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
                        id: 'soknad-id',
                    })];
                    state.reduxFormMeta = reduxFormMeta();
                    state.soknadMeta = soknadMeta();
                    state.form = formReducer();
                });

                it('Skal vise NySoknadArbeidstaker og FoerDuBegynner på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(NySoknadArbeidstaker)).to.have.length(1);
                    expect(component.find(NyFoerDuBegynnerArbeidstakerContainer)).to.have.length(1);
                });

                it('Skal vise NySoknadArbeidstaker og FravaerOgFriskmelding på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/fravaer-og-friskmelding/';
                    const component = mountWithStore(<SoknadSide {...ownProps} />, state);
                    expect(component.find(NySoknadArbeidstaker)).to.have.length(1);
                    expect(component.find(NyFravaerOgFriskmeldingArbeidstakerContainer)).to.have.length(1);
                });
            });
        });
    });
});

