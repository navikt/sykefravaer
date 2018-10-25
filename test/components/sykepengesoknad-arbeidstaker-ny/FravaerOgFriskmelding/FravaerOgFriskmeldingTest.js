import chai from 'chai';
import { hentSporsmalForFravaerOgFriskmelding } from '../../../../js/components/sykepengesoknad-arbeidstaker-ny/FravaerOgFriskmelding/FravaerOgFriskmelding';
import { getNySoknadArbeidstaker } from '../../../mock/mockSoknadArbeidstaker';

const expect = chai.expect;

describe('FravaerOgFriskmelding', () => {
    describe('hentSporsmalForFravaerOgFriskmelding', () => {
        it("Skal returnere spørsmål med tag = 'EGENMELDINGER'", () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).to.deep.include(soknad.sporsmal[1]);
        });

        it('Skal returnere spørsmål med tag TILBAKE_I_ARBEID', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).to.deep.include(soknad.sporsmal[2]);
        });

        it("Skal returnere spørsmål med tag JOBBET_DU_100_PROSENT_0", () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).to.deep.include(soknad.sporsmal[3]);
        });

        it("Skal returnere spørsmål med tag JOBBET_DU_GRADERT_1", () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).to.deep.include(soknad.sporsmal[4]);
        })

        it('Skal ikke returnere spørsmål med tag FERIE_PERMISJON_UTLAND', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[5]);
        });

        it('Skal ikke returnere spørsmål med tag ANDRE_INNTEKTSKILDER', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[6]);
        });

        it('Skal ikke returnere spørsmål med tag UTDANNING', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[7]);
        });

        it('Skal ikke returnere spørsmål med tag VAER_KLAR_OVER_AT', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[8]);
        });

        it('Skal ikke returnere spørsmål med tag BEKREFT_OPPLYSNINGER', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[9]);
        });

        it('Skal ikke returnere spørsmål med tag BETALER_ARBEIDSGIVER', () => {
            const soknad = getNySoknadArbeidstaker();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[10]);
        });
    });
});
