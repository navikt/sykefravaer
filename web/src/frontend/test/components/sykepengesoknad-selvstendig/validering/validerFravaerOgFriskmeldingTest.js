import chai from 'chai';
import { setLedetekster } from 'digisyfo-npm';
import { getSoknad } from '../../../mockSoknader';
import validerFravaerOgFriskmelding from '../../../../js/components/sykepengesoknad-selvstendig/validering/validerFravaerOgFriskmelding';
import { ANSVARSERKLARING, TILBAKE_I_ARBEID, JOBBET_DU_GRADERT, JOBBET_DU_100_PROSENT, TILBAKE_NAR } from '../../../../js/enums/tagtyper';
import { genererParseForCheckbox, genererParseForEnkeltverdi } from '../../../../js/components/soknad-felles/fieldUtils';
import { NEI, JA } from '../../../../js/enums/svarEnums';
import { beregnFeilmeldingnokkelFraTag } from '../../../../js/utils/soknad-felles/validerSporsmal';

const expect = chai.expect;

describe('validerFravaerOgFriskmelding', () => {
    let values;

    beforeEach(() => {
        setLedetekster({
            [beregnFeilmeldingnokkelFraTag(TILBAKE_I_ARBEID)]: 'Vennligst svar på om du var tilbake i arbeid før sykmeldingsperioden utløp',
            [beregnFeilmeldingnokkelFraTag(TILBAKE_NAR)]: 'Vennligst oppgi når du var tilbake i fullt arbeid',
            [beregnFeilmeldingnokkelFraTag(JOBBET_DU_GRADERT)]: 'Vennligst svar på om du jobbet mer enn sykmeldingen tilsier',
            [beregnFeilmeldingnokkelFraTag(JOBBET_DU_100_PROSENT)]: 'Vennligst svar på om du jobbet mer enn sykmeldingen tilsier',
        });
        const parseCheckbox = genererParseForCheckbox('1');
        const ansvarserklaeringVerdi = parseCheckbox(true);
        values = {
            [ANSVARSERKLARING]: ansvarserklaeringVerdi,
        };
    });

    it('Skal klage hvis bruker ikke har svart på om han var tilbake i fullt arbeid', () => {
        const soknad = getSoknad();
        const feilmeldinger = validerFravaerOgFriskmelding(values, { soknad });
        expect(feilmeldinger[TILBAKE_I_ARBEID]).to.equal('Vennligst svar på om du var tilbake i arbeid før sykmeldingsperioden utløp');
    });

    it('Skal klage hvis bruker har svart på om han var tilbake i fullt arbeid, men ikke fylt ut hvilken dato', () => {
        const soknad = getSoknad();
        const parse = genererParseForEnkeltverdi('1');
        const parsetSvar = parse(JA);
        values[TILBAKE_I_ARBEID] = parsetSvar;
        const feilmeldinger = validerFravaerOgFriskmelding(values, { soknad });
        expect(feilmeldinger[TILBAKE_I_ARBEID]).to.equal(undefined);
        expect(feilmeldinger[TILBAKE_NAR]).to.equal('Vennligst oppgi når du var tilbake i fullt arbeid');
    });

    it('Skal ikke klage om bruker har svart på alt som er påkrevd', () => {
        const soknad = getSoknad();
        const parse = genererParseForEnkeltverdi('1');
        const parsetSvar = parse(NEI);
        values[TILBAKE_I_ARBEID] = parsetSvar;
        values.JOBBET_DU_GRADERT_0 = parsetSvar;
        values.JOBBET_DU_GRADERT_1 = parsetSvar;
        const feilmeldinger = validerFravaerOgFriskmelding(values, { soknad });
        expect(feilmeldinger).to.deep.equal({});
    });

    describe('TILBAKE_I_ARBEID - med to perioder', () => {
        it('Skal klage hvis bruker ikke har svart på noen av periodene', () => {
            const soknad = getSoknad();
            const feilmeldinger = validerFravaerOgFriskmelding(values, { soknad });
            expect(feilmeldinger.JOBBET_DU_GRADERT_0).to.equal('Vennligst svar på om du jobbet mer enn sykmeldingen tilsier');
            expect(feilmeldinger.JOBBET_DU_GRADERT_1).to.equal('Vennligst svar på om du jobbet mer enn sykmeldingen tilsier');
        });

        it('Skal klage hvis bruker har svart på den ene perioden', () => {
            const parse = genererParseForEnkeltverdi('1');
            const soknad = getSoknad();
            const verdi = parse(JA);
            values.JOBBET_DU_GRADERT_0 = verdi;
            const feilmeldinger = validerFravaerOgFriskmelding(values, { soknad });
            expect(feilmeldinger.JOBBET_DU_GRADERT_0).to.equal(undefined);
            expect(feilmeldinger.JOBBET_DU_GRADERT_1).to.equal('Vennligst svar på om du jobbet mer enn sykmeldingen tilsier');
        });

        it('Skal ikke klage på ja/nei-spørsmål hvis bruker har svart på begge periodene', () => {
            const parse = genererParseForEnkeltverdi('1');
            const soknad = getSoknad();
            const verdi = parse(JA);
            const verdi2 = parse(NEI);
            values.JOBBET_DU_GRADERT_0 = verdi;
            values.JOBBET_DU_GRADERT_1 = verdi2;
            const feilmeldinger = validerFravaerOgFriskmelding(values, { soknad });
            expect(feilmeldinger.JOBBET_DU_GRADERT_0).to.equal(undefined);
            expect(feilmeldinger.JOBBET_DU_GRADERT_1).to.equal(undefined);
        });
    });
});
