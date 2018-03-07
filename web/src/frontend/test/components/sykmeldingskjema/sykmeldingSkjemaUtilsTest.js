import chai from 'chai';
import { getSkjemaModus } from "../../../js/components/sykmeldingskjema/sykmeldingSkjemaUtils";

const expect = chai.expect;

describe("getSkjemaModus", () => {

    let component;

    it("Skal være GA_VIDERE by default", () => {
        const modus = getSkjemaModus({}, false);
        expect(modus).to.equal("GA_VIDERE")
    })

    it("Skal være AVBRYT dersom periode eller sykmeldingsgrad er feil", () => {
        let values = {
            feilaktigeOpplysninger: [{
                opplysning: "periode",
                avkrysset: true,
            }],
            opplysningeneErRiktige: false,
        }
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal("AVBRYT")

        values.feilaktigeOpplysninger = [{
            opplysning: "sykmeldingsgrad",
            avkrysset: true,
        }]
        const modus2 = getSkjemaModus(values, false);
        expect(modus2).to.equal("AVBRYT")
    });

    it("Skal være SEND dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
        let values = {
            valgtArbeidssituasjon: 'ARBEIDSTAKER'
        }
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal("SEND")
    });


    it("Skal være BEKREFT dersom arbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver.orgnummer = '0'", () => {
        let values = {
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
            valgtArbeidsgiver: {
                orgnummer: '0'
            }
        }
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal("BEKREFT")
    });

    it("Skal være BEKREFT dersom bruker har strengt fortrolig adresse", () => {
        let values = {
            valgtArbeidssituasjon: 'ARBEIDSTAKER'
        }
        const modus = getSkjemaModus(values, true);
        expect(modus).to.equal("BEKREFT")
    });

});
