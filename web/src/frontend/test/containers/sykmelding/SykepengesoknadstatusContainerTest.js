import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import getSykmelding from "../../mockSykmeldinger";
import { getSoknad } from '../../mockSoknader';

import { Container, mapStateToProps } from '../../../js/containers/sykmelding/SykepengesoknadstatusContainer';
import Sykepengesoknadstatus, { FlereSoknader, UtgaattSoknadBekreftelse, PapirsoknadMelding, SokOmSykepengerNaa, KommendeSoknad, SoknadSendtBekreftelse, SoknadAvbruttBekreftelse } from '../../../js/components/sykmelding/Sykepengesoknadstatus';
import AppSpinner from '../../../js/components/AppSpinner';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("SykepengesoknadstatusContainer", () => {

    let state;

    let sykmelding1;
    let sykmelding2;

    let sykepengesoknad1;
    let sykepengesoknad2;

    let hentSykepengesoknader;
    let actions;
    let ownProps;

    beforeEach(() => {

        sykmelding1 = getSykmelding({
            id: "1",
        });

        sykmelding2 = getSykmelding({
            id: "2"
        });

        sykepengesoknad1 = getSoknad({
            sykmeldingId: "1",
        });

        sykepengesoknad1 = getSoknad({
            sykmeldingId: "2",
        }); 

        state = {
            sykepengesoknader: {
                data: [],
                henter: false,
                hentet: false,
            },

            sykmeldinger: {
                data: [],
                henter: false,
                hentet: false,
            }
        };

        hentSykepengesoknader = sinon.spy();

        actions = { hentSykepengesoknader };

        ownProps = { 
            sykmeldingId: "1",
        };

    });

    it("Skal hente sykepengesoknader dersom de ikke er hentet", () => {
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />);
        expect(hentSykepengesoknader.called).to.be.true;
    });

    it("Skal ikke hente sykepengesoknader dersom de allerede er hentet", () => {
        state.sykepengesoknader.hentet = true;
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />);
        expect(hentSykepengesoknader.called).to.be.false;
    });

    it("Skal ikke hente sykepengesoknader dersom de hentes", () => {
        state.sykepengesoknader.henter = true;
        const props = mapStateToProps(state, ownProps);
        const component = shallow(<Container {...props} {...actions} />);
        expect(hentSykepengesoknader.called).to.be.false;
    });

    describe("Visning av spinner", () => {
        it("Skal vise AppSpinner dersom sykepengesoknader hentes", () => {
            state.sykepengesoknader.henter = true;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise AppSpinner dersom sykepengesoknader ikke er hentet", () => {
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });
    });

    describe("Når sykepengesoknader er hentet", () => {

        beforeEach(() => {
            state.sykepengesoknader = {
                data: [],
                henter: false,
                hentet: true,
            }
        });

        it("Skal vise PapirsoknadMelding hvis det ikke finnes søknad til den aktuelle sykmeldingen", () => {
            state.sykepengesoknader.data = [];
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(PapirsoknadMelding)).to.have.length(1);
        });

        it("Skal vise SokOmSykepengerNaa hvis det finnes søknad som kan søkes på nå", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "NY",
                sykmeldingId: "1",
                id: "min-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(SokOmSykepengerNaa)).to.have.length(1);
        });

        it("Skal vise FlereSoknader hvis det finnes søknad som kan søkes på nå og en fremtidig søknad", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "NY",
                sykmeldingId: "1",
                id: "min-soknad-id",
            }), getSoknad({
                status: "FREMTIDIG",
                sykmeldingId: "1",
                id: "min-fremtidige-soknad-id",
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(FlereSoknader)).to.have.length(1);
        });

        it("Skal vise SoknadSendtBekreftelse hvis tilknyttet søknad er sendt inn", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "SENDT",
                sykmeldingId: "1",
                id: "min-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(SoknadSendtBekreftelse)).to.have.length(1);
        });

        it("Skal vise KommendeSoknad hvis tilknyttet søknad er planlagt", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "FREMTIDIG",
                sykmeldingId: "1",
                id: "min-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(KommendeSoknad)).to.have.length(1);
        });

        it("Skal vise FlereSoknader hvis det finnes både en planlagt søknad og en sendt søknad tilknyttet denne sykmeldingen", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "FREMTIDIG",
                sykmeldingId: "1",
                id: "min-soknad-id"
            }), getSoknad({
                status: "SENDT",
                sykmeldingId: "1",
                id: "min-nye-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(FlereSoknader)).to.have.length(1);
        });

        it("Skal vise SoknadAvbruttBekreftelse dersom en søknad er avbrutt", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "AVBRUTT",
                sykmeldingId: "1",
                id: "min-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(SoknadAvbruttBekreftelse)).to.have.length(1);
        });

        it("Skal vise UtgaattSoknadBekreftelse dersom en søknad er utgått", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "UTGAATT",
                sykmeldingId: "1",
                id: "min-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(UtgaattSoknadBekreftelse)).to.have.length(1);
        });

        it("Skal vise FlereSoknader dersom en søknad er avbrutt - selv om det også finnes en sendt søknad", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "AVBRUTT",
                sykmeldingId: "1",
                id: "min-soknad-id"
            }), getSoknad({
                status: "SENDT",
                sykmeldingId: "1",
                id: "min-nye-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(FlereSoknader)).to.have.length(1);
        });

        it("Skal ikke vise KommendeSoknad hvis den nye søknaden korrigerer en annen", () => {
            state.sykepengesoknader.data = [getSoknad({
                status: "NY",
                sykmeldingId: "1",
                id: "min-nye-soknad-id",
                korrigerer: "123"
            }), getSoknad({
                status: "SENDT",
                sykmeldingId: "1",
                id: "min-nye-soknad-id"
            })]
            const props = mapStateToProps(state, ownProps);
            const component = mount(<Container {...props} {...actions} />);
            expect(component.find(KommendeSoknad)).to.have.length(0);
            expect(component.find(KommendeSoknad)).to.have.length(0);
            expect(component.find(SoknadSendtBekreftelse)).to.have.length(1);
        });


    })


})