import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import { getNySoknadSelvstendig } from '../../../mockSoknadSelvstendig';
import { genererParseForCheckbox } from '../../../../js/components/soknad-felles/fieldUtils';
import validerFoerDuBegynner from '../../../../js/components/sykepengesoknad-selvstendig/validering/validerFoerDuBegynner';
import { ANSVARSERKLARING } from '../../../../js/enums/tagtyper';
import { beregnFeilmeldingnokkelFraTag } from '../../../../js/utils/soknad-felles/validerSporsmal';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('validerFoerDuBegynner', () => {
    let parse;

    beforeEach(() => {
        parse = genererParseForCheckbox('1');
        setLedetekster({
            [beregnFeilmeldingnokkelFraTag(ANSVARSERKLARING)]: 'Du må bekrefte dette før du går videre',
        });
    });

    it('Skal klage hvis verdier er undefined', () => {
        const verdier = undefined;
        const soknad = getNySoknadSelvstendig();
        const feilmeldinger = validerFoerDuBegynner(verdier, { soknad });
        expect(feilmeldinger[ANSVARSERKLARING]).to.equal('Du må bekrefte dette før du går videre');
    });

    it('Skal klage hvis bruker ikke har krysset av på ansvarserklæring', () => {
        const verdier = {};
        const soknad = getNySoknadSelvstendig();
        const feilmeldinger = validerFoerDuBegynner(verdier, { soknad });
        expect(feilmeldinger[ANSVARSERKLARING]).to.equal('Du må bekrefte dette før du går videre');
    });

    it('Skal klage hvis bruker har krysset av på ansvarserklæring med en ugyldig verdi', () => {
        const verdier = {};
        const soknad = getNySoknadSelvstendig();
        const verdi = parse(false);
        verdier[ANSVARSERKLARING] = verdi;
        const feilmeldinger = validerFoerDuBegynner(verdier, { soknad });
        expect(feilmeldinger[ANSVARSERKLARING]).to.equal('Du må bekrefte dette før du går videre');
    });

    it('Skal ikke klage hvis bruker har krysset av på ansvarserklæring', () => {
        const verdier = {};
        const soknad = getNySoknadSelvstendig();
        const verdi = parse(true);
        verdier[ANSVARSERKLARING] = verdi;
        const feilmeldinger = validerFoerDuBegynner(verdier, { soknad });
        expect(feilmeldinger[ANSVARSERKLARING]).to.equal(undefined);
    });
});
