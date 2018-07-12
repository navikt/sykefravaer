import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {
    mapStateToProps,
    Container,
    SykepengesoknadSelvstendigNaeringsdrivende,
    SykepengeskjemaForSelvstendige,
} from '../../../js/containers/sykepengesoknad-felles/SykepengesoknadContainer';
import { SYKEPENGER_SKJEMANAVN } from '../../../js/enums/skjemanavn';
import AppSpinner from '../../../js/components/AppSpinner';
import { NY, SENDT, TIL_SENDING } from '../../../js/enums/soknadstatuser';
import SykepengesoknadSelvstendigKvitteringContainer from '../../../js/containers/sykepengesoknad-selvstendig/SykepengesoknadSelvstendigKvitteringContainer';
import sykepengesoknader from '../../../js/reducers/sykepengesoknader';
import soknader from '../../../js/reducers/soknader';
import dineSykmeldinger from '../../../js/reducers/dineSykmeldinger';
import SendtSoknadSelvstendig from '../../../js/components/sykepengesoknad-selvstendig/SendtSoknadSelvstendig';
import FoerDuBegynnerContainer from '../../../js/containers/sykepengesoknad-selvstendig/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../../../js/containers/sykepengesoknad-selvstendig/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../../../js/containers/sykepengesoknad-selvstendig/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../../../js/containers/sykepengesoknad-selvstendig/OppsummeringContainer';

chai.use(chaiEnzyme());

const expect = chai.expect;

describe('SykepengesoknadContainerTest', () => {
    let state;
    let ownProps;
    let actions;
    let hentSykepengesoknader;
    let hentSoknader;
    let hentDineSykmeldinger;
    let opprettSoknadUtland;
    let initialize;
    let destroy;

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
        destroy = sinon.spy();

        actions = {
            hentSykepengesoknader,
            hentSoknader,
            hentDineSykmeldinger,
            opprettSoknadUtland,
            initialize,
            destroy,
        };
    });

    it('Skal kalle på destroy dersom bruker har vært på en annen søknad før', () => {
        state.form = {};
        state.form[SYKEPENGER_SKJEMANAVN] = {
            values: {
                id: '456',
            },
        };
        const props = mapStateToProps(state, ownProps);
        shallow(<Container {...props} actions={actions} />);
        expect(destroy.called).to.equal(true);
    });

    describe('Henting av data', () => {
        it('Skal hente søknader hvis søknader ikke er hentet', () => {
            state.soknader.hentet = false;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSoknader.called).to.equal(true);
        });

        it('Skal ikke hente søknader hvis søknader er hentet', () => {
            state.soknader.hentet = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSoknader.called).to.equal(false);
        });

        it('Skal ikke hente søknader hvis søknader hentes', () => {
            state.soknader.henter = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSoknader.called).to.equal(false);
        });

        it('Skal hente sykepengesøknader hvis sykepengesøknader ikke er hentet', () => {
            state.sykepengesoknader.hentet = false;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(true);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader er hentet', () => {
            state.sykepengesoknader.hentet = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(false);
        });

        it('Skal ikke hente sykepengesøknader hvis sykepengesøknader hentes', () => {
            state.sykepengesoknader.henter = true;
            shallow(<Container {...mapStateToProps(state, ownProps)} actions={actions} />);
            expect(hentSykepengesoknader.called).to.equal(false);
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
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} actions={actions} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise spinner dersom det hentes sykepengesoknader', () => {
            state.sykepengesoknader.henter = true;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} actions={actions} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        describe('SykepengesoknadSelvstendigNaeringsdrivende', () => {
            describe('Når søknad er sendt', () => {
                beforeEach(() => {
                    state.soknader.data = [{
                        id: 'soknad-id',
                        status: SENDT,
                    }];
                });

                it('Skal vise kvittering dersom man står på kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/kvittering';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    expect(component.find(SykepengesoknadSelvstendigKvitteringContainer)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på noe annet enn kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/olsen';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });
            });

            describe('Når søknad er TIL_SENDING', () => {
                beforeEach(() => {
                    state.soknader.data = [{
                        id: 'soknad-id',
                        status: TIL_SENDING,
                    }];
                });

                it('Skal vise kvittering dersom man står på kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/kvittering';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    expect(component.find(SykepengesoknadSelvstendigKvitteringContainer)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på noe annet enn kvitteringssiden', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/olsen';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });

                it('Skal vise Sendt søknad dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    expect(component.find(SendtSoknadSelvstendig)).to.have.length(1);
                });
            });

            describe('Når søknad er NY', () => {
                beforeEach(() => {
                    state.soknader.data = [{
                        id: 'soknad-id',
                        status: NY,
                    }];
                });

                it('Skal vise FoerDuBegynnerContainer dersom man står på side 1', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    const skjema = shallow(<SykepengeskjemaForSelvstendige {...props} />);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(skjema.find(FoerDuBegynnerContainer)).to.have.length(1);
                });

                it('Skal vise FravaerOgFriskmelding hvis man står på side 2', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/fravaer-og-friskmelding/';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    const skjema = shallow(<SykepengeskjemaForSelvstendige {...props} />);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(skjema.find(FravaerOgFriskmeldingContainer)).to.have.length(1);
                });

                it('Skal vise AktiviteterISykmeldingsperiodenContainer hvis man står på side 3', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/aktiviteter-i-sykmeldingsperioden/';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    const skjema = shallow(<SykepengeskjemaForSelvstendige {...props} />);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(skjema.find(AktiviteterISykmeldingsperiodenContainer)).to.have.length(1);
                });

                it('Skal vise Oppsummering hvis man står på side 4', () => {
                    ownProps.location.pathname = '/sykefravaer/soknader/soknad-id/oppsummering/';
                    const props = mapStateToProps(state, ownProps);
                    const component = shallow(<SykepengesoknadSelvstendigNaeringsdrivende {...props} />);
                    const skjema = shallow(<SykepengeskjemaForSelvstendige {...props} />);
                    expect(component.find(SykepengeskjemaForSelvstendige)).to.have.length(1);
                    expect(skjema.find(OppsummeringContainer)).to.have.length(1);
                });
            });
        });
    });
});

