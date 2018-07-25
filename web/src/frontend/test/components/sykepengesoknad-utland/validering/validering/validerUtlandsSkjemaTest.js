import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import { getSoknadUtland } from '../../../../mockSoknader';
import { ledeteksterUtland } from '../../../../mockLedetekster';
import { genererParseForCheckbox, genererParseForEnkeltverdi } from '../../../../../js/components/soknad-felles/fieldUtils';
import validerUtlandsSkjema from '../../../../../js/components/sykepengesoknad-utland/validering/validerUtlandsSkjema';
import {
    ARBEIDSGIVER,
    BEKREFT_OPPLYSNINGER_UTLAND,
    LAND,
    PERIODEUTLAND,
    SYKMELDINGSGRAD,
} from '../../../../../js/enums/tagtyper';
import { beregnFeilmeldingstekstFraTag } from '../../../../../js/utils/soknad-felles/validerSporsmal';
import { JA, NEI } from '../../../../../js/enums/svarEnums';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('validerUtlandsSkjema', () => {
    let parse;
    let enkeltverdi;
    let soknad;

    beforeEach(() => {
        parse = genererParseForCheckbox('1');
        enkeltverdi = genererParseForEnkeltverdi('1');
        soknad = getSoknadUtland();
        setLedetekster(ledeteksterUtland);
    });

    it('Skal klage hvis verdier er undefined', () => {
        const verdier = undefined;
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[BEKREFT_OPPLYSNINGER_UTLAND]).to.equal(beregnFeilmeldingstekstFraTag(BEKREFT_OPPLYSNINGER_UTLAND));
    });

    it('Skal klage hvis bruker ikke har krysset av på ansvarserklæring', () => {
        const verdier = {};
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[BEKREFT_OPPLYSNINGER_UTLAND]).to.equal(beregnFeilmeldingstekstFraTag(BEKREFT_OPPLYSNINGER_UTLAND));
    });

    it('Skal klage hvis bruker har krysset av på ansvarserklæring med en ugyldig verdi', () => {
        const verdier = {};
        verdier[BEKREFT_OPPLYSNINGER_UTLAND] = parse(false);
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[BEKREFT_OPPLYSNINGER_UTLAND]).to.equal(beregnFeilmeldingstekstFraTag(BEKREFT_OPPLYSNINGER_UTLAND));
    });

    it('Skal ikke klage hvis bruker har krysset av på ansvarserklæring', () => {
        const verdier = {};
        verdier[BEKREFT_OPPLYSNINGER_UTLAND] = parse(true);
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[BEKREFT_OPPLYSNINGER_UTLAND]).to.equal(undefined);
    });

    it('Skal klage hvis bruker ikke har skrevet inn reisemål', () => {
        const verdier = {};
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[LAND]).to.equal('Vennligst skriv inn land');
    });

    it('Skal klage hvis bruker har skrevet inn og visket ut reisemål', () => {
        const verdier = {};
        verdier[LAND] = enkeltverdi('');
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[LAND]).to.equal('Vennligst skriv inn land');
    });

    it('Skal klage hvis bruker har skrevet inn kun mellomrom som reisemål', () => {
        const verdier = {};
        verdier[LAND] = enkeltverdi('         ');
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[LAND]).to.equal('Vennligst skriv inn land');
    });

    it('Skal ikke klage hvis bruker har skrevet inn reisemål', () => {
        const verdier = {};
        verdier[LAND] = enkeltverdi('Sverige');
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[LAND]).to.equal(undefined);
    });

    it('Skal klage hvis bruker ikke har svart på arbeidsgiver', () => {
        const verdier = {};
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[ARBEIDSGIVER]).to.equal('Du har nødt å svare på dette før du går videre');
    });

    it('Skal ikke klage hvis bruker har svart ja på arbeidsgiver', () => {
        const verdier = {};
        verdier[ARBEIDSGIVER] = enkeltverdi(JA);
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[ARBEIDSGIVER]).to.equal(undefined);
    });

    it('Skal ikke klage hvis bruker har svart nei på arbeidsgiver', () => {
        const verdier = {};
        verdier[ARBEIDSGIVER] = enkeltverdi(NEI);
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[ARBEIDSGIVER]).to.equal(undefined);
    });

    it('Skal klage hvis bruker har svart ja på arbeidsgiver men ikke svart på sykmeldingsgrad', () => {
        const verdier = {};
        verdier[ARBEIDSGIVER] = enkeltverdi(JA);
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[SYKMELDINGSGRAD]).to.equal('Du har nødt å svare på dette før du går videre');
    });

    it('Skal ikke klage på sykmeldingsgrad hvis bruker har svart nei på arbeidsgiver', () => {
        const verdier = {};
        verdier[ARBEIDSGIVER] = enkeltverdi(NEI);
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger[SYKMELDINGSGRAD]).to.equal(undefined);
    });

    it('Skal ikke klage når bruker har svart alt "riktig"', () => {
        const verdier = {
            [ARBEIDSGIVER]: enkeltverdi(JA),
            [SYKMELDINGSGRAD]: enkeltverdi(JA),
            [BEKREFT_OPPLYSNINGER_UTLAND]: parse(true),
            [LAND]: enkeltverdi('Spania'),
            [PERIODEUTLAND]: [{
                fom: '27.06.2018',
                tom: '30.06.2018',
            }],
        };
        const feilmeldinger = validerUtlandsSkjema(verdier, { soknad });
        expect(feilmeldinger).to.deep.equal({});
    });
});
