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
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

let oppfolgingsdialoger;

describe("OppfolgingsdialogerContainer", () => {

    let sjekkTilgang;
    let hentOppfolgingsdialoger;

    beforeEach(() => {
        const oppfolgingsdialogerArray = getOppfolgingsdialoger;

        oppfolgingsdialoger = {
            data: oppfolgingsdialogerArray
        }
    });

    describe("OppfolgingsdialogerSide", () => {

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
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]}
                                                             henter
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                             sjekkTilgang={sjekkTilgang} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke vise spinner dersom data ikke hentes", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]}
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                             tilgang={tilgang}
                                                             sjekkTilgang={sjekkTilgang} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]}
                                                             hentingFeilet
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                             sjekkTilgang={sjekkTilgang} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        xit("Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]}
                                                             hentingFeilet
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                             sjekkTilgang={sjekkTilgang}
                                                             tilgang={ikkeTilgang} />);
            expect(component.contains(<OppfolgingsdialogInfoboks />)).to.equal(true);
        });

        it("Skal vise Oppfolgingsdialoger dersom henting er OK", () => {
            let component = shallow(<OppfolgingsdialogerSide oppfolgingsdialoger={[]}
                                                             tilgang={tilgang}
                                                             hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                                                             sjekkTilgang={sjekkTilgang} />);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });

});
