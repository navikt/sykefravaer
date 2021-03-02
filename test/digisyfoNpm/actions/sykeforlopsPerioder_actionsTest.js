import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actiontyper from '../../../js/digisyfoNpm/actions/actiontyper';
import * as actions from '../../../js/digisyfoNpm/actions/sykeforlopsPerioder_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('sykeforlopsPerioder_actions', () => {
    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            REST_ROOT: 'https://tjenester.nav.no/syforest/',
        };
    });

    it('Skal ha en hentSykeforlopsPerioder()-funksjon som returnerer riktig action', () => {
        expect(actions.hentSykeforlopsPerioder('fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.HENT_SYKEFORLOPSPERIODER_FORESPURT,
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });

    it('Skal ha en henterSykeforlopsPerioder()-funksjon som returnerer riktig action', () => {
        expect(actions.henterSykeforlopsPerioder('fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.HENTER_SYKEFORLOPSPERIODER,
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });

    it('Skal ha en sykeforlopsPerioderHentet()-funksjon som returnerer riktig action', () => {
        expect(actions.sykeforlopsPerioderHentet([], 'fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.SYKEFORLOPSPERIODER_HENTET,
            periodeListe: [],
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });

    it('Skal ha en hentSykeforlopsPerioderFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.hentSykeforlopsPerioderFeilet('fnr', 'virksomhetsnummer')).to.deep.equal({
            type: actiontyper.HENT_SYKEFORLOPSPERIODER_FEILET,
            fnr: 'fnr',
            virksomhetsnummer: 'virksomhetsnummer',
        });
    });
});
