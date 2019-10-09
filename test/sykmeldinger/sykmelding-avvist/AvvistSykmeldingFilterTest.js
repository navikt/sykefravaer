import { describe } from 'mocha';
import chai from 'chai';
import AvvistSykmeldingFilter from '../../../js/sykmeldinger/sykmelding-avvist/AvvistSykmeldingFilter';

const { expect } = chai;
function getSykmeldingWithRulesHit() {
    return {
        behandlingsutfall: {
            status: 'INVALID',
            ruleHits: [
                {
                    ruleName: 'BACKDATED_MORE_THEN_8_DAYS_FIRST_SICK',
                    messageForSender: 'Det må begrunnes hvorfor sykmeldingen er tilbakedatert.',
                    messageForUser: 'Første sykmelding er tilbakedatert mer enn det som er tillatt.',
                    ruleStatus: 'INVALID',
                },
                {
                    ruleName: 'BACKDATED_MORE_THEN_8_DAYS_FIRST_SICK',
                    messageForSender: 'Det må begrunnes hvorfor sykmeldingen er tilbakedatert.',
                    messageForUser: 'Første sykmelding er tilbakedatert mer enn det som er tillatt.',
                    ruleStatus: 'MANUAL_PROCESSING',
                },
                {
                    ruleName: 'BACKDATED_MORE_THEN_8_DAYS_FIRST_SICK',
                    messageForSender: 'Det må begrunnes hvorfor sykmeldingen er tilbakedatert.',
                    messageForUser: 'Første sykmelding er tilbakedatert mer enn det som er tillatt.',
                },
            ],
        },
    };
}

describe('Filtrer regler ', () => {
    it('Skal filtrere ut regler som har gitt annet resultat enn avvist', () => {
        const ruleHits = AvvistSykmeldingFilter(getSykmeldingWithRulesHit());
        expect(ruleHits).to.have.length(2);
    });
});
