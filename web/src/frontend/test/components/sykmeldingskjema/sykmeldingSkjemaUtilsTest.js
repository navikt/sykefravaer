import chai from 'chai';
import { arbeidssituasjoner } from 'digisyfo-npm';
import { getSkjemaModus, skalViseFrilansersporsmal } from "../../../js/components/sykmeldingskjema/sykmeldingSkjemaUtils";
import { sykmeldingskjemamodi as modi } from '../../../js/enums/sykmeldingskjemaenums';
import getSykmelding from "../../mockSykmeldinger";

const expect = chai.expect;

describe("getSkjemaModus", () => {

    let component;

    it("Skal være GA_VIDERE by default", () => {
        const modus = getSkjemaModus({}, false);
        expect(modus).to.equal(modi.GA_VIDERE)
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
        expect(modus).to.equal(modi.AVBRYT)

        values.feilaktigeOpplysninger = [{
            opplysning: "sykmeldingsgrad",
            avkrysset: true,
        }]
        const modus2 = getSkjemaModus(values, false);
        expect(modus2).to.equal(modi.AVBRYT)
    });

    it("Skal være SEND dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
        let values = {
            valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER
        }
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.SEND)
    });


    it("Skal være BEKREFT dersom arbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver.orgnummer = '0'", () => {
        let values = {
            valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER,
            valgtArbeidsgiver: {
                orgnummer: '0'
            }
        }
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.BEKREFT)
    });

    it("Skal være BEKREFT dersom bruker har strengt fortrolig adresse", () => {
        let values = {
            valgtArbeidssituasjon: 'ARBEIDSTAKER'
        }
        const modus = getSkjemaModus(values, true);
        expect(modus).to.equal(modi.BEKREFT)
    });

});


describe("skalViseFrilansersporsmal", () => {

    let vanligSykmelding;
    let behandlingsdagerSykmelding;
    let reisetilskuddSykmelding; 
    let avventendeSykmelding;
    let values; 

    beforeEach(() => {
        vanligSykmelding = getSykmelding();
        behandlingsdagerSykmelding = {
            mulighetForArbeid: {
                perioder: [{
                    behandlingsdager: 5
                }]
            }
        };
        reisetilskuddSykmelding = {
            mulighetForArbeid: {
                perioder: [{
                    reisetilskudd: true
                }]
            }
        };
        avventendeSykmelding = {
            mulighetForArbeid: {
                perioder: [{
                    avventende: "Trenger en bedre stol"
                }]
            }
        };
        values = {
            valgtArbeidssituasjon: arbeidssituasjoner.DEFAULT,
        };
    });

    it("Skal returnere false hvis sykmelding er med behandlingsdager", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(behandlingsdagerSykmelding, values, true)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er med behandlingsdager", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(behandlingsdagerSykmelding, values, false)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er med reisetilskudd", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(reisetilskuddSykmelding, values, false)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er med reisetilskudd", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(reisetilskuddSykmelding, values, true)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er avventende", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(avventendeSykmelding, values, false)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er avventende", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(avventendeSykmelding, values, true)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon ikke er valgt", () => {
        expect(skalViseFrilansersporsmal(vanligSykmelding, values)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon er ARBEIDSTAKER", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.ARBEIDSTAKER;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon er ARBEIDSLEDIG", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.ARBEIDSLEDIG;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values)).to.be.false;
    });

    it("Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er FRILANSER", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values)).to.be.true;
    });

    it("Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er NAERINGSDRIVENDE", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values)).to.be.true;
    });

    it("Skal returnere false hvis sykmelding ikke er vanlig og arbeidssituasjon er FRILANSER", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(avventendeSykmelding, values)).to.be.false;
    });

    it("Skal returnere false hvis sykmelding ikke er vanlig og arbeidssituasjon er NAERINGSDRIVENDE", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        expect(skalViseFrilansersporsmal(behandlingsdagerSykmelding, values)).to.be.false;
    });

    it("Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er FRILANSER og erUtenforVentetid = false", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values, false)).to.be.true;
    });

    it("Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er NAERINGSDRIVENDE og erUtenforVentetid = false", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values, false)).to.be.true;
    });

    it("Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon er NAERINGSDRIVENDE og erUtenforVentetid = true", () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        expect(skalViseFrilansersporsmal(vanligSykmelding, values, true)).to.be.false;
    });

});