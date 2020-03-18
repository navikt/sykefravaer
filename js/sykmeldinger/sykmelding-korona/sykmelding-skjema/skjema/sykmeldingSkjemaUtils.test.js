import chai from 'chai';
import { arbeidssituasjoner } from '@navikt/digisyfo-npm';
import { getSkjemaModus, skalViseFrilansersporsmal } from './sykmeldingSkjemaUtils';
import { sykmeldingskjemamodi as modi } from '../../../enums/sykmeldingskjemaenums';
import getSykmelding from '../../../../../test/mock/mockSykmeldinger';
import { getSykmeldingSkjemanavn } from '../../../../enums/skjemanavn';
import { getFeilaktigeOpplysninger } from './DinSykmeldingSkjema';

const { expect } = chai;

describe('getSkjemaModus', () => {
    it('Skal være SEND by default', () => {
        const modus = getSkjemaModus({}, false);
        expect(modus).to.equal(modi.SEND);
    });

    it('Skal være GA_VIDERE by default når det er satt initielle verdier', () => {
        const modus = getSkjemaModus({
            feilaktigeOpplysninger: getFeilaktigeOpplysninger(),
            valgtArbeidssituasjon: null,
        }, false);
        expect(modus).to.equal(modi.SEND);
    });

    it('Skal være AVBRYT dersom periode eller sykmeldingsgrad er feil', () => {
        const values = {
            feilaktigeOpplysninger: [{
                opplysning: 'periode',
                avkrysset: true,
            }],
            opplysningeneErRiktige: false,
        };
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.AVBRYT);

        values.feilaktigeOpplysninger = [{
            opplysning: 'sykmeldingsgrad',
            avkrysset: true,
        }];
        const modus2 = getSkjemaModus(values, false);
        expect(modus2).to.equal(modi.AVBRYT);
    });

    it("Skal være SEND dersom valgtArbeidssituasjon === 'ARBEIDSTAKER'", () => {
        const values = {
            valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER,
        };
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.SEND);
    });

    it("Skal være BEKREFT dersom arbeidssituasjon === 'ARBEIDSTAKER' og valgtArbeidsgiver.orgnummer = '0'", () => {
        const values = {
            valgtArbeidssituasjon: arbeidssituasjoner.ARBEIDSTAKER,
            valgtArbeidsgiver: {
                orgnummer: '0',
            },
        };
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.BEKREFT);
    });

    it("Skal være SEND dersom valgtArbeidssituasjon === 'NAERINGSDRIVENDE'", () => {
        const values = {
            valgtArbeidssituasjon: arbeidssituasjoner.NAERINGSDRIVENDE,
        };
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.BEKREFT);
    });

    it('Skal være SEND dersom arbeidssituasjon === null og valgtArbeidsgiver = null', () => {
        const values = {
            valgtArbeidssituasjon: null,
            valgtArbeidsgiver: null,
            valgtArbeidssituasjonShadow: 'ANNEN_ARBEIDSSITUASJON',
        };
        const modus = getSkjemaModus(values, false);
        expect(modus).to.equal(modi.SEND);
    });

    it('Skal være BEKREFT dersom bruker har strengt fortrolig adresse', () => {
        const values = {
            valgtArbeidssituasjon: 'ARBEIDSTAKER',
        };
        const modus = getSkjemaModus(values, true);
        expect(modus).to.equal(modi.BEKREFT);
    });
});


describe('skalViseFrilansersporsmal', () => {
    let vanligSykmelding;
    let behandlingsdagerSykmelding;
    let reisetilskuddSykmelding;
    let avventendeSykmelding;
    let state;
    let setFormValuesToState;
    let values;
    let setMeta;

    beforeEach(() => {
        vanligSykmelding = getSykmelding();
        behandlingsdagerSykmelding = {
            id: 'behandlingsdager-sykmelding-id',
            mulighetForArbeid: {
                perioder: [{
                    behandlingsdager: 5,
                }],
            },
        };
        reisetilskuddSykmelding = {
            id: 'reisetilskudd-sykmelding-id',
            mulighetForArbeid: {
                perioder: [{
                    reisetilskudd: true,
                }],
            },
        };
        avventendeSykmelding = {
            id: 'avventende-sykmelding-id',
            mulighetForArbeid: {
                perioder: [{
                    avventende: 'Trenger en bedre stol',
                }],
            },
        };
        state = {
            arbeidsgiversSykmeldinger: {
                data: [vanligSykmelding, behandlingsdagerSykmelding, reisetilskuddSykmelding, avventendeSykmelding],
            },
            sykmeldingMeta: {},
        };
        values = {
            valgtArbeidssituasjon: arbeidssituasjoner.DEFAULT,
        };
        setFormValuesToState = (state_, sykmeldingId, values_) => {
            return {
                ...state_,
                form: {
                    [getSykmeldingSkjemanavn(sykmeldingId)]: {
                        values: values_,
                    },
                },
            };
        };
        setMeta = (_state, sykmelding, _erUtenforVentetid) => {
            return {
                ...state,
                sykmeldingMeta: {
                    [sykmelding.id]: {
                        erUtenforVentetid: _erUtenforVentetid,
                    },
                },
            };
        };
    });

    it('Skal returnere false hvis sykmelding er med behandlingsdager', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, values);
        state = setMeta(state, behandlingsdagerSykmelding, true);
        expect(skalViseFrilansersporsmal(state, behandlingsdagerSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er med behandlingsdager', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, values);
        state = setMeta(state, behandlingsdagerSykmelding, false);
        expect(skalViseFrilansersporsmal(state, behandlingsdagerSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er med reisetilskudd', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, values);
        state = setMeta(state, reisetilskuddSykmelding, false);
        expect(skalViseFrilansersporsmal(state, reisetilskuddSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er med reisetilskudd', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, values);
        state = setMeta(state, reisetilskuddSykmelding, true);
        expect(skalViseFrilansersporsmal(state, reisetilskuddSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er avventende', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, values);
        state = setMeta(state, avventendeSykmelding, false);
        expect(skalViseFrilansersporsmal(state, avventendeSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er avventende', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, avventendeSykmelding.id, values);
        state = setMeta(state, avventendeSykmelding, true);
        expect(skalViseFrilansersporsmal(state, avventendeSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon ikke er valgt', () => {
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon er ARBEIDSTAKER', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.ARBEIDSTAKER;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon er ARBEIDSLEDIG', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.ARBEIDSLEDIG;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(false);
    });

    it('Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er FRILANSER', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(true);
    });

    it('Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er NAERINGSDRIVENDE', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(true);
    });

    it('Skal returnere false hvis sykmelding ikke er vanlig og arbeidssituasjon er FRILANSER', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, avventendeSykmelding.id, values);
        expect(skalViseFrilansersporsmal(state, avventendeSykmelding.id)).to.equal(false);
    });

    it('Skal returnere false hvis sykmelding ikke er vanlig og arbeidssituasjon er NAERINGSDRIVENDE', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        state = setFormValuesToState(state, behandlingsdagerSykmelding.id, values);
        expect(skalViseFrilansersporsmal(state, behandlingsdagerSykmelding.id)).to.equal(false);
    });

    it('Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er FRILANSER og erUtenforVentetid = false', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.FRILANSER;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        state = setMeta(state, vanligSykmelding, false);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(true);
    });

    it('Skal returnere true hvis sykmelding er vanlig og arbeidssituasjon er NAERINGSDRIVENDE og erUtenforVentetid = false', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        state = setMeta(state, vanligSykmelding, false);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(true);
    });

    it('Skal returnere false hvis sykmelding er vanlig og arbeidssituasjon er NAERINGSDRIVENDE og erUtenforVentetid = true', () => {
        values.valgtArbeidssituasjon = arbeidssituasjoner.NAERINGSDRIVENDE;
        state = setFormValuesToState(state, vanligSykmelding.id, values);
        state = setMeta(state, vanligSykmelding, true);
        expect(skalViseFrilansersporsmal(state, vanligSykmelding.id)).to.equal(false);
    });
});
