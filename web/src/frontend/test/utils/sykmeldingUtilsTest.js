import sinon from 'sinon';
import chai from 'chai';
import { MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING } from 'oppfolgingsdialog-npm';
import {
    finnArbeidsgivereForGyldigeSykmeldinger,
    sykmeldtHarManglendeNaermesteLeder,
    sykmeldtHarNaermestelederHosArbeidsgiver,
    sykmeldtHarNaermestelederHosArbeidsgivere,
    finnSykmeldtSinNaermestelederNavnHosArbeidsgiver,
    skalViseOppfoelgingsdialogLenke,
    sykmeldtHarGyldigSykmelding,
} from '../../js/utils/sykmeldingUtils';
import getSykmelding, { getSykmeldinger, getArbeidsgivere, getArbeidsgiver } from '../mockSykmeldinger';
import { getLedere } from '../mockLedere';

const expect = chai.expect;

const MILLISEKUNDER_PER_DAG = 86400000;

export const datoMedKlokkeslett = (dato) => {
    if (dato === undefined || dato === null) {
        return '';
    }

    const days = parseInt(dato.substring(8, 10), 10) < 10 ? dato.substring(9, 10) : dato.substring(8, 10);
    const months = parseInt(dato.substring(5, 7), 10) < 10 ? dato.substring(6, 7) : dato.substring(5, 7);
    const time = dato.substring(11, 16);

    /* 16/2 klokken 14:15 */
    return `${days}/${months} klokken ${time}`;
};

export const trekkDagerFraDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() - (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const trekkMnderFraDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() - mnder);
    return new Date(nyDato);
};

export const leggTilMnderFraDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() + mnder);
    return new Date(nyDato);
};

export const trekkMnderOgDagerFraDato = (dato, mnder, dager) => {
    let nyDato = new Date(dato);
    nyDato = trekkMnderFraDato(nyDato, mnder);
    nyDato = trekkDagerFraDato(nyDato, dager);
    return new Date(nyDato);
};

export const leggTilMnderOgDagerFraDato = (dato, mnder, dager) => {
    let nyDato = new Date(dato);
    nyDato = leggTilDagerPaaDato(nyDato, mnder);
    nyDato = leggTilMnderFraDato(nyDato, dager);
    return new Date(nyDato);
};

export const hentsykmeldingUtgaattOver4mnd = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3).toISOString(),
                    tom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2).toISOString(),
                },
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1).toISOString(),
                    tom: trekkMnderOgDagerFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, 1).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingUtgaatt = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 3).toISOString(),
                    tom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 2).toISOString(),
                },
                {
                    fom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1).toISOString(),
                    tom: trekkMnderFraDato(dagensDato, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING).toISOString(),
                },
            ],
        },
    });
};

export const hentSykmeldingAktiv = (dagensDato) => {
    return getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkDagerFraDato(dagensDato, 35).toISOString(),
                    tom: trekkDagerFraDato(dagensDato, 5).toISOString(),
                },
                {
                    fom: trekkDagerFraDato(dagensDato, 5).toISOString(),
                    tom: leggTilDagerPaaDato(dagensDato, 35).toISOString(),
                },
            ],
        },
    });
};

describe('sykmeldingUtils', () => {
    let clock;
    let sykmeldinger;
    let sykmeldingUtgaattOver4mnd;
    let sykmeldingUtgaatt;
    let sykmeldingAktiv;
    const today = new Date('2017-01-01');
    today.setHours(0, 0, 0, 0);

    beforeEach(() => {
        sykmeldinger = getSykmeldinger;
        clock = sinon.useFakeTimers(today.getTime());
        sykmeldingUtgaattOver4mnd = hentsykmeldingUtgaattOver4mnd(today);
        sykmeldingUtgaatt = hentSykmeldingUtgaatt(today);
        sykmeldingAktiv = hentSykmeldingAktiv(today);
    });

    afterEach(() => {
        clock.restore();
    });
    const naermesteLedere = getLedere;
    const arbeidsgivereUtenNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: false,
    });
    const arbeidsgivereMedNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: true,
    });

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

        it('skal returnere false med 1 sykmelding, som har siste gyldige sykmeldingsdato eldre enn grensedato(4mnd siden), med oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [{
                    virksomhetsnummer: '12345678',
                }],
            };
            sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(true);
        });

        it('skal returnere false med 1 sykmelding uten orgnummer, uten oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(false);
        });

        // eslint-disable-next-line max-len
        it('skal returnere false med 1 sykmelding, som ikke har orgnummer, men som har siste gyldige sykmeldingsdato nyligere eller lik grensedato(4mnd siden), uten oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(false);
        });

        it('skal returnere true med 1 sykmelding, som har siste gyldige sykmeldingsdato nyligere enn grensedato(4mnd siden), uteno oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [sykmeldingAktiv];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.equal(true);
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

    describe('finnArbeidsgivereForGyldigeSykmeldinger', () => {
        it('skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt over 3 maaneder', () => {
            sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it('skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt', () => {
            sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it('skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt over 3mnd og 1  er utgaat under 3 mnd', () => {
            sykmeldinger = [sykmeldingUtgaatt, sykmeldingUtgaattOver4mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt og 1 er aktiv', () => {
            sykmeldinger = [sykmeldingUtgaatt, sykmeldingAktiv];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it('skal returnere 2 arbeidsgivere, når 2 sykmeldinger er aktive', () => {
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(2);
        });

        it('skal returnere 1 arbeidsgiver, når det er duplikat av arbeidsgiver', () => {
            sykmeldinger = [sykmeldingAktiv, sykmeldingAktiv];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
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

    describe('sykmeldtHarManglendeNaermesteLeder', () => {
        it('skal returnerere false', () => {
            const arbeidsgivere = [arbeidsgivereMedNaermesteLeder];
            expect(sykmeldtHarManglendeNaermesteLeder(arbeidsgivere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            expect(sykmeldtHarManglendeNaermesteLeder(getArbeidsgivere)).to.equal(true);
        });
    });

    describe('sykmeldtHarNaermestelederHosArbeidsgivere', () => {
        it('skal returnerere false', () => {
            const arbeidsgivere = [arbeidsgivereUtenNaermesteLeder];
            expect(sykmeldtHarNaermestelederHosArbeidsgivere(arbeidsgivere)).to.equal(false);
        });

        it('skal returnerere true', () => {
            expect(sykmeldtHarNaermestelederHosArbeidsgivere(getArbeidsgivere)).to.equal(true);
        });
    });
});
