import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { sykmeldingstatuser } from 'digisyfo-npm';
import getSykmelding from '../../mock/mockSykmeldinger';
import SykmeldingStatuspanel, { Nokkelopplysninger } from '../../../js/components/sykmeldingstatuspanel/SykmeldingStatuspanel';
import { Sykmeldingstatus, SendtDato, Arbeidsgiver, Orgnummer } from '../../../js/components/sykmeldingstatuspanel/SykmeldingStatuspanelOpplysning';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('StatusPanelTest', () => {
    let component;

    describe('Sendt sykmelding', () => {
        beforeEach(() => {
            const sykmelding = getSykmelding({
                status: sykmeldingstatuser.SENDT,
            });
            component = mount(<SykmeldingStatuspanel
                sykmelding={sykmelding} />);
        });

        it('Skal vise Sykmeldingstatus', () => {
            expect(component.find(Sykmeldingstatus)).to.have.length(1);
        });

        it('Skal vise SendtDato', () => {
            expect(component.find(SendtDato)).to.have.length(1);
        });

        it('Skal vise Arbeidsgiver', () => {
            expect(component.find(Arbeidsgiver)).to.have.length(1);
        });

        it('Skal vise Orgnummer', () => {
            expect(component.find(Orgnummer)).to.have.length(1);
        });
    });

    describe('Til sending sykmelding', () => {
        beforeEach(() => {
            const sykmelding = getSykmelding({
                status: sykmeldingstatuser.TIL_SENDING,
            });
            component = mount(<SykmeldingStatuspanel
                sykmelding={sykmelding} />);
        });

        it('Skal vise Sykmeldingstatus', () => {
            expect(component.find(Sykmeldingstatus)).to.have.length(1);
        });

        it('Skal vise SendtDato', () => {
            expect(component.find(SendtDato)).to.have.length(1);
        });

        it('Skal vise Arbeidsgiver', () => {
            expect(component.find(Arbeidsgiver)).to.have.length(1);
        });

        it('Skal vise Orgnummer', () => {
            expect(component.find(Orgnummer)).to.have.length(1);
        });
    });

    describe('Avbrutt sykmelding', () => {
        beforeEach(() => {
            const sykmelding = getSykmelding({
                status: sykmeldingstatuser.AVBRUTT,
            });
            component = mount(<Nokkelopplysninger
                sykmelding={sykmelding} />);
        });

        it('Skal vise Sykmeldingstatus', () => {
            expect(component.find(Sykmeldingstatus)).to.have.length(1);
        });

        it('Skal vise SendtDato', () => {
            expect(component.find(SendtDato)).to.have.length(1);
        });

        it('Skal ikke vise Arbeidsgiver', () => {
            expect(component.find(Arbeidsgiver)).to.have.length(0);
        });

        it('Skal ikke vise Orgnummer', () => {
            expect(component.find(Orgnummer)).to.have.length(0);
        });
    });

    describe('Utgått sykmelding', () => {
        beforeEach(() => {
            const sykmelding = getSykmelding({
                status: sykmeldingstatuser.UTGAATT,
            });
            component = mount(<SykmeldingStatuspanel
                sykmelding={sykmelding} />);
        });

        it('Skal vise Sykmeldingstatus', () => {
            expect(component.find(Sykmeldingstatus)).to.have.length(1);
        });

        it('Skal vise SendtDato', () => {
            expect(component.find(SendtDato)).to.have.length(0);
        });

        it('Skal ikke vise Arbeidsgiver', () => {
            expect(component.find(Arbeidsgiver)).to.have.length(0);
        });

        it('Skal ikke vise Orgnummer', () => {
            expect(component.find(Orgnummer)).to.have.length(0);
        });
    });
});
