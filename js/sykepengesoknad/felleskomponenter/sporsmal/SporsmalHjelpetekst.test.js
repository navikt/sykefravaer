import { FERIE } from '../../enums/tagtyper';
import expect from '../../../../test/expect';
import { harHjelpetekst } from './SporsmalHjelpetekst';
import mockNySoknadArbeidstaker, { mockNySoknadArbeidstakerMedFeriesporsmalSomHovedsporsmal } from '../../../../test/mock/mockNySoknadArbeidstaker';
import { parsetSoknadUtland1 } from '../../../../test/mock/mockSoknadUtland';

describe('SporsmalHjelpetekst', () => {
    describe('harHjelpetekst', () => {
        it('Skal returnere true for FERIE når vi har en arbeidstaker-søknad med ferie-spørsmål som hovedspørsmål', () => {
            const soknad = mockNySoknadArbeidstakerMedFeriesporsmalSomHovedsporsmal();
            const tag = FERIE;
            expect(harHjelpetekst(tag, soknad)).to.equal(true);
        });

        it('Skal returnere false for FERIE når vi har en arbeidstaker-søknad med ferie-spørsmål som underspørsmål', () => {
            const soknad = mockNySoknadArbeidstaker();
            const tag = FERIE;
            expect(harHjelpetekst(tag, soknad)).to.equal(false);
        });


        it('Skal returnere false for FERIE når vi har en utlands-søknad', () => {
            const soknad = parsetSoknadUtland1;
            const tag = FERIE;
            expect(harHjelpetekst(tag, soknad)).to.equal(false);
        });
    });
});
