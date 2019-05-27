import { expect } from 'chai';

import {
    SEND_SKJEMA_FEILET,
    SEND_SKJEMA_FEILET_HANDTERT,
    SKJEMA_ER_GYLDIG,
    sendSkjemaFeilet,
    sendSkjemaFeiletHandtert,
    skjemaErGyldig,
} from './reduxFormMeta_actions';

describe('reduxFormMeta_actions', () => {
    it('Har nødvendige actiontyper', () => {
        expect(SEND_SKJEMA_FEILET).to.equal('SEND_SKJEMA_FEILET');
        expect(SEND_SKJEMA_FEILET_HANDTERT).to.equal('SEND_SKJEMA_FEILET_HÅNDTERT');
        expect(SKJEMA_ER_GYLDIG).to.equal('SKJEMA_ER_GYLDIG');
    });

    it('Har en sendSkjemaFeilet som returnerer riktig action', () => {
        expect(sendSkjemaFeilet('TESTSKJEMA')).to.deep.equal({
            type: SEND_SKJEMA_FEILET,
            skjemanavn: 'TESTSKJEMA',
        });
    });

    it('Har en sendSkjemaFeiletHandtert som returnerer riktig action', () => {
        expect(sendSkjemaFeiletHandtert('TESTSKJEMA')).to.deep.equal({
            type: SEND_SKJEMA_FEILET_HANDTERT,
            skjemanavn: 'TESTSKJEMA',
        });
    });

    it('Har en skjemaErGyldig som returnerer riktig action', () => {
        expect(skjemaErGyldig('TESTSKJEMA')).to.deep.equal({
            type: SKJEMA_ER_GYLDIG,
            skjemanavn: 'TESTSKJEMA',
        });
    });
});
