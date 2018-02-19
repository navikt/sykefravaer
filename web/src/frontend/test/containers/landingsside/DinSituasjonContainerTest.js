import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { arbeidssituasjoner as situasjoner, sykmeldingstatuser as statuser } from 'digisyfo-npm';
import DinSituasjon from '../../../js/components/landingsside/DinSituasjon';
import {
    Container,
    mapStateToProps,
    filtrerSykemeldingerPaaPeriode,
    mapArbeidssituasjonString,
    filtrerArbeidssituasjoner,
    filtrerArbeidsgivere
} from '../../../js/containers/landingsside/DinSituasjonContainer';

const { ARBEIDSTAKER, FRILANSER } = situasjoner;
const { BEKREFTET, SENDT, TIL_SENDING } = statuser;

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DinSituasjonContainer', () => {

    let clock;
    let sykmeldinger;

    beforeEach(() => {

        clock = sinon.useFakeTimers(new Date('2018-01-01').getTime());

        sykmeldinger = [{
            id: 'fireMndSiden',
            status: BEKREFTET,
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2017-08-01'),
                    tom: new Date('2017-09-01')
                }]
            }
        }, {
            id: 'toMndSiden',
            status: BEKREFTET,
            valgtArbeidssituasjon: FRILANSER,
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2017-10-01'),
                    tom: new Date('2017-11-01')
                }]
            }
        },{
            id: 'omTiMnd',
            status: SENDT,
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

        beforeEach(() => {
           filtrertPaaPeriode = filtrerSykemeldingerPaaPeriode(sykmeldinger);
        });

        it('Skal filtrere sykemeldinger med status BEKREFTET', () => {
            const filtrert = filtrerArbeidssituasjoner(filtrertPaaPeriode);
            expect(filtrert).to.have.length(1);
        });

        it('Skal returnere arbeidssituasjon', () => {
            const filtrert = filtrerArbeidssituasjoner(filtrertPaaPeriode);
            expect(filtrert[0]).to.equal(FRILANSER);
        });

    });

    describe('filtrerArbeidsgivere', () => {

        let filtrertPaaPeriode;

        beforeEach(() => {
            filtrertPaaPeriode = filtrerSykemeldingerPaaPeriode(sykmeldinger);
        });

        it('Skal filtrere sykemeldinger med status SENDT', () => {
            const filtrert = filtrerArbeidsgivere(filtrertPaaPeriode);
            expect(filtrert).to.have.length(1);
        });

        it('Skal filtrere sykemeldinger med status TIL_SENDING', () => {
            filtrertPaaPeriode[1].status = TIL_SENDING;
            const filtrert = filtrerArbeidsgivere(filtrertPaaPeriode);
            expect(filtrert).to.have.length(1);
        });

        it('Skal returnere arbeidsgiver', () => {
            const filtrert = filtrerArbeidsgivere(filtrertPaaPeriode);
            expect(filtrert[0]).to.equal('SOLSTRÅLEN PIZZA');
        });

    });

    describe('mapStateToProps', () => {

        let state;

        beforeEach(() => {
            state = {
                dineSykmeldinger: {
                    data: sykmeldinger
                }
            }
        });

        it('Skal returnere filtrerte arbeidssituasjoner', () => {
            const props = mapStateToProps(state);
            expect(props.arbeidssituasjoner[0]).to.equal(FRILANSER);
        });

        it('Skal returnere filtrerte arbeidsgivere', () => {
            const props = mapStateToProps(state);
            expect(props.arbeidsgivere[0]).to.equal('SOLSTRÅLEN PIZZA');
        });
        it(`Skal returnere arbeidssituasjonen 'Arbeidstaker' dersom det ikke finnes info om arbeidsgiver`, () => {
            state.dineSykmeldinger.data[1].valgtArbeidssituasjon = ARBEIDSTAKER;
            state.dineSykmeldinger.data.pop();
            const props = mapStateToProps(state);
            expect(props.arbeidssituasjoner).to.have.length(1);
        });

        it(`Skal filtrere vekk arbeidssituasjonen 'Arbeidstaker' dersom det finnes info om arbeidsgiver`, () => {
            state.dineSykmeldinger.data[1].valgtArbeidssituasjon = ARBEIDSTAKER;
            const props = mapStateToProps(state);
            expect(props.arbeidssituasjoner).to.have.length(0);
        });

        it('Skal returnere andre arbeidssituasjoner selv om det finnes info om arbeidsgiver', () => {
            const props = mapStateToProps(state);
            expect(props.arbeidssituasjoner).to.have.length(1);
        });

    });

    describe('Container', () => {

        it('Viser ingenting dersom det ikke finnes arbeidssituasjoner eller arbeidsgivere', () => {
            const container = shallow(<Container arbeidssituasjoner={[]} arbeidsgivere={[]} />);
            expect(container.find(DinSituasjon)).to.have.length(0);
        });

        it('Viser DinSituasjon hvis det finnes arbeidssituasjoner', () => {
            const container = shallow(<Container arbeidssituasjoner={[FRILANSER]} arbeidsgivere={[]} />);
            expect(container.find(DinSituasjon)).to.have.length(1);
        });

        it('Viser DinSituasjon hvis det finnes arbeidsgivere', () => {
            const container = shallow(<Container arbeidssituasjoner={[]} arbeidsgivere={['SOLSTRÅLEN PIZZA']} />);
            expect(container.find(DinSituasjon)).to.have.length(1);
        });

    });

});