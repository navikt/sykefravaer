import { expect } from 'chai';
import { put, call, select } from 'redux-saga/effects';
import { get } from '../../../digisyfoNpm';
import { hentDineArbeidsgivere, skalHenteArbeidsgivere } from './arbeidsgivereSagas';
import * as actions from './arbeidsgivereActions';
import { toggleSykmeldingerBackendArbeidsforhold, unleashtogglesHentetSelector } from '../../../data/unleash-toggles/unleashTogglesSelectors';

describe('dineArbeidsgivereSagas', () => {
    const generator = hentDineArbeidsgivere(actions.hentAktuelleArbeidsgivere('887766'));

    it('Skal først sjekke om det skal hentes arbeidsgivere', () => {
        const nextSelect = select(skalHenteArbeidsgivere, '887766');
        expect(generator.next().value).to.deep.equal(nextSelect);
    });

    it('Skal dernest sjekke toggles', () => {
        const togglesHentetSelect = select(unleashtogglesHentetSelector);
        const toggle = select(toggleSykmeldingerBackendArbeidsforhold);
        expect(generator.next(true).value).to.deep.equal(togglesHentetSelect);
        expect(generator.next(true).value).to.deep.equal(toggle);
    });

    it('Skal dispatche HENTER_AKTUELLE_ARBEIDSGIVERE', () => {
        const nextPut = put(actions.henterAktuelleArbeidsgivere('887766'));
        expect(generator.next(true).value).to.deep.equal(nextPut);
    });

    it('Skal dernest hente aktuelle arbeidsgivere', () => {
        const nextCall = call(get, 'https://sykmeldinger-backend-proxy.dev.nav.no/api/v1/syforest/arbeidsforhold?sykmeldingId=887766');
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
