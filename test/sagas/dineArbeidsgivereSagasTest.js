import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { get } from 'digisyfo-npm';
import { hentDineArbeidsgivere } from '../../js/sagas/arbeidsgivereSagas';
import * as actiontyper from '../../js/actions/actiontyper';

describe('dineArbeidsgivereSagas', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest',
        };
    });

    const generator = hentDineArbeidsgivere({
        type: actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT,
        sykmeldingId: '887766',
    });

    it('Skal dispatche HENTER_AKTUELLE_ARBEIDSGIVERE', () => {
        const nextPut = put({
            type: actiontyper.HENTER_AKTUELLE_ARBEIDSGIVERE,
            sykmeldingId: '887766',
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente aktuelle arbeidsgivere', () => {
        const nextCall = call(get, 'http://tjenester.nav.no/syforest/informasjon/arbeidsgivere?sykmeldingId=887766');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it('Skal dernest sette aktuelle arbeidsgivere', () => {
        const nextPut = put({
            type: actiontyper.AKTUELLE_ARBEIDSGIVERE_HENTET,
            sykmeldingId: '887766',
            arbeidsgivere: [{
                orgnummer: '123456789',
                navn: 'Mortens grønnsaker AS',
            }],
        });
        expect(generator.next([{
            orgnummer: '123456789',
            navn: 'Mortens grønnsaker AS',
        }]).value).to.deep.equal(nextPut);
    });
});
