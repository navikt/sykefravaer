import {
    erBrukerSykmeldtPdd,
    finnArbeidsgivereForAktiveSykmeldinger
} from "../../js/utils/sykmeldingUtils";
import getSykmelding from '../mockSykmeldinger';
import { getSykmeldinger } from '../mockSykmeldinger';
import { trekkDagerFraDato, leggTilDagerPaaDato } from '../../js/utils/datoUtils';

import chai from "chai";
const expect = chai.expect;

describe("sykmeldingUtils", () => {

    const today = new Date();

    const sykmeldinger = getSykmeldinger;
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

    describe("finnArbeidsgivereForAktiveSykmeldinger", () => {

        it("skal ikke returnere arbeidsgivere", () => {
            const sykmeldinger = [sykmeldingUtgaatt];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger)).to.have.length(0);
        });

        it("skal returnere 1 arbeidsgiver", () => {
            const sykmeldinger = [sykmeldingUtgaatt, sykmeldingAktiv];
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger)).to.have.length(1);
        });

        it("skal returnere 2 arbeidsgivere", () => {
            expect(finnArbeidsgivereForAktiveSykmeldinger(sykmeldinger)).to.have.length(2);
        });

    });

});