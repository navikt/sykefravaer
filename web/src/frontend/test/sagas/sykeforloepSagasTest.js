import { expect } from 'chai';
import { hentStartdato } from '../../js/sagas/sykeforloepSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import * as actions from '../../js/actions/sykeforloep_actions';

describe("sykeforloepSagas", () => {

    describe("Når backend returnerer dato", () => {
        beforeEach(() => {
            window.APP_SETTINGS = {
                REST_ROOT: "/syforest"
            }
        })

        const action = actions.hentStartdato();

        const generator = hentStartdato(action);

        it("Skal dispatche HENTER_SYKEFORLOEP_STARTDATO", () => {
            const nextPut = put(actions.henterStartdato());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal hente startdato",  () => {
            const nextCall = call(get, '/syforest/tidslinje/startdato');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal deretter dispatche SYKEFORLOEP_STARTDATO_HENTET", () => {    
            const action = actions.startdatoHentet("2017-01-05")
            const nextPut = put(action);
            expect(generator.next({ startdato: "2017-01-05" }).value).to.deep.equal(nextPut);
        }); 
    });

    describe("Når backend ikke returnerer dato", () => {
        beforeEach(() => {
            window.APP_SETTINGS = {
                REST_ROOT: "/syforest"
            }
        })

        const action = actions.hentStartdato();

        const generator = hentStartdato(action);

        it("Skal dispatche HENTER_SYKEFORLOEP_STARTDATO", () => {
            const nextPut = put(actions.henterStartdato());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal hente startdato",  () => {
            const nextCall = call(get, '/syforest/tidslinje/startdato');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal deretter dispatche SYKEFORLOEP_STARTDATO_HENTET", () => {    
            const action = actions.startdatoHentet(null)
            const nextPut = put(action);
            expect(generator.next({ startdato: null }).value).to.deep.equal(nextPut);
        }); 
    })


});