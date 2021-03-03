import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import SykmeldingPerioder from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/SykmeldingPerioder';
import ArbeidsgiversNokkelopplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/ArbeidsgiversNokkelopplysninger';

chai.use(chaiEnzyme());
const { expect } = chai;

let component;

describe('ArbeidsgiversNokkelopplysninger', () => {
    beforeEach(() => {
        component = shallow(<ArbeidsgiversNokkelopplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
    });

    it('Skal vise perioder', () => {
        expect(component.find(SykmeldingPerioder)).to.have.length(1);
    });

    it('Skal vise diagnose som et skravert felt dersom sykmelding.skalViseSkravertFelt === true', () => {
        component = shallow(<ArbeidsgiversNokkelopplysninger
            sykmelding={getParsetSykmelding({
                skalViseSkravertFelt: true,
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-diagnose')).to.have.length(1);
        expect(component.find('.js-diagnose').prop('alt')).to.equal('Diagnosen er skjult for arbeidsgiver');
    });

    it('Skal ikke vise diagnose som et skravert felt dersom sykmelding.skalViseSkravertFelt === false', () => {
        component = shallow(<ArbeidsgiversNokkelopplysninger
            sykmelding={getParsetSykmelding({
                skalViseSkravertFelt: false,
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-diagnose')).to.have.length(0);
    });

    describe('Hensyn på arbeidsplassen', () => {
        it('Skal vise dersom det finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger
                sykmelding={getParsetSykmelding({
                    friskmelding: {
                        hensynPaaArbeidsplassen: 'Ta godt vare på denne personen',
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hensynPaaArbeidsplassen')).to.have.length(1);
            expect(component.find('.js-hensynPaaArbeidsplassen').text()).to.equal('Ta godt vare på denne personen');
        });

        it('Skal ikke vise dersom det ikke finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
            expect(component.find('.js-hensynPaaArbeidsplassen').length).to.equal(0);
        });
    });

    describe('Arbeidsgiver for denne sykmeldingen', () => {
        it('Skal vise arbeidsgiver dersom det finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger
                sykmelding={getParsetSykmelding({
                    arbeidsgiver: 'Hansen AS',
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-arbeidsgiver')).to.have.length(1);
            expect(component.find('.js-arbeidsgiver').text()).to.equal('Hansen AS');
        });

        it('Skal ikke vise arbeidsgiver dersom det ikke finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger
                sykmelding={getParsetSykmelding({
                    arbeidsgiver: null,
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-arbeidsgiver').length).to.equal(0);
        });

        it('Skal vise stillingsprosent dersom det finnes og sykmelding har fom lik/etter 2018-04-26', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger
                sykmelding={getParsetSykmelding({
                    mulighetForArbeid: {
                        perioder: [
                            {
                                fom: new Date('2018-04-26'),
                            },
                        ],
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-stillingsprosent').text()).to.equal('100 % stilling');
        });

        it('Skal ikke vise stillingsprosent for sykmeldinger med fom før 2018-04-26', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
            expect(component.find('.js-stillingsprosent').length).to.equal(0);
        });

        it('Skal ikke vise stillingsprosent dersom det ikke finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger
                sykmelding={getParsetSykmelding({
                    stillingsprosent: null,
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-stillingsprosent').length).to.equal(0);
        });
    });

    describe('Lege/sykmelder', () => {
        it('Skal vise dersom det finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
            expect(component.find('.js-sykmelder')).to.have.length(1);
            expect(component.find('.js-sykmelder').text()).to.equal('Test Testesen');
        });

        it('Skal ikke vise dersom det ikke finnes', () => {
            component = shallow(<ArbeidsgiversNokkelopplysninger
                sykmelding={getParsetSykmelding({
                    bekreftelse: {
                        sykmelder: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-sykmelder').length).to.equal(0);
        });
    });
});
