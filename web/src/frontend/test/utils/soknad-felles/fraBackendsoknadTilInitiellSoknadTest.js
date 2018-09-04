import fraBackendsoknadTilInitiellSoknad from '../../../js/utils/soknad-felles/fraBackendsoknadTilInitiellSoknad';
import mockLagretSoknad from '../../mockLagretSoknad';
import expect from '../../expect';
import { ARBEIDSGIVER, BEKREFT_OPPLYSNINGER_UTLAND, LAND, PERIODEUTLAND, SYKMELDINGSGRAD } from '../../../js/enums/tagtyper';

describe('fraBackendsoknadTilInitiellSoknad', () => {
    it('Skal mappe perioder', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '01.09.2018',
            tom: '01.10.2018',
        }, {
            fom: '12.08.207_',
            tom: '12.08.2017',
        }]);
    });

    it('Skal mappe perioder når lagret søknad ikke har perioder', () => {
        const soknadMedTommePerioder = mockLagretSoknad();
        soknadMedTommePerioder.sporsmal[0].svar = [];
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(soknadMedTommePerioder);
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{}]);
    });

    it('Skal mappe fritekst', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[LAND]).to.deep.equal({
            sporsmalsid: '56',
            svarverdier: [{
                verdi: 'Oslo',
            }],
        });
    });

    it('Skal mappe JA_NEI', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[ARBEIDSGIVER]).to.deep.equal({
            sporsmalsid: '57',
            svarverdier: [{
                verdi: 'JA',
            }],
        });
    });

    it('Skal mappe CHECKBOX_PANEL', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[BEKREFT_OPPLYSNINGER_UTLAND]).to.deep.equal({
            sporsmalsid: '61',
            svarverdier: [{
                verdi: 'CHECKED',
            }],
        });
    });

    it('Skal mappe underspørsmål', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[SYKMELDINGSGRAD]).to.deep.equal({
            sporsmalsid: '58',
            svarverdier: [{
                verdi: 'JA',
            }],
        });
    });
});
