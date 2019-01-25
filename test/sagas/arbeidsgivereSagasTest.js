import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import { get } from '@navikt/digisyfo-npm';
import { hentDineArbeidsgivere, skalHenteArbeidsgivere } from '../../js/sagas/arbeidsgivereSagas';
import * as actions from '../../js/actions/dineArbeidsgivere_actions';

describe('dineArbeidsgivereSagas', () => {
    const generator = hentDineArbeidsgivere(actions.hentAktuelleArbeidsgivere('887766'));

    it('Skal først sjekke om det skal hentes arbeidsgivere', () => {
        const nextSelect = select(skalHenteArbeidsgivere, '887766');
        expect(generator.next().value).to.deep.equal(nextSelect);
    });

    it('Skal dispatche HENTER_AKTUELLE_ARBEIDSGIVERE', () => {
        const nextPut = put(actions.henterAktuelleArbeidsgivere('887766'));
        expect(generator.next(true).value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente aktuelle arbeidsgivere', () => {
        const nextCall = call(get, '/syforest/informasjon/arbeidsgivere?sykmeldingId=887766');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette aktuelle arbeidsgivere', () => {
        const action = actions.aktuelleArbeidsgivereHentet('887766', [{
            orgnummer: '123456789',
            navn: 'Mortens grønnsaker AS',
        }]);
        const nextPut = put(action);
        expect(generator.next([{
            orgnummer: '123456789',
            navn: 'Mortens grønnsaker AS',
        }]).value).to.deep.equal(nextPut);
    });
});
