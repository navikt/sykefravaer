import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Innlogging, mapStateToProps } from "../../js/containers/InnloggingContainer.js";

describe("InnloggingContainer", () => {

    describe("mapStateToProps", () => {

        it("Skal returnere erInnlogget, henter og hentingFeilet", () => {
            const state = {
                brukerinfo: {
                    bruker: {
                        data: {
                            erInnlogget: true,
                        },
                        hentingFeilet: false,
                        henter: false
                    }
                }
            }
            expect(mapStateToProps(state)).to.deep.equal({
                erInnlogget: true,
                henter: false,
                hentingFeilet: false
            })
        })

    });

    describe("Innlogging", () => {

        it("Skal vise AppSpinner dersom henter === true", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging henter sjekkInnlogging={sjekkInnloggingSpy} />);
            expect(comp.contains(<AppSpinner />)).to.be.true;
        });

        it("Skal vise Feilmelding dersom hentingFeilet === true", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging hentingFeilet sjekkInnlogging={sjekkInnloggingSpy} />);
            expect(comp.contains(<Feilmelding />)).to.be.true;
        });

        it("Skal vise Feilmelding dersom erInnlogget === false", () => {
            let sjekkInnloggingSpy = sinon.spy();
            let comp = shallow(<Innlogging erInnlogget={false} sjekkInnlogging={sjekkInnloggingSpy} />);
            expect(comp.find(Feilmelding)).to.have.length(1);
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