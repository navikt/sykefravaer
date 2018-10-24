import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mock/mockLedetekster';

import SykmeldingPeriodeInfo from '../../../js/components/sykmeldinger/SykmeldingPeriodeInfo';

chai.use(chaiEnzyme());
const expect = chai.expect;

const getPeriode = (prd = {}) => {
    const periode = {
        fom: '2016-05-01',
        tom: '2016-05-16',
        grad: 60,
        behandlingsdager: null,
        reisetilskudd: false,
        avventende: null,
    };
    return Object.assign({}, periode, prd);
};

describe('SykmeldingPeriodeInfo', () => {
    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    describe('Vanlig sykmelding med arbeidsgiver og grad', () => {
        const grad = 75;
        const arbeidsgiver = 'Arbeidsgiver';

        it('Viser grad dersom sykmeldingen er gradert', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er 75 % sykmeldt fra Arbeidsgiver i 16 dager');
        });

        it('Viser grad dersom sykmeldingen er gradert og bare varer i én dag', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad,
                    tom: '2016-05-01',
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er 75 % sykmeldt fra Arbeidsgiver i 1 dag');
        });

        it('Viser grad dersom grad === 100', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad: 100,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er 100 % sykmeldt fra Arbeidsgiver i 16 dager');
        });

        it('Viser grad dersom sykmeldingen er gradert og bare varer i én dag', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad: 100,
                    tom: '2016-05-01',
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er 100 % sykmeldt fra Arbeidsgiver i 1 dag');
        });
    });

    describe('Vanlig sykmelding uten grad', () => {
        const grad = null;
        const arbeidsgiver = 'Arbeidsgiver';

        it('Viser ikke grad', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er sykmeldt fra Arbeidsgiver i 16 dager');
        });

        it('Viser ikke grad dersom sykmeldingen bare varer i én dag', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad,
                    tom: '2016-05-01',
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er sykmeldt fra Arbeidsgiver i 1 dag');
        });
    });

    describe('Vanlig sykmelding uten arbeidsgiver', () => {
        const arbeidsgiver = null;

        it('Viser ikke arbeidsgiver', () => {
            const info = shallow(<SykmeldingPeriodeInfo periode={getPeriode()} arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er 60 % sykmeldt i 16 dager');
        });

        it('Viser ikke arbeidsgiver dersom sykmeldingen bare varer i én dag', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    tom: '2016-05-01',
                })}
                arbeidsgiver={null} />);
            expect(info.find('.js-periode').text()).to.equal('Du er 60 % sykmeldt i 1 dag');
        });
    });

    describe('Vanlig sykmelding uten arbeidsgiver og uten grad', () => {
        const arbeidsgiver = null;
        const grad = null;

        it('Viser ikke arbeidsgiver', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    grad,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er sykmeldt i 16 dager');
        });

        it('Viser ikke arbeidsgiver dersom sykmeldingen bare varer i én dag', () => {
            const info = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    tom: '2016-05-01',
                    grad,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(info.find('.js-periode').text()).to.equal('Du er sykmeldt i 1 dag');
        });
    });

    describe('Behandlingsdager og arbeidsgiver', () => {
        const arbeidsgiver = 'Arbeidsgiver';

        it('Viser behandlingsdager dersom sykmeldingen har behandlingsdager', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    behandlingsdager: 5,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 5 behandlingsdager i løpet av 16 dager – Arbeidsgiver');
        });

        it('Viser behandlingsdag dersom sykmeldingen har en behandlingsdag', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    behandlingsdager: 1,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 1 behandlingsdag i løpet av 16 dager – Arbeidsgiver');
        });

        it('Viser behandlingsdag dersom sykmeldingen har én behandlingsdag', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    behandlingsdager: 1,
                    tom: '2016-05-01',
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 1 behandlingsdag i løpet av 1 dag – Arbeidsgiver');
        });
    });

    describe('Behandlingsdager uten arbeidsgiver', () => {
        const arbeidsgiver = null;

        it('Viser behandlingsdager dersom sykmeldingen har behandlingsdager', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    behandlingsdager: 5,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 5 behandlingsdager i løpet av 16 dager');
        });

        it('Viser behandlingsdag dersom sykmeldingen har en behandlingsdag', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    behandlingsdager: 1,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 1 behandlingsdag i løpet av 16 dager');
        });

        it('Viser behandlingsdag dersom sykmeldingen har én behandlingsdag', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    behandlingsdager: 1,
                    tom: '2016-05-01',
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 1 behandlingsdag i løpet av 1 dag');
        });

        it('Viser behandlingsdag dersom sykmeldingen har én behandlingsdag og ingen grad', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    fom: '2014-02-26',
                    tom: '2014-02-26',
                    grad: null,
                    behandlingsdager: 1,
                    reisetilskudd: null,
                    avventende: null,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 1 behandlingsdag i løpet av 1 dag');
        });

        it('Viser behandlingsdag dersom sykmeldingen har 3 behandlingsdager og ingen grad', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    fom: '2014-03-26',
                    tom: '2014-03-30',
                    grad: null,
                    behandlingsdager: 3,
                    reisetilskudd: null,
                    avventende: null,
                })}
                arbeidsgiver={arbeidsgiver} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har 3 behandlingsdager i løpet av 5 dager');
        });
    });

    it('Viser reisetilskudd dersom sykmeldingen er gradert med reisetilskudd', () => {
        const periode = shallow(<SykmeldingPeriodeInfo
            periode={getPeriode({
                reisetilskudd: true,
                grad: 88,
            })}
            arbeidsgiver="Arbeidsgiver" />);
        expect(periode.find('.js-periode').text()).to.equal('Du er 88 % sykmeldt med reisetilskudd i 16 dager');
    });

    describe('Reisetilskudd', () => {
        it('Viser reisetilskudd dersom sykmeldingen er ugradert med reisetilskudd', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={getPeriode({
                    reisetilskudd: true,
                    grad: undefined,
                    tom: '2016-05-10',
                })}
                arbeidsgiver="Arbeidsgiver" />);
            expect(periode.find('.js-periode').text()).to.equal('Du har reisetilskudd i 10 dager');
        });

        it('Viser ikke arbeidsgiver dersom arbeidsgiver ikke finnes og sykmeldingen varer i én dag', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={{
                    fom: '2014-02-26',
                    tom: '2014-02-26',
                    grad: null,
                    behandlingsdager: null,
                    reisetilskudd: true,
                    avventende: null,
                }}
                arbeidsgiver={null} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har reisetilskudd i 1 dag');
        });

        it('Viser ikke arbeidsgiver dersom arbeidsgiver ikke finnes og sykmeldingen varer i én dag og sykmeldingen er gradert', () => {
            const periode = shallow(<SykmeldingPeriodeInfo
                periode={{
                    fom: '2014-02-26',
                    tom: '2014-02-26',
                    grad: 55,
                    behandlingsdager: null,
                    reisetilskudd: true,
                    avventende: null,
                }}
                arbeidsgiver={null} />);
            expect(periode.find('.js-periode').text()).to.equal('Du har reisetilskudd i 1 dag');
        });
    });

    it('Viser avventende dersom sykmeldingen er avventende', () => {
        const periode = shallow(<SykmeldingPeriodeInfo
            periode={getPeriode({
                avventende: 'Gi henne en bedre stol',
            })}
            arbeidsgiver="Arbeidsgiver" />);
        expect(periode.find('.js-periode').text()).to.equal('Du er avventende sykmeldt fra Arbeidsgiver i 16 dager');
    });

    it('Viser avventende dersom sykmeldingen er avventende', () => {
        const periode = shallow(<SykmeldingPeriodeInfo
            periode={getPeriode({
                avventende: 'Gi henne en bedre stol',
                tom: '2016-05-01',
            })}
            arbeidsgiver="Arbeidsgiver" />);
        expect(periode.find('.js-periode').text()).to.equal('Du er avventende sykmeldt fra Arbeidsgiver i 1 dag');
    });

    it('Viser avventende dersom perioden varer i én dag, er uten arbeidsgiver og uten grad', () => {
        const periode = shallow(<SykmeldingPeriodeInfo
            periode={getPeriode({
                fom: '2014-02-26',
                tom: '2014-02-26',
                grad: null,
                behandlingsdager: null,
                reisetilskudd: null,
                avventende: '4.1.3 InnspillTilArbeidsgiver',
            })}
            arbeidsgiver={null} />);
        expect(periode.find('.js-periode').text()).to.equal('Du er avventende sykmeldt i 1 dag');
    });

    it('Viser ikke arbeidsgiver dersom sykmeldingen er avventende uten arbeidsgiver', () => {
        const periode = shallow(<SykmeldingPeriodeInfo
            periode={getPeriode({
                avventende: 'Gi henne en bedre stol',
                tom: '2016-05-01',
            })}
            arbeidsgiver={null} />);
        expect(periode.find('.js-periode').text()).to.equal('Du er avventende sykmeldt i 1 dag');
    });

    it('Min test', () => {
        const info = shallow(<SykmeldingPeriodeInfo
            periode={{
                fom: '2014-02-26',
                tom: '2014-02-26',
                grad: 100,
                behandlingsdager: null,
                reisetilskudd: null,
                avventende: null,
            }}
            arbeidsgiver={null} />);
        expect(info.find('.js-periode').text()).to.equal('Du er 100 % sykmeldt i 1 dag');
    });
});
