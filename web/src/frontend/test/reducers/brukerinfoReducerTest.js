import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

let item;

window.localStorage = {
    getItem: (item) => {
        return item
    },
    setItem: (_item) => {
        item = _item;
    }
}

import * as brukerinfoActions from '../../js/actions/brukerinfo_actions';
import brukerinfo from '../../js/reducers/brukerinfo';

describe('brukerinfo', () => {

    let initiellState;

    beforeEach(() => {
        initiellState = {};
    })

    it("Håndterer skjulUnderUtviklingVarsel dersom state ikke er tom", () => {
        initiellState = deepFreeze({
            bruker: {
                data: {
                    navn: "Helge"
                }
            }
        });
        const nextState = brukerinfo(initiellState, brukerinfoActions.skjulUnderUtviklingVarsel());
        expect(nextState).to.deep.equal({
            bruker: {
                data: {
                    navn: "Helge"
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true,
            },
            innlogging: {}
        });

        initiellState2 = deepFreeze({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        });
        const nextState2 = brukerinfo(initiellState2, brukerinfoActions.skjulUnderUtviklingVarsel());
        expect(nextState2).to.deep.equal({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            bruker: {},
            innlogging: {}
        })
    });

    it("Håndterer skjulUnderUtviklingVarsel dersom state er tom", () => {
        initiellState = deepFreeze({});
        const nextState = brukerinfo(initiellState, brukerinfoActions.skjulUnderUtviklingVarsel());
        expect(nextState).to.deep.equal({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            bruker: {},
            innlogging: {}
        })
    });    

    it("Håndterer hentBrukerinfoFeilet når skjulUnderUtviklingVarsel === false", () => {
        initiellState = deepFreeze({
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            }
        });
        const nextState = brukerinfo(initiellState, brukerinfoActions.hentBrukerinfoFeilet());
        expect(nextState).to.deep.equal({
            bruker: {
                data: {},
                hentingFeilet: true,
                henter: false
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            },
            innlogging: {}
        });      
    });

    it("Håndterer hentBrukerinfoFeilet når skjulUnderUtviklingVarsel === true", () => {
        initiellState = deepFreeze({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            }
        });
        const nextState = brukerinfo(initiellState, brukerinfoActions.hentBrukerinfoFeilet());
        expect(nextState).to.deep.equal({
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            bruker: {
                data: {},
                hentingFeilet: true,
                henter: false,
            },
            innlogging: {}
        });  
    })

    it("Håndterer henterBrukerinfo når skjulUnderUtviklingVarsel === true", () => {
        initiellState = deepFreeze({
            innstillinger: {
                skjulUnderUtviklingVarsel : true
            },
            innlogging: {}
        });
        const nextState = brukerinfo(initiellState, brukerinfoActions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            bruker: {
                henter: true,
                hentingFeilet: false,
                data: {}
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            innlogging: {}
        });
    });   

    it("Håndterer henterBrukerinfo når skjulUnderUtviklingVarsel === false", () => {
        initiellState = deepFreeze({
            innstillinger: {
                skjulUnderUtviklingVarsel : false
            }
        });
        const nextState = brukerinfo(initiellState, brukerinfoActions.henterBrukerinfo());
        expect(nextState).to.deep.equal({
            bruker: {
                data: {},
                henter: true,
                hentingFeilet: false,
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: false
            },
            innlogging: {}
        });
    });       

    it("Håndterer setBrukerinfo når brukerinfo ikke finnes fra før", () => {
        const nextState = brukerinfo(initiellState, brukerinfoActions.setBrukerinfo({
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
            },
            innlogging: {}
        })
    });

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før (1)", () => {
        initiellState = deepFreeze({
            bruker: {
                data: {
                    navn: "Christian",
                    alder: 35,
                    hoyde: 185
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            innlogging: {}
        });
        const nextState1 = brukerinfo(initiellState, brukerinfoActions.setBrukerinfo({
            navn: "Helge",
            alder: 32
        }));
        expect(nextState1).to.deep.equal({
            bruker: {
                henter: false,
                hentingFeilet: false,
                data: {
                    navn: "Helge",
                    alder: 32,
                    hoyde: 185
                }
            },
            innstillinger: {
                skjulUnderUtviklingVarsel: true
            },
            innlogging: {}
        });
              
    });    

    it("Håndterer setBrukerinfo når brukerinfo finnes fra før (2)", () => {
        initiellState = deepFreeze({
            bruker: {
                data: {},
                hentingFeilet: true,
                henter: false
            }
        });
        const nextState2 = brukerinfo(initiellState, brukerinfoActions.setBrukerinfo({
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
            },
            innlogging: {}
        })  
    });

    it("Håndterer setArbeidssituasjon", () => {
        initiellState = deepFreeze({
            innstillinger: {},
            bruker: {}
        });
        const nyState = brukerinfo(initiellState, brukerinfoActions.setArbeidssituasjon("MED_ARBEIDSGIVER"));
        expect(nyState).to.deep.equal({
            bruker: {},
            innstillinger: {
                arbeidssituasjon: "MED_ARBEIDSGIVER"
            },
            innlogging: {}
        })  
    });

    it("Håndterer sjekkerInnlogging når man ikke er innlogget fra før", () => {
        initiellState = deepFreeze({
            innstillinger: {},
            innlogging: {
                henter: false,
            },
            bruker: {}
        });
        const nyState = brukerinfo(initiellState, brukerinfoActions.sjekkerInnlogging());
        expect(nyState).to.deep.equal({
            innlogging: {
                henter: true,
                hentingFeilet: false,
            },
            bruker: {},
            innstillinger: {}
        });
    });

    it("Håndterer setErUtlogget()", () => {
        initiellState = deepFreeze({
            innstillinger: {},
            innlogging: {
                erInnlogget: true,
            },
            bruker: {}
        });
        const nyState = brukerinfo(initiellState, brukerinfoActions.setErUtlogget());
        expect(nyState).to.deep.equal({
            innlogging: {
                erInnlogget: false,
                henter: false,
                hentingFeilet: false,
            },
            bruker: {},
            innstillinger: {}
        });
    });

    it("Håndterer setErInnlogget()", () => {
        initiellState = deepFreeze({
            innstillinger: {},
            bruker: {}
        });
        const nyState = brukerinfo(initiellState, brukerinfoActions.setErInnlogget());
        expect(nyState).to.deep.equal({
            innlogging: {
                erInnlogget: true,
                henter: false,
                hentingFeilet: false,
            },
            bruker: {},
            innstillinger: {}
        });
    });

    it("Håndterer sjekkInnloggingFeilet()", () => {
        initiellState = deepFreeze({
            innstillinger: {},
            bruker: {}
        });
        const nyState = brukerinfo(initiellState, brukerinfoActions.sjekkInnloggingFeilet());
        expect(nyState).to.deep.equal({
            innlogging: {
                erInnlogget: false,
                henter: false,
                hentingFeilet: true,
            },
            bruker: {},
            innstillinger: {}
        });
    });

}); 