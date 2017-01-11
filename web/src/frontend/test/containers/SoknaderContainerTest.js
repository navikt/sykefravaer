import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { SoknaderSide, mapStateToProps } from "../../js/containers/SoknaderContainer";
import Soknader from '../../js/components/soknader/Soknader';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';

describe("SoknaderContainer", () => {

    describe("mapStateToProps", () => {

        it("Skal returnere ledetekster", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {
                        "min.tekst": "Dette er en test"
                    }
                },
                brukerinfo: {
                    data: {}
                }     
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            })
        });        

    });

    describe("SoknaderSide", () => {

        it("Skal vise feilmelding om henting feilet", () => {
            let ledetekster = {"nokkel": "verdi"};
            let component = shallow(<SoknaderSide ledetekster={ledetekster} soknader={[]} henter={false} hentingFeilet={true}/>);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
        });

        it("Skal vise spinner om vi venter på data", () => {
            let ledetekster = {"nokkel": "verdi"};
            let component = shallow(<SoknaderSide ledetekster={ledetekster} soknader={[]} henter={true} hentingFeilet={false} />);
            expect(component.find(Soknader)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise Soknaderside", () => {
            let ledetekster = {"nokkel": "verdi"};
            let component = shallow(<SoknaderSide ledetekster={ledetekster} soknader={[]} henter={false} hentingFeilet={false} />);
            expect(component.find(Soknader)).to.have.length(1);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(AppSpinner)).to.have.length(0);
        });
    })

}); 