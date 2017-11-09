import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    NavigasjonsTopp,
    NavigasjonsBunn,
    AvvistPlanKvittering,
    Godkjenn,
    Godkjenninger,
    Samtykke,
    AvbruttGodkjentPlanVarsel,
} from 'oppfolgingsdialog-npm';
import Oppfolgingsdialog, { erAvvistAvArbeidstaker } from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialog';
import IngenlederInfoboks from '../../../js/components/oppfolgingsdialoger/IngenlederInfoboks';
import Arbeidsoppgaver from '../../../js/components/oppfolgingsdialoger/utfylling/Arbeidsoppgaver';
import Tiltak from '../../../js/components/oppfolgingsdialoger/utfylling/Tiltak';
import ReleasetPlanAT from '../../../js/components/oppfolgingsdialoger/releasetplan/ReleasetPlanAT';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialog', () => {
    let component;
    let settAktivtSteg;
    let navigasjontoggles;
    let oppfolgingsdialog;
    beforeEach(() => {
        settAktivtSteg = sinon.spy();
        navigasjontoggles = { steg: 1 };
        oppfolgingsdialog = getOppfolgingsdialog();
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
    });

    it('Skal vise NavigasjonsTopp', () => {
        expect(component.find(NavigasjonsTopp)).to.have.length(1);
    });

    it('Skal vise NavigasjonsBunn', () => {
        expect(component.find(NavigasjonsBunn)).to.have.length(1);
    });

    it('Skal ikke vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er false', () => {
        expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(0);
    });

    it('Skal vise AvbruttGodkjentPlanVarsel, om oppfolgingsdialogAvbrutt er true', () => {
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            oppfolgingsdialogAvbrutt
        />);
        expect(component.find(AvbruttGodkjentPlanVarsel)).to.have.length(1);
    });

    it('Skal vise AvvistPlanKvittering, om visAvvisPlanKvittering er true', () => {
        component.setState({
            visAvvisPlanKvittering: true,
        });
        expect(component.find(AvvistPlanKvittering)).to.have.length(1);
    });

    it('Skal vise Samtykke, om arbeidstaker ikke har svart paa samtykke og visSamtykke er true', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            arbeidstaker: {
                samtykke: null,
            },
        });
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
            visSamtykkeSkjema
        />);
        expect(component.find(Samtykke)).to.have.length(1);
    });

    it('Skal vise Godkjenninger, om oppfolgingsdialoger inneholder Godkjenninger og ikke er avvist av arbeidstaker', () => {
        const sykmeldtFnr = '123456789';
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjenninger: [{
                godkjent: true,
                godkjentAvFnr: sykmeldtFnr,
            }],
            arbeidstaker: {
                fnr: sykmeldtFnr,
            },
        });
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
        expect(component.find(Godkjenninger)).to.have.length(1);
    });

    it('Skal vise ReleasetPlanAT, om oppfolgingsdialoger inneholder GodkjentPlan og ikke er avvist av arbeidstaker', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: {},
        });
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
        expect(component.find(ReleasetPlanAT)).to.have.length(1);
    });

    it('Skal vise Arbeidsoppgaver, om steg er 1 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
            avbruttPlanListe: [],
        });
        navigasjontoggles = { steg: 1 };
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
        expect(component.find(Arbeidsoppgaver)).to.have.length(1);
    });

    it('Skal vise Tiltak, om steg er 3 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
            avbruttPlanListe: [],
        });
        navigasjontoggles = { steg: 2 };
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
        expect(component.find(Tiltak)).to.have.length(1);
    });

    it('Skal vise IngenlederInfoboks, om det ikke er en naermesteLeder og steg er 3 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            arbeidsgiver: {
                naermesteLeder: null,
            },
        });
        navigasjontoggles = { steg: 3 };
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
        expect(component.find(IngenlederInfoboks)).to.have.length(1);
    });

    it('Skal vise Godkjenn, om steg er 3 ', () => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: null,
            godkjenninger: [],
            avbruttPlanListe: [],
        });
        navigasjontoggles = { steg: 3 };
        component = shallow(<Oppfolgingsdialog
            settAktivtSteg={settAktivtSteg}
            oppfolgingsdialog={oppfolgingsdialog}
            navigasjontoggles={navigasjontoggles}
        />);
        expect(component.find(Godkjenn)).to.have.length(1);
    });

    describe('erAvvistAvArbeidstaker', () => {
        const arbeidstaker = { fnr: '123456789' };
        const naermesteLeder = { fnr: '123456788' };
        it('Skal returnere false, om plan er avvist og saa godkjent', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [
                    {
                        godkjent: true,
                        godkjentAvFnr: naermesteLeder.fnr,
                    },
                    {
                        godkjent: false,
                        godkjentAvFnr: arbeidstaker.fnr,
                    },
                ],
                arbeidstaker,
            });
            expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(false);
        });
        it('Skal returnere false, om plan er godkjent', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [{
                    godkjent: true,
                    godkjentAvFnr: arbeidstaker.fnr,
                }],
                arbeidstaker,
            });
            expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(false);
        });

        it('Skal returnere false, om plan er avvist av en annen enn Arbeidstaker', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [{
                    godkjent: false,
                    godkjentAvFnr: naermesteLeder.fnr,
                }],
                arbeidstaker,
            });
            expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(false);
        });

        it('Skal returnere true, om plan er avvist av Arbeidstaker', () => {
            oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
                godkjenninger: [{
                    godkjent: false,
                    godkjentAvFnr: arbeidstaker.fnr,
                }],
                arbeidstaker,
            });
            expect(erAvvistAvArbeidstaker(oppfolgingsdialog)).to.equal(true);
        });
    });
});
