import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { OppfolgingsdialogerSide, mapStateToProps } from "../../js/containers/OppfolgingsdialogerContainer";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Oppfolgingsdialoger from '../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';
import { getOppfolgingsdialoger } from '../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

let oppfolgingsdialoger;

describe("OppfolgingsdialogerContainer", () => {

    let dispatch;

    beforeEach(() => {
        const oppfolgingsdialogerArray = getOppfolgingsdialoger;

        oppfolgingsdialoger = {
            data: oppfolgingsdialogerArray
        }
    });

    describe("mapStateToProps", () => {

        it("skal returnere oppfolgingsdialoger", function() {
            const res = mapStateToProps({
                oppfolgingsdialoger: oppfolgingsdialoger,
                ledetekster: {
                    data: []
                },
                brukerinfo: {
                    bruker: {},
                    innstillinger: {}
                }
            });
            expect(res.oppfolgingsdialoger).to.deep.equal(oppfolgingsdialoger.data)
        });

    });

    describe("OppfolgingsdialogerSide", () => {

        const aldersbegrensning = false;
        const kodebegrensning = false;
        const begrensning = {aldersbegrensning, kodebegrensning};
        const brukerHarTilgang = !aldersbegrensning && !kodebegrensning;

        beforeEach(() => {
            dispatch = sinon.spy();
        });

        it("Skal vise spinner dersom data hentes", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} henter dispatch={dispatch}/>);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke vise spinner dersom data ikke hentes", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} dispatch={dispatch}
                                                             begrensning={begrensning}/>);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} dispatch={dispatch}
                                                             hentingFeilet/>);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise Oppfolgingsdialoger dersom henting er OK", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} dispatch={dispatch}
                                                             begrensning={begrensning}
                                                             brukerHarTilgang={brukerHarTilgang}/>);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });

});
