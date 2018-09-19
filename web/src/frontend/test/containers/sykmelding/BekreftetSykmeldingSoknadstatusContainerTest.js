import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { getSoknad } from '../../mockSoknader';
import { Container, mapStateToProps } from '../../../js/containers/sykmelding/BekreftetSykmeldingSoknadstatusContainer';
import getSykmelding from '../../mockSykmeldinger';
import { NY } from '../../../js/enums/soknadstatuser';
import {
    FlereSoknader,
    KommendeSoknad,
    PapirsoknadMelding,
    SoknadAvbruttBekreftelse,
    SoknadSendtBekreftelse,
    SokOmSykepengerNaa, UtgaattSoknadBekreftelse,
} from '../../../js/components/sykmelding/SykmeldingSoknadstatus';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('BekreftetSykmeldingSoknadstatusContainer', () => {
    let state;

    let hentSoknader;
    let actions;
    let ownProps;

    beforeEach(() => {
        state = {
            sykmeldinger: {
                data: [],
                henter: false,
                hentet: false,
            },

            soknader: {
                data: [],
                henter: false,
                hentet: false,
            },
        };

        hentSoknader = sinon.spy();

        actions = { hentSoknader };

        ownProps = {
            sykmelding: getSykmelding({
                id: '1',
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'FRILANSER',
            }),
        };
    });

    it('Skal hente soknader dersom de ikke er hentet', () => {
        const props = mapStateToProps(state, ownProps);
        shallow(<Container {...props} {...actions} />);
        expect(hentSoknader.called).to.equal(true);
    });

    it('Skal ikke hente soknader dersom de allerede er hentet', () => {
        state.soknader.hentet = true;
        const props = mapStateToProps(state, ownProps);
        shallow(<Container {...props} {...actions} />);
        expect(hentSoknader.called).to.equal(false);
    });

    it('Skal ikke hente soknader dersom de hentes', () => {
        state.soknader.henter = true;
        const props = mapStateToProps(state, ownProps);
        shallow(<Container {...props} {...actions} />);
        expect(hentSoknader.called).to.equal(false);
    });

    describe('Når søknader er hentet', () => {
        beforeEach(() => {
            state.soknader = {
                data: [],
                henter: false,
                hentet: true,
            };
            state.sykmeldinger = {
                data: [
                    getSykmelding({
                        id: '1',
                        valgtArbeidssituasjon: 'FRILANSER',
                        status: 'BEKREFTET',
                    }),
                ],
            };
        });

        it('Skal vise ingenting dersom det ikke finnes en tilknyttet søknad', () => {
            state.soknader.data = [];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.html()).to.equal(null);
        });

        it('Skal vise KommendeSoknad hvis tilknyttet søknad er planlagt', () => {
            state.soknader.data = [getSoknad({
                status: 'FREMTIDIG',
                sykmeldingId: '1',
                id: 'min-soknad-id',
            })];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(KommendeSoknad)).to.have.length(1);
        });

        it('Skal vise SokOmSykepengerNaa hvis det finnes søknad som kan søkes på nå', () => {
            state.soknader.data = [getSoknad({
                status: NY,
                sykmeldingId: '1',
                id: 'min-soknad-id',
            })];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(SokOmSykepengerNaa)).to.have.length(1);
        });

        it('Skal vise FlereSoknader hvis det finnes både en planlagt søknad og en sendt søknad tilknyttet denne sykmeldingen', () => {
            state.soknader.data = [getSoknad({
                status: 'FREMTIDIG',
                sykmeldingId: '1',
                id: 'min-soknad-id',
            }), getSoknad({
                status: 'SENDT',
                sykmeldingId: '1',
                id: 'min-nye-soknad-id',
            })];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(FlereSoknader)).to.have.length(1);
        });

        it('Skal vise SoknadSendtBekreftelse hvis tilknyttet søknad er sendt inn', () => {
            state.soknader.data = [getSoknad({
                status: 'SENDT',
                sykmeldingId: '1',
                id: 'min-soknad-id',
            })];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(SoknadSendtBekreftelse)).to.have.length(1);
        });

        it('Skal vise UtgaattSoknadBekreftelse dersom en søknad er utgått', () => {
            state.soknader.data = [getSoknad({
                status: 'UTGAATT',
                sykmeldingId: '1',
                id: 'min-soknad-id',
            })];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(UtgaattSoknadBekreftelse)).to.have.length(1);
        });

        it('Skal vise SoknadAvbruttBekreftelse dersom en søknad er avbrutt', () => {
            state.soknader.data = [getSoknad({
                status: 'AVBRUTT',
                sykmeldingId: '1',
                id: 'min-soknad-id',
            })];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(SoknadAvbruttBekreftelse)).to.have.length(1);
        });
    });

    describe('Når sykmeldingen har arbeidssituasjon ANNET', () => {
        beforeEach(() => {
            state.soknader = {
                data: [],
                henter: false,
                hentet: true,
            };
            ownProps.sykmelding = getSykmelding({
                id: '1',
                valgtArbeidssituasjon: 'ANNET',
                status: 'BEKREFTET',
            });
        });

        it('Skal IKKE hente soknader dersom de ikke er hentet', () => {
            state.soknader.hentet = false;
            state.soknader.henter = false;
            const props = mapStateToProps(state, ownProps);
            shallow(<Container {...props} {...actions} />);
            expect(hentSoknader.called).to.equal(false);
        });

        it('Skal vise PapirsoknadMelding', () => {
            state.soknader.data = [];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(PapirsoknadMelding)).to.have.length(1);
        });
    });
});
