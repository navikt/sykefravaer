import React from 'react';
import mountWithStore from '../../../test/mountWithStore';
import { SykmeldingOpplysninger } from './SykmeldingOpplysninger';
import expect from '../../../test/expect';


describe('SykmeldingOpplysninger', () => {
    let sykmelding;

    beforeEach(() => {
        sykmelding = {
            id: '60fb7e58-3918-4a3f-8973-ab505b3407b0',
            mottattTidspunkt: new Date('2018-08-31T00:00:00'),
            bekreftetDato: null,
            behandlingsutfall: {
                status: 'INVALID',
                ruleHits: [
                    {
                        ruleName: 'BACKDATED_MORE_THEN_8_DAYS_FIRST_SICK',
                        messageForSender: 'Det må begrunnes hvorfor sykmeldingen er tilbakedatert.',
                        messageForUser: 'Første sykmelding er tilbakedatert mer enn det som er tillatt.',
                    },
                ],
            },
            legekontorOrgnummer: '111222333',
            legeNavn: 'Lege Navn',
            arbeidsgiver: {
                navn: 'ARBEIDSGIVER AS',
                stillingsprosent: 100,
            },
            sykmeldingsperioder: [
                {
                    fom: new Date('2018-09-01'),
                    tom: new Date('2018-09-05'),
                    gradert: null,
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    type: 'AKTIVITET_IKKE_MULIG',
                },
                {
                    fom: new Date('2018-08-05'),
                    tom: new Date('2018-08-17'),
                    gradert: {
                        grad: 20,
                        reisetilskudd: true,
                    },
                    behandlingsdager: null,
                    innspillTilArbeidsgiver: null,
                    type: 'GRADERT',
                },
            ],
        };
    });

    it('skal vise diagnose og bidiagnose hvis sykmeldingen har medisinsk vurdering', () => {
        sykmelding = {
            ...sykmelding,
            medisinskVurdering: {
                hovedDiagnose: {
                    diagnosekode: 'diagnosekode-hoveddiagnose',
                    diagnosesystem: 'diagnosesystem-hoveddiagnose',
                    diagnosetekst: 'diagnosetekst-hoveddiagnose',
                },
                biDiagnoser: [
                    {
                        diagnosekode: 'diagnosekode-bi-diagnose',
                        diagnosesystem: 'diagnosesystem-bi-diagnose',
                        diagnosetekst: 'diagnosetekst-bi-diagnose',
                    },
                ],
            },
        };

        const component = mountWithStore(<SykmeldingOpplysninger smSykmelding={sykmelding} />);

        expect(component.find('.js-hoveddiagnose')).to.contain('diagnosetekst-hoveddiagnose');
        expect(component.find('.js-bidiagnose')).to.contain('diagnosetekst-bi-diagnose');
    });

    it('skal vise at diagnose mangler hvis sykmelding har medisinsk vurdering, men ingen diagnose', () => {
        sykmelding = {
            ...sykmelding,
            medisinskVurdering: {
                hovedDiagnose: null,
                biDiagnoser: [
                    {
                        diagnosekode: 'diagnosekode-bi-diagnose',
                        diagnosesystem: 'diagnosesystem-bi-diagnose',
                        diagnosetekst: 'diagnosetekst-bi-diagnose',
                    },
                ],
            },
        };

        const component = mountWithStore(<SykmeldingOpplysninger smSykmelding={sykmelding} />);

        expect(component.find('.js-hoveddiagnose')).to.contain('Mangler diagnose');
    });

    it('skal vise at bi-diagnoser mangler hvis sykmelding har medisinsk vurdering, men ingen bi-diagnoser', () => {
        sykmelding = {
            ...sykmelding,
            medisinskVurdering: {
                hovedDiagnose: {
                    diagnosekode: 'diagnosekode-bi-diagnose',
                    diagnosesystem: 'diagnosesystem-bi-diagnose',
                    diagnosetekst: 'diagnosetekst-bi-diagnose',
                },
                biDiagnoser: [],
            },
        };

        const component = mountWithStore(<SykmeldingOpplysninger smSykmelding={sykmelding} />);

        expect(component.find('.js-bidiagnose').exists()).to.equal(false);
    });

    it('skal ikke vise diagnoser hvis sykmelding ikke har medisinsk vurdering', () => {
        const component = mountWithStore(<SykmeldingOpplysninger smSykmelding={sykmelding} />);

        expect(component.find('.js-hoveddiagnose').exists()).to.equal(false);
        expect(component.find('.js-bidiagnose').exists()).to.equal(false);
    });
});
