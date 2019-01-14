import { expect } from 'chai';
import * as actions from '../../js/actions/motebehov_actions';

describe('actions', () => {
    let virksomhetsnummer;

    beforeEach(() => {
        virksomhetsnummer = '1234';
        window = window || {};
    });

    it('Skal ha en hentMotebehov()-funksjon som returnerer riktig action', () => {
        expect(actions.hentMotebehov(virksomhetsnummer)).to.deep.equal({
            type: actions.HENT_MOTEBEHOV_FORESPURT,
            virksomhetsnummer,
        });
    });

    it('Skal ha en hentMotebehovHenter()-funksjon som returnerer riktig action', () => {
        expect(actions.hentMotebehovHenter()).to.deep.equal({
            type: actions.HENT_MOTEBEHOV_HENTER,
        });
    });

    it('har en hentMotebehovHentet()-funksjon som returnerer riktig action', () => {
        const data = {};
        expect(actions.hentMotebehovHentet(data)).to.deep.equal({
            type: actions.HENT_MOTEBEHOV_HENTET,
            data,
        });
    });

    it('Skal ha en hentMotebehovFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.hentMotebehovFeilet()).to.deep.equal({
            type: actions.HENT_MOTEBEHOV_FEILET,
        });
    });

    it('Skal ha en hentMotebehovForbudt()-funksjon som returnerer riktig action', () => {
        expect(actions.hentMotebehovForbudt()).to.deep.equal({
            type: actions.HENT_MOTEBEHOV_FORBUDT,
        });
    });

    it('Skal ha en svarMotebehov()-funksjon som returnerer riktig action', () => {
        const svar = {};
        expect(actions.svarMotebehov(svar, virksomhetsnummer)).to.deep.equal({
            type: actions.SVAR_MOTEBEHOV_FORESPURT,
            svar,
            virksomhetsnummer,
        });
    });

    it('Skal ha en svarMotebehovSender()-funksjon som returnerer riktig action', () => {
        expect(actions.svarMotebehovSender(virksomhetsnummer)).to.deep.equal({
            type: actions.SVAR_MOTEBEHOV_SENDER,
            virksomhetsnummer,
        });
    });

    it('har en svarMotebehovSendt()-funksjon som returnerer riktig action', () => {
        const svar = {};
        expect(actions.svarMotebehovSendt(svar, virksomhetsnummer)).to.deep.equal({
            type: actions.SVAR_MOTEBEHOV_SENDT,
            svar,
            virksomhetsnummer,
        });
    });

    it('Skal ha en svarMotebehovFeilet()-funksjon som returnerer riktig action', () => {
        expect(actions.svarMotebehovFeilet(virksomhetsnummer)).to.deep.equal({
            type: actions.SVAR_MOTEBEHOV_FEILET,
            virksomhetsnummer,
        });
    });
});
