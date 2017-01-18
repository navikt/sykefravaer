import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { SoknaderSide, mapStateToProps } from "../../js/containers/SoknaderContainer";
import Soknader from '../../js/components/soknader/Soknader';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';

describe("SoknaderContainer", () => {

    describe("mapStateToProps", () => {

        it("skal returnere ledetekster og soknader", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {
                        "min.tekst": "Dette er en test"
                    },
                    henter: false,
                    hentingFeilet: false,
                },
                sykepengesoknader: {
                    data: [{
                        id: 1,
                    }],
                    henter: false,
                    hentingFeilet: false,
                },
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            });
            expect(res.sykepengesoknader).to.deep.equal([
                {id: 1}
            ]);
        });
    });

    describe("SoknaderSide", () => {

        let dispatch;
        beforeEach(() => {
            dispatch = sinon.spy();
        });

        it("Skal vise feilmelding om henting feilet", () => {
            let ledetekster = {"nokkel": "verdi"};
            let component = shallow(<SoknaderSide ledetekster={ledetekster} soknader={[]} henter={false} hentingFeilet={true} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it("Skal vise spinner om vi venter på data", () => {
            let ledetekster = {"nokkel": "verdi"};
            let component = shallow(<SoknaderSide ledetekster={ledetekster} soknader={[]} henter={true} hentingFeilet={false} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise Soknaderside", () => {
            let ledetekster = {"nokkel": "verdi"};
            let component = shallow(<SoknaderSide ledetekster={ledetekster} soknader={[]} henter={false} hentingFeilet={false} dispatch={dispatch} />);
            expect(component.find(Soknader)).to.have.length(1);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(0);
        });
    })

}); 