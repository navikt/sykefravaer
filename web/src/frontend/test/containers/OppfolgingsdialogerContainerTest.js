import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { OppfolgingsdialogerSide } from "../../js/containers/OppfolgingsdialogerContainer";
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Oppfolgingsdialoger from '../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';
import { getOppfolgingsdialoger } from '../mockOppfolgingsdialoger';
import { hentOppfolgingsdialogerAt as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';

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

    describe("OppfolgingsdialogerSide", () => {

        const kodebegrensning = false;
        const brukerHarTilgang =  !kodebegrensning;

        beforeEach(() => {
            dispatch = sinon.spy();
        });

        it("Skal vise spinner dersom data hentes", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} henter dispatch={dispatch}
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke vise spinner dersom data ikke hentes", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} dispatch={dispatch}
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} dispatch={dispatch}
                                                             hentingFeilet
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise Oppfolgingsdialoger dersom henting er OK", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]} dispatch={dispatch}
                                                             brukerHarTilgang={brukerHarTilgang}
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger} />);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });

});
