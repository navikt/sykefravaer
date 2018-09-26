import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Container, mapStateToProps } from '../../../js/containers/landingsside/ArbeidsrettetOppfolgingContainer';
import expect from '../../expect';
import getSykmelding from '../../mockSykmeldinger';
import sykeforloep from '../../../js/reducers/sykeforloep';
import { sykeforloepHentet } from '../../../js/actions/sykeforloep_actions';

describe('ArbeidsrettetOppfolgingContainer', () => {
    let state;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-06-20'));
        state = {
            sykeforloep: {
                data: [],
            },
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal ikke vises dersom man ikke har sykmeldinger', () => {
        const component = shallow(<Container {...mapStateToProps(state)} />);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vises dersom man bare har sykmeldinger som er NY', () => {
        const respons = [{
            sykmeldinger: [getSykmelding({ status: 'NY' })],
            oppfoelgingsdato: new Date('2018-06-05'),
        }];
        state.sykeforloep = sykeforloep({}, sykeforloepHentet(respons));
        const component = shallow(<Container {...mapStateToProps(state)} />);
        expect(component.html()).to.equal(null);
    });

    it('Skal vises hvis det finnes en bekreftet sykmelding med arbeidssituasjon ARBEIDSLEDIG og en ubehandlet sykmelding', () => {
        // eslint-disable-next-line max-len
        const data = [{ sykmeldinger: [{ id: '44bbc638-c6ab-47cf-8691-bf97558417ff', startLegemeldtFravaer: '2018-05-13', skalViseSkravertFelt: true, identdato: '2018-05-13', status: 'NY', naermesteLederStatus: null, innsendtArbeidsgivernavn: null, valgtArbeidssituasjon: null, mottakendeArbeidsgiver: null, orgnummer: null, sendtdato: null, sporsmal: null, pasient: { fnr: '12345678910', fornavn: 'Frida', mellomnavn: 'Perma', etternavn: 'Frost' }, arbeidsgiver: 'LOMMEN BARNEHAVE', stillingsprosent: 100, diagnose: { hoveddiagnose: { diagnose: 'TENDINITT INA', diagnosekode: 'L87', diagnosesystem: 'ICPC-2' }, bidiagnoser: [{ diagnose: 'GANGLION SENE', diagnosekode: 'L87', diagnosesystem: 'ICPC-2' }], fravaersgrunnLovfestet: null, fravaerBeskrivelse: 'Medising årsak i kategorien annet', svangerskap: true, yrkesskade: true, yrkesskadeDato: '2018-05-13' }, mulighetForArbeid: { perioder: [{ fom: '2018-05-13', tom: '2018-06-23', grad: 100, behandlingsdager: null, reisetilskudd: null, avventende: null }], aktivitetIkkeMulig433: ['Annet'], aktivitetIkkeMulig434: ['Annet'], aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær', aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær' }, friskmelding: { arbeidsfoerEtterPerioden: true, hensynPaaArbeidsplassen: 'Må ta det pent', antarReturSammeArbeidsgiver: true, antattDatoReturSammeArbeidsgiver: '2018-05-13', antarReturAnnenArbeidsgiver: true, tilbakemeldingReturArbeid: '2018-05-13', utenArbeidsgiverAntarTilbakeIArbeid: false, utenArbeidsgiverAntarTilbakeIArbeidDato: null, utenArbeidsgiverTilbakemelding: null }, utdypendeOpplysninger: { sykehistorie: 'Langvarig korsryggsmerter. Ømhet og smerte', paavirkningArbeidsevne: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket', resultatAvBehandling: 'Nei', henvisningUtredningBehandling: 'Henvist til fysio', grupper: [{ id: '6.2', sporsmal: [{ id: '6.2.1', svar: 'Langvarig korsryggsmerter. Ømhet og smerte' }, { id: '6.2.2', svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket' }, { id: '6.2.3', svar: 'Nei' }, { id: '6.2.4', svar: 'Henvist til fysio' }] }] }, arbeidsevne: { tilretteleggingArbeidsplass: 'Fortsett som sist.', tiltakNAV: 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ', tiltakAndre: null }, meldingTilNav: { navBoerTaTakISaken: false, navBoerTaTakISakenBegrunnelse: null }, innspillTilArbeidsgiver: null, tilbakedatering: { dokumenterbarPasientkontakt: null, tilbakedatertBegrunnelse: null }, bekreftelse: { utstedelsesdato: '2018-05-13', sykmelder: 'Frida Perma Frost', sykmelderTlf: '99988777' } }, { id: '9c673907-fa6d-4191-9e8d-efc48611d171', startLegemeldtFravaer: '2018-05-13', skalViseSkravertFelt: true, identdato: '2018-05-13', status: 'BEKREFTET', naermesteLederStatus: null, innsendtArbeidsgivernavn: null, valgtArbeidssituasjon: 'ARBEIDSLEDIG', mottakendeArbeidsgiver: null, orgnummer: null, sendtdato: '2018-06-22T09:30:44', sporsmal: null, pasient: { fnr: '12345678910', fornavn: 'Frida', mellomnavn: 'Perma', etternavn: 'Frost' }, arbeidsgiver: 'LOMMEN BARNEHAVE', stillingsprosent: 100, diagnose: { hoveddiagnose: { diagnose: 'TENDINITT INA', diagnosekode: 'L87', diagnosesystem: 'ICPC-2' }, bidiagnoser: [{ diagnose: 'GANGLION SENE', diagnosekode: 'L87', diagnosesystem: 'ICPC-2' }], fravaersgrunnLovfestet: null, fravaerBeskrivelse: 'Medising årsak i kategorien annet', svangerskap: true, yrkesskade: true, yrkesskadeDato: '2018-05-13' }, mulighetForArbeid: { perioder: [{ fom: '2018-05-13', tom: '2018-06-23', grad: 100, behandlingsdager: null, reisetilskudd: null, avventende: null }], aktivitetIkkeMulig433: ['Annet'], aktivitetIkkeMulig434: ['Annet'], aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær', aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær' }, friskmelding: { arbeidsfoerEtterPerioden: true, hensynPaaArbeidsplassen: 'Må ta det pent', antarReturSammeArbeidsgiver: true, antattDatoReturSammeArbeidsgiver: '2018-05-13', antarReturAnnenArbeidsgiver: true, tilbakemeldingReturArbeid: '2018-05-13', utenArbeidsgiverAntarTilbakeIArbeid: false, utenArbeidsgiverAntarTilbakeIArbeidDato: null, utenArbeidsgiverTilbakemelding: null }, utdypendeOpplysninger: { sykehistorie: 'Langvarig korsryggsmerter. Ømhet og smerte', paavirkningArbeidsevne: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket', resultatAvBehandling: 'Nei', henvisningUtredningBehandling: 'Henvist til fysio', grupper: [{ id: '6.2', sporsmal: [{ id: '6.2.1', svar: 'Langvarig korsryggsmerter. Ømhet og smerte' }, { id: '6.2.2', svar: 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket' }, { id: '6.2.3', svar: 'Nei' }, { id: '6.2.4', svar: 'Henvist til fysio' }] }] }, arbeidsevne: { tilretteleggingArbeidsplass: 'Fortsett som sist.', tiltakNAV: 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ', tiltakAndre: null }, meldingTilNav: { navBoerTaTakISaken: false, navBoerTaTakISakenBegrunnelse: null }, innspillTilArbeidsgiver: null, tilbakedatering: { dokumenterbarPasientkontakt: null, tilbakedatertBegrunnelse: null }, bekreftelse: { utstedelsesdato: '2018-05-13', sykmelder: 'Frida Perma Frost', sykmelderTlf: '94431152' } }], hendelser: [], oppfoelgingsdato: '2018-05-13' }];
        state.sykeforloep = sykeforloep({}, sykeforloepHentet(data));
        const component = shallow(<Container {...mapStateToProps(state)} />);
        expect(component.html()).to.not.equal(null);
    });

    it('Skal vises dersom bruker har vært sykmeldt i minst 14 dager sammenhengende, og bruker er sykmeldt nå', () => {
        const data = [{
            sykmeldinger: [getSykmelding({
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2018-06-05'),
                        tom: new Date('2018-06-25'),
                    }],
                },
            })],
            oppfoelgingsdato: new Date('2018-06-05'),
        }];
        state.sykeforloep = sykeforloep({}, sykeforloepHentet(data));
        const component = shallow(<Container {...mapStateToProps(state)} />);
        expect(component.html()).to.not.equal(null);
    });

    it('Skal ikke vises dersom bruker har vært sykmeldt i minst 14 dager sammenhengende, og bruker ikke er sykmeldt nå', () => {
        const data = [{
            sykmeldinger: [getSykmelding({
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2018-06-05'),
                        tom: new Date('2018-06-19'),
                    }],
                },
            })],
            oppfoelgingsdato: new Date('2018-06-05'),
        }];
        state.sykeforloep = sykeforloep({}, sykeforloepHentet(data));
        const component = shallow(<Container {...mapStateToProps(state)} />);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vises dersom bruker har vært sykmeldt i under 14 dager sammenhengende, men er sykmeldt nå', () => {
        const data = [{
            sykmeldinger: [getSykmelding({
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'ARBEIDSLEDIG',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2018-06-08'),
                        tom: new Date('2018-06-25'),
                    }],
                },
            })],
            oppfoelgingsdato: new Date('2018-06-08'),
        }];
        state.sykeforloep = sykeforloep({}, sykeforloepHentet(data));
        const component = shallow(<Container {...mapStateToProps(state)} />);
        expect(component.html()).to.equal(null);
    });
});
