import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

window.localStorage = {
    getItem: (item) => {
        return item
    }
}

import * as actions from '../../js/actions/brukerInfo_actions.js';
import brukerinfo from '../../js/reducers/brukerinfo.js';

describe.only('brukerinfo', () => {

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

        initiellState = {
            data: {
                skjulUnderUtviklingVarsel: true
            }
        }
        const nextState2 = brukerinfo(initiellState, actions.skjulUnderUtviklingVarsel());
        expect(nextState2).to.deep.equal({
            data: {
                skjulUnderUtviklingVarsel: true
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

    it("Håndterer hentBrukerinfoFeilet når skjulUnderUtviklingVarsel === false", () => {
        initiellState = {
            data: {
                skjulUnderUtviklingVarsel: false
            }
        }
        const nextState = brukerinfo(initiellState, actions.hentBrukerinfoFeilet());
        expect(nextState).to.deep.equal({
            hentingFeilet: true,
            data: {
                skjulUnderUtviklingVarsel: false
            },
            henter: false
        });      
    });

    it("Håndterer hentBrukerinfoFeilet når skjulUnderUtviklingVarsel === true", () => {
        initiellState = {
            data: {
                skjulUnderUtviklingVarsel: true
            }
        }
        const nextState2 = brukerinfo(initiellState, actions.hentBrukerinfoFeilet());
        expect(nextState2).to.deep.equal({
            hentingFeilet: true,
            data: {
                skjulUnderUtviklingVarsel: true
            },
            henter: false
        });  
    })

    it("Håndterer henterBrukerinfo når skjulUnderUtviklingVarsel === true", () => {
        const nextState = brukerinfo({
            data: {
                skjulUnderUtviklingVarsel : true
            }
        }, actions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            data: {
                skjulUnderUtviklingVarsel: true
            }
        });
    });   

    it("Håndterer henterBrukerinfo når skjulUnderUtviklingVarsel === false", () => {
        const nextState = brukerinfo({
            data: {
                skjulUnderUtviklingVarsel : false
            }
        }, actions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            henter: true,
            hentingFeilet: false,
            data: {
                skjulUnderUtviklingVarsel: false
            }
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
                alder: 32,
                skjulUnderUtviklingVarsel: false
            }
        })
    });

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før (1)", () => {
        initiellState = {
            data: {
                navn: "Christian",
                alder: 35,
                skjulUnderUtviklingVarsel: true
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
                alder: 32,
                skjulUnderUtviklingVarsel: true
            }
        });
              
    });    

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før (2)", () => {
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
                alder: 32,
                skjulUnderUtviklingVarsel: false
            }
        })  
    });

}); 