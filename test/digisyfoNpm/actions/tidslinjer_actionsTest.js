import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../../js/digisyfoNpm/actions/tidslinjer_actions';
import * as actiontyper from '../../../js/digisyfoNpm/actions/actiontyper';
import { TIDSLINJE_TYPER } from '../../../js/digisyfoNpm';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('tidslinjer_actions', () => {
    it('Skal ha en hentTidslinjer()-funksjon som returnerer riktig action', () => {
        const res = actions.hentTidslinjer();
        expect(res).to.deep.equal({
            type: actiontyper.HENT_TIDSLINJER_FORESPURT,
            apneHendelseIder: [],
            arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
            sykeforloep: [],
        });
    });

    it('Skal ha en hentTidslinjer()-funksjon som returnerer riktig action når man sender inn apneHendelseIder', () => {
        const res = actions.hentTidslinjer([1, 2]);
        expect(res).to.deep.equal({
            type: actiontyper.HENT_TIDSLINJER_FORESPURT,
            apneHendelseIder: [1, 2],
            arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
            sykeforloep: [],
        });
    });

    it('Skal ha en hentTidslinjer()-funksjon som returnerer riktig action når man sender inn apneHendelseIder og arbeidssituasjon', () => {
        const res = actions.hentTidslinjer([1, 2, 3, 4], TIDSLINJE_TYPER.MED_ARBEIDSGIVER);
        expect(res).to.deep.equal({
            type: actiontyper.HENT_TIDSLINJER_FORESPURT,
            apneHendelseIder: [1, 2, 3, 4],
            arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
            sykeforloep: [],
        });
    });

    it('Skal ha en setTidslinjer()-funksjon som returnerer riktig action', () => {
        const res = actions.setTidslinjer(TIDSLINJE_TYPER.MED_ARBEIDSGIVER, []);
        expect(res).to.deep.equal({
            type: actiontyper.SET_TIDSLINJER,
            arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
            sykeforloep: [],
        });
    });
});
