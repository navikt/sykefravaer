import { expect } from 'chai';

import * as actions from './aktivitetskravActions';

const { AKTIVITETSKRAV_BEKREFTET, BEKREFT_AKTIVITETSKRAV_FEILET, BEKREFT_AKTIVITETSKRAV_FORESPURT, BEKREFTER_AKTIVITETSKRAV } = actions;

describe('aktivitetskrav_actions', () => {
    it('Skal ha en bekreftAktivitetskrav()-funksjon som returnerer riktig action', () => {
        const action = actions.bekreftAktivitetskrav('hendelseId');
        expect(action).to.deep.equal({
            type: BEKREFT_AKTIVITETSKRAV_FORESPURT,
        });
    });

    it('Skal ha en bekrefterAktivitetskrav()-funksjon som returnerer riktig action', () => {
        const action = actions.bekrefterAktivitetskrav();
        expect(action).to.deep.equal({
            type: BEKREFTER_AKTIVITETSKRAV,
        });
    });

    it('Skal ha en bekreftAktivitetskravFeilet()-funksjon som returnerer riktig action', () => {
        const action = actions.bekreftAktivitetskravFeilet();
        expect(action).to.deep.equal({
            type: BEKREFT_AKTIVITETSKRAV_FEILET,
        });
    });

    it('Skal ha en aktivitetskravBekreftet()-funksjon som returnerer riktig action', () => {
        const action = actions.aktivitetskravBekreftet();
        expect(action).to.deep.equal({
            type: AKTIVITETSKRAV_BEKREFTET,
        });
    });
});
