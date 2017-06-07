import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import OppsummeringContainer, { Oppsummering, Controller, ConnectedOppsummering, mapStateToProps } from '../../../js/containers/sykepengesoknad/OppsummeringContainer';
import GenerellSoknadContainer from '../../../js/containers/sykepengesoknad/GenerellSoknadContainer';
import OppsummeringSkjema from '../../../js/components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import Kvittering from '../../../js/components/sykepengesoknad/Kvittering';
import StartIgjen from '../../../js/components/sykepengesoknad/StartIgjen';
import { getSoknad } from '../../mockSoknader';
import * as mapping from '../../../js/components/sykepengesoknad/mapSkjemasoknadToBackendsoknad';

describe("OppsummeringContainer", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<OppsummeringContainer />);
    });

    it("Skal inneholde en GenerellSoknadContainer med riktige props", () => {
        expect(component.find(GenerellSoknadContainer)).to.have.length(1);
        expect(component.find(GenerellSoknadContainer).prop("Component")).to.deep.equal(Controller);
        expect(component.find(GenerellSoknadContainer).prop("Brodsmuler")).to.be.defined;
    });

    describe("Controller", () => {

        let skjemasoknad;

        beforeEach(() => {
            skjemasoknad = {}
        });

        it("Skal vise StartIgjen hvis skjemasoknad ikke finnes", () => {
            const containerComponent = shallow(<Controller sykepengesoknad={getSoknad({})} />)
            expect(containerComponent.find(StartIgjen)).to.have.length(1);
        })

        it("Skal vise Kvittering hvis søknad har status SENDT", () => {
            const sykepengesoknad = getSoknad({
                status: "SENDT",
            })
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad} skjemasoknad={skjemasoknad} />)
            expect(containerComponent.find(Kvittering)).to.have.length(1);
            expect(containerComponent.find(ConnectedOppsummering)).to.have.length(0);
        });

        it("Skal vise ConnectedOppsummering hvis søknad har status = NY", () => {
            const sykepengesoknad = getSoknad({
                status: "NY",
            });
            const containerComponent = shallow(<Controller sykepengesoknad={sykepengesoknad} skjemasoknad={skjemasoknad} />)
            expect(containerComponent.find(Kvittering)).to.have.length(0);
            expect(containerComponent.find(ConnectedOppsummering)).to.have.length(1);
        });

    });

    describe("mapStateToProps", () => {

        let state;
        let ownProps;
        let backendsoknad;
        let stub;

        beforeEach(() => {
            state = {
                formMeta: {

                },
                forskutteringssporsmal: {

                }
            };
            ownProps = {
                skjemasoknad: {"min": "soknad"}
            };
            backendsoknad = {"backendsoknad": "backendsoknad"};
            stub = sinon.stub(mapping, "default").returns(backendsoknad)
        });

        afterEach(() => {
            stub.restore();
        })

        it("Returnerer visForskutteringssporsmal når skalViseForskutteringsporsmal = false", () => {
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.false;
        }); 

        it("Returnerer skalViseForskutteringsporsmal når skalViseForskutteringsporsmal = true", () => {
            state.forskutteringssporsmal = {
                visSporsmal: true,
            }
            expect(mapStateToProps(state, ownProps).visForskutteringssporsmal).to.be.true;
        });

        it("Skal returnere backendsoknad", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.backendsoknad).to.deep.equal(backendsoknad);
        });

        it("Skal returnere henterForskutteringssporsmal når det ikke hentes", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.henterForskutteringssporsmal).to.be.false;
        });

        it("Skal returnere henterForskutteringssporsmal når det hentes", () => {
            state.forskutteringssporsmal.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henterForskutteringssporsmal).to.be.true;
        });

    });

    describe("Oppsummering", () => {

        let sjekkSkalViseForskutteringssporsmal;
        let backendsoknad;

        beforeEach(() => {
            sjekkSkalViseForskutteringssporsmal = sinon.spy();
            backendsoknad = {"backendsoknad": "backendsoknad"};
        });

        it("Skal kalle sjekkSkalViseForskutteringssporsmal", () => {
            const component = shallow(<Oppsummering
                sjekkSkalViseForskutteringssporsmal={sjekkSkalViseForskutteringssporsmal}
                backendsoknad={backendsoknad} />);
            expect(sjekkSkalViseForskutteringssporsmal.calledWith(backendsoknad)).to.be.true;
        });

        it("Skal rendre null hvis henterForskutteringssporsmal = true", () => {
            const component = shallow(<Oppsummering
                henterForskutteringssporsmal={true}
                sjekkSkalViseForskutteringssporsmal={sjekkSkalViseForskutteringssporsmal}
                backendsoknad={backendsoknad} />);
            expect(component.html()).to.be.null;
        });

        it("Skal rendre OppsummeringSkjema hvis henterForskutteringssporsmal = false", () => {
            const component = shallow(<Oppsummering
                henterForskutteringssporsmal={false}
                sjekkSkalViseForskutteringssporsmal={sjekkSkalViseForskutteringssporsmal}
                backendsoknad={backendsoknad} />);
            expect(component.find(OppsummeringSkjema)).to.have.length(1);
        });

    }); 



});