import sinon from 'sinon';
import chai from 'chai';
import {
    sykmeldtHarNaermestelederHosArbeidsgiver,
    finnSykmeldtSinNaermestelederNavnHosArbeidsgiver,
    skalViseOppfoelgingsdialogLenke,
    sykmeldtHarGyldigSykmelding,
    erSykmeldingAktiv,
    finnArbeidsgivereForAktiveSykmeldinger,
} from '../../js/utils/sykmeldingUtils';
import {
    hentSykmeldingAktiv,
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingUtgaatt,
    getSykmeldinger,
} from '../mock/mockSykmeldinger';
import { getLedere } from '../mock/mockLedere';

const expect = chai.expect;

describe('sykmeldingUtils', () => {
    let clock;
    let sykmelding;
    let sykmeldinger;
    let sykmeldingUtgaattOver4mnd;
    let sykmeldingUtgaatt;
    let sykmeldingAktiv;
    const today = new Date('2017-01-01');
    today.setHours(0, 0, 0, 0);

    beforeEach(() => {
        sykmeldinger = getSykmeldinger;
        clock = sinon.useFakeTimers(today.getTime());
        sykmeldingUtgaattOver4mnd = hentSykmeldingIkkeGyldigForOppfoelging(today);
        sykmeldingUtgaatt = hentSykmeldingUtgaatt(today);
        sykmeldingAktiv = hentSykmeldingAktiv(today);
    });

    afterEach(() => {
        clock.restore();
    });
    const naermesteLedere = getLedere;

    describe('skalViseOppfoelgingsdialogLenke', () => {
        let oppfolgingsdialoger;

        it('skal returnere true med 1 sykmelding uten orgnummer, med oppfolgingsdialog', () => {
            oppfolgingsdialoger = {
                data: [{
                    virksomhetsnummer: '12345678',
                }],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(true);
        });

        it('skal returnere false med 1 sykmelding, som har siste gyldige sykmeldingsdato eldre enn grensedato(4mnd siden), med oppfolgingsdialogerSagas', () => {
            oppfolgingsdialoger = {
                data: [{
                    virksomhetsnummer: '12345678',
                }],
            };
            sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(true);
        });

        it('skal returnere false med 1 sykmelding uten orgnummer, uten oppfolgingsdialogerSagas', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(false);
        });

        // eslint-disable-next-line max-len
        it('skal returnere false med 1 sykmelding, som ikke har orgnummer, men som har siste gyldige sykmeldingsdato nyligere eller lik grensedato(4mnd siden), uten oppfolgingsdialogerSagas', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(false);
        });

        it('skal returnere true med 1 sykmelding, som har siste gyldige sykmeldingsdato nyligere enn grensedato(4mnd siden), uteno oppfolgingsdialogerSagas', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [sykmeldingAktiv];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(true);
        });
    });

    describe('erSykmeldingAktiv', () => {
        it('skal returnere false med 1 sykmelding, som ikke er aktiv', () => {
            sykmelding = sykmeldingUtgaattOver4mnd;
            expect(erSykmeldingAktiv(sykmelding)).to.equal(false);
        });

        it('skal returnere true med 1 sykmelding, som er aktiv', () => {
            sykmelding = sykmeldingAktiv;
            expect(erSykmeldingAktiv(sykmelding)).to.equal(true);
        });
    });

    describe('finnArbeidsgivereForAktiveSykmeldinger', () => {
        it('skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt', () => {
            sykmeldinger = [sykmeldingUtgaatt];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it('skal returnere 1 arbeidsgiver, om det er 1 aktiv sykmelding og 2 ledere', () => {
            sykmeldinger = [sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt og 1 er aktiv', () => {
            sykmeldinger = [sykmeldingUtgaatt, sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 2 arbeidsgivere, når 2 sykmeldinger er aktive', () => {
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(2);
        });

        it('skal returnere 1 arbeidsgiver, når det er duplikat av arbeidsgiver', () => {
            sykmeldinger = [sykmeldingAktiv, sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });
    });

    describe('sykmeldtHarGyldigSykmelding', () => {
        it('skal returnere false med 1 sykmelding uten orgnummer', () => {
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(sykmeldtHarGyldigSykmelding(sykmeldinger)).to.equal(false);
        });

        it('skal returnere false med 1 sykmelding, som har siste gyldige sykmeldingsdato eldre enn grensedato(4mnd siden)', () => {
            sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(sykmeldtHarGyldigSykmelding(sykmeldinger)).to.equal(false);
        });

        it('skal returnere false med 1 sykmelding, som ikke har orgnummer, men som har siste gyldige sykmeldingsdato nyligere eller lik grensedato(4mnd siden)', () => {
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(sykmeldtHarGyldigSykmelding(sykmeldinger)).to.equal(false);
        });

        it('skal returnere true med 1 sykmelding, som har siste gyldige sykmeldingsdato nyligere enn grensedato(4mnd siden)', () => {
            sykmeldinger = [sykmeldingAktiv];
            expect(sykmeldtHarGyldigSykmelding(sykmeldinger)).to.equal(true);
        });
    });

    describe('sykmeldtHarNaermestelederHosArbeidsgiver', () => {
        let virksomhetsnummer;

        it('skal returnerere false', () => {
            virksomhetsnummer = '123456781';
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            virksomhetsnummer = '123456788';
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(true);
        });
    });

    describe('finnSykmeldtSinNaermestelederNavnHosArbeidsgiver', () => {
        let virksomhetsnummer;

        it('skal ikke returnerere en naermeste leder', () => {
            virksomhetsnummer = '123456781';
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal(undefined);
        });

        it('skal returnerere en naermeste leder', () => {
            virksomhetsnummer = '123456789';
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal('Navn-Navnolini Navnesen');
        });
    });
});
