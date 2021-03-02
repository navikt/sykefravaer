import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import MeldingTilNAV from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/MeldingTilNAV';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('Melding til NAV', () => {
    describe('navBoerTaTakISaken', () => {
        it('Skal vise checkbox dersom sykmelding.navBoerTaTakISaken === true', () => {
            const component = mount(<MeldingTilNAV
                sykmelding={getParsetSykmelding({
                    meldingTilNav: {
                        navBoerTaTakISaken: true,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-navBoerTaTakISaken').text()).to.equal('NAV bør ta tak i saken nå');
        });

        it('Skal ikke vise navBoerTaTakISaken dersom den ikke finnes', () => {
            const component = mount(<MeldingTilNAV
                sykmelding={getParsetSykmelding({
                    meldingTilNav: {
                        navBoerTaTakISaken: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-navBoerTaTakISaken').length).to.equal(0);
        });
    });

    describe('navBoerTaTakISaken med begrunnelse', () => {
        it('Skal vise checkbox og begrunnelse dersom sykmelding.navBoerTaTakISaken === true og navBoerTaTakISakenBegrunnelse = (noe)', () => {
            const component = mount(
                <MeldingTilNAV
                    sykmelding={getParsetSykmelding({
                        meldingTilNav: {
                            navBoerTaTakISaken: true,
                            navBoerTaTakISakenBegrunnelse: 'Den sykmeldte trenger bistand fra NAV',
                        },
                    })}
                    ledetekster={ledetekster} />,
            );
            expect(component.find('.js-navBoerTaTakISaken').text()).to.equal('NAV bør ta tak i saken nå');
            expect(component.find('.js-navBoerTaTakISakenBegrunnelse').text()).to.equal('Den sykmeldte trenger bistand fra NAV');
        });

        it('Skal ikke vise begrunnelse dersom den ikke finnes', () => {
            const component = mount(
                <MeldingTilNAV
                    sykmelding={getParsetSykmelding({
                        meldingTilNav: {
                            navBoerTaTakISaken: true,
                        },
                    })}
                    ledetekster={ledetekster} />,
            );
            expect(component.find('.js-navBoerTaTakISakenBegrunnelse').length).to.equal(0);
        });
    });
});
