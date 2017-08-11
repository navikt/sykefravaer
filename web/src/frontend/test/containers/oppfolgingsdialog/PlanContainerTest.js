import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { PlanSide } from "../../../js/containers/PlanContainer";
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Plan from '../../../js/components/oppfolgingsdialoger/Plan';
import { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

let oppfolgingsdialoger;

describe("PlanContainer", () => {

    let sjekkTilgang;
    let hentOppfolgingsdialoger;

    beforeEach(() => {
        const oppfolgingsdialogerArray = getOppfolgingsdialoger;

        oppfolgingsdialoger = {
            data: oppfolgingsdialogerArray
        }
    });

    describe("PlanSide", () => {

        const tilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };

        beforeEach(() => {
            dispatch = sinon.spy();
            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
        });

        it("Skal vise spinner dersom data hentes", () => {
            let component = shallow(<PlanSide oppfolgingsdialoger={[]}
                                                         henter
                                                         hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                         sjekkTilgang={sjekkTilgang} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke vise spinner dersom data ikke hentes", () => {
            let component = shallow(<PlanSide oppfolgingsdialoger={[]}
                                                         hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                         tilgang={tilgang}
                                                         sjekkTilgang={sjekkTilgang} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let component = shallow(<PlanSide oppfolgingsdialoger={[]}
                                                        hentingFeilet
                                                        hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                        sjekkTilgang={sjekkTilgang} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        xit("Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang", () => {
            let component = shallow(<PlanSide oppfolgingsdialoger={[]}
                                                         hentingFeilet
                                                         hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                         sjekkTilgang={sjekkTilgang}
                                                         tilgang={ikkeTilgang} />);
            expect(component.contains(<OppfolgingsdialogInfoboks />)).to.equal(true);
        });

        it("Skal vise Plan dersom henting er OK", () => {
            let component = shallow(<PlanSide oppfolgingsdialoger={[]}
                                                         tilgang={tilgang}
                                                         hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                         sjekkTilgang={sjekkTilgang} />);
            expect(component.find(Plan)).to.have.length(1);
        });
    });

});
