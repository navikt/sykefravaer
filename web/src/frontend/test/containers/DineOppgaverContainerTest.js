import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';
import { Link } from 'react-router';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, mapStateToProps, DineOppgaver } from "../../js/containers/DineOppgaverContainer";
import { getMote, moteBekreftet, moteAvbrutt, moteIkkeBesvart, moteBesvartAlleAlternativer, moteBesvartMedNyeAlternativerBesvart, moteBesvartMedNyeAlternativerIkkeBesvart } from '../mockMote';

describe("DineOppgaverContainer", () => {

    describe("mapStateToProps", () => {

        let state;
        let clock;

        beforeEach(() => {
            clock = sinon.useFakeTimers(1485524800000); // in a distant future in a galaxy far, far away
            state = {
                dineSykmeldinger: {
                    data: [{
                        status: "NY",
                        id: "1"
                    }, {
                        status: "SENDT",
                        id: "2"
                    }],
                    hentet: true,
                },
                sykepengesoknader: {
                    data: [{
                        status: "NY",
                        id: "3"
                    }, {
                        status: "SENDT",
                        id: "4"
                    }]
                }, 
                mote: {
                    data: null
                }
            };
        }); 

        afterEach(() => {
            clock.restore();
        })

        it("Skal returnere NYE sykmeldinger", () => {
            const res = mapStateToProps(state);
            expect(res.sykmeldinger).to.deep.equal([{
                status: "NY",
                id: "1"
            }])
        });

        it("Skal returnere sykmeldingerHentet", () => {
            const res = mapStateToProps(state);
            expect(res.sykmeldingerHentet).to.be.true;
        });

        it("Skal returnere sykmeldingerHentet", () => {
            state.dineSykmeldinger.hentet = false;
            const res = mapStateToProps(state);
            expect(res.sykmeldingerHentet).to.be.false;
        });

        it("Skal returnere NYE sykepengesoknader", () => {
            const res = mapStateToProps(state);
            expect(res.sykepengesoknader).to.deep.equal([{
                status: "NY",
                id: "3"
            }])
        });

        it("Skal returnere visOppgaver === true hvis det finnes oppgaver", () => {
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.be.true;
        });

        it("Skal returnere visOppgaver === false hvis det ikke finnes oppgaver", () => {
            state.dineSykmeldinger.data = [];
            state.sykepengesoknader.data = [];
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.be.false;
        });

        it("Skal returnere visOppgaver === true hvis det finnes møte, men ingen sykmeldinger/sykepengesoknader", () => {
            state.dineSykmeldinger.data = [];
            state.sykepengesoknader.data = [];
            state.mote.data = moteIkkeBesvart;
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.be.true;
        });

        describe("Møte", () => {

            beforeEach(() => {
                state.dineSykmeldinger.data = [];
                state.sykepengesoknader.data = [];
            });

            it("Skal returnere mote: null hvis møte ikke finnes", () => {
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: null hvis møtet er bekreftet", () => {
                state.mote.data = moteBekreftet;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: null hvis møte er avbrutt", () => {
                state.mote.data = moteAvbrutt;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: 'TRENGER_SVAR' hvis møte ikke er besvart", () => {
                state.mote.data = moteIkkeBesvart;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal('TRENGER_SVAR');
                expect(res.visOppgaver).to.equal(true);
            });

            it("Skal returnere mote: null hvis møte er besvart", () => {
                state.mote.data = moteBesvartAlleAlternativer;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: null hvis møte er besvart med nye alternativer besvart", () => {
                state.mote.data = moteBesvartMedNyeAlternativerBesvart;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: 'TRENGER_SVAR' hvis møte er besvart med nye alternativer IKKE besvart", () => {
                state.mote.data = moteBesvartMedNyeAlternativerIkkeBesvart;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal('TRENGER_SVAR');
                expect(res.visOppgaver).to.equal(true);
            });

        });

    });

    describe("DineOppgaver", () => {

        let component; 

        beforeEach(() => {
            setLedetekster({
                'dine-oppgaver.tittel': 'Oppgaver som venter på deg',
                'dine-oppgaver.sykepengesoknader.en-soknad': "Du har 1 ny søknad",
                'dine-oppgaver.sykepengesoknader.flere-soknader': "Du har %ANTALL% nye søknader",
                'dine-oppgaver.sykmeldinger.en-sykmelding': "Du har 1 ny sykmelding",
                'dine-oppgaver.sykmeldinger.flere-sykmeldinger': "Du har %ANTALL% nye sykmeldinger",
                'dine-oppgaver.mote.svar': "Svar på NAVs spørsmål om dialogmøte",
            });
        });

        it("Skal vise null hvis visOppgaver === false", () => {
            let component = shallow(<DineOppgaver sykmeldingerHentet visOppgaver={false} />);
            expect(component.html()).to.be.null;
        });

        it("Skal vise null hvis visOppgaver === false", () => {
            let component = shallow(<DineOppgaver sykmeldingerHentet visOppgaver={false} />);
            expect(component.html()).to.be.null;
        });

        describe("Hvis du har oppgaver", () => {
            beforeEach(() => {
                component = shallow(<DineOppgaver sykmeldingerHentet visOppgaver={true} sykepengesoknader={[{id: "1"}]} sykmeldinger={[{}, {}]} />);
            });

            it("Skal vise tittel", () => {
                expect(component.find(".js-tittel")).to.contain("Oppgaver som venter på deg");
            });

            it("Skal vise en lenke til din sykepengesoknad hvis det er én søknad", () => {
                component = mount(<DineOppgaver sykmeldingerHentet visOppgaver={true} sykepengesoknader={[{id: "1"}]} sykmeldinger={[{}, {}]} />);
                expect(component.find(Link).at(1).prop("to")).to.equal("/sykefravaer/soknader/1");
                expect(component.find(Link).at(1).text()).to.equal("Du har 1 ny søknad");
            });

            it("Skal vise en lenke til dine sykepengesoknader hvis det er flere søknader", () => {
                component = mount(<DineOppgaver sykmeldingerHentet visOppgaver={true} sykepengesoknader={[{id: "1"}, {}]} sykmeldinger={[{}, {}]} />);
                expect(component.find(Link).at(1).prop("to")).to.equal("/sykefravaer/soknader");
                expect(component.find(Link).at(1).text()).to.equal("Du har 2 nye søknader");
            });

            it("Skal vise en lenke til din sykmelding hvis det er én søknad", () => {
                component = mount(<DineOppgaver sykmeldingerHentet visOppgaver={true} sykepengesoknader={[{id: "1"}]} sykmeldinger={[{id: 1}]} />);
                expect(component.find(Link).at(0).prop("to")).to.equal("/sykefravaer/sykmeldinger/1");
                expect(component.find(Link).at(0).text()).to.equal("Du har 1 ny sykmelding");
            });

            it("Skal vise en lenke til dine sykmeldinger hvis det er flere sykmeldinger", () => {
                component = mount(<DineOppgaver sykmeldingerHentet visOppgaver={true} sykepengesoknader={[{id: "1"}, {}]} sykmeldinger={[{}, {}]} />);
                expect(component.find(Link).at(0).prop("to")).to.equal("/sykefravaer/sykmeldinger");
                expect(component.find(Link).at(0).text()).to.equal("Du har 2 nye sykmeldinger");
            });

            it("Skal vise en lenke til møte hvis møte = TRENGER_SVAR", () => {
                component = mount(<DineOppgaver sykmeldingerHentet visOppgaver={true} mote="TRENGER_SVAR" />);
                expect(component.find(Link).at(0).prop("to")).to.equal("/sykefravaer/dialogmote");
                expect(component.find(Link).at(0).text()).to.equal("Svar på NAVs spørsmål om dialogmøte");
            });

        });

    }); 

});
