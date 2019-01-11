import React from 'react';
import { Link } from 'react-router';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import BesvarteTidspunkter from '../../../../js/components/moter/moteplanlegger/BesvarteTidspunkter';
import { NavKan } from '../../../../js/components/moter/moteplanlegger/SvarMedIkon';
import { getTidligereAlternativer } from '../../../../js/utils/moteUtils';
import {
    moteBesvartMedNyeAlternativerIkkeBesvart,
    moteBesvartMedNyeAlternativerBesvart,
    moteBesvartTrueAvArbeidsgiver,
    moteIkkeBesvart,
} from '../../../mock/mockMote';
import { BRUKER, NAV_VEILEDER, ARBEIDSGIVER } from '../../../../js/enums/moteplanleggerDeltakerTyper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('BesvarteTidspunkter', () => {
    let comp;
    let getComp;

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: '/',
        };
        getComp = (mote, opts) => {
            const alternativer = getTidligereAlternativer(mote);
            return mount(<BesvarteTidspunkter
                mote={mote}
                alternativer={alternativer}
                {...opts}
            />);
        };
    });

    it('Skal inneholde et .js-alternativ for hvert alternativ', () => {
        comp = getComp(moteBesvartMedNyeAlternativerIkkeBesvart);
        expect(comp.find('.js-alternativ')).to.have.length(2);
    });

    it('Skal vise svar til annen bruker', () => {
        comp = getComp(moteBesvartMedNyeAlternativerIkkeBesvart);
        expect(comp.find('.js-alternativ')).to.have.length(2);
    });

    it('Skal vise svaret til NAV', () => {
        expect(comp.find(NavKan)).to.have.length(2);
    });

    it('Skal ikke vise "Bekreft tidspunkt"-knapp', () => {
        expect(comp.find('.js-bekreft-tidspunkt')).to.have.length(0);
    });

    describe('Når deltakertype === "arbeidsgiver"', () => {
        beforeEach(() => {
            comp = getComp(moteBesvartMedNyeAlternativerBesvart, {
                deltakertype: ARBEIDSGIVER,
            });
        });

        it('Skal vise svar til annen bruker', () => {
            expect(comp.find('.js-alternativ')).to.have.length(4);
        });

        it('SKal vise svar til innlogget bruker', () => {
            expect(comp.find('.js-alternativ')).to.have.length(4);
        });

        it('Skal ikke vise "Bekreft tidspunkt"-knapp', () => {
            expect(comp.find('.js-bekreft-tidspunkt')).to.have.length(0);
        });

        it('Skal vise NavKan', () => {
            expect(comp.find(NavKan)).to.have.length(4);
        });
    });

    describe('Når deltakertype === "NAV_VEILEDER" når moteBesvartTrueAvArbeidsgiver', () => {
        beforeEach(() => {
            comp = mount(<BesvarteTidspunkter
                mote={moteBesvartTrueAvArbeidsgiver}
                alternativer={moteBesvartTrueAvArbeidsgiver.alternativer}
                deltakertype={NAV_VEILEDER}
                fnr="123"
            />);
        });

        it('Skal vise "Bekreft tidspunkt"-lenker', () => {
            expect(comp.find(Link)).to.have.length(2);
            expect(comp.find('a.js-bekreft-tidspunkt')).to.have.length(2);
        });

        it('Lenken skal ha riktig to-parameter', () => {
            comp.find(Link).forEach((l) => {
                expect(l.prop('to')).to.contain('/sykefravaer/123/mote/bekreft/');
            });
        });

        it('Skal ikke vise NavKan', () => {
            expect(comp.find(NavKan)).to.have.length(0);
        });
    });

    describe('Når deltakertype === "NAV_VEILEDER" når moteIkkeBesvart', () => {
        beforeEach(() => {
            comp = mount(<BesvarteTidspunkter
                mote={moteIkkeBesvart}
                alternativer={moteIkkeBesvart.alternativer}
                deltakertype={NAV_VEILEDER}
                fnr="123"
            />);
        });

        it('Skal vise "Bekreft tidspunkt"-lenker', () => {
            expect(comp.find(Link)).to.have.length(2);
            expect(comp.find('a.js-bekreft-tidspunkt')).to.have.length(2);
        });

        it('Lenken skal ha riktig to-parameter', () => {
            comp.find(Link).forEach((l) => {
                expect(l.prop('to')).to.contain('/sykefravaer/123/mote/bekreft/');
            });
        });
    });

    describe('Når det ikke finnes arbeidsgiver på møtet fordi brukeren f.eks. er reservert i KRR', () => {
        beforeEach(() => {
            const mote = Object.assign({}, moteBesvartTrueAvArbeidsgiver, {
                deltakere: moteBesvartTrueAvArbeidsgiver.deltakere.filter((d) => {
                    return d.type === ARBEIDSGIVER;
                }),
            });
            comp = mount(<BesvarteTidspunkter
                mote={mote}
                alternativer={moteBesvartTrueAvArbeidsgiver.alternativer}
                deltakertype={NAV_VEILEDER}
                fnr="123"
            />);
        });
    });

    describe('Når det bare finnes bruker på møtet fordi arbeidsgiveren av en eller annen grunn ikke er der', () => {
        beforeEach(() => {
            const mote = Object.assign({}, moteBesvartTrueAvArbeidsgiver, {
                deltakere: moteBesvartTrueAvArbeidsgiver.deltakere.filter((d) => {
                    return d.type === BRUKER;
                }),
            });
            comp = mount(<BesvarteTidspunkter
                mote={mote}
                alternativer={moteBesvartTrueAvArbeidsgiver.alternativer}
                deltakertype={NAV_VEILEDER}
                fnr="123"
            />);
        });
    });
});
