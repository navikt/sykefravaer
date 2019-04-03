import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {
    ANDRE_INNTEKTSKILDER,
    ANSVARSERKLARING, FERIE,
    HVOR_MANGE_TIMER,
    HVOR_MYE_HAR_DU_JOBBET, INNTEKTSKILDE_ARBEIDSFORHOLD, INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
    JOBBET_DU_GRADERT, PERIODER, PERIODEUTLAND,
    TILBAKE_I_ARBEID,
    TILBAKE_NAR,
    UTLAND,
} from '../enums/tagtyper';
import { getNySoknadSelvstendig } from '../../../test/mock/mockSoknadSelvstendig';
import { genererParseForCheckbox, genererParseForEnkeltverdi } from '../felleskomponenter/sporsmal/fieldUtils';
import populerSoknadMedSvar, { populerSoknadMedSvarUtenKonvertertePerioder } from './populerSoknadMedSvar';
import { CHECKED, JA, NEI } from '../enums/svarEnums';
import { getSoknadUtland } from '../../../test/mock/mockSoknadUtland';
import mockNySoknadArbeidstaker from '../../../test/mock/mockNySoknadArbeidstaker';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('populerSoknadMedSvar', () => {
    let soknad;
    let values;

    const finnSporsmal = (sporsmalsliste, tag) => {
        return sporsmalsliste.reduce((acc, spm) => {
            const match = spm.tag === tag;
            return match
                ? [...acc, spm]
                : [...acc, ...finnSporsmal(spm.undersporsmal, tag)];
        }, []);
    };

    beforeEach(() => {
        soknad = getNySoknadSelvstendig();
        values = {
            id: soknad.id,
        };
    });

    it('Skal populere checkbox-svar på nivå 1', () => {
        const sporsmal = soknad.sporsmal.find((s) => {
            return s.tag === ANSVARSERKLARING;
        });
        const parseCheckbox = genererParseForCheckbox(sporsmal.id);
        const jaSvar = parseCheckbox(true);
        values[ANSVARSERKLARING] = jaSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[0].svar).to.deep.equal([
            {
                verdi: CHECKED,
            },
        ]);
    });

    it('Skal ikke populere dersom spørsmålsId for svar er feil', () => {
        const parseCheckbox = genererParseForCheckbox('33');
        const jaSvar = parseCheckbox(true);
        values[ANSVARSERKLARING] = jaSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[0].svar).to.deep.equal([]);
    });

    it('Skal populere JA/NEI-svar på nivå 1', () => {
        const sporsmal = soknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const parse = genererParseForEnkeltverdi(sporsmal.id);
        const jaSvar = parse(JA);
        values[TILBAKE_I_ARBEID] = jaSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[1].svar).to.deep.equal([
            {
                verdi: JA,
            },
        ]);
    });

    it('Når man har svart JA på et toppnivå-spørsmål, skal underspørsmål også populeres', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivasporsmal(JA);
        const parseUndersporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.undersporsmal[0].id);
        const undersporsmalSvar = parseUndersporsmal('25.03.2018');
        values[TILBAKE_I_ARBEID] = toppnivaaSvar;
        values[TILBAKE_NAR] = undersporsmalSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[1].undersporsmal[0].svar).to.deep.equal([
            {
                verdi: '2018-03-25',
            },
        ]);
    });

    it('Når man har svart NEI på et toppnivå-spørsmål, skal underspørsmål ikke populeres selv om de er besvart', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivasporsmal(NEI);
        const parseUndersporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.undersporsmal[0].id);
        const undersporsmalSvar = parseUndersporsmal('25.03.2018');
        values[TILBAKE_I_ARBEID] = toppnivaaSvar;
        values[TILBAKE_NAR] = undersporsmalSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[1].undersporsmal[0].svar).to.deep.equal([]);
    });

    it('Når man har svart JA på et toppnivå-spørsmål, skal underspørsmål også populeres, også når det er flere underspørsmål', () => {
        const sporsmalForDenneTesten = (s) => {
            return s.tag === `${JOBBET_DU_GRADERT}_1`;
        };
        const toppnivaSporsmal = soknad.sporsmal.find(sporsmalForDenneTesten);
        const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivasporsmal(JA);
        const parseUndersporsmal1 = genererParseForEnkeltverdi(toppnivaSporsmal.undersporsmal[0].id);
        const parseUndersporsmal2 = genererParseForEnkeltverdi(toppnivaSporsmal.undersporsmal[1].id);
        const undersporsmalSvar1 = parseUndersporsmal1('20');
        const undersporsmalSvar2 = parseUndersporsmal2('65');
        values[`${JOBBET_DU_GRADERT}_1`] = toppnivaaSvar;
        values[`${HVOR_MANGE_TIMER}_1`] = undersporsmalSvar1;
        values[`${HVOR_MYE_HAR_DU_JOBBET}_1`] = undersporsmalSvar2;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const populerteUndersporsmal = populertSoknad.sporsmal.find(sporsmalForDenneTesten).undersporsmal;
        expect(populerteUndersporsmal[0].svar).to.deep.equal([
            {
                verdi: '20',
            },
        ]);
        expect(populerteUndersporsmal[1].svar).to.deep.equal([
            {
                verdi: '65',
            },
        ]);
    });

    it('Skal populere perioder', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === UTLAND;
        });
        const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivasporsmal(JA);
        const undersporsmalSvar = [{
            fom: '20.03.2018',
            tom: '21.03.2018',
        }, {
            fom: '23.03.2018',
            tom: '23.03.2018',
        }];
        values[UTLAND] = toppnivaaSvar;
        values[PERIODER] = undersporsmalSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const periodesporsmal = populertSoknad.sporsmal[5].undersporsmal[0];
        expect(periodesporsmal.svar).to.deep.equal([{
            verdi: JSON.stringify({
                fom: '2018-03-20',
                tom: '2018-03-21',
            }),
        }, {
            verdi: JSON.stringify({
                fom: '2018-03-23',
                tom: '2018-03-23',
            }),
        }]);
        expect(periodesporsmal.min).to.equal('2018-05-20');
        expect(periodesporsmal.max).to.equal('2018-05-28');
    });

    it('Skal populere CHECKBOX_GRUPPE', () => {
        const toppnivaSporsmal = finnSporsmal(soknad.sporsmal, ANDRE_INNTEKTSKILDER)[0];
        const parseToppnivaasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivaasporsmal(JA);

        const inntektskildeArbeidsforholdSvar = genererParseForCheckbox(finnSporsmal(soknad.sporsmal, INNTEKTSKILDE_ARBEIDSFORHOLD)[0].id)(true);
        const sykmeldtFraArbeidsforholdSvar = genererParseForEnkeltverdi(finnSporsmal(soknad.sporsmal, INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT)[0].id)(NEI);
        values[ANDRE_INNTEKTSKILDER] = toppnivaaSvar;
        values[INNTEKTSKILDE_ARBEIDSFORHOLD] = inntektskildeArbeidsforholdSvar;
        values[INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT] = sykmeldtFraArbeidsforholdSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const populertHarInntektskildeSporsmal = finnSporsmal(populertSoknad.sporsmal, ANDRE_INNTEKTSKILDER)[0];
        const populertHarInntektskildeArbeidsforholdSporsmal = finnSporsmal(populertSoknad.sporsmal, INNTEKTSKILDE_ARBEIDSFORHOLD)[0];
        const populertSykmeldtFraArbeidsforholdSporsmal = finnSporsmal(populertSoknad.sporsmal, INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT)[0];
        expect(populertHarInntektskildeSporsmal.svar).to.deep.equal([{
            verdi: JA,
        }]);
        expect(populertHarInntektskildeArbeidsforholdSporsmal.svar).to.deep.equal([{
            verdi: CHECKED,
        }]);
        expect(populertSykmeldtFraArbeidsforholdSporsmal.svar).to.deep.equal([{
            verdi: NEI,
        }]);
    });

    it('Skal populere DATO', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const parseToppnivaasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivaasporsmal(JA);
        const tilbakeNarSporsmal = toppnivaSporsmal.undersporsmal[0];
        const tilBakeNarSvar = genererParseForEnkeltverdi(tilbakeNarSporsmal.id)('23.05.2018');
        values[TILBAKE_I_ARBEID] = toppnivaaSvar;
        values[TILBAKE_NAR] = tilBakeNarSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);

        const populertDatoSporsmal = populertSoknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        }).undersporsmal.find((s) => {
            return s.tag === TILBAKE_NAR;
        });
        expect(populertDatoSporsmal.svar).to.deep.equal([{
            verdi: '2018-05-23',
        }]);
    });

    it('Skal konvertere datoformater i MIN/MAX', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const parseToppnivaasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivaasporsmal(JA);
        const tilbakeNarSporsmal = toppnivaSporsmal.undersporsmal[0];
        const tilBakeNarSvar = genererParseForEnkeltverdi(tilbakeNarSporsmal.id)('23.05.2018');
        values[TILBAKE_I_ARBEID] = toppnivaaSvar;
        values[TILBAKE_NAR] = tilBakeNarSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const populertToppnivaaSporsmal = populertSoknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const undersporsmal = populertToppnivaaSporsmal.undersporsmal[0];
        expect(undersporsmal.min).to.equal('2018-05-20');
        expect(undersporsmal.max).to.equal('2018-05-28');
    });


    it('Skal gjøre alle min/max om til strenger, også for spørsmål som ikke er besvart', () => {
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const undersporsmal = populertSoknad.sporsmal[1].undersporsmal[0];
        const utenlandssporsmal = populertSoknad.sporsmal[5].undersporsmal[0];
        expect(undersporsmal.min).to.equal('2018-05-20');
        expect(undersporsmal.max).to.equal('2018-05-28');
        expect(utenlandssporsmal.min).to.equal('2018-05-20');
        expect(utenlandssporsmal.max).to.equal('2018-05-28');
    });

    it('Skal funke selv om det ikke finnes svar for alle spørsmål', () => {
        const soknadUtland = getSoknadUtland();
        const valuesUtland = {
            [PERIODEUTLAND]: [{}],
        };
        populerSoknadMedSvar(soknadUtland, valuesUtland);
    });

    it('Skal populere RADIO_GRUPPE', () => {
        const arbeidstakersoknad = mockNySoknadArbeidstaker();
        const hentSporsmal = (sporsmalsliste, tag) => {
            return sporsmalsliste.find((s) => {
                return s.tag === tag;
            });
        };
        const toppnivaSporsmal = hentSporsmal(arbeidstakersoknad.sporsmal, 'JOBBET_DU_100_PROSENT_0');
        const parseToppnivaSporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);

        const undersporsmalHvorMangeTimerPerUkeNormalt = hentSporsmal(toppnivaSporsmal.undersporsmal, 'HVOR_MANGE_TIMER_PER_UKE_0');
        const parseUnderspormsalHvorMangeTimerPerUkeNormalt = genererParseForEnkeltverdi(undersporsmalHvorMangeTimerPerUkeNormalt.id);

        const underspormalHvorMyeHarDuJobbet = hentSporsmal(toppnivaSporsmal.undersporsmal, 'HVOR_MYE_HAR_DU_JOBBET_0');
        const parseUndersporsmalHvorMyeHarDuJobbet = genererParseForEnkeltverdi(underspormalHvorMyeHarDuJobbet.id);

        const undersporsmalHvorMyeTimer = hentSporsmal(underspormalHvorMyeHarDuJobbet.undersporsmal, 'HVOR_MYE_TIMER_0');
        const parseUndersporsmalHvorMyeTimer = genererParseForEnkeltverdi(undersporsmalHvorMyeTimer.id);

        const undersporsmalHvorMyeProsent = hentSporsmal(underspormalHvorMyeHarDuJobbet.undersporsmal, 'HVOR_MYE_PROSENT_0');
        const parseUndersporsmalHvorMyeProsent = genererParseForEnkeltverdi(undersporsmalHvorMyeProsent.id);

        const undersporsmalAntallTimerJobbet = hentSporsmal(undersporsmalHvorMyeTimer.undersporsmal, 'HVOR_MYE_TIMER_VERDI_0');
        const parseAntallTimerJobbet = genererParseForEnkeltverdi(undersporsmalAntallTimerJobbet.id);

        const undersporsmalProsentJobbet = hentSporsmal(undersporsmalHvorMyeProsent.undersporsmal, 'HVOR_MYE_PROSENT_VERDI_0');
        const parseUndersporsmalProsentJobbet = genererParseForEnkeltverdi(undersporsmalProsentJobbet.id);

        values[toppnivaSporsmal.tag] = parseToppnivaSporsmal(JA);
        values[undersporsmalHvorMangeTimerPerUkeNormalt.tag] = parseUnderspormsalHvorMangeTimerPerUkeNormalt('37,5');
        values[underspormalHvorMyeHarDuJobbet.tag] = parseUndersporsmalHvorMyeHarDuJobbet('timer');
        values[undersporsmalHvorMyeTimer.tag] = parseUndersporsmalHvorMyeTimer('CHECKED');
        values[undersporsmalHvorMyeProsent.tag] = parseUndersporsmalHvorMyeProsent('');
        values[undersporsmalAntallTimerJobbet.tag] = parseAntallTimerJobbet('10');
        values[undersporsmalProsentJobbet.tag] = parseUndersporsmalProsentJobbet('35');

        const populertSoknad = populerSoknadMedSvar(arbeidstakersoknad, values);
        const parsetHovedsporsmal = hentSporsmal(populertSoknad.sporsmal, 'JOBBET_DU_100_PROSENT_0');
        const populertUndersporsmalNormalJobbing = hentSporsmal(parsetHovedsporsmal.undersporsmal, 'HVOR_MANGE_TIMER_PER_UKE_0');
        const populertUndersporsmalHvorMyeHarDuJobbet = hentSporsmal(parsetHovedsporsmal.undersporsmal, 'HVOR_MYE_HAR_DU_JOBBET_0');
        const populertUndersporsmalSvarITimer = hentSporsmal(populertUndersporsmalHvorMyeHarDuJobbet.undersporsmal, 'HVOR_MYE_TIMER_0');
        const populertUndersporsmalSvarIProsent = hentSporsmal(populertUndersporsmalHvorMyeHarDuJobbet.undersporsmal, 'HVOR_MYE_PROSENT_0');
        const populertUndersporsmalAntallTimerJobbet = hentSporsmal(populertUndersporsmalSvarITimer.undersporsmal, 'HVOR_MYE_TIMER_VERDI_0');
        const populertUndersporsmalProsentJobbet = hentSporsmal(populertUndersporsmalSvarIProsent.undersporsmal, 'HVOR_MYE_PROSENT_VERDI_0');

        expect(populertUndersporsmalNormalJobbing.svar).to.deep.equal([{
            verdi: '37,5',
        }]);
        expect(populertUndersporsmalHvorMyeHarDuJobbet.svar).to.deep.equal([]);
        expect(populertUndersporsmalAntallTimerJobbet.svar).to.deep.equal([{
            verdi: '10',
        }]);
        expect(populertUndersporsmalProsentJobbet.svar).to.deep.equal([]);

        expect(populertUndersporsmalSvarIProsent.svar).to.deep.equal([]);
        expect(populertUndersporsmalSvarITimer.svar).to.deep.equal([{
            verdi: CHECKED,
        }]);
    });

    describe('populerSoknadMedSvarUtenKonvertertePerioder', () => {
        it('Skal populere perioder', () => {
            const toppnivaSporsmal = soknad.sporsmal.find((s) => {
                return s.tag === UTLAND;
            });
            const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
            const toppnivaaSvar = parseToppnivasporsmal(JA);
            const undersporsmalSvar = [{
                fom: '20.03.2018',
                tom: '21.03.2018',
            }, {
                fom: '23.03.2018',
                tom: '23.03.2018',
            }];
            values[UTLAND] = toppnivaaSvar;
            values[PERIODER] = undersporsmalSvar;
            const populertSoknad = populerSoknadMedSvarUtenKonvertertePerioder(soknad, values);
            const periodesporsmal = populertSoknad.sporsmal[5].undersporsmal[0];
            expect(periodesporsmal.svar).to.deep.equal([{
                verdi: JSON.stringify({
                    fom: '20.03.2018',
                    tom: '21.03.2018',
                }),
            }, {
                verdi: JSON.stringify({
                    fom: '23.03.2018',
                    tom: '23.03.2018',
                }),
            }]);
            expect(periodesporsmal.min).to.equal('2018-05-20');
            expect(periodesporsmal.max).to.equal('2018-05-28');
        });

        it('Skal populere perioder når det bare er fylt ut fom', () => {
            const toppnivaSporsmal = soknad.sporsmal.find((s) => {
                return s.tag === UTLAND;
            });
            const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
            const toppnivaaSvar = parseToppnivasporsmal(JA);
            const undersporsmalSvar = [{
                fom: '20.03.2018',
            }];
            values[UTLAND] = toppnivaaSvar;
            values[PERIODER] = undersporsmalSvar;
            const populertSoknad = populerSoknadMedSvarUtenKonvertertePerioder(soknad, values);
            const periodesporsmal = populertSoknad.sporsmal[5].undersporsmal[0];
            expect(periodesporsmal.svar).to.deep.equal([{
                verdi: JSON.stringify({
                    fom: '20.03.2018',
                }),
            }]);
            expect(periodesporsmal.min).to.equal('2018-05-20');
            expect(periodesporsmal.max).to.equal('2018-05-28');
        });

        it('Skal whipe svar på underspørsmål dersom underspørsmål ikke er stilt', () => {
            const soknad2 = {
                sporsmal: [{
                    id: '2981',
                    tag: 'JOBBET_DU_100_PROSENT_0',
                    sporsmalstekst: 'I perioden 3. - 11. februar 2019 var du 100 % sykmeldt fra TESTBEDRIFT AS. Jobbet du noe i denne perioden?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [{
                        verdi: 'NEI',
                    }],
                    undersporsmal: [{
                        id: '77023',
                        tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                        sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                        undertekst: 'timer per uke',
                        svartype: 'TALL',
                        min: 1,
                        max: 150,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    }, {
                        id: '32120',
                        tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                        sporsmalstekst: 'Hvor mye jobbet du totalt 3. - 11. februar 2019 hos TESTBEDRIFT AS?',
                        undertekst: null,
                        svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [{
                            id: '744',
                            tag: 'HVOR_MYE_PROSENT_0',
                            sporsmalstekst: 'prosent',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [{
                                verdi: 'CHECKED',
                            }],
                            undersporsmal: [{
                                id: '6895',
                                tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                sporsmalstekst: null,
                                undertekst: 'prosent',
                                svartype: 'TALL',
                                min: 1,
                                max: 99,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            }],
                        }, {
                            id: '65242',
                            tag: 'HVOR_MYE_TIMER_0',
                            sporsmalstekst: 'timer',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [{
                                id: '44673',
                                tag: 'HVOR_MYE_TIMER_VERDI_0',
                                sporsmalstekst: null,
                                undertekst: 'timer totalt',
                                svartype: 'TALL',
                                min: 1,
                                max: 193,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            }],
                        }],
                    }],
                }, {
                    id: '31265',
                    tag: 'FERIE_PERMISJON_UTLAND',
                    sporsmalstekst: 'Har du hatt ferie, permisjon eller oppholdt deg utenfor Norge i perioden 3. - 11. februar 2019?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: true,
                    kriterieForVisningAvUndersporsmal: 'JA',
                    svar: [{
                        verdi: 'JA',
                    }],
                    undersporsmal: [{
                        id: '48120',
                        tag: 'FERIE_PERMISJON_UTLAND_HVA',
                        sporsmalstekst: 'Kryss av alt som gjelder deg:',
                        undertekst: null,
                        svartype: 'CHECKBOX_GRUPPE',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: true,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [{
                            id: '38443',
                            tag: 'FERIE',
                            sporsmalstekst: 'Jeg tok ut ferie',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: true,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [{
                                verdi: 'CHECKED',
                            }],
                            undersporsmal: [{
                                id: '59364',
                                tag: 'FERIE_NAR',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'PERIODER',
                                min: '2019-02-03T00:00:00.000Z',
                                max: '2019-02-11T00:00:00.000Z',
                                pavirkerAndreSporsmal: true,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [{
                                    verdi: '{"fom":"04.02.2019","tom":"11.02.2019"}',
                                }],
                                undersporsmal: [],
                            }],
                        }, {
                            id: '29533',
                            tag: 'PERMISJON',
                            sporsmalstekst: 'Jeg hadde permisjon',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [{
                                id: '36919',
                                tag: 'PERMISJON_NAR',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'PERIODER',
                                min: '2019-02-03T00:00:00.000Z',
                                max: '2019-02-11T00:00:00.000Z',
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            }],
                        }, {
                            id: '52269',
                            tag: 'UTLAND',
                            sporsmalstekst: 'Jeg var utenfor Norge',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: true,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [],
                            undersporsmal: [{
                                id: '94743',
                                tag: 'UTLAND_NAR',
                                sporsmalstekst: null,
                                undertekst: null,
                                svartype: 'PERIODER',
                                min: '2019-02-03T00:00:00.000Z',
                                max: '2019-02-11T00:00:00.000Z',
                                pavirkerAndreSporsmal: true,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            }, {
                                id: '59061',
                                tag: 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                                sporsmalstekst: 'Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?',
                                undertekst: null,
                                svartype: 'JA_NEI',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            }],
                        }],
                    }],
                }],
            };
            const verdier = {
                ANSVARSERKLARING: {
                    svarverdier: [{
                        verdi: 'CHECKED',
                    }],
                },
                EGENMELDINGER: {
                    svarverdier: [{
                        verdi: 'NEI',
                    }],
                },
                EGENMELDINGER_NAR: [{
                    fom: '01.02.2019',
                    tom: '02.02.2019',
                }, {
                    fom: '02.02.2019',
                    tom: '02.02.2019',
                }],
                TILBAKE_I_ARBEID: {
                    svarverdier: [{
                        verdi: 'NEI',
                    }],
                },
                JOBBET_DU_100_PROSENT_0: {
                    svarverdier: [{
                        verdi: 'NEI',
                    }],
                },
                HVOR_MYE_HAR_DU_JOBBET_0: {
                    svarverdier: [{
                        verdi: 'prosent',
                    }],
                },
                HVOR_MYE_PROSENT_0: {
                    svarverdier: [{
                        verdi: 'CHECKED',
                    }],
                },
                FERIE_PERMISJON_UTLAND: {
                    svarverdier: [{
                        verdi: 'NEI',
                    }],
                },
                FERIE: {
                    svarverdier: [{
                        verdi: 'CHECKED',
                    }],
                },
                FERIE_NAR: [{
                    fom: '04.02.2019',
                    tom: '11.02.2019',
                }],
                PERMISJON_NAR: [{}],
                UTLAND_NAR: [{}],
                ANDRE_INNTEKTSKILDER: {
                    svarverdier: [{
                        verdi: 'NEI',
                    }],
                },
                UTDANNING: {
                    svarverdier: [{
                        verdi: 'JA',
                    }],
                },
                UTDANNING_START: {
                    svarverdier: [{
                        verdi: '07.02.2019',
                    }],
                },
                FULLTIDSSTUDIUM: {
                    svarverdier: [{
                        verdi: 'JA',
                    }],
                },
            };
            const populertSoknad = populerSoknadMedSvarUtenKonvertertePerioder(soknad2, verdier);
            const harHattFerieSporsmal = finnSporsmal(populertSoknad.sporsmal, FERIE)[0];
            const harHattFerieNarSporsmal = finnSporsmal(populertSoknad.sporsmal, 'FERIE_NAR')[0];
            const jobbetDuProsent = finnSporsmal(populertSoknad.sporsmal, 'HVOR_MYE_PROSENT_0')[0];
            expect(harHattFerieNarSporsmal.svar).to.deep.equal([]);
            expect(harHattFerieSporsmal.svar).to.deep.equal([]);
            expect(jobbetDuProsent.svar).to.deep.equal([{
                verdi: 'CHECKED',
            }]);
        });
    });
});
