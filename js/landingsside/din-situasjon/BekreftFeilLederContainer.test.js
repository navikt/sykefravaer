import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from '@navikt/digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import { Container, mapStateToProps } from './BekreftFeilLederContainer';
import BekreftFeil, { LederAvkreftet } from './BekreftFeilLeder';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('BekreftFeilLederContainer', () => {
    let state;
    let ownProps;

    describe('mapStateToProps', () => {
        beforeEach(() => {
            ownProps = {};
            state = {};
            state.ledere = {
                data: [{
                    orgnummer: '123',
                    navn: 'Ole',
                }, {
                    orgnummer: '456',
                    navn: 'Dole',
                }],
            };
        });

        it('Skal returnere leder', () => {
            ownProps.orgnummer = '123';
            const props = mapStateToProps(state, ownProps);
            expect(props.leder).to.deep.equal({
                orgnummer: '123',
                navn: 'Ole',
            });
        });

        it('Skal returnere onAvbryt', () => {
            const onAvbryt = sinon.spy();
            ownProps.onAvbryt = onAvbryt;
            const props = mapStateToProps(state, ownProps);
            expect(props.onAvbryt).to.deep.equal(onAvbryt);
        });

        it('SKal returnere avkrefter', () => {
            state.ledere.avkrefter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkrefter).to.equal(true);
        });

        it('SKal returnere avkrefter', () => {
            state.ledere.avkrefter = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkrefter).to.equal(false);
        });

        it('SKal returnere avkreftFeilet', () => {
            state.ledere.avkreftFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkreftFeilet).to.equal(true);
        });

        it('SKal returnere avkreftFeilet', () => {
            state.ledere.avkreftFeilet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkreftFeilet).to.equal(false);
        });
    });

    describe('BekreftFeil', () => {
        let compo;
        let avkreftLeder;
        let onAvbryt;
        let leder;
        let preventDefault;

        beforeEach(() => {
            avkreftLeder = sinon.spy();
            onAvbryt = sinon.spy();
            preventDefault = sinon.spy();
            leder = {
                navn: 'Ole Olsen',
                orgnummer: '123456789',
                organisasjonsnavn: 'Solstrålen Barnehage',
            };
            setLedetekster({
                'sykefravaer.endre-naermeste-leder.tittel': 'Nærmeste leder',
                // eslint-disable-next-line max-len
                'sykefravaer.endre-naermeste-leder.melding': '<p>Er du sikker på at du vil fjerne <strong>%LEDER%</strong> som din nærmeste leder i <strong>%ARBEIDSGIVER%</strong>?</p><p>Hvis du er usikker på om navnet er riktig, bør du spørre arbeidsgiveren din om hvorfor de har valgt det.</p>',
            });
        });

        it('Skal vise navn på leder og organisasjonsnavn', () => {
            compo = mount(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
            expect(compo.text()).to.contain('Ole Olsen');
            expect(compo.text()).to.contain('Solstrålen Barnehage');
        });

        it('Skal kalle på avkreftLeder når man klikker på bekreft', () => {
            compo = shallow(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
            compo.find('.js-bekreft').simulate('click');
            expect(avkreftLeder.calledWith('123456789')).to.equal(true);
        });

        it('Skal kalle på onAvbryt når man klikker på avbryt', () => {
            compo = shallow(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
            compo.find('.js-avbryt').simulate('click', {
                preventDefault,
            });
            expect(preventDefault.calledOnce).to.equal(true);
            expect(onAvbryt.calledOnce).to.equal(true);
        });

        it('Skal vise feilmelding dersom avkreft feiler', () => {
            compo = mount(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} avkreftFeilet />);
            expect(compo.find(Alertstripe)).to.have.length(1);
        });

        it('Skal ikke vise feilmelding dersom avkreft ikke feiler', () => {
            compo = mount(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
            expect(compo.find(Alertstripe)).to.have.length(0);
        });

        describe('Container', () => {
            it('Skal vise kvittering dersom lederen ikke er avkreftet', () => {
                leder.avkreftet = false;
                compo = shallow(<Container leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
                expect(compo.find(BekreftFeil)).to.have.length(1);
            });

            it('Skal vise kvittering dersom lederen er avkreftet', () => {
                leder.avkreftet = true;
                compo = shallow(<Container leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
                expect(compo.find(LederAvkreftet)).to.have.length(1);
            });
        });
    });
});
