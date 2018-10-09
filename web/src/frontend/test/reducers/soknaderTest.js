import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import soknader from '../../js/reducers/soknader';
import * as actions from '../../js/actions/soknader_actions';
import mockSoknader, { getSoknad, soknadrespons } from '../mockSoknader';
import { ANSVARSERKLARING } from '../../js/enums/tagtyper';
import { bekreftSykmeldingAngret } from '../../js/actions/dinSykmelding_actions';
import { AVBRUTT, SENDT } from '../../js/enums/soknadstatuser';
import { OPPHOLD_UTLAND } from '../../js/enums/soknadtyper';

describe('soknader', () => {
    let getStateMedDataHentet;
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-03-15').getTime());
        getStateMedDataHentet = () => {
            const state = soknader();
            const action = actions.soknaderHentet(soknadrespons);
            return soknader(deepFreeze(state), action);
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Håndterer henter', () => {
        const action = actions.henterSoknader();
        const initState = soknader();
        const state = soknader(deepFreeze(initState), action);
        expect(state.henter).to.equal(true);
    });

    it('Håndterer hentSoknaderFeilet', () => {
        const action = actions.hentSoknaderFeilet();
        const initState = soknader();
        const state = soknader(deepFreeze(initState), action);
        expect(state.hentingFeilet).to.equal(true);
        expect(state.henter).to.equal(false);
        expect(state.hentet).to.equal(true);
    });

    it('Håndterer soknaderHentet', () => {
        const state = getStateMedDataHentet();
        expect(state.hentingFeilet).to.equal(false);
        expect(state.henter).to.equal(false);
        expect(state.data).to.deep.equal(mockSoknader);
    });

    it('Håndterer senderSoknad', () => {
        const initState = getStateMedDataHentet();
        const action = actions.senderSoknad(soknadrespons[0].id);
        const state = soknader(deepFreeze(initState), action);
        expect(state.sender).to.equal(true);
    });

    it('Håndterer soknadSendt', () => {
        const initState = getStateMedDataHentet();
        const data = {
            ...getSoknad(),
            test: 'ok',
        };
        const action2 = actions.senderSoknad();
        const initState2 = soknader(deepFreeze(initState), action2);
        const action = actions.soknadSendt(data);
        const state = soknader(deepFreeze(initState2), action);
        expect(state.sender).to.equal(false);
        const soknad = state.data.find((s) => {
            return s.id === soknadrespons[0].id;
        });
        const sendtSoknad = {
            ...data,
            innsendtDato: new Date('2018-03-15'),
            status: SENDT,
        };
        expect(soknad).to.deep.equal(sendtSoknad);
    });

    it('Håndterer sendSoknadFeilet', () => {
        const initState = getStateMedDataHentet();
        const action = actions.sendSoknadFeilet(soknadrespons[0].id);
        const nextState = soknader(deepFreeze(initState), action);
        expect(nextState.sendingFeilet).to.equal(true);
    });

    it('Håndterer avbryterSoknad', () => {
        const initState = getStateMedDataHentet();
        const action = actions.avbryterSoknad(soknadrespons[0].id);
        const state = soknader(deepFreeze(initState), action);
        expect(state.avbryter).to.equal(true);
        expect(state.avbrytSoknadFeilet).to.equal(false);
    });

    it('Håndterer soknadAvbrutt når søknaden som avbrytes er en selvstendig_frilanser-søknad', () => {
        const initState = getStateMedDataHentet();

        const avbryterAction = actions.avbryterSoknad();
        let nyState = soknader(deepFreeze(initState), avbryterAction);

        const avbruttAction = actions.soknadAvbrutt(nyState.data[0]);
        nyState = soknader(deepFreeze(nyState), avbruttAction);

        expect(nyState.data).to.deep.equal([{
            ...nyState.data[0],
            status: AVBRUTT,
            avbruttDato: new Date(),
        }]);
        expect(nyState.avbryter).to.equal(false);
        expect(nyState.avbrytSoknadFeilet).to.equal(false);
    });

    it('Håndterer soknadAvbrutt når søknaden som avbrytes er en utenlandsopphold-søknad', () => {
        const initState = getStateMedDataHentet();
        initState.data[0].soknadstype = OPPHOLD_UTLAND;

        const avbryterAction = actions.avbryterSoknad();
        let nyState = soknader(deepFreeze(initState), avbryterAction);

        const avbruttAction = actions.soknadAvbrutt(nyState.data[0]);
        nyState = soknader(deepFreeze(nyState), avbruttAction);

        expect(nyState.data).to.deep.equal([]);
        expect(nyState.avbryter).to.equal(false);
        expect(nyState.avbrytSoknadFeilet).to.equal(false);
    });

    it('Håndterer avbrytSoknadFeilet', () => {
        const initState = getStateMedDataHentet();
        const action = actions.avbrytSoknadFeilet();
        const state = soknader(deepFreeze(initState), action);
        expect(state.avbryter).to.equal(false);
        expect(state.avbrytSoknadFeilet).to.equal(true);
    });

    it('Håndterer soknadOppdatert', () => {
        const initState = getStateMedDataHentet();
        const soknadSomEndres = initState.data[0];
        const endretSoknad = {
            ...soknadSomEndres,
            sporsmal: [
                ...soknadSomEndres.sporsmal.filter((s) => {
                    return s.tag === ANSVARSERKLARING;
                }),
            ],
        };
        const action = actions.soknadOppdatert(endretSoknad);
        const state = soknader(deepFreeze(initState), action);
        expect(state.data).to.deep.equal([endretSoknad]);
    });

    it('Fjerner NYE søknader ved bekreftSykmeldingAngret()', () => {
        const initState = getStateMedDataHentet();
        initState.data[0].status = 'NY';
        const action = bekreftSykmeldingAngret('14e78e84-50a5-45bb-9919-191c54f99691');
        const state = soknader(deepFreeze(initState), action);
        expect(state.data).to.deep.equal([]);
    });

    it('Fjerner ikke SENDTE søknader ved bekreftSykmeldingAngret()', () => {
        const initState = getStateMedDataHentet();
        initState.data[0].status = 'SENDT';
        const action = bekreftSykmeldingAngret('14e78e84-50a5-45bb-9919-191c54f99691');
        const state = soknader(deepFreeze(initState), action);
        expect(state.data).to.deep.equal(initState.data);
    });

    it('Fjerner bare søknader som tilhører den aktuelle sykmeldingen', () => {
        const initState = getStateMedDataHentet();
        initState.data = [
            getSoknad({ sykmeldingId: '1', status: 'NY' }),
            getSoknad({ sykmeldingId: '2', status: 'NY' }),
            getSoknad({ sykmeldingId: '2', status: 'NY' }),
        ];
        const action = bekreftSykmeldingAngret('2');
        const state = soknader(deepFreeze(initState), action);
        expect(state.data).to.deep.equal([getSoknad({ sykmeldingId: '1', status: 'NY' })]);
    });

    it('Fjerner bare søknader som som er NY eller FREMTIDIG for aktuelle sykmeldingen', () => {
        const initState = getStateMedDataHentet();
        initState.data = [
            getSoknad({ sykmeldingId: '1', status: 'NY' }),
            getSoknad({ sykmeldingId: '2', status: 'NY' }),
            getSoknad({ sykmeldingId: '2', status: 'FREMTIDIG' }),
            getSoknad({ sykmeldingId: '2', status: 'SENDT' }),
        ];
        const action = bekreftSykmeldingAngret('2');
        const state = soknader(deepFreeze(initState), action);

        const forventetResultat = [
            getSoknad({ sykmeldingId: '1', status: 'NY' }),
            getSoknad({ sykmeldingId: '2', status: 'SENDT' }),
        ];

        expect(state.data).to.deep.equal(forventetResultat);
    });
});
