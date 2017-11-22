import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import {
    OppfolgingsdialogInfoboks,
    LagreTiltakSkjema,
    LeggTilElementKnapper,
    NotifikasjonBoksLagretElement,
    TiltakNotifikasjonBoksAdvarsel,
} from 'oppfolgingsdialog-npm';
import { setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mockLedetekster';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Tiltak, {
    RenderOpprettTiltak,
    RenderOppfolgingsdialogTiltakTabell,
} from '../../../js/components/oppfolgingsdialoger/utfylling/Tiltak';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Tiltak', () => {
    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreTiltak;
    let slettTiltak;
    let tiltakReducer;
    const oppfolgingsdialog = getOppfolgingsdialog();

    beforeEach(() => {
        lagreTiltak = sinon.spy();
        slettTiltak = sinon.spy();
        setLedetekster(ledetekster);
        tiltakReducer = {};
        arbeidsgiver = {
            naermesteLeder: {
                navn: 'Arbeidsgiver',
                fnr: '***REMOVED***',
            },
        };
        arbeidstaker = {
            navn: 'Arbeidstaker',
            fnr: '1234567891234',
            sistInnlogget: '2017-01-01T00:00:00.000',
        };
    });

    it('Skal vise spinner dersom data lagres', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltakReducer={{ lagrer: true }}
        />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise spinner dersom data slettes', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            lagreTiltak={lagreTiltak}
            slettTiltak={slettTiltak}
            tiltakReducer={{ sletter: true }}
        />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom lagring feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            lagreTiltak={lagreTiltak}
            slettTiltak={slettTiltak}
            tiltakReducer={{ lagringFeilet: true }}
        />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom sletting feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            lagreTiltak={lagreTiltak}
            slettTiltak={slettTiltak}
            tiltakReducer={{ slettingFeilet: true }}
        />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    describe('Oppfolgingsdialog uten Tiltak', () => {
        let oppfolgingsdialogUtenTiltak;
        let componentUtenTiltak;
        beforeEach(() => {
            oppfolgingsdialogUtenTiltak = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                tiltakListe: [],
            });
            componentUtenTiltak = shallow(<Tiltak
                tiltakReducer={tiltakReducer}
                oppfolgingsdialog={oppfolgingsdialogUtenTiltak}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
            />);
        });
        it('Skal vise OppfolgingsdialogInfoboks, om det ikke er tiltak', () => {
            expect(componentUtenTiltak.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
            expect(componentUtenTiltak.find(LeggTilElementKnapper)).to.have.length(1);
        });

        it('Skal vise RenderOpprettTiltak, om det ikke er tiltak og visTiltakSkjema er true', () => {
            componentUtenTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentUtenTiltak.find(RenderOpprettTiltak)).to.have.length(1);
        });
    });

    describe('Oppfolgingsdialog med Tiltak', () => {
        let componentMedTiltak;
        beforeEach(() => {
            componentMedTiltak = shallow(<Tiltak
                oppfolgingsdialog={oppfolgingsdialog}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                tiltakReducer={{ lagret: true }}
            />);
        });
        it('Skal vise en overskrift, om det er tiltak', () => {
            expect(componentMedTiltak.find('h2')).to.have.length(1);
        });

        it('Skal vise NotifikasjonBoksLagretElement, om et Tiltak er lagret og oppdatertTiltak er true', () => {
            componentMedTiltak.setState({
                oppdatertTiltak: true,
            });
            expect(componentMedTiltak.find(NotifikasjonBoksLagretElement)).to.have.length(1);
        });

        it('Skal vise NotifikasjonBoksLagretElement, om et Tiltak er lagret og nyttTiltak er true', () => {
            componentMedTiltak.setState({
                nyttTiltak: true,
            });
            expect(componentMedTiltak.find(NotifikasjonBoksLagretElement)).to.have.length(1);
        });

        it('Skal vise TiltakNotifikasjonBoksAdvarsel, om nye Tiltak er lagt til av motpart', () => {
            const oppfolgingsdialogMedNyeTiltak = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                tiltakListe: [{
                    opprettetDato: '2017-01-02T00:00:00.000',
                    opprettetAv: arbeidsgiver.naermesteLeder,
                }],
            });
            const componentMedNyeTiltak = shallow(<Tiltak
                tiltakReducer={tiltakReducer}
                oppfolgingsdialog={oppfolgingsdialogMedNyeTiltak}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                oppfolgingsdialogAvbrutt={false}
            />);
            expect(componentMedNyeTiltak.find(TiltakNotifikasjonBoksAdvarsel)).to.have.length(1);
        });

        it('Skal ikke vise TiltakNotifikasjonBoksAdvarsel, om nye Tiltak er lagt til av motpart, og oppfolgingsdialogAvbrutt er true', () => {
            const oppfolgingsdialogMedNyeTiltak = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                tiltakListe: [{
                    opprettetDato: '2017-01-02T00:00:00.000',
                    opprettetAv: arbeidsgiver.naermesteLeder,
                }],
            });
            const componentAvbrutt = shallow(<Tiltak
                tiltakReducer={tiltakReducer}
                oppfolgingsdialog={oppfolgingsdialogMedNyeTiltak}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                oppfolgingsdialogAvbrutt
            />);
            expect(componentAvbrutt.find(TiltakNotifikasjonBoksAdvarsel)).to.have.length(0);
        });

        it('Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak', () => {
            expect(componentMedTiltak.find(RenderOppfolgingsdialogTiltakTabell)).to.have.length(1);
        });

        it('Skal vise LagreTiltakSkjema, om det er tiltak og visTiltakSkjema er true', () => {
            componentMedTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentMedTiltak.find(LagreTiltakSkjema)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det er tiltak og visTiltakSkjema er false', () => {
            expect(componentMedTiltak.find(LeggTilElementKnapper)).to.have.length(1);
        });
    });

    describe('RenderOpprettTiltak', () => {
        it('Skal vise en overskrift', () => {
            component = shallow(<RenderOpprettTiltak />);
            expect(component.find('h2')).to.have.length(1);
        });

        it('Skal vise et LagreTiltakSkjema', () => {
            component = shallow(<RenderOpprettTiltak />);
            expect(component.find(LagreTiltakSkjema)).to.have.length(1);
        });
    });
});
