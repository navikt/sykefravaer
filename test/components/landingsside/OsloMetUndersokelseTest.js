import React from 'react';
import sinon from 'sinon';
import mountWithStore from '../../mountWithStore';
import expect from '../../expect';
import OsloMetUndersokelse from '../../../js/components/landingsside/OsloMetUndersokelse';
import sykeforloep from '../../../js/reducers/sykeforloep';
import { sykeforloepHentet } from '../../../js/actions/sykeforloep_actions';
import getSykmelding from '../../mock/mockSykmeldinger';

describe.only('OsloMetUndersokelse', () => {
    let clock;
    let initState;
    let inaktivSykmelding1;
    let inaktivSykmelding2;
    let inaktivSykmelding3;
    let aktivSykmelding;
    let settSykeforloep;
    let FEMTITO_UKER_SIDEN;
    let FEMTITO_UKER_OG_EN_DAG_SIDEN;
    let sykmeldingSomLoperUtIDag;
    let TJUESJU_DAGER_SIDEN;
    let FEMTI_DAGER_SIDEN;

    beforeEach(() => {
        const DAGENS_DATO = new Date(1540911584620); // 30. okt. 2018
        clock = sinon.useFakeTimers(DAGENS_DATO);

        const ETT_DOGN = 1000 * 60 * 60 * 24;

        FEMTITO_UKER_SIDEN = new Date(DAGENS_DATO.getTime() - (364 * ETT_DOGN));
        FEMTITO_UKER_OG_EN_DAG_SIDEN = new Date(DAGENS_DATO.getTime() - (365 * ETT_DOGN));
        TJUESJU_DAGER_SIDEN = new Date(DAGENS_DATO.getTime() - (27 * ETT_DOGN));
        FEMTI_DAGER_SIDEN = new Date(DAGENS_DATO.getTime() - (50 * ETT_DOGN));

        window.dataLayer = [];

        inaktivSykmelding1 = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-10'),
                    tom: new Date('2018-10-29'),
                }],
            },
        });
        inaktivSykmelding2 = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-31'),
                    tom: new Date('2018-11-15'),
                }],
            },
        });
        inaktivSykmelding3 = getSykmelding({
            status: 'NY',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-15'),
                    tom: new Date('2018-10-31'),
                }],
            },
        });
        aktivSykmelding = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-15'),
                    tom: new Date('2018-10-31'),
                }],
            },
        });
        sykmeldingSomLoperUtIDag = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-15'),
                    tom: new Date('2018-10-30'),
                }],
            },
        });
        initState = {
            sykeforloep: sykeforloep(),
        };
        settSykeforloep = (sykmeldinger = [], oppfoelgingsdato = FEMTI_DAGER_SIDEN) => {
            const data = [{
                sykmeldinger,
                oppfoelgingsdato,
            }];

            return {
                sykeforloep: sykeforloep(initState.sykeforloep, sykeforloepHentet(data)),
            };
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal ikke vise undersøkelsen hvis det ikke foreligger en sykmelding', () => {
        const state = settSykeforloep();
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det ikke foreligger en aktiv sykmelding', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2]);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det foreligger en aktiv sykmelding, men sykeforløpet har vart mer enn 364 dager (52 uker)', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], FEMTITO_UKER_OG_EN_DAG_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det foreligger en aktiv sykmelding, men sykeforløpet har vart mindre enn 28 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], TJUESJU_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det foreligger en aktiv sykmelding som ikke er sendt, men sykeforløpet har vart i mellom 28 og 364 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, inaktivSykmelding3], FEMTI_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal vise undersøkelsen hvis det foreligger en aktiv sykmelding, og sykeforløpet har vart i mellom 28 og 364 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], FEMTI_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).not.to.equal(null);
    });

    it('Skal vise undersøkelsen hvis det foreligger en aktiv sykmelding, og sykeforløpet har vart i 364 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], FEMTITO_UKER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).not.to.equal(null);
    });

    it('Skal vise undersøkelsen hvis sykmelding løper ut i dag og og sykeforløpet har vart i mellom 28 og 56 dager', () => {
        const state = settSykeforloep([sykmeldingSomLoperUtIDag], FEMTI_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).not.to.equal(null);
    });

    it('Test med data fra testmiljø', () => {
        const state = settSykeforloep([
            {
                id: 'b4560845-1243-48f0-9f60-dcd80d1ee632',
                startLegemeldtFravaer: '2018-09-01',
                skalViseSkravertFelt: true,
                identdato: '2018-09-01',
                status: 'SENDT',
                naermesteLederStatus: null,
                innsendtArbeidsgivernavn: null,
                valgtArbeidssituasjon: null,
                mottakendeArbeidsgiver: {
                    navn: 'TESTARBEIDSGIVER',
                    virksomhetsnummer: '000111222',
                    juridiskOrgnummer: '000111222',
                },
                orgnummer: '000111222',
                sendtdato: '2018-10-30T15:38:31',
                sporsmal: {
                    arbeidssituasjon: 'ARBEIDSTAKER',
                    dekningsgrad: null,
                    harForsikring: null,
                    fravaersperioder: [],
                    harAnnetFravaer: null,
                },
                pasient: {
                    fnr: '000111222',
                    fornavn: 'TEST',
                    mellomnavn: 'TEST',
                    etternavn: 'TEST',
                },
                arbeidsgiver: 'TEST',
                stillingsprosent: 100,
                diagnose: {
                    hoveddiagnose: {
                        diagnose: 'TEST TEST',
                        diagnosekode: '123',
                        diagnosesystem: 'TEST',
                    },
                    bidiagnoser: [
                        {
                            diagnose: 'TEST TEST',
                            diagnosekode: 'TEST',
                            diagnosesystem: 'TEST',
                        },
                    ],
                    fravaersgrunnLovfestet: null,
                    fravaerBeskrivelse: 'Medising årsak i kategorien annet',
                    svangerskap: true,
                    yrkesskade: true,
                    yrkesskadeDato: '2018-10-01',
                },
                mulighetForArbeid: {
                    perioder: [
                        {
                            fom: '2018-10-01',
                            tom: '2018-10-29',
                            grad: 100,
                            behandlingsdager: null,
                            reisetilskudd: null,
                            avventende: null,
                        },
                        {
                            fom: '2018-10-30',
                            tom: '2018-11-05',
                            grad: 60,
                            behandlingsdager: null,
                            reisetilskudd: false,
                            avventende: null,
                        },
                    ],
                    aktivitetIkkeMulig433: [
                        'Annet',
                    ],
                    aktivitetIkkeMulig434: [
                        'Annet',
                    ],
                    aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
                    aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
                },
                friskmelding: {
                    arbeidsfoerEtterPerioden: true,
                    hensynPaaArbeidsplassen: 'Må ta det pent',
                    antarReturSammeArbeidsgiver: true,
                    antattDatoReturSammeArbeidsgiver: '2018-10-01',
                    antarReturAnnenArbeidsgiver: true,
                    tilbakemeldingReturArbeid: '2018-10-01',
                    utenArbeidsgiverAntarTilbakeIArbeid: false,
                    utenArbeidsgiverAntarTilbakeIArbeidDato: null,
                    utenArbeidsgiverTilbakemelding: null,
                },
                utdypendeOpplysninger: {
                    sykehistorie: 'TEST',
                    paavirkningArbeidsevne: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket',
                    resultatAvBehandling: 'Nei',
                    henvisningUtredningBehandling: 'Henvist til fysio',
                    grupper: [
                        {
                            id: '6.2',
                            sporsmal: [
                                {
                                    id: '6.2.1',
                                    svar: 'TEST',
                                },
                                {
                                    id: '6.2.2',
                                    svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket',
                                },
                                {
                                    id: '6.2.3',
                                    svar: 'Nei',
                                },
                                {
                                    id: '6.2.4',
                                    svar: 'Henvist til fysio',
                                },
                            ],
                        },
                    ],
                },
                arbeidsevne: {
                    tilretteleggingArbeidsplass: 'Fortsett som sist.',
                    tiltakNAV: 'Blablabla',
                    tiltakAndre: null,
                },
                meldingTilNav: {
                    navBoerTaTakISaken: false,
                    navBoerTaTakISakenBegrunnelse: null,
                },
                innspillTilArbeidsgiver: null,
                tilbakedatering: {
                    dokumenterbarPasientkontakt: null,
                    tilbakedatertBegrunnelse: null,
                },
                bekreftelse: {
                    utstedelsesdato: '2018-09-01',
                    sykmelder: 'TEST TEST TEST',
                    sykmelderTlf: 'TEST',
                },
            },
        ], new Date('2018-09-15'));
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).not.to.equal(null);
    });
});
