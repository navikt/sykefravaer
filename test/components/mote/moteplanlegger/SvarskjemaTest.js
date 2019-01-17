import React from 'react';
import { FieldArray } from 'redux-form';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Utvidbar } from 'digisyfo-npm';
import { Skjema, validate, getData } from '../../../../js/components/moter/moteplanlegger/Svarskjema';
import BesvarteTidspunkter from '../../../../js/components/moter/moteplanlegger/BesvarteTidspunkter';
import Alternativer from '../../../../js/components/moter/moteplanlegger/Alternativer';
import getMote, {
    moteIkkeBesvart,
    moteBesvartMedNyeAlternativerIkkeBesvart,
} from '../../../mock/mockMote';

describe('Svarskjema', () => {
    let touch;
    let handleSubmit;
    let getSkjema;
    let comp;
    let mote;

    beforeEach(() => {
        touch = sinon.spy();
        handleSubmit = sinon.spy();

        getSkjema = (_mote, _props = {}) => {
            mote = getMote(_mote);
            const props = Object.assign({}, {
                mote,
                touch,
                meta: {},
                handleSubmit,
            }, _props);
            return shallow(<Skjema {...props} />);
        };
    });

    describe('Skjema', () => {
        describe('Når ingen har svart', () => {
            beforeEach(() => {
                comp = getSkjema(moteIkkeBesvart, {
                    deltakertype: 'arbeidsgiver',
                });
            });

            it('Skal inneholde et FieldArray med riktige props: name, component, deltakertype, mote', () => {
                const arr = comp.find(FieldArray);
                expect(arr).to.have.length(1);
                expect(arr.prop('name')).to.equal('tidspunkter');
                expect(arr.prop('component')).to.deep.equal(Alternativer);
                expect(arr.prop('mote')).to.deep.equal(mote);
                expect(arr.prop('deltakertype')).to.deep.equal('arbeidsgiver');
            });

            it('Skal inneholde en SEND-knapp', () => {
                expect(comp.find('.js-submit')).to.have.length(1);
            });

            it('Skal ikke vise tidligere foreslåtte tidspunkter', () => {
                expect(comp.find(Utvidbar)).to.have.length(0);
            });
        });

        describe('Når noen har svart på tidligere foreslåtte tidspunkter', () => {
            beforeEach(() => {
                comp = getSkjema(moteBesvartMedNyeAlternativerIkkeBesvart);
            });

            it('Skal vise tidligere foreslåtte tidspunkter', () => {
                expect(comp.find(Utvidbar)).to.have.length(1);
                expect(comp.find(BesvarteTidspunkter)).to.have.length(1);
            });
        });
    });

    describe('validate', () => {
        let values;

        beforeEach(() => {
            values = {};
        });

        it('Skal si i fra dersom man ikke velger noen alternativer', () => {
            const res = validate(values);
            expect(res).to.deep.equal({
                tidspunkter: {
                    _error: 'Du må velge minst ett alternativ',
                },
            });
        });

        it('Skal ikke si i fra dersom man har valgt et alternativ', () => {
            values = {
                alternativer: [{
                    verdi: 17,
                    avkrysset: true,
                }],
            };
            const res = validate(values);
            expect(res).to.deep.equal({});
        });

        it('Skal si i fra dersom man har valgt "ingen" + 1 eller 2 andre', () => {
            values = {
                alternativer: [{
                    verdi: 17,
                    avkrysset: true,
                }, {
                    verdi: 18,
                    avkrysset: true,
                }, {
                    verdi: 'ingen',
                    avkrysset: true,
                }],
            };
            const res = validate(values);
            expect(res).to.deep.equal({
                tidspunkter: {
                    _error: 'Du har valgt alternativer som utelukker hverandre',
                },
            });
        });

        it('Skal også funke dersom alternativ === null', () => {
            values = {
                alternativer: [null, {
                    verdi: 18,
                    avkrysset: true,
                }, {
                    verdi: 'ingen',
                    avkrysset: true,
                }],
            };
            const res = validate(values);
            expect(res).to.deep.equal({
                tidspunkter: {
                    _error: 'Du har valgt alternativer som utelukker hverandre',
                },
            });
        });
    });

    describe('getData', () => {
        let values;

        beforeEach(() => {
            values = {};
        });

        it('Skal returnere ID-er for de avkryssede alternativene', () => {
            values = {
                alternativer: [{
                    verdi: 17,
                    avkrysset: true,
                }],
            };
            const res = getData(values);
            expect(res).to.deep.equal([17]);
        });

        it('Skal ikke returnere ID-er for de ikke-avkryssede alternativene', () => {
            values = {
                alternativer: [{
                    verdi: 17,
                    avkrysset: true,
                }, {
                    verdi: 18,
                    avkrysset: false,
                }],
            };
            const res = getData(values);
            expect(res).to.deep.equal([17]);
        });

        it('Skal ikke returnere noe for alternativer som er null', () => {
            values = {
                alternativer: [null, {
                    verdi: 18,
                    avkrysset: true,
                }],
            };
            const res = getData(values);
            expect(res).to.deep.equal([18]);
        });

        it('Skal returnere avvik', () => {
            values = {
                alternativer: [{
                    verdi: 17,
                    avkrysset: false,
                }, {
                    verdi: 18,
                    avkrysset: false,
                }, {
                    verdi: 'ingen',
                    avkrysset: true,
                }],
            };
            const res = getData(values);
            expect(res).to.deep.equal([]);
        });

        it('Skal bare returnere avvik når det er krysset av', () => {
            values = {
                alternativer: [
                    null,
                    {
                        verdi: 102,
                        avkrysset: true,
                    },
                    {
                        verdi: 'ingen',
                        avkrysset: false,
                    },
                ],
            };
            const res = getData(values);
            expect(res).to.deep.equal([102]);
        });
    });
});
