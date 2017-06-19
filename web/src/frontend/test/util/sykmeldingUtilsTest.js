import {
    erBrukerSykmeldtPdd,
    finnArbeidsgivereForGyldigeSykmeldinger,
    sykmeldtHarManglendeNaermesteLeder,
    sykmeldtHarNaermestelederHosArbeidsgiver,
    sykmeldtHarNaermestelederHosArbeidsgivere,
} from "../../js/utils/sykmeldingUtils";
import getSykmelding from '../mockSykmeldinger';
import { getSykmeldinger, getArbeidsgivere, getArbeidsgiver } from '../mockSykmeldinger';
import { getLedere } from '../mockLedere.js';
import { trekkDagerFraDato, trekkMnderFraDato, leggTilDagerPaaDato, trekkMnderOgDagerFraDato } from '../../js/utils/datoUtils';

import sinon from 'sinon';
import chai from "chai";
const expect = chai.expect;

describe("sykmeldingUtils", () => {

    let clock;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime());
    });

    afterEach(() => {
        clock.restore();
    });

    const sykmeldinger = getSykmeldinger;
    const naermesteLedere = getLedere;
    const arbeidsgivere = getArbeidsgivere;
    const arbeidsgivereUtenNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: false,
    });
    const arbeidsgivereMedNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: true,
    });

    const sykmeldingUtgaattOver3mnd = getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkMnderFraDato(today, 6).toISOString(),
                    tom: trekkMnderFraDato(today, 5).toISOString(),
                },
                {
                    fom: trekkMnderFraDato(today, 5).toISOString(),
                    tom: trekkMnderOgDagerFraDato(today, 3, 1).toISOString(),
                }
            ]
        }
    });
    const sykmeldingUtgaatt = getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkMnderFraDato(today, 6).toISOString(),
                    tom: trekkMnderFraDato(today, 5).toISOString(),
                },
                {
                    fom: trekkMnderFraDato(today, 4).toISOString(),
                    tom: trekkMnderFraDato(today, 3).toISOString(),
                }
            ]
        }
    });
    const sykmeldingAktiv = getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkDagerFraDato(today, 35).toISOString(),
                    tom: trekkDagerFraDato(today, 5).toISOString(),
                },
                {
                    fom: trekkDagerFraDato(today, 5).toISOString(),
                    tom: leggTilDagerPaaDato(today, 35).toISOString(),
                }
            ]
        }
    });

    describe("erBrukerSykmeldtPdd", () => {

        it("skal returnere false med 1 utgaatt sykmelding", () => {
            expect(erBrukerSykmeldtPdd([sykmeldingUtgaatt])).to.be.false;
        });

        it("skal returnere true med 1 aktiv og 1 utgaatt sykemelding", () => {
            expect(erBrukerSykmeldtPdd([sykmeldingUtgaatt, sykmeldingAktiv])).to.be.true;
        });

        it("skal returnere true med 1 aktiv sykemelding", () => {
            expect(erBrukerSykmeldtPdd(sykmeldinger)).to.be.true;
        });

    });

    describe("finnArbeidsgivereForGyldigeSykmeldinger", () => {

        it("skal ikke returnere arbeidsgivere, naar sykmelding er utgaatt over 3 maaneder", () => {
            const sykmeldinger = [sykmeldingUtgaattOver3mnd];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        it("skal returnere 1 arbeidsgiver, naar sykmelding er utgaatt", () => {
            const sykmeldinger = [sykmeldingUtgaatt];
            expect(finnArbeidsgivereForGyldigeSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        it("skal returnere 1 arbeidsgiver, når 1 sykmelding er utgaatt", () => {
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