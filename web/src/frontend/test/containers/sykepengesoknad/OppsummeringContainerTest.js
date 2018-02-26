import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';
import { getSoknad } from '../../mockSoknader';
import { Oppsummering, navigeringsvarsel, mapStateToProps } from '../../../js/containers/sykepengesoknad/OppsummeringContainer';
import mapSkjemasoknadToBackendsoknad from '../../../js/components/sykepengesoknad/mappers/mapSkjemasoknadToBackendsoknad';
import mapBackendsoknadToSkjemasoknad from '../../../js/components/sykepengesoknad/mappers/mapBackendsoknadToSkjemasoknad';
import mapSkjemasoknadToOppsummeringsoknad from '../../../js/components/sykepengesoknad/mappers/mapSkjemasoknadToOppsummeringsoknad';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("OppsummeringContainer", () => {

    let props;
    let route;
    let router;
    let setRouteLeaveHook;
    let hentArbeidsgiverperiodeberegning;
    let hentLedere;
    let backendsoknad;
    let sykepengesoknad;
    const navigeringsvarsel = 'Nå er du på vei ut av døra – før du har sendt søknaden. Gå tilbake for å bekrefte og få den av gårde. Hvis det var det du hadde tenkt!';

    beforeEach(() => {
        setLedetekster({
            'sykepengesoknad.navigeringsvarsel': navigeringsvarsel
        })
        setRouteLeaveHook = sinon.spy();
        route = {

        }
        router = {
            setRouteLeaveHook,
        }

        hentArbeidsgiverperiodeberegning = sinon.spy();
        hentLedere = sinon.spy();
        backendsoknad = {};
        sykepengesoknad = getSoknad({
            id: '3253d7f2-538d-4058-886d-2b36bef01d90',
            status: 'NY',
        });

        props = {
            router,
            route,
            hentArbeidsgiverperiodeberegning,
            hentLedere,
            backendsoknad,
            sykepengesoknad,
        }
    })

    describe("Oppsummering", () => {
        let state;
        let skjemasoknad;
        let sykepengesoknad;
        let ownProps;
        let oppsummeringsoknad;

        beforeEach(() => {
            sykepengesoknad = getSoknad();
            skjemasoknad = mapBackendsoknadToSkjemasoknad(sykepengesoknad)
            oppsummeringsoknad = mapSkjemasoknadToOppsummeringsoknad(skjemasoknad, sykepengesoknad);
            ownProps = {
                skjemasoknad,
                sykepengesoknad,
            };

            state = {
                arbeidsgiverperiodeberegning: {
                    data: {}
                },
                ledere: {
                    data: []
                },
            }
        });

        it("Skal returnere oppsummeringsoknad", () => {
            const props = mapStateToProps(state, ownProps);
            expect(props.oppsummeringsoknad).to.deep.equal(oppsummeringsoknad);
        });

        it("Skal returnere backendsoknad", () => {
           const props = mapStateToProps(state, ownProps); 
           expect(props.backendsoknad).to.deep.equal(mapSkjemasoknadToBackendsoknad(skjemasoknad))
        });

    })

    describe("Oppsummering", () => {

        let component;

        beforeEach(() => {
            component = shallow(<Oppsummering {...props} />);
        })

        it("Skal hente ledere", () => {
            expect(hentLedere.called).to.be.true;
        });

        it("Skal hente arbeidsgiverperiodeberegning", () => {
            expect(hentArbeidsgiverperiodeberegning.calledWith(backendsoknad)).to.be.true;
        });

        it("Skal kalle på setRouteLeaveHook", () => {
            expect(setRouteLeaveHook.called).to.be.true;
        });

        describe("routerWillLeave", () => {
            let thisArg;

            beforeEach(() => {
                thisArg = {
                    props,
                    _mounted: true,
                }
            })
            it("Skal returnere streng dersom man navigerer til noe annet enn forrige side", () => {
                const nextRoute = {
                    pathname: '/sykefravaer/soknader',
                };
                const res = Oppsummering.prototype.routerWillLeave.call(thisArg, nextRoute);
                expect(res).to.equal(navigeringsvarsel)
            });

            it("Skal returnere null dersom man navigerer til forrige side i søknaden", () => {
                const nextRoute = {
                    pathname: '/sykefravaer/soknader/3253d7f2-538d-4058-886d-2b36bef01d90/aktiviteter-i-sykmeldingsperioden',
                };
                const res = Oppsummering.prototype.routerWillLeave.call(thisArg, nextRoute);
                expect(res).to.be.null;
            });

            it("Skal returnere null hvis sykepengesoknad ikke er NY", () => {
                thisArg.props.sykepengesoknad.status = 'AVBRUTT';
                const nextRoute = {
                    pathname: '/sykefravaer/soknader',
                };
                const res = Oppsummering.prototype.routerWillLeave.call(thisArg, nextRoute);
                expect(res).to.be.null;
            });

            it("Skal returnere streng hvis sykepengesoknad er UTKAST_TIL_KORRIGERING", () => {
                thisArg.props.sykepengesoknad.status = 'UTKAST_TIL_KORRIGERING';
                const nextRoute = {
                    pathname: '/sykefravaer/soknader',
                };
                const res = Oppsummering.prototype.routerWillLeave.call(thisArg, nextRoute);
                expect(res).to.equal(navigeringsvarsel);
            });

            it("Skal returnere null hvis komponent ikke er mounted", () => {
                thisArg._mounted = false;
                const nextRoute = {
                    pathname: '/sykefravaer/soknader',
                };
                const res = Oppsummering.prototype.routerWillLeave.call(thisArg, nextRoute);
                expect(res).to.be.null;
            });

        });

    });

});