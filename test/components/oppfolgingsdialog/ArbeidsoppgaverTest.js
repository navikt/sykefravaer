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
    NotifikasjonBoksVurderingOppgave,
    ArbeidsoppgaverInfoboks,
    ArbeidsoppgaverListe,
} from 'oppfolgingsdialog-npm';
import ledetekster from '../../mock/mockLedetekster';
import Arbeidsoppgaver, {
    RenderOpprettArbeidsoppgave,
} from '../../../js/components/oppfolgingsdialoger/utfylling/Arbeidsoppgaver';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Arbeidsoppgaver', () => {
    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreArbeidsoppgave;
    let slettArbeidsoppgave;
    let arbeidsforhold;
    let arbeidsoppgaver;
    const oppfolgingsdialog = getOppfolgingsdialog();
    function storageMock() {
        const storage = {};

        return {
            setItem(key, value) {
                storage[key] = value || '';
            },
            getItem(key) {
                return key in storage ? storage[key] : null;
            },
            removeItem(key) {
                delete storage[key];
            },
            get length() {
                return Object.keys(storage).length;
            },
            key(i) {
                const keys = Object.keys(storage);
                return keys[i] || null;
            },
        };
    }
    beforeEach(() => {
        lagreArbeidsoppgave = sinon.spy();
        slettArbeidsoppgave = sinon.spy();
        setLedetekster(ledetekster);
        arbeidsoppgaver = {};
        window.sessionStorage = storageMock();
        arbeidsforhold = {
            stillinger: [{
                yrke: 'Test',
                prosent: '80',
            }],
            fnr: '1234567891000',
        };
        arbeidsgiver = {
            naermesteLeder: {
                navn: 'Arbeidsgiver',
                fnr: '12345678910',
            },
        };
        arbeidstaker = {
            navn: 'Arbeidstaker',
            fnr: '1234567891000',
            sistInnlogget: '2017-01-01T00:00:00.000',
            stillinger: arbeidsforhold.stillinger,
        };
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
                arbeidsoppgaver={arbeidsoppgaver}
                oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
            />);
        });

        it('Skal vise ArbeidsoppgaverInfoboks', () => {
            componentUtenArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentUtenArbeidsoppgaver.find(ArbeidsoppgaverInfoboks)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogInfoboks, om det ikke er arbeidsoppgaver', () => {
            expect(componentUtenArbeidsoppgaver.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det ikke er arbeidsoppgaver', () => {
            expect(componentUtenArbeidsoppgaver.find(LeggTilElementKnapper)).to.have.length(1);
        });

        it('Skal vise LagreArbeidsoppgaveSkjema, om det ikke er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
            componentUtenArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentUtenArbeidsoppgaver.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
        });

        it('Skal vise feilmelding dersom lagring av ny arbeidsoppgave feilet', () => {
            component = shallow(<Arbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                arbeidsoppgaver={{
                    lagringFeilet: false,
                }}
                ledetekster={ledetekster}
            />);
            component.setProps({ arbeidsoppgaver: { lagringFeilet: true } });
            expect(component.state().varselTekst).to.equal('Det oppsto en feil, og du fikk ikke lagret. Prøv igjen.');
        });

        it('Skal ikke vise feilmelding dersom lagring av ny arbeidsoppgave ikke feilet', () => {
            component = shallow(<Arbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                arbeidsoppgaver={{
                    lagringFeilet: false,
                    feiletOppgaveId: 5,
                }}
                ledetekster={ledetekster}
            />);
            component.setProps({ arbeidsoppgaver: { lagringFeilet: true, feiletOppgaveId: 5 } });
            expect(component.state().varselTekst).to.equal('');
        });
    });

    describe('Oppfolgingsdialog med Arbeidsoppgaver', () => {
        let componentMedArbeidsoppgaver;
        let oppfolgingsdialogMedArbeidsoppgaver;
        beforeEach(() => {
            oppfolgingsdialogMedArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
            });
            componentMedArbeidsoppgaver = shallow(<Arbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialogMedArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                arbeidsoppgaver={{ lagret: true }}
            />);
        });

        it('Skal vise ArbeidsoppgaverInfoboks', () => {
            expect(componentMedArbeidsoppgaver.find(ArbeidsoppgaverInfoboks)).to.have.length(1);
        });

        it('Skal vise NotifikasjonBoksVurderingOppgave, om nye Arbeidsoppgaver er lagt til av motpart', () => {
            const oppfolgingsdialogMedNyeArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                arbeidsoppgaveListe: [{
                    opprettetDato: '2017-01-02T00:00:00.000',
                    opprettetAv: arbeidsgiver.naermesteLeder,
                }],
            });
            const componentMedNyeArbeidsoppgaver = shallow(<Arbeidsoppgaver
                arbeidsoppgaver={arbeidsoppgaver}
                oppfolgingsdialog={oppfolgingsdialogMedNyeArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
            />);
            expect(componentMedNyeArbeidsoppgaver.find(NotifikasjonBoksVurderingOppgave)).to.have.length(1);
        });

        it('Skal vise ArbeidsoppgaverListe, om det er arbeidsoppgaver', () => {
            expect(componentMedArbeidsoppgaver.find(ArbeidsoppgaverListe)).to.have.length(1);
        });

        it('Skal vise LagreArbeidsoppgaveSkjema, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
            componentMedArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentMedArbeidsoppgaver.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
        });
    });

    describe('RenderOpprettArbeidsoppgave', () => {
        it('Skal vise et LagreArbeidsoppgaveSkjema', () => {
            component = shallow(<RenderOpprettArbeidsoppgave />);
            expect(component.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
        });
    });
});
