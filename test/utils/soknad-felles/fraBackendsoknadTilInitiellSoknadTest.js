import fraBackendsoknadTilInitiellSoknad from '../../../js/utils/soknad-felles/fraBackendsoknadTilInitiellSoknad';
import mockLagretSoknad from '../../mock/mockLagretSoknad';
import expect from '../../expect';
import {
    ARBEIDSGIVER,
    BEKREFT_OPPLYSNINGER_UTLAND,
    LAND,
    PERIODEUTLAND,
    SYKMELDINGSGRAD,
} from '../../../js/enums/tagtyper';
import mockSoknadArbeidstakerUtfylt from '../../mock/mockNySoknadArbeidstakerUtfylt';

describe('fraBackendsoknadTilInitiellSoknad', () => {
    it('Skal mappe perioder på norsk format', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad());
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '01.09.2018',
            tom: '01.10.2018',
        }, {
            fom: '12.08.207_',
            tom: '12.08.2017',
        }]);
    });

    it('Skal mappe perioder på ISO-format', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad({
            sporsmal: [{
                id: '55',
                tag: 'PERIODEUTLAND',
                sporsmalstekst: 'Når skal du være utenfor Norge?',
                undertekst: null,
                svartype: 'PERIODER',
                min: '2018-06-03',
                max: '2019-03-03',
                kriterieForVisningAvUndersporsmal: null,
                svar: [
                    {
                        verdi: '{"fom":"01.02.20__","tom":"01.03.2017"}',
                    },
                ],
                undersporsmal: [],
            }],
        }));
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '01.02.20__',
            tom: '01.03.2017',
        }]);
    });

    it('Skal mappe uferdige perioder ', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockLagretSoknad({
            sporsmal: [{
                id: '55',
                tag: 'PERIODEUTLAND',
                sporsmalstekst: 'Når skal du være utenfor Norge?',
                undertekst: null,
                svartype: 'PERIODER',
                min: '2018-06-03',
                max: '2019-03-03',
                kriterieForVisningAvUndersporsmal: null,
                svar: [
                    {
                        verdi: '{"fom":"2018-09-10","tom":"2018-09-20"}',
                    },
                ],
                undersporsmal: [],
            }],
        }));
        expect(initiellSoknad[PERIODEUTLAND]).to.deep.equal([{
            fom: '10.09.2018',
            tom: '20.09.2018',
        }]);
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

    it('Skal mappe RADIO_GRUPPE', () => {
        const initiellSoknad = fraBackendsoknadTilInitiellSoknad(mockSoknadArbeidstakerUtfylt());
        expect(initiellSoknad.HVOR_MYE_HAR_DU_JOBBET_1).to.deep.equal({
            sporsmalsid: '66',
            svarverdier: [{
                verdi: 'PROSENT',
            }],
        });
    });
});
