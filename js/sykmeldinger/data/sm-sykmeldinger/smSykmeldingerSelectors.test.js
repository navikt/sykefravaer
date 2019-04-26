import smSykmeldinger from './smSykmeldinger';
import { skalHenteSmSykmeldingerSelector, avvisteSmSykmeldingerDataSelector } from './smSykmeldingerSelectors';
import expect from '../../../../test/expect';
import { henterSmSykmeldinger, smSykmeldingerHentet } from './smSykmeldingerActions';
import unleashToggles from '../../../reducers/unleashToggles';
import { unleashTogglesHentet } from '../../../actions/unleashToggles_actions';
import { NYTT_SYKMELDINGSMOTTAK } from '../../../enums/unleashToggles';

describe('smSykmeldingerSelectors', () => {
    let unleashTogglesReducer;

    beforeEach(() => {
        unleashTogglesReducer = unleashToggles(unleashToggles(), unleashTogglesHentet({
            [NYTT_SYKMELDINGSMOTTAK]: true,
        }));
    });
    describe('skalHenteSmSykmeldingerSelector', () => {
        it('Skal returnere true når sykmeldinger ikke er hentet', () => {
            const state = {
                smSykmeldinger: smSykmeldinger(),
                unleashToggles: unleashTogglesReducer,
            };
            expect(skalHenteSmSykmeldingerSelector(state)).to.equal(true);
        });

        it('Skal returnere false når sykmeldinger er hentet', () => {
            const state = {
                smSykmeldinger: smSykmeldinger(smSykmeldinger(), smSykmeldingerHentet()),
                unleashToggles: unleashTogglesReducer,
            };
            expect(skalHenteSmSykmeldingerSelector(state)).to.equal(false);
        });

        it('Skal returnere false når sykmeldinger hentes', () => {
            const state = {
                smSykmeldinger: smSykmeldinger(smSykmeldinger(), henterSmSykmeldinger()),
                unleashToggles: unleashTogglesReducer,
            };
            expect(skalHenteSmSykmeldingerSelector(state)).to.equal(false);
        });
    });

    describe('avvisteSmSykmeldingerDataSelector', () => {
        it('Skal kun returnere avviste sykmeldinger', () => {
            const data = [
                {
                    id: '2',
                    behandlingsutfall: {
                        status: 'MANUAL_PROCESSING',
                        ruleHits: [
                            {
                                ruleName: 'PATIENT_NOT_IN_IP',
                                messageForSender: 'Hvis pasienten ikke finnes i infotrygd',
                                messageForUser: 'Hvis pasienten ikke finnes i infotrygd',
                            },
                        ],
                    },
                },
                {
                    id: '3',
                    behandlingsutfall: {
                        status: 'INVALID',
                        ruleHits: [
                            {
                                ruleName: 'PATIENT_NOT_IN_IP',
                                messageForSender: 'Hvis pasienten ikke finnes i infotrygd',
                                messageForUser: 'Hvis pasienten ikke finnes i infotrygd',
                            },
                        ],
                    },
                },
            ];

            const state = {
                smSykmeldinger: smSykmeldinger(smSykmeldinger(), smSykmeldingerHentet(data)),
                unleashToggles: unleashTogglesReducer,
            };
            const resultat = avvisteSmSykmeldingerDataSelector(state);
            expect(resultat).to.deep.equal([{
                id: '3',
                behandlingsutfall: {
                    status: 'INVALID',
                    ruleHits: [
                        {
                            ruleName: 'PATIENT_NOT_IN_IP',
                            messageForSender: 'Hvis pasienten ikke finnes i infotrygd',
                            messageForUser: 'Hvis pasienten ikke finnes i infotrygd',
                        },
                    ],
                },
            }]);
        });
    });
});
