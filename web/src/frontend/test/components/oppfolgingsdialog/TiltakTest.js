import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import {
    OppfolgingsdialogInfoboks,
    TiltakSkjema,
    LeggTilElementKnapper,
} from 'oppfolgingsdialog-npm';
import { setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mockLedetekster';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Tiltak, {
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
    let tiltak;
    const oppfolgingsdialog = getOppfolgingsdialog();

    beforeEach(() => {
        lagreTiltak = sinon.spy();
        slettTiltak = sinon.spy();
        setLedetekster(ledetekster);
        tiltak = {};
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
            tiltak={{ lagrer: true }}
        />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise spinner dersom data slettes', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            lagreTiltak={lagreTiltak}
            slettTiltak={slettTiltak}
            tiltak={{ sletter: true }}
        />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom lagring feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            lagreTiltak={lagreTiltak}
            slettTiltak={slettTiltak}
            tiltak={{ lagringFeilet: true }}
        />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom sletting feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            lagreTiltak={lagreTiltak}
            slettTiltak={slettTiltak}
            tiltak={{ slettingFeilet: true }}
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
                tiltak={tiltak}
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

        it('Skal vise TiltakSkjema, om det ikke er tiltak og visTiltakSkjema er true', () => {
            componentUtenTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentUtenTiltak.find(TiltakSkjema)).to.have.length(1);
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
                tiltak={{ lagret: true }}
            />);
        });

        it('Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak', () => {
            expect(componentMedTiltak.find(RenderOppfolgingsdialogTiltakTabell)).to.have.length(1);
        });

        it('Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak og visTiltakSkjema er true', () => {
            componentMedTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentMedTiltak.find(RenderOppfolgingsdialogTiltakTabell)).to.have.length(1);
        });

        it('Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak og visTiltakSkjema er false', () => {
            expect(componentMedTiltak.find(RenderOppfolgingsdialogTiltakTabell)).to.have.length(1);
        });
    });
});
