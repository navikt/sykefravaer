import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import { getNySoknadSelvstendig } from '../../mock/mockSoknadSelvstendig';
import Oppsummeringsvisning from '../../../js/components/soknad-felles-oppsummering/Oppsummeringsvisning';
import populerSoknadMedSvar from '../../../js/utils/soknad-felles/populerSoknadMedSvar';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppsummeringvisning', () => {
    let values;

    beforeEach(() => {
        setLedetekster({
            'soknad.ja': 'Ja',
            'soknad.nei': 'Nei',
            'soknad.periode': 'Fra %FOM% til %TOM%',
            'soknad.timer-totalt': 'timer totalt',
            'soknad.prosent': 'prosent',
        });

        values = {
            ANSVARSERKLARING: {
                sporsmalsid: '1',
                svarverdier: [
                    {
                        verdi: 'CHECKED',
                    },
                ],
            },
            TILBAKE_I_ARBEID: {
                sporsmalsid: '2',
                svarverdier: [
                    {
                        verdi: 'JA',
                    },
                ],
            },
            JOBBET_DU_100_PROSENT_0: {
                sporsmalsid: '4',
                svarverdier: [
                    {
                        verdi: 'JA',
                    },
                ],
            },
            HVOR_MANGE_TIMER_0: {
                sporsmalsid: '5',
                svarverdier: [
                    {
                        verdi: '37',
                    },
                ],
            },
            HVOR_MYE_HAR_DU_JOBBET_0: {
                sporsmalsid: '6',
                svarverdier: [
                    {
                        verdi: '15',
                    },
                ],
            },
            JOBBET_DU_GRADERT_1: {
                sporsmalsid: '7',
                svarverdier: [
                    {
                        verdi: 'NEI',
                    },
                ],
            },
            HVOR_MANGE_TIMER_1: {
                sporsmalsid: '8',
                svarverdier: [
                    {
                        verdi: '',
                    },
                ],
            },
            TILBAKE_NAR: {
                sporsmalsid: '3',
                svarverdier: [
                    {
                        verdi: '21.03.2018',
                    },
                ],
            },
            ANDRE_INNTEKTSKILDER: {
                sporsmalsid: '10',
                svarverdier: [
                    {
                        verdi: 'JA',
                    },
                ],
            },
            INNTEKTSKILDE_ARBEIDSFORHOLD: {
                sporsmalsid: '12',
                svarverdier: [
                    {
                        verdi: 'CHECKED',
                    },
                ],
            },
            INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT: {
                sporsmalsid: '13',
                svarverdier: [
                    {
                        verdi: 'JA',
                    },
                ],
            },
            UTLAND: {
                sporsmalsid: '20',
                svarverdier: [
                    {
                        verdi: 'JA',
                    },
                ],
            },
            PERIODER: [
                {
                    fom: '20.03.2018',
                    tom: '22.03.2018',
                },
            ],
            UTLANDSOPPHOLD_SOKT_SYKEPENGER: {
                sporsmalsid: '22',
                svarverdier: [{
                    verdi: 'NEI',
                }],
            },
            UTDANNING: {
                sporsmalsid: '23',
                svarverdier: [
                    {
                        verdi: 'JA',
                    },
                ],
            },
            UTDANNING_START: {
                sporsmalsid: '24',
                svarverdier: [
                    {
                        verdi: '22.03.2014',
                    },
                ],
            },
            FULLTIDSSTUDIUM: {
                sporsmalsid: '25',
                svarverdier: [
                    {
                        verdi: 'NEI',
                    },
                ],
            },
        };
    });

    it('Skal vise besvarte spørsmål på nivå 1', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.text()).to.contain('Jeg vet at dersom jeg gir uriktige opplysninger');
    });

    it('Skal vise besvarte spørsmål på nivå 1 (ja/nei-spørsmål)', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.text()).to.contain('Var du tilbake i fullt arbeid som FRILANSER før sykmeldingsperioden utløp 28.05.2018?');
        expect(component.text()).to.contain('Ja');
    });

    it('Skal vise besvarte spørsmål på nivå 2 når hovedspørsmål er besvart med JA', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.find('#js-tilbake_nar').text()).to.contain('Når var du tilbake i arbeid?');
        expect(component.find('#js-tilbake_nar').text()).to.contain('21.03.2018');
    });

    it('Skal vise besvarte spørsmål på nivå 2 når underspørsmål er av typen TIMER', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.find('#js-hvor_mange_timer_0').text()).to.contain('37 timer totalt');
        expect(component.find('#js-hvor_mye_har_du_jobbet_0').text()).to.contain('15 prosent');
    });

    it('Skal vise besvarte spørsmål på nivå 2 når underspørsmål er av typen PERIODER', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.find('#js-perioder').text()).to.contain('Fra 20.03.2018 til 22.03.2018');
    });

    it('Skal vise besvarte spørsmål på nivå 2 når underspørsmål er av typen Andre arbeidsforhold', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.find('#js-hvilke_andre_inntektskilder').text()).to.contain('Arbeidsforhold');
        expect(component.find('#js-hvilke_andre_inntektskilder').text()).to.contain('Er du sykmeldt fra dette?');
        expect(component.find('#js-hvilke_andre_inntektskilder').text()).to.contain('Ja');
    });

    it('Skal ha riktig overskriftsnivå på underspørsmål i checkboxgrupper', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.contains(<h5 className="oppsummering__sporsmal">Er du sykmeldt fra dette?</h5>)).to.equal(true);
        expect(component.contains(<h4 className="oppsummering__sporsmal">Hvilke andre inntektskilder har du?</h4>)).to.equal(true);
    });

    it('Skal vise dato på riktig format', () => {
        const populertSoknad = populerSoknadMedSvar(getNySoknadSelvstendig(), values);
        const component = mount(<Oppsummeringsvisning soknad={populertSoknad} />);
        expect(component.text()).to.contain('22.03.2014');
    });
});
