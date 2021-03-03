import { expect } from 'chai';
import { put } from 'redux-saga/effects';
import {
    HENT_TIDSLINJER_FORESPURT,
    SET_TIDSLINJER,
    APNE_HENDELSER,
} from '../../../js/digisyfoNpm/actions/actiontyper';
import { TIDSLINJE_TYPER } from '../../../js/digisyfoNpm/utils/tidslinjeUtils';
import { hentTidslinjer } from '../../../js/digisyfoNpm/sagas/tidslinjerSagas';

describe('tidslinjerSagas', () => {
    const generator = hentTidslinjer({
        type: HENT_TIDSLINJER_FORESPURT,
        apneHendelseIder: ['3'],
        arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
        sykeforloep: [],
    });

    it('Skal dernest sette dine tidslinjer', () => {
        const nextPut = put({
            type: SET_TIDSLINJER,
            arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
            sykeforloep: [],
        });
        expect(generator.next('data').value).to.deep.equal(nextPut);
    });

    it('Skal dernest åpne hendelser dersom action.apneHendelseIder.length > 0', () => {
        const nextPut = put({
            type: APNE_HENDELSER,
            hendelseIder: ['3'],
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });
});
