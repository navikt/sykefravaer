import {
    MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
} from 'oppfolgingsdialog-npm';
import {
    skalViseOppfoelgingsdialogLenke,
    finnArbeidsgivereForGyldigeSykmeldinger,
    sykmeldtHarManglendeNaermesteLeder,
    sykmeldtHarNaermestelederHosArbeidsgiver,
    sykmeldtHarNaermestelederHosArbeidsgivere,
    finnSykmeldtSinNaermestelederNavnHosArbeidsgiver,
} from '../../js/utils/sykmeldingUtils';
import getSykmelding, { getSykmeldinger, getArbeidsgivere, getArbeidsgiver } from '../mockSykmeldinger';
import { getLedere } from '../mockLedere.js';
import sinon from 'sinon';
import chai from "chai";
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
    const arbeidsgivere = getArbeidsgivere;
    const arbeidsgivereUtenNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: false,
    });
    const arbeidsgivereMedNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: true,
    });

    describe('skalViseOppfoelgingsdialogLenke', () => {
        let oppfolgingsdialoger;

        it('skal returnere false med 1 sykmelding uten orgnummer, uten oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.be.false;
        });

        it('skal returnere true med 1 sykmelding uten orgnummer, med oppfolgingsdialog', () => {
            oppfolgingsdialoger = {
                data: [{
                    virksomhetsnummer: '12345678',
                }],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.be.true;
        });

        it('skal returnere false med 1 sykmelding, med sendtdato som er mindre eller likt 4mnd etter siste gyldige sykmeldingsdato, uten oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
                sendtdato: leggTilMnderOgDagerFraDato(sykmeldingAktiv.mulighetForArbeid.perioder[1].tom, 3, 1).toISOString(),
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.be.false;
        });

        it('skal returnere true med 1 sykmelding, med sendtdato som er mindre eller likt 4mnd etter siste gyldige sykmeldingsdato, med oppfolgingsdialoger', () => {
            oppfolgingsdialoger = {
                data: [{
                    virksomhetsnummer: '12345678',
                }],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                orgnummer: null,
                sendtdato: leggTilMnderOgDagerFraDato(sykmeldingAktiv.mulighetForArbeid.perioder[1].tom, 3, 1).toISOString(),
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.be.true;
        });

        it('skal returnere false med 1 sykmelding, med sendtdato som er mer enn 4mnd etter siste gyldige sykmeldingsdato ', () => {
            oppfolgingsdialoger = {
                data: [],
            };
            sykmeldinger = [Object.assign({}, sykmeldingAktiv, {
                sendtdato: leggTilMnderOgDagerFraDato(sykmeldingAktiv.mulighetForArbeid.perioder[1].tom, 3, 0).toISOString(),
            })];
            expect(skalViseOppfoelgingsdialogLenke(sykmeldinger, oppfolgingsdialoger)).to.be.true;
        });
    });

    describe("finnArbeidsgivereForGyldigeSykmeldinger", () => {

        it("skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt over 3 maaneder", () => {
            const sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it("skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt", () => {
            const sykmeldinger = [sykmeldingUtgaattOver4mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it("skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt over 3mnd og 1  er utgaat under 3 mnd", () => {
            const sykmeldinger = [sykmeldingUtgaatt, sykmeldingUtgaattOver4mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it("skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt og 1 er aktiv", () => {
            const sykmeldinger = [sykmeldingUtgaatt, sykmeldingAktiv];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it("skal returnere 2 arbeidsgivere, når 2 sykmeldinger er aktive", () => {
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(2);
        });

        it("skal returnere 1 arbeidsgiver, når det er duplikat av arbeidsgiver", () => {
            const sykmeldinger = [sykmeldingAktiv, sykmeldingAktiv];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

    });

    describe("sykmeldtHarNaermestelederHosArbeidsgiver", () => {

        let virksomhetsnummer;

        it("skal returnerere false", () => {
            virksomhetsnummer = "***REMOVED***";
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.be.false;
        });

        it("skal returnerere true", () => {
            virksomhetsnummer = "***REMOVED***";
            expect(sykmeldtHarNaermestelederHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.be.true;
        });
    });

    describe("finnSykmeldtSinNaermestelederNavnHosArbeidsgiver", () => {

        let virksomhetsnummer;

        it("skal ikke returnerere en naermeste leder", () => {
            virksomhetsnummer = "***REMOVED***";
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.be.undefined;
        });

        it("skal returnerere en naermeste leder", () => {
            virksomhetsnummer = "***REMOVED***";
            expect(finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(virksomhetsnummer, naermesteLedere)).to.equal("Geir-Espen Fygle");
        });

    });

    describe("sykmeldtHarManglendeNaermesteLeder", () => {

        it("skal returnerere false", () => {
            const arbeidsgivere = [arbeidsgivereMedNaermesteLeder];
            expect(sykmeldtHarManglendeNaermesteLeder(arbeidsgivere)).to.be.false;
        });

        it("skal returnerere true", () => {
            expect(sykmeldtHarManglendeNaermesteLeder(arbeidsgivere)).to.be.true;
        });
    });

    describe("sykmeldtHarNaermestelederHosArbeidsgivere", () => {

        it("skal returnerere false", () => {
            const arbeidsgivere = [arbeidsgivereUtenNaermesteLeder];
            expect(sykmeldtHarNaermestelederHosArbeidsgivere(arbeidsgivere)).to.be.false;
        });

        it("skal returnerere true", () => {
            expect(sykmeldtHarNaermestelederHosArbeidsgivere(arbeidsgivere)).to.be.true;
        });

    });
});
