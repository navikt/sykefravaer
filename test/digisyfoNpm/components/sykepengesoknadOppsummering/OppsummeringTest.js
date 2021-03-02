/* eslint-env mocha */
import chai from 'chai';
import { getSporsmalid } from '../../../../js/digisyfoNpm/components/sykepengesoknadOppsummering/Oppsummering';
import { aktiviteterType, ansvarBekreftetType } from '../../../../js/digisyfoNpm/enums/sporsmalstyper';

const { expect } = chai;

describe('Oppsummering', () => {
    it('skal ha med index i sporsmalsid for aktiviteter spørsmål', () => {
        const sporsmalsid = getSporsmalid(aktiviteterType, 10);
        expect(sporsmalsid).to.equal('aktiviteter-10-sporsmal');
    });

    it('skal ikke ha med index i sporsmalsid for ansvarbekreftet spørsmål', () => {
        const sporsmalsid = getSporsmalid(ansvarBekreftetType, 1);
        expect(sporsmalsid).to.equal('ansvarBekreftet-sporsmal');
    });
});
