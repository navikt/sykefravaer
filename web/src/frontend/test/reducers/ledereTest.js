import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as ledereActions from '../../js/actions/ledere_actions';
import * as actiontyper from '../../js/actions/actiontyper';

import ledere from '../../js/reducers/ledere.js';

describe('ledere', () => {

    it("Returnerer { data: [] } ved initializering", () => {
        const nextState = ledere();
        expect(nextState).to.deep.equal({ data: [] });
    });

    it("håndterer LEDERE_HENTET", () => {
        const initialState = deepFreeze({});
        const action = {
            type: actiontyper.LEDERE_HENTET,
            data: [{
                navn: "Kurt Nilsen"
            }, {
                navn: "Hans Hansen"
            }, {
                navn: "Nina Knutsen"
            }],
        };
        const nextState = ledere(initialState, action);

        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: false,
            data: [{
                navn: "Kurt Nilsen"
            }, {
                navn: "Hans Hansen"
            }, {
                navn: "Nina Knutsen"
            }]
        });

    });

    it("håndterer HENTER_LEDERE", () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = {
            type: actiontyper.HENTER_LEDERE
        }
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        })
    });

    it("håndterer HENT_LEDERE_FEILET", () => {
        const initialState = deepFreeze({
            henter: false,
        });
        const action = {
            type: actiontyper.HENT_LEDERE_FEILET
        }
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            henter: false,
            hentingFeilet: true,
            data: []
        })
    });

    it("håndterer AVKREFTER_LEDER", () => {
        const initialState = deepFreeze({
            avkrefter: false,
            avkreftFeilet: false,
            data: [
                {
                    navn: 'Ole Brum',
                    orgnummer: '81549300',
                    id: '1'
                },
                {
                    navn: 'Nasse Neoff',
                    orgnummer: '23529291',
                    id: '2'
                },
            ]
        });
        const action = ledereActions.avkrefterLeder()
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            avkrefter: true,
            avkreftFeilet: false,
            data: initialState.data
        })
    });

    it("håndterer LEDER_AVKREFTET_FEILET", () => {
        const initialState = deepFreeze({
            avkrefter: true,
            avkreftFeilet: false,
            data: [
                {
                    navn: 'Ole Brum',
                    orgnummer: '81549300',
                    id: '1'
                },
                {
                    navn: 'Nasse Neoff',
                    orgnummer: '23529291',
                    id: '2'
                },
            ]
        });
        const action = ledereActions.avkreftLederFeilet()
        const nextState = ledere(initialState, action);
        expect(nextState).to.deep.equal({
            avkrefter: false,
            avkreftFeilet: true,
            data: initialState.data
        })
    });

    it("Avkreft leder avkrefter leder", () => {
        const initialState = deepFreeze({
            avkrefter: true,
            avkreftFeilet: false,
            data: [
                {
                    navn: 'Ole Brum',
                    orgnummer: '81549300',
                    id: '1'
                },
                {
                    navn: 'Nasse Neoff',
                    orgnummer: '23529291',
                    id: '2'
                },
            ]
        });
        const action = ledereActions.lederAvkreftet('23529291');
        const nextState = ledere(initialState, action);

        expect(nextState).to.deep.equal({
            avkrefter: false,
            avkreftFeilet: false,
            data: [{
                    navn: 'Ole Brum',
                    orgnummer: '81549300',
                    id: '1'
                },{
                navn: 'Nasse Neoff',
                orgnummer: '23529291',
                id: '2',
                avkreftet: true,
            }]
        })
    })
});