import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Innlogging, mapStateToProps, Utlogget } from "../../js/containers/InnloggingContainer";

describe("InnloggingContainer", () => {

    describe("mapStateToProps", () => {

        let state; 

        beforeEach(() => {
            state = {
                brukerinfo: {
                    bruker: {
                        hentingFeilet: false,
                    },
                    innlogging: {
                        erInnlogget: true,
                        henter: false,
                        hentingFeilet: false,
                    }
                }
            }
        });

        it("Skal returnere erInnlogget, henter og hentingFeilet", () => {
            expect(mapStateToProps(state)).to.deep.equal({
                erInnlogget: true,
                henter: false,
                hentingFeilet: false
            })
        });


    });

    describe("Innlogging", () => {

        it("Skal vise Feilmelding dersom hentingFeilet === true", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging hentingFeilet sjekkInnlogging={sjekkInnloggingSpy} />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        it("Skal vise Utlogget dersom erInnlogget === false", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging erInnlogget={false} sjekkInnlogging={sjekkInnloggingSpy} />);
            expect(comp.find(Utlogget)).to.have.length(1);
        });

        it("Skal vise children dersom erInnlogget === true og alt er OK", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging henter={false} hentingFeilet={false} erInnlogget={true} sjekkInnlogging={sjekkInnloggingSpy}>
                <div>Hei verden</div>
            </Innlogging>);
            expect(comp.contains(<div>Hei verden</div>)).to.be.true;
        });

        it("Skal kalle på sjekkInnlogging", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging henter sjekkInnlogging={sjekkInnloggingSpy} />);
            expect(sjekkInnloggingSpy.calledOnce).to.be.true;
        });

    });

}); 