import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import {
    OppfolgingsdialogInfoboks,
    TiltakSkjema,
    LeggTilElementKnapper,
    TiltakTabell,
} from 'oppfolgingsdialog-npm';
import { setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mockLedetekster';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Tiltak from '../../../js/components/oppfolgingsdialoger/utfylling/Tiltak';
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
    function storageMock() {
        var storage = {};

        return {
            setItem: function(key, value) {
                storage[key] = value || '';
            },
            getItem: function(key) {
                return key in storage ? storage[key] : null;
            },
            removeItem: function(key) {
                delete storage[key];
            },
            get length() {
                return Object.keys(storage).length;
            },
            key: function(i) {
                var keys = Object.keys(storage);
                return keys[i] || null;
            }
        };
    }
    beforeEach(() => {
        lagreTiltak = sinon.spy();
        slettTiltak = sinon.spy();
        setLedetekster(ledetekster);
        tiltak = {};
        window.sessionStorage = storageMock();
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

    it('Skal vise feilmelding dersom lagring av ny tiltak feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltak={{
                lagringFeilet: false,
            }}
            ledetekster={ledetekster}
        />);
        component.setProps({ tiltak: {lagringFeilet: true} });
        expect(component.state().varselTekst).to.equal('Det oppsto en feil, og du fikk ikke lagret. Prøv igjen.');
    });

    it('Skal ikke vise feilmelding dersom lagring av ny tiltak ikke feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltak={{
                lagringFeilet: false,
                feiletTiltakId: 5,
            }}
            ledetekster={ledetekster}
        />);
        component.setProps({ tiltak: {lagringFeilet: true, feiletTiltakId: 5,} });
        expect(component.state().varselTekst).to.equal('');
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

        it('Skal vise TiltakTabell, om det er tiltak', () => {
            expect(componentMedTiltak.find(TiltakTabell)).to.have.length(1);
        });

        it('Skal vise TiltakTabell, om det er tiltak og visTiltakSkjema er true', () => {
            componentMedTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentMedTiltak.find(TiltakTabell)).to.have.length(1);
        });

        it('Skal vise TiltakTabell, om det er tiltak og visTiltakSkjema er false', () => {
            expect(componentMedTiltak.find(TiltakTabell)).to.have.length(1);
        });
    });
});
