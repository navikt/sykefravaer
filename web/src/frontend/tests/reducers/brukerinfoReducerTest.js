import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

window.localStorage = {
    getItem: (item) => {
        return item
    }
}

import * as actions from '../../js/actions/brukerInfo_actions.js';
import brukerinfo from '../../js/reducers/brukerinfo.js';

describe('brukerinfo', () => {

    let initiellState;

    beforeEach(() => {
        initiellState = {};
    })

    it("Håndterer skjulUnderUtviklingVarsel dersom state ikke er tom", () => {
        initiellState = {
            data: {
                navn: "Helge"
            }
        }
        const nextState = brukerinfo(initiellState, actions.skjulUnderUtviklingVarsel());
        expect(nextState).to.deep.equal({
            data: {
                skjulUnderUtviklingVarsel: true,
                navn: "Helge"
            }
        })
    });

    it("Håndterer skjulUnderUtviklingVarsel dersom state er tom", () => {
        initiellState = {}
        const nextState = brukerinfo(initiellState, actions.skjulUnderUtviklingVarsel());
        expect(nextState).to.deep.equal({
            data: {
                skjulUnderUtviklingVarsel: true
            }
        })
    });    

    it("Håndterer hentBrukerinfoFeilet", () => {
        const nextState = brukerinfo(initiellState, actions.hentBrukerinfoFeilet());
        expect(nextState).to.deep.equal({
            hentingFeilet: true,
            data: {},
            henter: false
        });
    });

    it("Håndterer hentBrukerinfoFeilet", () => {
        const nextState = brukerinfo(initiellState, actions.hentBrukerinfoFeilet());
        expect(nextState).to.deep.equal({
            hentingFeilet: true,
            henter: false,
            data: {}
        });
    });

    it("Håndterer henterBrukerinfo", () => {
        const nextState = brukerinfo(initiellState, actions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            data: {}
        });
    });    

    it("Håndterer setBrukerinfo når brukerinfo ikke finnes fra før", () => {
        const nextState = brukerinfo(initiellState, actions.setBrukerinfo({
            navn: "Helge",
            alder: 32
        }));
        expect(nextState).to.deep.equal({
            henter: false, 
            hentingFeilet: false,
            data: {
                navn: "Helge",
                alder: 32
            }
        })
    });

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før", () => {
        initiellState = {
            data: {
                navn: "Christian",
                alder: 35
            }
        };
        const nextState1 = brukerinfo(initiellState, actions.setBrukerinfo({
            navn: "Helge",
            alder: 32
        }));
        expect(nextState1).to.deep.equal({
            henter: false, 
            hentingFeilet: false,
            data: {
                navn: "Helge",
                alder: 32
            }
        });

        initiellState = {
            data: {},
            hentingFeilet: true,
            henter: false
        };
        const nextState2 = brukerinfo(initiellState, actions.setBrukerinfo({
            navn: "Helge",
            alder: 32
        })); 
        expect(nextState2).to.deep.equal({
            henter: false, 
            hentingFeilet: false,
            data: {
                navn: "Helge",
                alder: 32
            }
        })                
    });    

}); 