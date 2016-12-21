import { expect } from 'chai';

import * as actions from '../../js/actions/ledere_actions.js';

describe('ledere_actions', () => {

    it("Har en hentLedere()-funksjon", () => {
        const res = actions.hentLedere();
        expect(res).to.deep.equal({
            type: "HENT_LEDERE_FORESPURT",
        })
    });

});