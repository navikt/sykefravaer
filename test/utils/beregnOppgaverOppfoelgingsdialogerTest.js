import chai from 'chai';
import sinon from 'sinon';
import beregnOppgaverOppfoelgingsdialoger from '../../js/utils/beregnOppgaverOppfoelgingsdialoger';

const expect = chai.expect;

describe('beregnOppgaverOppfoelgingsdialoger', () => {
    let oppfolgingsdialogUnderArbeid;
    let klokke;
    const dagensDato = new Date('2017-01-01');

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        oppfolgingsdialogUnderArbeid = {
            status: 'UNDER_ARBEID',
            virksomhet: {
                virksomhetsnummer: '',
            },
            godkjenninger: [],
            sistEndretAv: {
                fnr: 'arbedsgiverFnr',
            },
        };
    });

    afterEach(() => {
        klokke.restore();
    });

    it('Tom state.oppfoelgingsdialoger.data gir objekt med tomme lister', () => {
        expect(beregnOppgaverOppfoelgingsdialoger([])).to.deep.equal({
            nyePlaner: [],
            avventendeGodkjenninger: [],
        });
    });

    it('Finner ny plan', () => {
        const dialog = {
            ...oppfolgingsdialogUnderArbeid,
            arbeidstaker: {
                fnr: 'fnr',
                sistInnlogget: null,
            },
        };
        expect(beregnOppgaverOppfoelgingsdialoger([dialog])).to.deep.equal({
            nyePlaner: [dialog],
            avventendeGodkjenninger: [],
        });
    });

    it('Finner godkjent plan', () => {
        const dialog = {
            ...oppfolgingsdialogUnderArbeid,
            arbeidstaker: {
                fnr: 'fnr',
                sistInnlogget: new Date('2017-08-14'),
            },
            godkjenninger: [{
                godkjent: true,
                godkjentAv: {
                    fnr: 'arbedsgiverFnr',
                },
            }],
        };
        expect(beregnOppgaverOppfoelgingsdialoger([dialog])).to.deep.equal({
            nyePlaner: [],
            avventendeGodkjenninger: [dialog],
        });
    });

    it('Ny og godkjent plan telles bare som en', () => {
        const dialog = {
            ...oppfolgingsdialogUnderArbeid,
            arbeidstaker: {
                fnr: 'fnr',
                sistInnlogget: null,
            },
            godkjenninger: [{
                godkjent: true,
                godkjentAv: {
                    fnr: 'arbedsgiverFnr',
                },
            }],
        };
        expect(beregnOppgaverOppfoelgingsdialoger([dialog])).to.deep.equal({
            nyePlaner: [],
            avventendeGodkjenninger: [dialog],
        });
    });
});
