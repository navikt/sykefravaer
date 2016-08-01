import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import hendelser from '../../js/reducers/hendelser.js';

describe('hendelser', () => {

    it('håndterer SET_HENDELSER ', () => {
        const initiellState = {};
        const action = {
            type: 'SET_HENDELSER',
            data: []
        };
        const nextState = hendelser(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [],
            henter: false, 
            hentingFeilet: false
        });
    });   

    it("Håndterer ÅPNE_HENDELSER", () => {
        const initiellState = {
            data: [{
                id: 0,
                erApen: false
            }, {
                id: 1,
                erApen: false
            }, {
                id: 2,
                erApen: false
            }, {
                id: 3,
                erApen: false
            }, {
                id: 4,
                erApen: false
            }],
            henter: false,
            hentingFeilet: false
        };
        const action = {
            type: 'ÅPNE_HENDELSER',
            hendelseIder: [0, 2, 3]
        };
        const nextState = hendelser(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 0,
                erApen: true,
                hoyde: "auto",
                visBudskap: true
            }, {
                id: 1,
                erApen: false,
            }, {
                id: 2,
                erApen: true,
                hoyde: "auto",
                visBudskap: true
            }, {
                id: 3,
                erApen: true,
                hoyde: "auto",
                visBudskap: true
            }, {
                id: 4,
                erApen: false,
            }],
            henter: false,
            hentingFeilet: false,
        });
    });  

    it("Håndterer SET_HENDELSEDATA", () => {
        const initiellState = {
            data: [{
                id: 0,
                erApen: true
            }, {
                id: 1,
                erApen: true
            }, {
                id: 2,
                erApen: false
            }],
            henter: false,
            hentingFeilet: false,
        };
        const action = {
            type: 'SET_HENDELSEDATA',
            hendelseId: 1,
            data: {
                ikon: "helge.jpg",
                hoyde: 55
            }
        };
        const nextState = hendelser(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 0,
                erApen: true
            }, {
                id: 1,
                erApen: true,
                ikon: "helge.jpg",
                hoyde: 55
            }, {
                id: 2,
                erApen: false
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer SET_HENDELSER", () => {
        const initiellState = {};
        const action = {
            type: "SET_HENDELSER",
            data: [{"antalldager":0,"tekstkey":"tidslinje.med-arbeidsgiver.sykefravaer.startet","type":"SYKEFRAVAER_STARTET","navigasjonsid":1},{"antalldager":28,"tekstkey":"tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver","type":"SNAKK_MED_ARBEIDSGIVER","navigasjonsid":2},{"antalldager":42,"tekstkey":"tidslinje.med-arbeidsgiver.varsel.sendt","type":"AKTIVTETSKRAV_VARSEL_SENDT","navigasjonsid":3},{"antalldager":49,"tekstkey":"tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver","type":"DIALOGMOTE_MED_ARBEIDSGIVER","navigasjonsid":4},{"antalldager":56,"tekstkey":"tidslinje.med-arbeidsgiver.aktivitetskrav","type":"NAV_VURDERE_KRAV_OM_AKTIVITET","navigasjonsid":5},{"antalldager":182,"tekstkey":"tidslinje.med-arbeidsgiver.dialogmote-nav","type":"FORBEREDELSE_DIALOGMOTE","navigasjonsid":6},{"antalldager":273,"tekstkey":"tidslinje.med-arbeidsgiver.langtidssykmeldt","type":"AKTIVITETER_SOM_LANGTIDSSYKMELDT","navigasjonsid":7},{"antalldager":364,"tekstkey":"tidslinje.med-arbeidsgiver.sluttfasen","type":"SLUTTFASEN_AV_SYKEFRAVAERET","navigasjonsid":8}]
        }
        const nextState = hendelser(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [{"antalldager":0,"tekstkey":"tidslinje.med-arbeidsgiver.sykefravaer.startet","type":"SYKEFRAVAER_STARTET","navigasjonsid":1},{"antalldager":28,"tekstkey":"tidslinje.med-arbeidsgiver.snakk.med.arbeidsgiver","type":"SNAKK_MED_ARBEIDSGIVER","navigasjonsid":2},{"antalldager":42,"tekstkey":"tidslinje.med-arbeidsgiver.varsel.sendt","type":"AKTIVTETSKRAV_VARSEL_SENDT","navigasjonsid":3},{"antalldager":49,"tekstkey":"tidslinje.med-arbeidsgiver.dialogmote-arbeidsgiver","type":"DIALOGMOTE_MED_ARBEIDSGIVER","navigasjonsid":4},{"antalldager":56,"tekstkey":"tidslinje.med-arbeidsgiver.aktivitetskrav","type":"NAV_VURDERE_KRAV_OM_AKTIVITET","navigasjonsid":5},{"antalldager":182,"tekstkey":"tidslinje.med-arbeidsgiver.dialogmote-nav","type":"FORBEREDELSE_DIALOGMOTE","navigasjonsid":6},{"antalldager":273,"tekstkey":"tidslinje.med-arbeidsgiver.langtidssykmeldt","type":"AKTIVITETER_SOM_LANGTIDSSYKMELDT","navigasjonsid":7},{"antalldager":364,"tekstkey":"tidslinje.med-arbeidsgiver.sluttfasen","type":"SLUTTFASEN_AV_SYKEFRAVAERET","navigasjonsid":8}],
            henter: false,
            hentingFeilet: false,
        })
    });

}); 