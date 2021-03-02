import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import FlereOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/FlereOpplysninger';
import Friskmelding from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/Friskmelding';
import UtdypendeOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/UtdypendeOpplysninger';
import BedreArbeidsevne from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/BedreArbeidsevne';
import MeldingTilNAV from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/MeldingTilNAV';
import MeldingTilArbeidsgiver from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/MeldingTilArbeidsgiver';
import Tilbakedatering from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/Tilbakedatering';
import AndreSykmeldingOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/AndreSykmeldingOpplysninger';
import MulighetForArbeid from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/MulighetForArbeid';

chai.use(chaiEnzyme());
const { expect } = chai;

let component;

describe('FlereOpplysninger', () => {
    beforeEach(() => {
        component = mount(<FlereOpplysninger
            sykmelding={getParsetSykmelding()}
            ledetekster={ledetekster} />);
    });

    it('Viser dato sykmelding ble skrevet', () => {
        expect(component.find('.js-utstedelsesdato')).to.have.length(1);
    });

    it('Viser MulighetForArbeid', () => {
        expect(component.find(MulighetForArbeid)).to.have.length(1);
    });

    it('Viser Friskmelding', () => {
        expect(component.find(Friskmelding)).to.have.length(1);
    });

    it('Viser UtdypendeOpplysninger', () => {
        expect(component.find(UtdypendeOpplysninger)).to.have.length(1);
    });

    it('Viser BedreArbeidsevne', () => {
        expect(component.find(BedreArbeidsevne)).to.have.length(1);
    });

    it('Viser MeldingTilNAV', () => {
        expect(component.find(MeldingTilNAV)).to.have.length(1);
    });

    it('Viser MeldingTilArbeidsgiver', () => {
        expect(component.find(MeldingTilArbeidsgiver)).to.have.length(1);
    });

    it('Viser Tilbakedatering', () => {
        expect(component.find(Tilbakedatering)).to.have.length(1);
    });

    it('Viser AndreSykmeldingOpplysninger', () => {
        expect(component.find(AndreSykmeldingOpplysninger)).to.have.length(1);
    });
});
