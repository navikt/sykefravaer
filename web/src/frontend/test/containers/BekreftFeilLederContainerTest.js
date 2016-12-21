import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import sinon from 'sinon';
import { Varselstripe } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Container, BekreftFeil, LederAvkreftet, mapStateToProps } from "../../js/containers/BekreftFeilLederContainer";

describe("BekreftFeilLederContainer", () => {

    let state; 
    let ownProps;

    describe("mapStateToProps", () => {

        beforeEach(() => {
            ownProps = {};
            state = {};
            state.ledere = {
                data: [{
                    orgnummer: "123",
                    navn: "Ole"
                }, {
                    orgnummer: "456",
                    navn: "Dole"
                }]
            }
        })

        it("Skal returnere leder", () => {
            ownProps.orgnummer = "123"
            const props = mapStateToProps(state, ownProps);
            expect(props.leder).to.deep.equal({
                orgnummer: "123",
                navn: "Ole"
            })
        });

        it("Skal returnere onAvbryt", () => {
            const onAvbryt = sinon.spy();
            ownProps.onAvbryt = onAvbryt;
            const props = mapStateToProps(state, ownProps);
            expect(props.onAvbryt).to.deep.equal(onAvbryt)
        });

        it("SKal returnere avkrefter", () => {
            state.ledere.avkrefter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkrefter).to.be.true;
        });

        it("SKal returnere avkrefter", () => {
            state.ledere.avkrefter = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkrefter).to.be.false;
        });

        it("SKal returnere avkreftFeilet", () => {
            state.ledere.avkreftFeilet = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkreftFeilet).to.be.true;
        });

        it("SKal returnere avkreftFeilet", () => {
            state.ledere.avkreftFeilet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.avkreftFeilet).to.be.false;
        });


    });

    describe("BekreftFeil", () => {

        let feil;
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
                navn: "Ole Olsen",
                orgnummer: "123456789",
                organisasjon: "Solstrålen Barnehage"
            };
        });

        it("Skal kalle på avkreftLeder når man klikker på bekreft", () => {
            compo = shallow(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />)
            compo.find(".js-bekreft").simulate("click");
            expect(avkreftLeder.calledWith("123456789")).to.be.true;
        });

        it("Skal kalle på onAvbryt når man klikker på avbryt", () => {
            compo = shallow(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />)
            compo.find(".js-avbryt").simulate("click", {
                preventDefault
            });
            expect(preventDefault.calledOnce).to.be.true;
            expect(onAvbryt.calledOnce).to.be.true;
        });

        it("Skal vise feilmelding dersom avkreft feiler", () => {
            compo = shallow(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} avkreftFeilet />)
            expect(compo.find(Varselstripe)).to.have.length(1);
        });

        it("Skal ikke vise feilmelding dersom avkreft ikke feiler", () => {
            compo = shallow(<BekreftFeil leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />)
            expect(compo.find(Varselstripe)).to.have.length(0);
        });


        describe("Container", () => {

            it("Skal vise kvittering dersom lederen ikke er avkreftet", () => {
                leder.avkreftet = false;
                compo = shallow(<Container leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
                expect(compo.find(BekreftFeil)).to.have.length(1)
            })

            it("Skal vise kvittering dersom lederen er avkreftet", () => {
                leder.avkreftet = true;
                compo = shallow(<Container leder={leder} avkreftLeder={avkreftLeder} onAvbryt={onAvbryt} />);
                expect(compo.find(LederAvkreftet)).to.have.length(1)
            });
        });

    });

})
