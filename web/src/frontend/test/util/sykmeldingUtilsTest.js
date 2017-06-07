import {
    erBrukerSykmeldtPdd,
    finnArbeidsgivereForAktiveSykmeldinger,
    sykmeldtHarManglendeNaermesteLeder,
    sykmeldtHarNaermestelederHosArbeidsgiver,
    sykmeldtHarNaermestelederHosArbeidsgivere,
} from "../../js/utils/sykmeldingUtils";
import getSykmelding from '../mockSykmeldinger';
import { getSykmeldinger, getArbeidsgivere, getArbeidsgiver } from '../mockSykmeldinger';
import { getLedere } from '../mockLedere.js';
import { trekkDagerFraDato, leggTilDagerPaaDato } from '../../js/utils/datoUtils';

import chai from "chai";
const expect = chai.expect;

describe("sykmeldingUtils", () => {

    const today = new Date();

    const sykmeldinger = getSykmeldinger;
    const naermesteLedere = getLedere;
    const arbeidsgivere = getArbeidsgivere;
    const arbeidsgivereUtenNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: false,
    });
    const arbeidsgivereMedNaermesteLeder = getArbeidsgiver({
        harNaermesteLeder: true,
    });

    const sykmeldingUtgaatt = getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkDagerFraDato(today, 60),
                    tom: trekkDagerFraDato(today, 30),
                },
                {
                    fom: trekkDagerFraDato(today, 20),
                    tom: trekkDagerFraDato(today, 5),
                }
            ]
        }
    });
    const sykmeldingAktiv = getSykmelding({
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkDagerFraDato(today, 35),
                    tom: trekkDagerFraDato(today, 5),
                },
                {
                    fom: trekkDagerFraDato(today, 5),
                    tom: leggTilDagerPaaDato(today, 35),
                }
            ]
        }
    });

    describe("erBrukerSykmeldtPdd", () => {

        xit("skal returnere false med 1 utgaatt sykmelding", () => {
            expect(erBrukerSykmeldtPdd([sykmeldingUtgaatt])).to.be.false;
        });

        xit("skal returnere true med 1 aktiv og 1 utgaatt sykemelding", () => {
            expect(erBrukerSykmeldtPdd([sykmeldingUtgaatt, sykmeldingAktiv])).to.be.true;
        });

        xit("skal returnere true med 1 aktiv sykemelding", () => {
            expect(erBrukerSykmeldtPdd(sykmeldinger)).to.be.true;
        });

    });

    describe("finnArbeidsgivereForAktiveSykmeldinger", () => {

        xit("skal ikke returnere arbeidsgivere", () => {
            const sykmeldinger = [sykmeldingUtgaatt];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(0);
        });

        xit("skal returnere 1 arbeidsgiver", () => {
            const sykmeldinger = [sykmeldingUtgaatt, sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(1);
        });

        xit("skal returnere 2 arbeidsgivere", () => {
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger, naermesteLedere)).to.have.length(2);
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