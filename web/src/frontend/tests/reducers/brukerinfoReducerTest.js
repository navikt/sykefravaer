import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

window.localStorage = {
    getItem: (item) => {
        return item
    }
}

import * as actions from '../../js/actions/brukerinfo_actions.js';
import brukerinfo from '../../js/reducers/brukerinfo.js';

describe('brukerinfo', () => {

    let initiellState;

    beforeEach(() => {
        initiellState = {};
    })

    it("Håndterer skjulUnderUtviklingVarsel dersom state ikke er tom", () => {
        initiellState = {
            bruker: {
                data: {
                    navn: "Helge"
                }
            }
        }
        const nextState = brukerinfo(initiellState, actions.skjulUnderUtviklingVarsel());
        expect(nextState).to.deep.equal({
            bruker: {
                data: {
                    navn: "Helge"
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true,
            }
        })

        initiellState = {
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        }
        const nextState2 = brukerinfo(initiellState, actions.skjulUnderUtviklingVarsel());
        expect(nextState2).to.deep.equal({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            bruker: {}
        })
    });

    it("Håndterer skjulUnderUtviklingVarsel dersom state er tom", () => {
        initiellState = {}
        const nextState = brukerinfo(initiellState, actions.skjulUnderUtviklingVarsel());
        expect(nextState).to.deep.equal({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            bruker: {}
        })
    });    

    it("Håndterer hentBrukerinfoFeilet når skjulUnderUtviklingVarsel === false", () => {
        initiellState = {
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            }
        }
        const nextState = brukerinfo(initiellState, actions.hentBrukerinfoFeilet());
        expect(nextState).to.deep.equal({
            bruker: {
                data: {},
                hentingFeilet: true,    
                henter: false
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            },
        });      
    });

    it("Håndterer hentBrukerinfoFeilet når skjulUnderUtviklingVarsel === true", () => {
        initiellState = {
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        }
        const nextState2 = brukerinfo(initiellState, actions.hentBrukerinfoFeilet());
        expect(nextState2).to.deep.equal({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }, 
            bruker: {
                data: {},
                hentingFeilet: true, 
                henter: false, 
            }
        });  
    })

    it("Håndterer henterBrukerinfo når skjulUnderUtviklingVarsel === true", () => {
        const nextState = brukerinfo({
            innstillinger: {
                skjulUnderUtviklingVarsel : true
            }
        }, actions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            bruker: {
                henter: true, 
                hentingFeilet: false, 
                data: {}
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        });
    });   

    it("Håndterer henterBrukerinfo når skjulUnderUtviklingVarsel === false", () => {
        const nextState = brukerinfo({
            innstillinger: {
                skjulUnderUtviklingVarsel : false
            }
        }, actions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            bruker: {
                data: {},
                henter: true,
                hentingFeilet: false,    
            }, 
            innstillinger: {
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
            bruker: {
                henter: false, 
                hentingFeilet: false,
                data: {
                    navn: "Helge",
                    alder: 32,
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            }
        })
    });

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før (1)", () => {
        initiellState = {
            bruker: {
                data: {
                    navn: "Christian",
                    alder: 35,
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        };
        const nextState1 = brukerinfo(initiellState, actions.setBrukerinfo({
            navn: "Helge",
            alder: 32
        }));
        expect(nextState1).to.deep.equal({
            bruker: {
                henter: false, 
                hentingFeilet: false,
                data: {
                    navn: "Helge",
                    alder: 32
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        });
              
    });    

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før (2)", () => {
        initiellState = {
            bruker: {
                data: {},
                hentingFeilet: true,
                henter: false
            }
        };
        const nextState2 = brukerinfo(initiellState, actions.setBrukerinfo({
            navn: "Helge",
            alder: 32
        })); 
        expect(nextState2).to.deep.equal({
            bruker: {
                henter: false, 
                hentingFeilet: false,
                data: {
                    navn: "Helge",
                    alder: 32,
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            }
        })  
    });

    it("Håndterer setArbeidssituasjon", () => {
        initiellState = {
            innstillinger: {},
            bruker: {}
        };
        const nyState = brukerinfo(initiellState, actions.setArbeidssituasjon("MED_ARBEIDSGIVER")); 
        expect(nyState).to.deep.equal({
            bruker: {},
            innstillinger: {
                arbeidssituasjon: "MED_ARBEIDSGIVER"
            }
        })  
    });

}); 