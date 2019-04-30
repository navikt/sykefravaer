import React from 'react';
import { AvvistSykmeldingPanel } from './AvvistSykmelding';
import expect from '../../../test/expect';
import { BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR, INVALID_RULESET_VERSION, PATIENT_OVER_70_YEARS } from '../../enums/avvisningsregelnavn';
import mountWithStore from '../../../test/mountWithStore';

describe('AvvvistSykmelding', () => {
    describe('AvvvistSykmeldingPanel', () => {
        let sykmelding;
        let setRegelnavn;

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

            setRegelnavn = (regelnavn, regelIndex = 0) => {
                sykmelding.behandlingsutfall.ruleHits[regelIndex].ruleName = regelnavn;
            };
        });

        it('Skal inneholde "Du må be om ny sykmelding." dersom bruker har ukjent diagnose', () => {
            const component = mountWithStore(<AvvistSykmeldingPanel smSykmelding={sykmelding} />);
            expect(component.text()).to.contain('Du må be om ny sykmelding.');
            expect(component.text()).to.contain('Grunnen til at sykmeldingen er avvist:');
        });

        it('Skal inneholde info om bekreftelse dersom bruker er for gammel', () => {
            setRegelnavn(PATIENT_OVER_70_YEARS);
            const component = mountWithStore(<AvvistSykmeldingPanel smSykmelding={sykmelding} />);
            expect(component.text()).to.contain(' Du kan i stedet be om en bekreftelse hvis du trenger dokumentasjon på at du er syk.');
        });

        it('Skal ikke inneholde noe om "grunnen til at sykmeldingen er avvist" dersom bruker er for gammel', () => {
            setRegelnavn(PATIENT_OVER_70_YEARS);
            const component = mountWithStore(<AvvistSykmeldingPanel smSykmelding={sykmelding} />);
            expect(component.text()).not.to.contain('Grunnen til at sykmeldingen er avvist:');
        });

        it('Skal inneholde "Du må oppsøke en som har rett til å sykmelde." dersom sykmelder har ugyldig autorisasjon', () => {
            setRegelnavn(BEHANDLER_NOT_VALID_AUTHORIZATION_IN_HPR);
            const component = mountWithStore(<AvvistSykmeldingPanel smSykmelding={sykmelding} />);
            expect(component.text()).to.contain('Du må oppsøke en som har rett til å sykmelde.');
        });

        it('Skal inneholde riktig tekst når det er ugydlig sykmld-versjon', () => {
            setRegelnavn(INVALID_RULESET_VERSION);
            const component = mountWithStore(<AvvistSykmeldingPanel smSykmelding={sykmelding} />);
            expect(component.text()).to.contain('Du har fått en sykmelding, men den kan ikke brukes fordi det er brukt en ugyldig versjon av sykmeldingen.');
        });
    });
});
