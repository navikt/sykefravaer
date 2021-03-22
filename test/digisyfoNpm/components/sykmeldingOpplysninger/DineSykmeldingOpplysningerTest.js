import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import DineSykmeldingOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import SykmeldingPerioder from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/SykmeldingPerioder';
import FlereOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/FlereOpplysninger';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('DineSykmeldingOpplysninger', () => {
    let component;

    it('Skal vise "Avventende sykmelding" som tittel dersom sykmeldingen er avventende', () => {
        const sykmelding = getParsetSykmelding();
        sykmelding.mulighetForArbeid.perioder[0].avventende = true;
        component = mount(<DineSykmeldingOpplysninger
            sykmelding={sykmelding}
            ledetekster={ledetekster} />);
        expect(component.find('.js-din-sykmelding-tittel').length).to.equal(1);
        expect(component.find('.js-din-sykmelding-tittel').text()).to.contain('Avventende sykmelding');
    });

    it('Skal vise perioder', () => {
        component = shallow(<DineSykmeldingOpplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPerioder)).to.have.length(1);
    });

    it('Skal vise avsender', () => {
        expect(component.find('.js-avsender').text()).to.contain('Test Testesen');
    });

    it('Skal ikke vise avsender dersom det ikke finnes', () => {
        component = mount(<DineSykmeldingOpplysninger
            sykmelding={getParsetSykmelding({
                bekreftelse: {
                    sykmelder: null,
                },
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-avsender').length).to.equal(0);
    });

    it('Skal vise arbeidsgiver', () => {
        expect(component.find('.js-arbeidsgiver').text()).to.equal('Selskapet AS');
    });

    it('Skal ikke vise arbeidsgiver dersom det ikke finnes', () => {
        component = mount(<DineSykmeldingOpplysninger
            sykmelding={getParsetSykmelding({
                arbeidsgiver: null,
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-arbeidsgiver').length).to.equal(0);
    });

    it('Skal vise stillingsprosent dersom den finnes og sykmelding har fom lik/etter 2018-04-26', () => {
        component = mount(<DineSykmeldingOpplysninger
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

    it('Skal ikke vise stillingsprosent for sykmelding med fom før 2018-04-26', () => {
        component = mount(<DineSykmeldingOpplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
        expect(component.find('.js-stillingsprosent').length).to.equal(0);
    });

    it('Skal ikke vise stillingsprosent dersom det ikke finnes', () => {
        component = mount(<DineSykmeldingOpplysninger
            sykmelding={getParsetSykmelding({
                stillingsprosent: null,
            })}
            ledetekster={ledetekster} />);
        expect(component.find('.js-stillingsprosent').length).to.equal(0);
    });

    it('Viser flere opplysninger', () => {
        component = shallow(<DineSykmeldingOpplysninger
            sykmelding={getParsetSykmelding({
                friskmelding: {
                    antarReturSammeArbeidsgiver: true,
                },
            })}
            ledetekster={ledetekster} />);
        expect(component.find(FlereOpplysninger)).to.have.length(1);
    });

    describe('hensynPaaArbeidsplassen', () => {
        it('Skal vise hensyn dersom feltet er utfylt', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    friskmelding: {
                        hensynPaaArbeidsplassen: 'Tekst',
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hensynPaaArbeidsplassen').text()).to.equal('Tekst');
        });

        it('Skal ikke vise hensyn dersom feltet ikke er utfylt', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    friskmelding: {
                        hensynPaaArbeidsplassen: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hensynPaaArbeidsplassen').length).to.equal(0);
        });
    });

    describe('hoveddiagnose', () => {
        it('Skal vise hoveddiagnose dersom den finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding()}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hoveddiagnose').text()).to.equal('Influensa');
            expect(component.find('.js-hoveddiagnose-kode').text()).to.contain('LP2');
            expect(component.find('.js-hoveddiagnose-system').text()).to.contain('ICPC');
        });

        it('Skal ikke vise hoveddiagnose dersom den ikke finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        hoveddiagnose: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hoveddiagnose').length).to.equal(0);
            expect(component.find('.js-hoveddiagnose-kode').length).to.equal(0);
            expect(component.find('.js-hoveddiagnose-system').length).to.equal(0);
        });
    });


    describe('Bidiagnose', () => {
        it('Skal ikke vise bidiagnose dersom det ikke finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        bidiagnoser: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-bidiagnose').length).to.equal(0);
        });

        it('Skal vise hoveddiagnose dersom det finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        bidiagnoser: [{
                            diagnose: 'Mageknipe',
                            diagnosesystem: 'IZPZ',
                            diagnosekode: 'LP3',
                        }],
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-bidiagnose').text()).to.equal('Mageknipe');
            expect(component.find('.js-bidiagnose-kode').text()).to.contain('LP3');
            expect(component.find('.js-bidiagnose-system').text()).to.contain('IZPZ');
        });
    });

    describe('Svangerskapsrelatert', () => {
        it('Skal ikke vise svangerskap dersom svangerskap !== true', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        svangerskap: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-svangerskap').length).to.equal(0);
        });

        it('Skal vise svangerskap dersom svangerskap === true', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        svangerskap: true,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-svangerskap').length).to.equal(1);
            expect(component.find('.js-svangerskap').text()).to.equal('Sykdommen er svangerskapsrelatert');
        });
    });

    describe('Yrkesskade', () => {
        it('Skal ikke vise yrkesskadeDato dersom yrkesskadeDato !== true', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        yrkesskadeDato: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-yrkesskadeDato').length).to.equal(0);
        });

        it('Skal vise yrkesskade dersom yrkesskadeDato === (dato)', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        yrkesskadeDato: new Date('2015-12-31'),
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-yrkesskade').length).to.equal(1);
            expect(component.find('.js-yrkesskade').text()).to.equal('Sykdommen kan skyldes en skade/yrkessykdom');
            expect(component.find('.js-yrkesskadeDato').text()).to.contain('31. desember 2015');
        });
    });

    describe('Lovfestet fraværsgrunn', () => {
        it('Skal ikke vise Lovfestet fraværsgrunn dersom det ikke finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        fravaersgrunnLovfestet: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-fravaersgrunnLovfestet').length).to.equal(0);
        });

        it('Skal vise Lovfestet fraværsgrunn dersom det finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        fravaersgrunnLovfestet: 'Min gode grunn',
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-fravaersgrunnLovfestet').text()).to.equal('Min gode grunn');
        });
    });

    describe('Beskriv fravær', () => {
        it('Skal ikke vise Beskriv fravær dersom det ikke finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        fravaerBeskrivelse: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-fravaerBeskrivelse').length).to.equal(0);
        });

        it('Skal vise Beskriv fravær dersom det finnes', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        fravaerBeskrivelse: 'Beskrivelse av fraværet',
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-fravaerBeskrivelse').text()).to.equal('Beskrivelse av fraværet');
        });
    });

    describe('Arbeidsfør etter perioden', () => {
        it('Skal vise arbeidsfør etter perioden dersom sykmelding.friskmelding.arbeidsfoerEtterPerioden === true', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    friskmelding: {
                        arbeidsfoerEtterPerioden: true,
                        hensynPaaArbeidsplassen: 'MÃ¥ ta det pent',
                        antarReturSammeArbeidsgiver: true,
                        antattDatoReturSammeArbeidsgiver: new Date('2016-09-15'),
                        antarReturAnnenArbeidsgiver: true,
                        tilbakemeldingReturArbeid: new Date('2016-09-15'),
                        utenArbeidsgiverAntarTilbakeIArbeid: false,
                        utenArbeidsgiverAntarTilbakeIArbeidDato: null,
                        utenArbeidsgiverTilbakemelding: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-arbeidsfoerEtterPerioden').length).to.equal(1);
            expect(component.find('.js-arbeidsfoerEtterPerioden').text()).to.equal('Pasienten er 100 % arbeidsfør etter perioden');
        });

        it('Skal ikke vise arbeidsfør etter perioden dersom sykmelding.friskmelding.arbeidsfoerEtterPerioden === false', () => {
            component = mount(<DineSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    friskmelding: {
                        arbeidsfoerEtterPerioden: false,
                        hensynPaaArbeidsplassen: 'MÃ¥ ta det pent',
                        antarReturSammeArbeidsgiver: true,
                        antattDatoReturSammeArbeidsgiver: new Date('2016-09-15'),
                        antarReturAnnenArbeidsgiver: true,
                        tilbakemeldingReturArbeid: new Date('2016-09-15'),
                        utenArbeidsgiverAntarTilbakeIArbeid: false,
                        utenArbeidsgiverAntarTilbakeIArbeidDato: null,
                        utenArbeidsgiverTilbakemelding: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-arbeidsfoerEtterPerioden').length).to.equal(0);
        });
    });
});
