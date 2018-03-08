import chai from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {setLedetekster} from 'digisyfo-npm';
import {getParsetSoknad, getSoknad} from '../../mockSoknader';
import {
    ARBEIDSGIVER,
    mapStateToProps,
    NAV,
    NAV_OG_ARBEIDSGIVER,
    navigeringsvarsel,
    Oppsummering,
    utledForskutteringOgMottaker,
} from '../../../js/containers/sykepengesoknad/OppsummeringContainer';
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
        });
        setRouteLeaveHook = sinon.spy();
        route = {};
        router = {
            setRouteLeaveHook,
        };

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
    });

    describe.only("Utled skal vise forskuttering og mottaker", () => {
        const arbeidsgiverperiodeberegning = {
            erUtenforArbeidsgiverperiode: true,
            startdato: new Date('2017-01-01')
        };
        const soknad = getParsetSoknad();
        const ledere = [];
        const lederSvartJa = [{orgnummer: "***REMOVED***", arbeidsgiverForskuttererLoenn: true}];
        const lederSvartNei = [{orgnummer: "***REMOVED***", arbeidsgiverForskuttererLoenn: false}];

        it('Skal vise forskutteringsspørsmål hvis enten ledere, søknad eller arbeidsgiverperiodeberegning', () => {
            expect(utledForskutteringOgMottaker(null, soknad, arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: NAV,
                visForskutteringssporsmal: true
            });
            expect(utledForskutteringOgMottaker(ledere, null, arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: NAV,
                visForskutteringssporsmal: true
            });
            expect(utledForskutteringOgMottaker(ledere, soknad, null)).to.deep.equal({
                skalTil: NAV,
                visForskutteringssporsmal: true
            });
        });

        it('Skal sende søknad til arbeidsgiver og ikke vise forskutterinsspørsmål hvis søknaden er innefor arbeidsgiverperioden', () => {
            const _soknad = getParsetSoknad({fom: new Date('2017-01-01'), tom: new Date('2017-01-10')});
            expect(utledForskutteringOgMottaker(lederSvartJa, _soknad, arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: ARBEIDSGIVER,
                visForskutteringssporsmal: false
            });
        });

        it('Skal sende søknaden til nav og arbeidsgiver hvis første dag i søknaden er før eller samme som siste dag i arbeidsgiverperioden', () => {
            const _soknad = getParsetSoknad(
                {
                    identdato: new Date('2017-01-01'),
                    opprettetDato: new Date('2017-01-01'),
                    fom: new Date('2017-01-01'),
                    tom: new Date('2017-01-30'),
                }
            );
            expect(utledForskutteringOgMottaker(lederSvartJa, _soknad, arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: NAV_OG_ARBEIDSGIVER,
                visForskutteringssporsmal: false
            });
        });

        it('Skal ikke vise forskutteringsspørsmål hvis arbeidsgiver har svart på forskuttering', () => {
            const _arbeidsgiverperiodeberegning = {
                erUtenforArbeidsgiverperiode: true,
                startdato: new Date('2016-01-01')
            };

            expect(utledForskutteringOgMottaker(lederSvartJa, soknad, _arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: NAV_OG_ARBEIDSGIVER,
                visForskutteringssporsmal: false
            });
            expect(utledForskutteringOgMottaker(lederSvartNei, soknad, _arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: NAV,
                visForskutteringssporsmal: false
            });
        });

        it('Skal vise forskutteringspørsmål hvis arbeidsgiver ikke har svart på forskuttering', () => {
            const _arbeidsgiverperiodeberegning = {
                erUtenforArbeidsgiverperiode: true,
                startdato: new Date('2016-01-01')
            };
            expect(utledForskutteringOgMottaker(ledere, soknad, _arbeidsgiverperiodeberegning)).to.deep.equal({
                skalTil: NAV,
                visForskutteringssporsmal: true
            });
        });
    });

    describe("Oppsummering", () => {
        let state;
        let skjemasoknad;
        let sykepengesoknad;
        let ownProps;
        let oppsummeringsoknad;

        beforeEach(() => {
            sykepengesoknad = getSoknad();
            skjemasoknad = mapBackendsoknadToSkjemasoknad(sykepengesoknad);
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

    });

    describe("Oppsummering", () => {

        let component;

        beforeEach(() => {
            component = shallow(<Oppsummering {...props} />);
        });

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
            });
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