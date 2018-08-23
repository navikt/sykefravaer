import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster, arbeidssituasjoner } from 'digisyfo-npm';
import getSykmelding from '../../mockSykmeldinger';
import SykmeldingUtdrag from '../../../js/components/sykepengesoknad-selvstendig/SykmeldingUtdrag';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SykmeldingUtdrag', () => {
    let sykmelding;

    beforeEach(() => {
        setLedetekster({
            'sykepengesoknad.sykmelding-utdrag.egenmelding-papir': 'Egenmelding og/eller sykmelding på papir',
            'sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei': 'Har ikke hatt egenmelding og/eller sykmelding på papir',
            'sykepengesoknad.sykmelding-utdrag.forsikring': 'Forsikring',
            'sykepengesoknad.sykmelding-utdrag.forsikring-ja': 'Ja – %GRAD% % sykepenger fra dag 1',
            'sykepengesoknad.sykmelding-utdrag.forsikring-nei': 'Har ikke forsikring som gjelder de første 16 dagene av sykefraværet',
        });
        sykmelding = getSykmelding({
            valgtArbeidssituasjon: arbeidssituasjoner.NAERINGSDRIVENDE,
            sporsmal: {
                fravaersperioder: [{
                    fom: new Date('2018-03-21'),
                    tom: new Date('2018-03-24'),
                }],
                dekningsgrad: 75,
                arbeidssituasjon: arbeidssituasjoner.NAERINGSDRIVENDE,
                harAnnetFravaer: true,
                harForsikring: true,
            },
        });
    });

    it('Skal vise informasjon om fraværsperioder dersom dette spørsmålet er besvart', () => {
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Egenmelding og/eller sykmelding på papir');
        expect(component.text()).to.contain('21.03.2018 – 24.03.2018');
    });

    it('Skal ikke vise informasjon om fraværsperioder dersom dette spørsmålet ikke er besvart', () => {
        sykmelding.sporsmal.harAnnetFravaer = null;
        sykmelding.sporsmal.fravaersperioder = [];
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).not.to.contain('Egenmelding og/eller sykmelding på papir');
        expect(component.text()).not.to.contain('21.03.2018 – 24.03.2018');
    });

    it('Skal vise informasjon om fraværsperioder dersom dette spørsmålet er besvart med NEI', () => {
        sykmelding.sporsmal.harAnnetFravaer = false;
        sykmelding.sporsmal.fravaersperioder = [];
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Egenmelding og/eller sykmelding på papir');
        expect(component.text()).to.contain('Har ikke hatt egenmelding og/eller sykmelding på papir');
    });

    it('Skal vise informasjon om forsikring dersom dette spørsmålet er stilt', () => {
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Forsikring');
        expect(component.text()).to.contain('Ja – 75 % sykepenger fra dag 1');
    });

    it('Skal vise informasjon om forsikring dersom dette spørsmålet er stilt og besvart med nei', () => {
        sykmelding.sporsmal.dekningsgrad = null;
        sykmelding.sporsmal.harDekningsgrad = false;
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Forsikring');
        expect(component.text()).to.contain('Har ikke forsikring som gjelder de første 16 dagene av sykefraværet');
    });

    it('Skal ikke vise informasjon om forsikring dersom dette spørsmålet ikke er stilt', () => {
        sykmelding.sporsmal.harForsikring = null;
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).not.to.contain('Forsikring');
        expect(component.text()).not.to.contain('Ja – 75 % sykepenger fra dag 1');
    });

    it('Skal vise informasjon om forsikring og fraværsperioder desom begge er besvart med nei', () => {
        sykmelding.sporsmal = {
            arbeidssituasjon: 'NAERINGSDRIVENDE',
            dekningsgrad: null,
            harForsikring: false,
            fravaersperioder: [],
            harAnnetFravaer: false,
        };
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Forsikring');
        expect(component.text()).to.contain('Har ikke forsikring som gjelder de første 16 dagene av sykefraværet');
        expect(component.text()).to.contain('Egenmelding og/eller sykmelding på papir');
        expect(component.text()).to.contain('Har ikke hatt egenmelding og/eller sykmelding på papir');
    });
});
