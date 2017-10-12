import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { SoknaderSide, mapStateToProps } from "../../../js/containers/sykepengesoknader/SoknaderContainer";
import Soknader from '../../../js/components/sykepengesoknader/Soknader';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import { SYKEPENGER_SKJEMANAVN } from '../../../js/components/sykepengesoknad/setup';

describe("SoknaderContainer", () => {

    describe("mapStateToProps", () => {

        it("skal returnere soknader", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                },
                sykepengesoknader: {
                    data: [{
                        id: 1,
                    }],
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                },
            });
            expect(res.sykepengesoknader).to.deep.equal([
                {id: 1}
            ]);
            expect(res.soknaderHentet).to.be.true;
        });

        it("skal returnere soknaderHentet når søknader ikke er hente", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {},
                    henter: false,
                    hentingFeilet: false,
                },
                sykepengesoknader: {
                    data: [{
                        id: 1,
                    }],
                    henter: false,
                    hentingFeilet: false,
                    hentet: false,
                },
            });
            expect(res.soknaderHentet).to.be.false;
        });

    });

    describe("SoknaderSide", () => {

        let dispatch;
        let destroy; 
        let actions;
        let ledetekster;
        let hentSykepengesoknader;

        beforeEach(() => {
            dispatch = sinon.spy();
            destroy = sinon.spy();
            hentSykepengesoknader = sinon.spy();
            actions = { destroy, hentSykepengesoknader };
            ledetekster = {"nokkel": "verdi"};
            
        });

        it("Skal kalle på destroy", () => {
            let component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet={true} dispatch={dispatch} />);
            expect(destroy.calledWith(SYKEPENGER_SKJEMANAVN)).to.be.true;
        });

        it("Skal vise feilmelding om henting feilet", () => {
            let component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet={true} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it("Skal vise spinner om vi venter på data", () => {
            let component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={true} hentingFeilet={false} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise Soknaderside", () => {
            let component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(1);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it("Skal hente søknader hvis søknader ikke er hentet", () => {
            let component = shallow(<SoknaderSide actions={actions} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(hentSykepengesoknader.called).to.be.true;
        });

        it("Skal ikke hente søknader hvis søknader er hentet", () => {
            let component = shallow(<SoknaderSide soknaderHentet actions={actions} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(hentSykepengesoknader.called).to.be.false;
        });
    })

}); 