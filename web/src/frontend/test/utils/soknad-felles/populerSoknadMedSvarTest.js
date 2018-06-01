import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import populerSoknadMedSvar from '../../../js/utils/soknad-felles/populerSoknadMedSvar';
import { getSoknad } from '../../mockSoknader';
import {
    ANDRE_INNTEKTSKILDER,
    ANSVARSERKLARING,
    HVOR_MANGE_TIMER,
    HVOR_MYE_HAR_DU_JOBBET, INNTEKTSKILDE_ARBEIDSFORHOLD, INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT,
    JOBBET_DU_GRADERT,
    TILBAKE_I_ARBEID,
    TILBAKE_NAR,
    UTLAND,
} from '../../../js/enums/tagtyper';
import { genererParseForCheckbox, genererParseForEnkeltverdi } from '../../../js/components/soknad-felles/fieldUtils';
import { CHECKED, JA, NEI } from '../../../js/enums/svarEnums';
import { PERIODER } from '../../../js/enums/svartyper';
import { FOM, TOM } from '../../../js/enums/svarverdityper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('populerSoknadMedSvar', () => {
    let soknad;
    let values;

    beforeEach(() => {
        soknad = getSoknad();
        values = {};
    });

    it('Skal populere checkbox-svar på nivå 1', () => {
        const sporsmal = soknad.sporsmal.find((s) => {
            return s.tag === ANSVARSERKLARING;
        });
        const parseCheckbox = genererParseForCheckbox(sporsmal.id);
        const jaSvar = parseCheckbox(true);
        values[ANSVARSERKLARING] = jaSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[0].svar.svarverdi).to.deep.equal([
            {
                svarverdiType: null,
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
        expect(populertSoknad.sporsmal[1].svar.svarverdi).to.deep.equal([
            {
                svarverdiType: null,
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
        const parseUndersporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.svar.undersporsmal[0].id);
        const undersporsmalSvar = parseUndersporsmal('25.03.2018');
        values[TILBAKE_I_ARBEID] = toppnivaaSvar;
        values[TILBAKE_NAR] = undersporsmalSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[1].svar.undersporsmal[0].svar.svarverdi).to.deep.equal([
            {
                svarverdiType: null,
                verdi: '25.03.2018',
            },
        ]);
    });

    it('Når man har svart NEI på et toppnivå-spørsmål, skal underspørsmål ikke populeres selv om de er besvart', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === TILBAKE_I_ARBEID;
        });
        const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivasporsmal(NEI);
        const parseUndersporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.svar.undersporsmal[0].id);
        const undersporsmalSvar = parseUndersporsmal('25.03.2018');
        values[TILBAKE_I_ARBEID] = toppnivaaSvar;
        values[TILBAKE_NAR] = undersporsmalSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        expect(populertSoknad.sporsmal[1].svar.undersporsmal[0].svar.svarverdi).to.deep.equal([]);
    });

    it('Når man har svart JA på et toppnivå-spørsmål, skal underspørsmål også populeres, også når det er flere underspørsmål', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === `${JOBBET_DU_GRADERT}_0`;
        });
        const parseToppnivasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivasporsmal(JA);
        const parseUndersporsmal1 = genererParseForEnkeltverdi(toppnivaSporsmal.svar.undersporsmal[0].id);
        const parseUndersporsmal2 = genererParseForEnkeltverdi(toppnivaSporsmal.svar.undersporsmal[1].id);
        const undersporsmalSvar1 = parseUndersporsmal1('20');
        const undersporsmalSvar2 = parseUndersporsmal2('37,5');
        values[`${JOBBET_DU_GRADERT}_0`] = toppnivaaSvar;
        values[`${HVOR_MANGE_TIMER}_0`] = undersporsmalSvar1;
        values[`${HVOR_MYE_HAR_DU_JOBBET}_0`] = undersporsmalSvar2;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const populerteUndersporsmal = populertSoknad.sporsmal[2].svar.undersporsmal;
        expect(populerteUndersporsmal[0].svar.svarverdi).to.deep.equal([
            {
                svarverdiType: null,
                verdi: '20',
            },
        ]);
        expect(populerteUndersporsmal[1].svar.svarverdi).to.deep.equal([
            {
                svarverdiType: null,
                verdi: '37,5',
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
        expect(populertSoknad.sporsmal[5].svar.undersporsmal[0].svar.svarverdi).to.deep.equal([{
            svarverdiType: FOM,
            verdi: '20.03.2018',
        }, {
            svarverdiType: TOM,
            verdi: '21.03.2018',
        }, {
            svarverdiType: FOM,
            verdi: '23.03.2018',
        }, {
            svarverdiType: TOM,
            verdi: '23.03.2018',
        }]);
    });

    it('Skal populere CHECKBOX_GRUPPE', () => {
        const toppnivaSporsmal = soknad.sporsmal.find((s) => {
            return s.tag === ANDRE_INNTEKTSKILDER;
        });
        const parseToppnivaasporsmal = genererParseForEnkeltverdi(toppnivaSporsmal.id);
        const toppnivaaSvar = parseToppnivaasporsmal(JA);
        const inntektskildeArbeidsforholdSvar = genererParseForCheckbox(toppnivaSporsmal.svar.undersporsmal[0].id)(true);
        const sykmeldtFraArbeidsforholdSvar = genererParseForEnkeltverdi(toppnivaSporsmal.svar.undersporsmal[0].svar.undersporsmal[0].id)(NEI);
        values[ANDRE_INNTEKTSKILDER] = toppnivaaSvar;
        values[INNTEKTSKILDE_ARBEIDSFORHOLD] = inntektskildeArbeidsforholdSvar;
        values[INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT] = sykmeldtFraArbeidsforholdSvar;
        const populertSoknad = populerSoknadMedSvar(soknad, values);
        const populertHarInntektskildeSporsmal = populertSoknad.sporsmal.find((s) => {
            return s.tag === ANDRE_INNTEKTSKILDER;
        });
        const populertHarInntektskildeArbeidsforholdSporsmal = populertHarInntektskildeSporsmal.svar.undersporsmal[0].svar.undersporsmal.find((s) => {
            return s.tag === INNTEKTSKILDE_ARBEIDSFORHOLD;
        });
        const populertSykmeldtFraArbeidsforholdSporsmal = populertHarInntektskildeArbeidsforholdSporsmal.svar.undersporsmal.find((s) => {
            return s.tag === INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT;
        });
        expect(populertHarInntektskildeSporsmal.svar.svarverdi[0]).to.deep.equal({
            verdi: JA,
            svarverdiType: null,
        });
        expect(populertHarInntektskildeArbeidsforholdSporsmal.svar.svarverdi[0]).to.deep.equal({
            verdi: CHECKED,
            svarverdiType: null,
        });
        expect(populertSykmeldtFraArbeidsforholdSporsmal.svar.svarverdi[0]).to.deep.equal({
            verdi: NEI,
            svarverdiType: null,
        });
    });
});
