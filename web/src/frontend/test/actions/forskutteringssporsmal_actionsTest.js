import { expect } from 'chai';

import * as actions from '../../js/actions/forskutteringssporsmal_actions.js';
import * as actiontyper from '../../js/actions/actiontyper';

describe('forskutteringssporsmal_actions', () => {

    it("Har nødvendige actiontyper", () => {
        expect(actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FORESPURT).to.equal("SJEKK_SKAL_VISE_FORSKUTTERINGSSPØRSMAL_FORESPURT");
        expect(actiontyper.SJEKKER_SKAL_VISE_FORSKUTTERINGSSPORSMAL).to.equal("SJEKKER_SKAL_VISE_FORSKUTTERINGSSPØRSMAL");
        expect(actiontyper.SKAL_VISE_FORSKUTTERINGSSPORSMAL_SJEKKET).to.equal("SKAL_VISE_FORSKUTTERINGSSPØRSMAL_SJEKKET");
        expect(actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FEILET).to.equal("SJEKK_SKAL_VISE_FORSKUTTERINGSSPØRSMAL_FEILET");
    });

    it("Har en sjekkSkalViseForskutteringssporsmal()-funksjon som returnerer riktig action", () => {
        expect(actions.sjekkSkalViseForskutteringssporsmal({ id: "2"})).to.deep.equal({
            type: actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FORESPURT,
            sykepengesoknad: {
                id: "2"
            }
        });
    });

    it("Har en sjekkerSkalViseForskutteringssporsmal()-funksjon som returnerer riktig action", () => {
        expect(actions.sjekkerSkalViseForskutteringssporsmal()).to.deep.equal({
            type: actiontyper.SJEKKER_SKAL_VISE_FORSKUTTERINGSSPORSMAL,
        });
    });

    it("Har en skalViseForskutteringssporsmalSjekket()-funksjon som returnerer riktig action", () => {
        expect(actions.skalViseForskutteringssporsmalSjekket(true)).to.deep.equal({
            type: actiontyper.SKAL_VISE_FORSKUTTERINGSSPORSMAL_SJEKKET,
            visForkutteringssporsmal: true,
        });
    });

    it("Har en sjekkSkalViseForskutteringssporsmalFeilet()-funksjon som returnerer riktig action", () => {
        expect(actions.sjekkSkalViseForskutteringssporsmalFeilet()).to.deep.equal({
            type: actiontyper.SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FEILET,
        });
    });

});