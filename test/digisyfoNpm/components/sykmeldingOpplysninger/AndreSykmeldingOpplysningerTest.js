import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import AndreSykmeldingOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/AndreSykmeldingOpplysninger';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('AndreSykmeldingOpplysninger', () => {
    let component;

    it('Skal ikke vise sykmelderTlf dersom sykmelderTlf === null', () => {
        component = mount(<AndreSykmeldingOpplysninger
            sykmelding={getParsetSykmelding({
                bekreftelse: {
                    sykmelderTlf: null,
                },
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-sykmelderTlf').length).to.equal(0);
    });

    it('Skal vise sykmelderTlf dersom sykmelderTlf finnes', () => {
        component = mount(<AndreSykmeldingOpplysninger
            sykmelding={getParsetSykmelding({
                bekreftelse: {
                    sykmelderTlf: '22332244',
                },
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-sykmelderTlf').length).to.equal(1);
        expect(component.find('.js-sykmelderTlf').text()).to.equal('22332244');
    });
});
