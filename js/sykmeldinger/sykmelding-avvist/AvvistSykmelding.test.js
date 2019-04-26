import { hentHandlingsstreng } from './AvvistSykmelding';
import expect from '../../../test/expect';

describe('AvvvistSykmelding', () => {
    describe('hentHandlingsstreng', () => {
        let sykmelding;

        beforeEach(() => {
            sykmelding = {
                id: '60fb7e58-3918-4a3f-8973-ab505b3407b0',
                behandlingsutfall: {
                    status: 'INVALID',
                    ruleHits: [
                        {
                            ruleName: 'UNKNOWN_DIAGNOSECODE_TYPE',
                            messageForSender: null,
                            messageForUser: '',
                        },
                        {
                            ruleName: 'INVALID_KODEVERK_FOR_BI_DIAGNOSE',
                            messageForSender: null,
                            messageForUser: '',
                        },
                    ],
                },
            };
        });

        it('Skal returnere "Du må be om ny sykmelding." dersom bruker har ukjent diagnose', () => {
            const resultat = hentHandlingsstreng(sykmelding);
            expect(resultat).to.contain('Du må be om ny sykmelding.');
        });

        it('Skal returnere info om bekreftelse dersom bruker er for gammel', () => {
            sykmelding.behandlingsutfall.ruleHits[0].ruleName = 'PATIENT_OVER_70_YEARS';
            const resultat = hentHandlingsstreng(sykmelding);
            expect(resultat).to.contain(' Du kan i stedet be om en bekreftelse hvis du trenger dokumentasjon på at du er syk.');
        });

        it('Skal returnere "Du må oppsøke en som har rett til å sykmelde." dersom bruker er for ung', () => {
            sykmelding.behandlingsutfall.ruleHits[0].ruleName = 'BEHANDLER_NOT_VALID_IN_HPR';
            const resultat = hentHandlingsstreng(sykmelding);
            expect(resultat).to.contain('Du må oppsøke en som har rett til å sykmelde.');
        });

        it('Skal returnere "Du må oppsøke en som har rett til å sykmelde." dersom sykmelder har ugyldig autorisasjon', () => {
            sykmelding.behandlingsutfall.ruleHits[0].ruleName = 'BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR';
            const resultat = hentHandlingsstreng(sykmelding);
            expect(resultat).to.contain('Du må oppsøke en som har rett til å sykmelde.');
        });
    });
});
