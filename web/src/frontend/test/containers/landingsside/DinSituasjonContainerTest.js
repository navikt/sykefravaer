import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import DinSituasjon from '../../../js/components/landingsside/DinSituasjon';
import {
    Container,
    mapStateToProps,
    filtrerSykemeldingerPaaPeriode,
    mapArbeidssituasjonString,
    filtrerArbeidssituasjoner,
    filtrerArbeidsgivere
} from '../../../js/containers/landingsside/DinSituasjonContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DinSituasjonContainer', () => {

    let clock;
    let sykmeldinger;

    before(() => {

        clock = sinon.useFakeTimers(new Date('2018-01-01').getTime());

        sykmeldinger = [{
            id: 'fireMndSiden',
            status: 'BEKREFTET',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2017-08-01'),
                    tom: new Date('2017-09-01')
                }]
            }
        }, {
            id: 'toMndSiden',
            status: 'BEKREFTET',
            valgtArbeidssituasjon: 'FRILANSER',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2017-10-01'),
                    tom: new Date('2017-11-01')
                }]
            }
        },{
            id: 'omTiMnd',
            status: 'SENDT',
            innsendtArbeidsgivernavn: 'SOLSTRÅLEN PIZZA',
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2018-10-01'),
                    tom: new Date('2018-11-01')
                }]
            }
        }];
    });

    after(() => {
        clock.restore();
    });

    describe('filtrerSykemeldingerPaaPeriode', () => {

        it('Skal filtrere sykmeldinger på periode', () => {
            const filtrert = filtrerSykemeldingerPaaPeriode(sykmeldinger);
            expect(filtrert).to.have.length(2);
        });

        it('Skal filtrere vekk sykmeldinger med tom mer enn 3 måneder tilbake i tid', () => {
            const filtrert = filtrerSykemeldingerPaaPeriode(sykmeldinger);
            expect(filtrert[0].id).to.not.equal('fireMndSiden');
        });

        it('Skal ikke filtrere vekk sykmeldinger med tom mindre enn 3 måneder tilbake i tid', () => {
            const filtrert = filtrerSykemeldingerPaaPeriode(sykmeldinger);
            expect(filtrert[0].id).to.equal('toMndSiden');
        });

        it('Skal ikke filtrere vekk sykmeldinger med tom framover i tid', () => {
            const filtrert = filtrerSykemeldingerPaaPeriode(sykmeldinger);
            expect(filtrert[1].id).to.equal('omTiMnd');
        });

    });

    describe('filtrerArbeidssituasjoner', () => {

        let filtrertPaaPeriode;

        before(() => {
           filtrertPaaPeriode = filtrerSykemeldingerPaaPeriode(sykmeldinger);
        });

        it('Skal filtrere sykemeldinger med status BEKREFTET', () => {
            const filtrert = filtrerArbeidssituasjoner(filtrertPaaPeriode);
            expect(filtrert).to.have.length(1);
        });

        it('Skal returnere arbeidssituasjon', () => {
            const filtrert = filtrerArbeidssituasjoner(filtrertPaaPeriode);
            expect(filtrert[0]).to.equal('Frilanser');
        });

    });

    describe('filtrerArbeidsgivere', () => {

        let filtrertPaaPeriode;

        before(() => {
            filtrertPaaPeriode = filtrerSykemeldingerPaaPeriode(sykmeldinger);
        });

        it('Skal filtrere sykemeldinger med status SENDT', () => {
            const filtrert = filtrerArbeidsgivere(filtrertPaaPeriode);
            expect(filtrert).to.have.length(1);
        });

        it('Skal returnere arbeidsgiver', () => {
            const filtrert = filtrerArbeidsgivere(filtrertPaaPeriode);
            expect(filtrert[0]).to.equal('SOLSTRÅLEN PIZZA');
        });

    });

    describe('mapArbeidssituasjonString', () => {

        it('Skal mappe ARBEIDSTAKER til Arbeidstaker', () => {
            expect(mapArbeidssituasjonString('ARBEIDSTAKER')).to.equal('Arbeidstaker');
        });

        it('Skal mappe NAERINGSDRIVENDE til Selvstendig næringsdrivende', () => {
            expect(mapArbeidssituasjonString('NAERINGSDRIVENDE')).to.equal('Selvstendig næringsdrivende');
        });

        it('Skal mappe FRILANSER til Frilanser', () => {
            expect(mapArbeidssituasjonString('FRILANSER')).to.equal('Frilanser');
        });

        it('Skal mappe ARBEIDSLEDIG til Arbeidsledig', () => {
            expect(mapArbeidssituasjonString('ARBEIDSLEDIG')).to.equal('Arbeidsledig');
        });

        it('Skal mappe ANNET til Annet', () => {
            expect(mapArbeidssituasjonString('ANNET')).to.equal('Annet');
        });
    });

    describe('mapStateToProps', () => {

        let state;

        before(() => {
            state = {
                dineSykmeldinger: {
                    data: sykmeldinger
                }
            }
        });

        it('Skal returnere filtrerte arbeidssituasjoner', () => {
            const props = mapStateToProps(state);
            expect(props.arbeidssituasjoner[0]).to.equal('Frilanser');
        });

        it('Skal returnere filtrerte arbeidsgivere', () => {
            const props = mapStateToProps(state);
            expect(props.arbeidsgivere[0]).to.equal('SOLSTRÅLEN PIZZA');
        });

    });

    describe('Container', () => {

        it('Viser ingenting dersom det ikke finnes arbeidssituasjoner eller arbeidsgivere', () => {
            const container = shallow(<Container arbeidssituasjoner={[]} arbeidsgivere={[]} />);
            expect(container.find(DinSituasjon)).to.have.length(0);
        });

        it('Viser DinSituasjon hvis det finnes arbeidssituasjoner', () => {
            const container = shallow(<Container arbeidssituasjoner={['Frilanser']} arbeidsgivere={[]} />);
            expect(container.find(DinSituasjon)).to.have.length(1);
        });

        it('Viser DinSituasjon hvis det finnes arbeidsgivere', () => {
            const container = shallow(<Container arbeidssituasjoner={[]} arbeidsgivere={['SOLSTRÅLEN PIZZA']} />);
            expect(container.find(DinSituasjon)).to.have.length(1);
        });

    });

});