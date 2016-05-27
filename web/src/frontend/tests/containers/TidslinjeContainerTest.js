import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import informasjonsdata from "../../js/informasjonsdata";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { TidslinjeSide, mapStateToProps } from "../../js/containers/TidslinjeContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import Tidslinje from '../../js/components/Tidslinje.js';
 
describe("TidslinjeContainer", () => {

    let initState; 

    beforeEach(() => {
        initState = {
            ledetekster: {
                data: ledetekster,
                henter: false, 
                hentingFeilet: false
            },
            informasjon: {
                data: informasjonsdata
            }
        }
    }); 

    describe("mapStateToProps", () => {

        it("Skal returnere tidspunkter", () => {
            const props = mapStateToProps(initState);
            expect(props.tidspunkter).to.deep.equal(initState.informasjon);
        });

        it("Skal returnere ledetekster", () => {
            const props = mapStateToProps(initState);
            expect(props.ledetekster).to.deep.equal(initState.ledetekster);
        });

        it("Skal returnere brødsmuler", () => {
            const props = mapStateToProps(initState); 
            expect(props.brodsmuler).to.deep.equal([{
                tittel: 'Sykefravær og oppfølging',
                sti: '/',
                erKlikkbar: true,
            }, {
                tittel: 'Tidslinjen',
            }])
        })

    });

    describe("TidslinjeSide", () => {

        it("Skal vise en AppSpinner dersom ledetekster ikke er lastet", () => {
            const ledetekster = {
                henter: true
            };
            const tidspunkter = {};
            const props = { ledetekster, tidspunkter };
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} tidspunkter={tidspunkter} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en Feilmelding dersom henting av ledetekster feiler", () => {
            const ledetekster = {
                hentingFeilet: true
            };
            const tidspunkter = {};
            const props = { ledetekster, tidspunkter };
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} tidspunkter={tidspunkter} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal vise en Tidslinje dersom alt er OK", () => {
            const ledetekster = {
                data: {
                    "nokkel": "Min fine ledetekst"
                }
            };
            const tidspunkter = {};
            const props = { ledetekster, tidspunkter };
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} tidspunkter={tidspunkter} />);
            expect(component.find(AppSpinner)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
            expect(component.find(Tidslinje)).to.have.length(1);
        });              

    })

}); 