import chai from 'chai';
import sinon from 'sinon';
import { mapStateToProps } from '../../../js/containers/landingsside/FriskmeldingContainer';
import mockSykmelding from '../../mockSykmeldinger';

const expect = chai.expect;

describe('FriskmeldingContainer', () => {
    let clock;
    let getState;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-05-15').getTime());
        getState = (sykmelding) => {
            return {
                dineSykmeldinger: {
                    data: [mockSykmelding(), mockSykmelding(), sykmelding],
                },
            };
        };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal svare på hvorvidt den sykmeldte er syk nå dersom sykmeldingen gikk ut i går', () => {
        const sykmelding = mockSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                    fom: new Date('2018-05-06'),
                    tom: new Date('2018-05-14'),
                }],
            },
        });
        const state = getState(sykmelding);
        const props = mapStateToProps(state);
        expect(props.datalayerData).to.deep.include({
            erSykmeldt: false,
            antallDagerTilFrisk: null,
            sykmeldingstype: null,
        });
    });

    it('Skal svare på hvorvidt den sykmeldte er syk nå dersom sykmeldingen går ut i dag', () => {
        const sykmelding = mockSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                    fom: new Date('2018-05-06'),
                    tom: new Date('2018-05-15'),
                }],
            },
        });
        const state = getState(sykmelding);
        const props = mapStateToProps(state);
        expect(props.datalayerData).to.contain({
            erSykmeldt: true,
            antallDagerTilFrisk: 0,
            sykmeldingstype: 'UGRADERT',
        });
    });

    it('Skal svare på hvorvidt den sykmeldte er syk nå dersom sykmeldingen går ut i morgen', () => {
        const sykmelding = mockSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                    fom: new Date('2018-05-06'),
                    tom: new Date('2018-05-10'),
                }, {
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                    fom: new Date('2018-05-11'),
                    tom: new Date('2018-05-16'),
                }],
            },
        });
        const state = getState(sykmelding);
        const props = mapStateToProps(state);
        expect(props.datalayerData).to.contain({
            erSykmeldt: true,
            antallDagerTilFrisk: 1,
            sykmeldingstype: 'UGRADERT',
        });
    });

    it('Skal gi info om type sykmelding når det er sykmelding med behandlingsdager', () => {
        const sykmelding = mockSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-05-06'),
                    tom: new Date('2018-05-30'),
                    grad: 100,
                    behandlingsdager: 3,
                    reisetilskudd: null,
                    avventende: null,
                }],
            },
        });
        const state = getState(sykmelding);
        const props = mapStateToProps(state);
        expect(props.datalayerData).to.contain({
            erSykmeldt: true,
            antallDagerTilFrisk: 15,
            sykmeldingstype: 'BEHANDLINGSDAGER',
        });
    });

    it('Skal gi info om type sykmelding når det er sykmelding med behandlingsdager', () => {
        const sykmelding = mockSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-05-06'),
                    tom: new Date('2018-05-17'),
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: true,
                    avventende: null,
                }],
            },
        });
        const state = getState(sykmelding);
        const props = mapStateToProps(state);
        expect(props.datalayerData).to.contain({
            erSykmeldt: true,
            antallDagerTilFrisk: 2,
            sykmeldingstype: 'REISETILSKUDD',
        });
    });

    it('Skal gi info om type sykmelding når det er gradert sykmelding', () => {
        const sykmelding = mockSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-05-06'),
                    tom: new Date('2018-05-17'),
                    grad: 25,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                }],
            },
        });
        const state = getState(sykmelding);
        const props = mapStateToProps(state);
        expect(props.datalayerData).to.contain({
            erSykmeldt: true,
            antallDagerTilFrisk: 2,
            sykmeldingstype: 'GRADERT',
        });
    });
});
