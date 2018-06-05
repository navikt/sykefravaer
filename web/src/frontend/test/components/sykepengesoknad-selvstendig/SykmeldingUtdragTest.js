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
            'sykepengesoknad.sykmelding-utdrag.forsikring': 'Forsikring',
            'sykepengesoknad.sykmelding-utdrag.forsikring-ja': 'Ja – %GRAD% % sykepenger fra dag 1',
            'sykepengesoknad.sykmelding-utdrag.forsikring-nei': 'Nei',
        });
        sykmelding = getSykmelding({
            valgtArbeidssituasjon: arbeidssituasjoner.NAERINGSDRIVENDE,
            sporsmal: {
                fravaersperioder: [{
                    fom: new Date('2018-03-21'),
                    tom: new Date('2018-03-24'),
                }],
                forsikring: 75,
                arbeidssituasjon: arbeidssituasjoner.NAERINGSDRIVENDE,
                fravaerBesvart: true,
                forsikringBesvart: true,
            },
        });
    });

    it('Skal vise informasjon om fraværsperioder dersom dette spørsmålet er besvart', () => {
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Egenmelding og/eller sykmelding på papir');
        expect(component.text()).to.contain('21.03.2018 – 24.03.2018');
    });

    it('Skal ikke vise informasjon om fraværsperioder dersom dette spørsmålet ikke er besvart', () => {
        sykmelding.sporsmal.fravaerBesvart = false;
        sykmelding.sporsmal.fravaersperioder = [];
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).not.to.contain('Egenmelding og/eller sykmelding på papir');
        expect(component.text()).not.to.contain('21.03.2018 – 24.03.2018');
    });

    it('Skal vise informasjon om forsikring dersom dette spørsmålet er stilt', () => {
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Forsikring');
        expect(component.text()).to.contain('Ja – 75 % sykepenger fra dag 1');
    });

    it('Skal vise informasjon om forsikring dersom dette spørsmålet er stilt og besvart med nei', () => {
        sykmelding.sporsmal.forsikring = null;
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).to.contain('Forsikring');
        expect(component.text()).to.contain('Nei');
    });

    it('Skal ikke vise informasjon om forsikring dersom dette spørsmålet ikke er stilt', () => {
        sykmelding.sporsmal.forsikringBesvart = false;
        sykmelding.sporsmal.forsikringBesvart = null;
        const component = mount(<SykmeldingUtdrag sykmelding={sykmelding} erApen />);
        expect(component.text()).not.to.contain('Forsikring');
        expect(component.text()).not.to.contain('Ja – 75 % sykepenger fra dag 1');
    });
});
