import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import sykepengesoknader, { finnSoknad } from './sykepengesoknader';
import * as actions from './sykepengesoknader_actions';

const getSoknad = () => {
    return {
        aktiviteter: [
            {
                avvik: null,
                grad: 100,
                periode: {
                    fom: '2016-07-15',
                    tom: '2017-01-19',
                },
            },
        ],
        fom: '2016-07-15',
        tom: '2017-01-19',
        egenmeldingsperioder: [],
        ferie: [],
        gjenopptattArbeidFulltUtDato: null,
        identdato: null,
        oppfoelgingsdato: null,
        permisjon: [],
        utdanning: null,
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        opprettetDato: '2017-01-01',
        sendtTilArbeidsgiverDato: null,
        sendtTilNAVDato: null,
        sykmeldingSkrevetDato: '2017-02-15',
        forrigeSykeforloepTom: '2017-01-18',
        forrigeSendteSoknadTom: null,
        id: '1',
        avbruttDato: null,
    };
};

const getParsetSoknad = () => {
    return {
        aktiviteter: [
            {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date('2016-07-15'),
                    tom: new Date('2017-01-19'),
                },
            },
        ],
        fom: new Date('2016-07-15'),
        tom: new Date('2017-01-19'),
        egenmeldingsperioder: [],
        ferie: [],
        gjenopptattArbeidFulltUtDato: null,
        identdato: null,
        oppfoelgingsdato: null,
        permisjon: [],
        utdanning: null,
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        opprettetDato: new Date('2017-01-01'),
        sendtTilArbeidsgiverDato: null,
        sendtTilNAVDato: null,
        sykmeldingSkrevetDato: new Date('2017-02-15'),
        forrigeSendteSoknadTom: null,
        forrigeSykeforloepTom: new Date('2017-01-18'),
        id: '1',
        avbruttDato: null,
        _erOppdelt: false,
    };
};

describe('sykepengesoknader', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henter', () => {
        let initialState = deepFreeze({
            data: [],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it('håndterer SYKEPENGESOKNADER_HENTET', () => {
            const action = {
                type: actions.SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [getSoknad()],
            };
            const nextState = sykepengesoknader(initialState, action);

            expect(nextState).to.deep.equal({
                data: [getParsetSoknad()],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                hentet: true,
            });
        });

        it('håndterer HENTER_SYKEPENGESOKNADER', () => {
            const action = actions.henterSykepengesoknader();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                hentet: false,
            });
        });

        it('håndterer HENT_SYKEPENGESOKNADER_FEILET', () => {
            const soknad = {
                id: '1',
            };

            initialState = deepFreeze({
                data: [soknad],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });

            const action = actions.hentSykepengesoknaderFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                henter: false,
                hentingFeilet: true,
                sender: false,
                sendingFeilet: false,
                hentet: true,
            });
        });
    });

    describe('finnSoknad', () => {
        const state = {
            sykepengesoknader: {
                data: [{ id: '1', en: 'en' }, { id: '2', innhold: 'innhold i soknadPt 2' }, { id: '3', tre: 'tre' }],
            },
        };

        it('finner soknadPt', () => {
            const s = finnSoknad(state, '2');
            expect(s.innhold).to.be.equal('innhold i soknadPt 2');
        });

        it('returnerer tomt om søknaden ikke finnes', () => {
            const s = finnSoknad(state, '4');
            expect(s).to.deep.equal({});
        });
    });
});

