import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import populerSoknadMedSvar, { populerSoknadMedSvarUtenKonvertertePerioder } from '../../../js/utils/soknad-felles/populerSoknadMedSvar';
import { getSoknad, getSoknadUtland } from '../../mockSoknader';
import {
    ANDRE_INNTEKTSKILDER,
    ANSVARSERKLARING,
    HVOR_MANGE_TIMER,
    HVOR_MYE_HAR_DU_JOBBET, INNTEKTSKILDE_ARBEIDSFORHOLD, INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
    JOBBET_DU_GRADERT, PERIODEUTLAND,
    TILBAKE_I_ARBEID,
    TILBAKE_NAR,
    UTLAND,
} from '../../../js/enums/tagtyper';
import { genererParseForCheckbox, genererParseForEnkeltverdi } from '../../../js/components/soknad-felles/fieldUtils';
import { CHECKED, JA, NEI } from '../../../js/enums/svarEnums';
import { PERIODER } from '../../../js/enums/svartyper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('populerSoknadMedSvar', () => {
    let soknad;
    let values;

    beforeEach(() => {
        soknad = getSoknad();
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
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === ANDRE_INNTEKTSKILDER;
        });
        const parseToppnivaasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivaasporsmal(JA);
        const inntektskildeArbeidsforholdSvar = genererParseForCheckbox(toppnivaSporsmal.undersporsmal[0].id)(true);
        const sykmeldtFraArbeidsforholdSvar = genererParseForEnkeltverdi(toppnivaSporsmal.undersporsmal[0].undersporsmal[0].id)(NEI);
        values[ANDRE_INNTEKTSKILDER] = toppnivaaSvar;
        values[INNTEKTSKILDE_ARBEIDSFORHOLD] = inntektskildeArbeidsforholdSvar;
        values[INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT] = sykmeldtFraArbeidsforholdSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const populertHarInntektskildeSporsmal = populertSoknad.sporsmal.find((s) => {
            return s.tag === ANDRE_INNTEKTSKILDER;
        });
        const populertHarInntektskildeArbeidsforholdSporsmal = populertHarInntektskildeSporsmal.undersporsmal[0].undersporsmal.find((s) => {
            return s.tag === INNTEKTSKILDE_ARBEIDSFORHOLD;
        });
        const populertSykmeldtFraArbeidsforholdSporsmal = populertHarInntektskildeArbeidsforholdSporsmal.undersporsmal.find((s) => {
            return s.tag === INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT;
        });
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
    });
});
