import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';
import {
    OppfolgingsdialogInfoboks,
    LagreArbeidsoppgaveSkjema,
    LeggTilElementKnapper,
    NotifikasjonBoksLagretElement,
    ArbeidsoppgaverNotifikasjonBoksAdvarsel,
    Arbeidsforhold,
} from 'oppfolgingsdialog-npm';
import ledetekster from '../../mockLedetekster';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Arbeidsoppgaver, {
    RenderOpprettArbeidsoppgave,
    OppfolgingsdialogArbeidsoppgaverTabell,
} from '../../../js/components/oppfolgingsdialoger/utfylling/Arbeidsoppgaver';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Arbeidsoppgaver', () => {
    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreArbeidsoppgave;
    let slettArbeidsoppgave;
    let arbeidsforhold;
    let arbeidsoppgaverReducer;
    const oppfolgingsdialog = getOppfolgingsdialog();

    beforeEach(() => {
        lagreArbeidsoppgave = sinon.spy();
        slettArbeidsoppgave = sinon.spy();
        setLedetekster(ledetekster);
        arbeidsoppgaverReducer = {};
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
        arbeidsforhold = {
            stillinger: [{
                yrke: 'Test',
                prosent: '80',
            }],
            fnr: '1234567891234',
        };
    });

    it('Skal vise spinner dersom data lagres', () => {
        component = shallow(<Arbeidsoppgaver
            oppfolgingsdialog={oppfolgingsdialog}
            arbeidsoppgaverReducer={{ lagrer: true }}
        />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise spinner dersom data slettes', () => {
        component = shallow(<Arbeidsoppgaver
            oppfolgingsdialog={oppfolgingsdialog}
            arbeidsoppgaverReducer={{ sletter: true }}
        />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom lagring feilet', () => {
        component = shallow(<Arbeidsoppgaver
            oppfolgingsdialog={oppfolgingsdialog}
            arbeidsoppgaverReducer={{ lagringFeilet: true }}
        />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom sletting feilet', () => {
        component = shallow(<Arbeidsoppgaver
            oppfolgingsdialog={oppfolgingsdialog}
            arbeidsoppgaverReducer={{ slettingFeilet: true }}
        />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    describe('Oppfolgingsdialog uten Arbeidsoppgaver', () => {
        let oppfolgingsdialogUtenArbeidsoppgaver;
        let componentUtenArbeidsoppgaver;
        beforeEach(() => {
            oppfolgingsdialogUtenArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                arbeidsoppgaveListe: [],
            });
            componentUtenArbeidsoppgaver = shallow(<Arbeidsoppgaver
                arbeidsoppgaverReducer={arbeidsoppgaverReducer}
                oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
            />);
        });

        it('Skal vise Arbeidsforhold, om det er Arbeidsforhold og visArbeidsforhold er true', () => {
            componentUtenArbeidsoppgaver.setState({
                visArbeidsforhold: true,
            });
            expect(componentUtenArbeidsoppgaver.find(Arbeidsforhold)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogInfoboks, om det ikke er arbeidsoppgaver', () => {
            expect(componentUtenArbeidsoppgaver.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
            expect(componentUtenArbeidsoppgaver.find(LeggTilElementKnapper)).to.have.length(1);
        });

        it('Skal vise RenderOpprettArbeidsoppgave, om det ikke er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
            componentUtenArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentUtenArbeidsoppgaver.find(RenderOpprettArbeidsoppgave)).to.have.length(1);
        });
    });

    describe('Oppfolgingsdialog med Tiltak', () => {
        let componentMedArbeidsoppgaver;
        beforeEach(() => {
            componentMedArbeidsoppgaver = shallow(<Arbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialog}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                arbeidsoppgaverReducer={{ lagret: true }}
            />);
        });

        it('Skal vise Arbeidsforhold, om det er Arbeidsforhold', () => {
            expect(componentMedArbeidsoppgaver.find(Arbeidsforhold)).to.have.length(1);
        });

        it('Skal vise en overskrift, om det er arbeidsoppgaver', () => {
            expect(componentMedArbeidsoppgaver.find('h2')).to.have.length(1);
        });

        it('Skal vise NotifikasjonBoksLagretElement, om et Arbeidsoppgaver er lagret og oppdatertArbeidsoppgave er true', () => {
            componentMedArbeidsoppgaver.setState({
                oppdatertArbeidsoppgave: true,
            });
            expect(componentMedArbeidsoppgaver.find(NotifikasjonBoksLagretElement)).to.have.length(1);
        });

        it('Skal vise NotifikasjonBoksLagretElement, om en Arbeidsoppgave er lagret og nyArbeidsoppgave er true', () => {
            componentMedArbeidsoppgaver.setState({
                nyArbeidsoppgave: true,
            });
            expect(componentMedArbeidsoppgaver.find(NotifikasjonBoksLagretElement)).to.have.length(1);
        });

        it('Skal vise ArbeidsoppgaverNotifikasjonBoksAdvarsel, om nye Arbeidsoppgaver er lagt til av motpart', () => {
            const oppfolgingsdialogMedNyeArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                arbeidsoppgaveListe: [{
                    opprettetDato: '2017-01-02T00:00:00.000',
                    opprettetAv: arbeidsgiver.naermesteLeder,
                }],
            });
            const componentMedNyeArbeidsoppgaver = shallow(<Arbeidsoppgaver
                arbeidsoppgaverReducer={arbeidsoppgaverReducer}
                oppfolgingsdialog={oppfolgingsdialogMedNyeArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
            />);
            expect(componentMedNyeArbeidsoppgaver.find(ArbeidsoppgaverNotifikasjonBoksAdvarsel)).to.have.length(1);
        });

        it('Skal ikke vise ArbeidsoppgaverNotifikasjonBoksAdvarsel, om  nye Arbeidsoppgaver er lagt til av motpart, og oppfolgingsdialogAvbrutt er true', () => {
            const oppfolgingsdialogMedNyeArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                arbeidsoppgaveListe: [{
                    opprettetDato: '2017-01-02T00:00:00.000',
                    opprettetAv: arbeidsgiver.naermesteLeder,
                }],
            });
            const componentAvbruttMedNyeArbeidsoppgaver = shallow(<Arbeidsoppgaver
                arbeidsoppgaverReducer={arbeidsoppgaverReducer}
                oppfolgingsdialog={oppfolgingsdialogMedNyeArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                oppfolgingsdialogAvbrutt
            />);
            expect(componentAvbruttMedNyeArbeidsoppgaver.find(ArbeidsoppgaverNotifikasjonBoksAdvarsel)).to.have.length(0);
        });

        it('Skal vise OppfolgingsdialogArbeidsoppgaverTabell, om det er arbeidsoppgaver', () => {
            expect(componentMedArbeidsoppgaver.find(OppfolgingsdialogArbeidsoppgaverTabell)).to.have.length(1);
        });

        it('Skal vise LagreArbeidsoppgaveSkjema, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
            componentMedArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentMedArbeidsoppgaver.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det er tiltak og visTiltakSkjema er false', () => {
            expect(componentMedArbeidsoppgaver.find(LeggTilElementKnapper)).to.have.length(1);
        });
    });

    describe('RenderOpprettArbeidsoppgave', () => {

        it('Skal vise en overskrift', () => {
            component = shallow(<RenderOpprettArbeidsoppgave />);
            expect(component.find('h2')).to.have.length(1);
        });

        it('Skal vise et LagreArbeidsoppgaveSkjema', () => {
            component = shallow(<RenderOpprettArbeidsoppgave />);
            expect(component.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
        });
    });
});
