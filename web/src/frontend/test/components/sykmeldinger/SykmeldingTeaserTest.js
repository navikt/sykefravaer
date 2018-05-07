import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import SykmeldingTeaser from '../../../js/components/sykmeldinger/SykmeldingTeaser';
import getSykmelding from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SykmeldingTeaser', () => {
    it('Viser datoer', () => {
        const sykmelding = {
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: 100,
                }],
            },
        };
        const teaser = shallow(<SykmeldingTeaser sykmelding={getSykmelding(sykmelding)} />);
        expect(teaser.find('.js-title').text()).to.contain('fra 02.02.2016 til 16.02.2016');
        expect(teaser.find('.js-title').text()).to.contain('Sykmelding');
    });

    it('Viser arbeidsgiver dersom arbeidsgiver finnes', () => {
        const teaser = mount(<SykmeldingTeaser sykmelding={getSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: 100,
                }],
            },
            innsendtArbeidsgivernavn: 'Bekk Consulting AS',
        })} />);

        expect(teaser.find('.js-periode').text()).to.contain('Bekk Consulting AS');
    });

    it('Viser ikke arbeidsgiver dersom arbeidsgiver ikke finnes', () => {
        const teaser = mount(<SykmeldingTeaser sykmelding={getSykmelding({
            innsendtArbeidsgivernavn: null,
        })} />);
        expect(teaser.text()).to.not.contain('fra null');
    });

    it('Viser ikke grad dersom grad ikke finnes', () => {
        const teaser = mount(<SykmeldingTeaser sykmelding={getSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: null,
                }],
            },
        })} />);
        expect(teaser.text()).to.not.contain('Du er null %');
    });

    it('Skal være et <article />-element', () => {
        const teaser = shallow(<SykmeldingTeaser sykmelding={getSykmelding({
            innsendtArbeidsgivernavn: 'Bekk Consulting AS',
            mulighetForArbeid: {
                perioder: [{
                    fom: '2016-02-02',
                    tom: '2016-02-16',
                    grad: 100,
                }],
            },
        })} />);
        expect(teaser).to.have.tagName('article');
    });
});
