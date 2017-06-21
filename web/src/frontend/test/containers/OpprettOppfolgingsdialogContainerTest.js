import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import { OpprettOppfolgingsdialogSide } from "../../js/containers/OpprettOppfolgingsdialogContainer";
import OpprettOppfolgingsdialog from "../../js/components/oppfolgingsdialoger/OpprettOppfolgingsdialog";
import { OppfolgingsdialogSamtykke } from 'oppfolgingsdialog-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("OpprettOppfolgingsdialogContainer", () => {

    describe("OpprettOppfolgingsdialogSide", () => {

        let dispatch;
        let hentDineSykmeldinger;

        beforeEach(() => {
            dispatch = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
        });

        it("Skal vise spinner dersom data hentes", () => {
            let component = shallow(<OpprettOppfolgingsdialogSide arbeidsgivere={[]}
                                                                  henter
                                                                  hentDineSykmeldinger={hentDineSykmeldinger} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it("Skal ikke vise spinner dersom data ikke hentes", () => {
            let component = shallow(<OpprettOppfolgingsdialogSide arbeidsgivere={[]}
                                                                  hentDineSykmeldinger={hentDineSykmeldinger} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it("Skal vise feilmelding dersom henting feilet", () => {
            let component = shallow(<OpprettOppfolgingsdialogSide arbeidsgivere={[]}
                                                                  hentingFeilet
                                                                  hentDineSykmeldinger={hentDineSykmeldinger} />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it("Skal vise OpprettOppfolgingsdialog dersom henting er OK", () => {
            let component = shallow(<OpprettOppfolgingsdialogSide arbeidsgivere={[]}
                                                                  hentDineSykmeldinger={hentDineSykmeldinger} />);
            expect(component.find(OpprettOppfolgingsdialog)).to.have.length(1);
        });

    });

});