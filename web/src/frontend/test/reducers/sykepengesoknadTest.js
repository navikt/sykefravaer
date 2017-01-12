import {List, Map, fromJS} from 'immutable';
import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/sykepengesoknad_actions';

import sykepengesoknad from '../../js/reducers/sykepengesoknad';

describe('sykepengesoknad', () => {

    describe('henter', () => {
        const soknad = {
            id: '1',
        };

        let initialState = deepFreeze({
            data: [],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it('håndterer SET_SYKEPENGESOKNADER', () => {
            const action = {
                type: 'SET_SYKEPENGESOKNADER',
                soknader: [{
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }],
            };
            const nextState = sykepengesoknad(initialState, action);

            expect(nextState).to.deep.equal({
                data: [{
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {Trainspotting: 1}
                }],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
        });

        it("håndterer HENTER_SYKEPENGESOKNADER", () => {
            const action = {
                type: "HENTER_SYKEPENGESOKNADER"
            };
            const nextState = sykepengesoknad(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
        });

        it("håndterer HENT_SYKEPENGESOKNADER_FEILET", () => {
            const soknad = {
                id: '1',
            }

            initialState = deepFreeze({
                data: [soknad],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });

            const action = {
                type: "HENT_SYKEPENGESOKNADER_FEILET"
            };
            const nextState = sykepengesoknad(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                henter: false,
                hentingFeilet: true,
                sender: false,
                sendingFeilet: false,
            });
        });
    });

    describe("innsending", () => {

        const soknad = {
            id: '1',
        };

        let initialState = deepFreeze({
            data: [soknad],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it("håndterer SENDER_SYKEPENGESOKNAD", () => {
            const action = {
                type: "SENDER_SYKEPENGESOKNAD"
            };
            const nextState = sykepengesoknad(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SENDER_SYKEPENGESOKNAD_FEILET", () => {
            const action = {
                type: "SENDER_SYKEPENGESOKNAD_FEILET"
            };
            const nextState = sykepengesoknad(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SYKEPENGESOKNAD_SENDT", () => {
            let initialState = deepFreeze({
                data: [{id: '1'},{id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = {
                type: "SYKEPENGESOKNAD_SENDT",
                sykepengesoknadsId: '1',
            };
            const nextState = sykepengesoknad(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{ id: '1', status: 'SENDT' }, { id: '2' }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });
    });


});
