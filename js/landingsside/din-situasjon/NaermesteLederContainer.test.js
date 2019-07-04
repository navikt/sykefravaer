import chai from 'chai';
import React from 'react';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import { Container, mapStateToProps } from './NaermesteLederContainer';
import NaermesteLeder from './NaermesteLeder';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('NaermesteLederContainer', () => {
    let state;
    let ownProps;

    describe('mapStateToProps', () => {
        beforeEach(() => {
            ownProps = {};
            state = {};
            state.ledere = {
                data: [{
                    organisasjonsnavn: 'Solstrålen Barnehage',
                    navn: 'Ole',
                }, {
                    organisasjonsnavn: 'Solstrålen Pizza',
                    navn: 'Dole',
                }],
            };
        });

        it('Skal returnere leder', () => {
            ownProps.organisasjonsnavn = 'Solstrålen Barnehage';
            const props = mapStateToProps(state, ownProps);
            expect(props.leder).to.deep.equal({
                organisasjonsnavn: 'Solstrålen Barnehage',
                navn: 'Ole',
            });
        });

        it('Skal mappe organisasjonsnavn til leder', () => {
            ownProps.organisasjonsnavn = 'Solstrålen Pizza';
            const props = mapStateToProps(state, ownProps);
            expect(props.leder).to.deep.equal({
                organisasjonsnavn: 'Solstrålen Pizza',
                navn: 'Dole',
            });
        });
    });

    describe('Container', () => {
        it('Viser ingenting dersom det ikke finnes leder', () => {
            const compo = shallow(<Container leder={null} />);
            expect(compo.find(NaermesteLeder)).to.have.length(0);
        });

        it('Viser leder dersom det finnes leder', () => {
            const leder = {
                navn: 'Ole Olsen',
                organisasjonsnavn: 'Solstrålen Barnehage',
            };
            const compo = shallow(<Container leder={leder} />);
            expect(compo.find(NaermesteLeder)).to.have.length(1);
        });
    });
});
