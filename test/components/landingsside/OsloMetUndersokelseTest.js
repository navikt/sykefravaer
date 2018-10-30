import React from 'react';
import sinon from 'sinon';
import mountWithStore from '../../mountWithStore';
import expect from '../../expect';
import OsloMetUndersokelse from '../../../js/components/landingsside/OsloMetUndersokelse';
import sykeforloep from '../../../js/reducers/sykeforloep';
import { sykeforloepHentet } from '../../../js/actions/sykeforloep_actions';
import getSykmelding from '../../mock/mockSykmeldinger';

describe('OsloMetUndersokelse', () => {
    let clock;
    let initState;
    let inaktivSykmelding1;
    let inaktivSykmelding2;
    let inaktivSykmelding3;
    let aktivSykmelding;
    let settSykeforloep;
    let FEMTISJU_DAGER_SIDEN;
    let TJUESJU_DAGER_SIDEN;
    let FEMTI_DAGER_SIDEN;

    beforeEach(() => {
        const DAGENS_DATO = new Date('2018-10-30');
        clock = sinon.useFakeTimers(DAGENS_DATO);

        FEMTISJU_DAGER_SIDEN = new Date(DAGENS_DATO);
        FEMTISJU_DAGER_SIDEN.setDate(DAGENS_DATO.getDate() - 57);
        TJUESJU_DAGER_SIDEN = new Date(DAGENS_DATO);
        TJUESJU_DAGER_SIDEN.setDate(DAGENS_DATO.getDate() - 27);
        FEMTI_DAGER_SIDEN = new Date(DAGENS_DATO);
        FEMTI_DAGER_SIDEN.setDate(DAGENS_DATO.getDate() - 50);

        window.dataLayer = [];

        inaktivSykmelding1 = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-10'),
                    tom: new Date('2018-10-29'),
                }],
            },
        });
        inaktivSykmelding2 = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-31'),
                    tom: new Date('2018-11-15'),
                }],
            },
        });
        inaktivSykmelding3 = getSykmelding({
            status: 'NY',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-15'),
                    tom: new Date('2018-10-31'),
                }],
            },
        });
        aktivSykmelding = getSykmelding({
            status: 'SENDT',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-15'),
                    tom: new Date('2018-10-31'),
                }],
            },
        });
        initState = {
            sykeforloep: sykeforloep(),
        };
        settSykeforloep = (sykmeldinger = [], oppfoelgingsdato = FEMTI_DAGER_SIDEN) => {
            const data = [{
                sykmeldinger,
                oppfoelgingsdato,
            }];

            return {
                sykeforloep: sykeforloep(initState.sykeforloep, sykeforloepHentet(data)),
            };
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal ikke vise undersøkelsen hvis det ikke foreligger en sykmelding', () => {
        const state = settSykeforloep();
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det ikke foreligger en aktiv sykmelding', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2]);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det foreligger en aktiv sykmelding, men sykeforløpet har vart mer enn 56 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], FEMTISJU_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det foreligger en aktiv sykmelding, men sykeforløpet har vart mindre enn 28 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], TJUESJU_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal ikke vise undersøkelsen hvis det foreligger en aktiv sykmelding som ikke er sendt, men sykeforløpet har vart i mellom 28 og 56 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, inaktivSykmelding3], FEMTI_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).to.equal(null);
    });

    it('Skal vise undersøkelsen hvis det foreligger en aktiv sykmelding, og sykeforløpet har vart i mellom 28 og 56 dager', () => {
        const state = settSykeforloep([inaktivSykmelding1, inaktivSykmelding2, aktivSykmelding], FEMTI_DAGER_SIDEN);
        const component = mountWithStore(<OsloMetUndersokelse />, state);
        expect(component.html()).not.to.equal(null);
    });
});
