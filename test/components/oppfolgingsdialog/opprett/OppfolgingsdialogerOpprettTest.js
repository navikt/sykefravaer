import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    BaserTidligereSkjema,
} from 'oppfolgingsdialog-npm';
import Lightbox from '../../../../js/components/Lightbox';
import OppfolgingsdialogerOpprett from '../../../../js/components/oppfolgingsdialoger/opprett/OppfolgingsdialogerOpprett';
import ArbeidsgiverSkjemaForm from '../../../../js/components/oppfolgingsdialoger/opprett/ArbeidsgiverSkjema';
import Feilmelding from '../../../../js/components/Feilmelding';
import getOppfolgingsdialog, {
    hentOppfolgingsdialogTidligere,
} from '../../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerOpprett', () => {
    const dagensDato = new Date('2017-01-01');
    dagensDato.setHours(0, 0, 0, 0);
    let klokke;
    let komponent;
    let kopier;
    let opprett;
    let visOppfolgingsdialogOpprett;
    let arbeidsgiver;
    let wrapper;
    const oppfolgingsdialog = getOppfolgingsdialog();
    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        kopier = sinon.spy();
        opprett = sinon.spy();
        visOppfolgingsdialogOpprett = sinon.spy();
        arbeidsgiver = {
            virksomhetsnummer: '1234568',
            harNaermesteLeder: true,
        };

        komponent = shallow(<OppfolgingsdialogerOpprett
            arbeidsgivere={[arbeidsgiver]}
            oppfolgingsdialoger={[oppfolgingsdialog]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            kopier={kopier}
            opprett={opprett}
        />);
        wrapper = komponent.instance();
    });

    afterEach(() => {
        klokke.restore();
    });

    it('Skal vise Lightbox', () => {
        expect(komponent.find(Lightbox)).to.have.length(1);
    });

    it('Skal vise Feilmelding, om det er kun 1 AG og det ikke er registert NL', () => {
        const komponentMed1AGUtenNL = shallow(<OppfolgingsdialogerOpprett
            arbeidsgivere={[{
                ...arbeidsgiver,
                harNaermesteLeder: false,
            }]}
            oppfolgingsdialoger={[oppfolgingsdialog]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            kopier={kopier}
            opprett={opprett}
        />);
        expect(komponentMed1AGUtenNL.find(Feilmelding)).to.have.length(1);
    });

    it('Skal sette virksomhetsnummer i state til AGs virkomsomhetsnummer, om det er kun 1 AG', () => {
        expect(komponent.state().virksomhetsnummer).to.equal(arbeidsgiver.virksomhetsnummer);
    });

    it('Skal sette virksomhetsnummer i state til tom streng, om det er flere enn 1 AG', () => {
        komponent = shallow(<OppfolgingsdialogerOpprett
            arbeidsgivere={[arbeidsgiver, arbeidsgiver]}
            oppfolgingsdialoger={[oppfolgingsdialog]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            kopier={kopier}
            opprett={opprett}
        />);
        expect(komponent.state().virksomhetsnummer).to.equal('');
    });

    it('Skal vise Feilmelding om side=0, naar AT proever aa kopiere en plan men ikke finner tidligere godkjent plan', () => {
        komponent.setState({
            side: 0,
        });
        expect(komponent.find(Feilmelding)).to.have.length(1);
    });

    it('Skal vise BaserTidligereSkjema, om det er kun 1 AG', () => {
        expect(komponent.find(BaserTidligereSkjema)).to.have.length(1);
    });

    it('Skal vise ArbeidsgiverSkjemaForm, om det flere enn 1 AG', () => {
        const komponentMedFlereAG = shallow(<OppfolgingsdialogerOpprett
            arbeidsgivere={[{}, {}]}
            oppfolgingsdialoger={[oppfolgingsdialog]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            opprett={opprett}
        />);
        expect(komponentMedFlereAG.find(ArbeidsgiverSkjemaForm)).to.have.length(1);
    });

    describe('settVirksomhetsnummer', () => {
        it('Skal sette state og ikke opprette dersom det eksisterer Tidligere oppfolgingsdialog med virksomhet', () => {
            const oppfolgingsdialogTidligere = hentOppfolgingsdialogTidligere(dagensDato);
            const komponentMedFlereAG = shallow(<OppfolgingsdialogerOpprett
                arbeidsgivere={[{}, {}]}
                oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                kopier={kopier}
                opprett={opprett}
            />);
            komponentMedFlereAG.instance().settVirksomhetsnummer({
                arbeidsgiver: oppfolgingsdialog.virksomhet.virksomhetsnummer,
            });
            expect(komponentMedFlereAG.state()).to.deep.equal({
                side: 2,
                virksomhetsnummer: oppfolgingsdialog.virksomhet.virksomhetsnummer,
            });
        });

        it('Skal kalle opprett dersom ArbeidsgiverSkjemaForm blir utfylt', () => {
            komponent.instance().settVirksomhetsnummer({
                arbeidsgiver: oppfolgingsdialog.virksomhet.virksomhetsnummer,
            });
            expect(opprett.calledOnce).to.equal(true);
        });
    });

    describe('opprett', () => {
        it('Skal kalle opprett dersom BaserTidligereSkjema blir utfylt med baserPaaTidligerePlan=true', () => {
            const oppfolgingsdialogTidligere = {
                ...hentOppfolgingsdialogTidligere(dagensDato),
                virksomhet: {
                    virksomhetsnummer: arbeidsgiver.virksomhetsnummer,
                },
            };
            const komponentMedTidligereDialog = shallow(<OppfolgingsdialogerOpprett
                arbeidsgivere={[arbeidsgiver]}
                oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                kopier={kopier}
                opprett={opprett}
            />);
            const wrapperTidligereDialog = komponentMedTidligereDialog.instance();
            wrapperTidligereDialog.opprett({
                baserPaaTidligerePlan: 'true',
            });
            expect(kopier.calledOnce).to.equal(true);
        });

        it('Skal kalle opprett dersom BaserTidligereSkjema blir utfylt med baserPaaTidligerePlan=false', () => {
            wrapper.opprett({
                baserPaaTidligerePlan: 'false',
            });
            expect(opprett.calledOnce).to.equal(true);
        });
    });
});
