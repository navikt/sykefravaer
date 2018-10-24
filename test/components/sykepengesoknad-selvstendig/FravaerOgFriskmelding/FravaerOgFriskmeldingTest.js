import chai from 'chai';
import { hentSporsmalForFravaerOgFriskmelding } from '../../../../js/components/sykepengesoknad-selvstendig/FravaerOgFriskmelding/FravaerOgFriskmelding';
import { getNySoknadSelvstendig } from '../../../mock/mockSoknadSelvstendig';

const expect = chai.expect;

describe('FravaerOgFriskmelding', () => {
    describe('hentSporsmalForFravaerOgFriskmelding', () => {
        it("Skal returnere spørsmål med tag = 'TILBAKE_I_ARBEID' (1)", () => {
            const soknad = getNySoknadSelvstendig();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).to.deep.include(soknad.sporsmal[1]);
        });

        it('Skal returnere alle spørsmål om jobbing unduer sykefraværet', () => {
            const soknad = getNySoknadSelvstendig();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).to.deep.include(soknad.sporsmal[1]);
            expect(sporsmal).to.deep.include(soknad.sporsmal[2]);
        });

        it('Skal returnere alle spørsmål om jobbing unduer sykefraværet (2)', () => {
            const arbeidssporsmal3 = {
                id: '44',
                tag: 'JOBBET_DU_GRADERT_3',
            };
            const soknad = getNySoknadSelvstendig();
            const soknad2 = getNySoknadSelvstendig({
                sporsmal: [...soknad.sporsmal, arbeidssporsmal3],
            });
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad2);
            expect(sporsmal).to.deep.include(arbeidssporsmal3);
        });

        it('Skal ikke inneholde spørsmål om inntektskilder', () => {
            const soknad = getNySoknadSelvstendig();
            const sporsmal = hentSporsmalForFravaerOgFriskmelding(soknad);
            expect(sporsmal).not.to.deep.include(soknad.sporsmal[4]);
        });
    });
});
