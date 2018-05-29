import chai from 'chai';
import { setLedetekster } from 'digisyfo-npm';
import chaiEnzyme from 'chai-enzyme';
import validerAktiviteterISykmeldingsperioden from '../../../../js/components/sykepengesoknad-selvstendig/validering/validerAktiviteterISykmeldingsperioden';
import { getSoknad } from '../../../mockSoknader';
import {
    ANDRE_INNTEKTSKILDER,
    HVILKE_ANDRE_INNTEKTSKILDER,
    INNTEKTSKILDE_ANNET,
    INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT,
} from '../../../../js/enums/tagtyper';
import { genererParseForCheckbox, genererParseForEnkeltverdi } from '../../../../js/components/soknad-felles/fieldUtils';
import { NEI, JA } from '../../../../js/enums/svarEnums';
import { getLedetekstNokkelFraTag } from '../../../../js/components/sykepengesoknad-selvstendig/validering/valideringUtils';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('validerAktiviteterISykmeldingsperioden', () => {
    beforeEach(() => {
        setLedetekster({
            [getLedetekstNokkelFraTag(ANDRE_INNTEKTSKILDER)]: 'Vennligst svar på om du har andre inntektskilder',
            [getLedetekstNokkelFraTag(HVILKE_ANDRE_INNTEKTSKILDER)]: 'Vennligst oppgi hvilke andre inntektskilder du har',
            [getLedetekstNokkelFraTag(INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT)]: 'Vennligst svar på om du er sykmeldt fra dette',
        });
    });

    describe('Andre inntektskilder', () => {
        let parse;

        beforeEach(() => {
            parse = genererParseForEnkeltverdi('1');
        });

        it('Skal klage hvis bruker ikke har svart på om han har andre inntektskilder', () => {
            const soknad = getSoknad();
            const feilmeldinger = validerAktiviteterISykmeldingsperioden({}, { soknad });
            expect(feilmeldinger[ANDRE_INNTEKTSKILDER]).to.equal('Vennligst svar på om du har andre inntektskilder');
        });

        it('Skal ikke klage hvis bruker har svart NEI på om hun har andre inntektskilder', () => {
            const soknad = getSoknad();
            const svar = parse(NEI);
            const values = {
                [ANDRE_INNTEKTSKILDER]: svar,
            };
            const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
            expect(feilmeldinger[ANDRE_INNTEKTSKILDER]).to.equal(undefined);
        });

        describe('Når bruker har svart JA på spørsmål om andre inntektskilder', () => {
            let soknad;
            let values;

            beforeEach(() => {
                soknad = getSoknad();
                const svar = parse(JA);
                values = {
                    [ANDRE_INNTEKTSKILDER]: svar,
                };
            });

            it('Skal ikke klage på besvarelse av ANDRE_INNTEKTSKILDER-spørsmålet', () => {
                const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
                expect(feilmeldinger[ANDRE_INNTEKTSKILDER]).to.equal(undefined);
            });

            it('Skal klage på besvarelse av HVILKE_ANDRE_INNTEKTSKILDER-spørsmålet når ingen inntektskilder er oppgitt', () => {
                const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
                expect(feilmeldinger[HVILKE_ANDRE_INNTEKTSKILDER]).to.deep.equal({
                    _error: 'Vennligst oppgi hvilke andre inntektskilder du har',
                });
            });

            it('Skal klage på besvarelse av HVILKE_ANDRE_INNTEKTSKILDER-spørsmålet når ingen inntektskilder er oppgitt med gyldig svar', () => {
                const parseCheckbox = genererParseForCheckbox('1');
                const uncheckedSvar = parseCheckbox(false);
                values = {
                    ...values,
                    [INNTEKTSKILDE_ANNET]: uncheckedSvar,
                };
                const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
                expect(feilmeldinger[HVILKE_ANDRE_INNTEKTSKILDER]).to.deep.equal({
                    _error: 'Vennligst oppgi hvilke andre inntektskilder du har',
                });
            });

            it('Skal ikke klage på besvarelse av HVILKE_ANDRE_INNTEKTSKILDER-spørsmålet når det er oppgitt en annen inntektskilde', () => {
                const parseForCheckbox = genererParseForCheckbox('1');
                const checkedSvar = parseForCheckbox(true);
                values = {
                    ...values,
                    [INNTEKTSKILDE_ANNET]: checkedSvar,
                };
                const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
                expect(feilmeldinger[HVILKE_ANDRE_INNTEKTSKILDER]).to.equal(undefined);
            });

            it('Skal ikke klage på besvarelse av INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT-spørsmålet når ' +
                'det er oppgitt en annen inntektskilde og bruker har svart at han ikke er sykmeldt fra den', () => {
                const parseForCheckbox = genererParseForCheckbox('1');
                const checkedSvar = parseForCheckbox(true);
                const uncheckedSvar = parseForCheckbox(false);
                values = {
                    ...values,
                    [INNTEKTSKILDE_ANNET]: checkedSvar,
                    [INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT]: uncheckedSvar,
                };
                const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
                expect(feilmeldinger[INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT]).to.equal(undefined);
            });

            it('Skal ikke klage på besvarelse av INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT-spørsmålet når det ' +
                'er oppgitt en annen inntektskilde og bruker har svart at han er sykmeldt fra den', () => {
                const parseForCheckbox = genererParseForCheckbox('1');
                const checkedSvar = parseForCheckbox(true);
                values = {
                    ...values,
                    [INNTEKTSKILDE_ANNET]: checkedSvar,
                    [INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT]: checkedSvar,
                };
                const feilmeldinger = validerAktiviteterISykmeldingsperioden(values, { soknad });
                expect(feilmeldinger[INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT]).to.equal(undefined);
            });
        });
    });
});
