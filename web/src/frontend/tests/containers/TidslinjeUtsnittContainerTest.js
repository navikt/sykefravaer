import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { TidzlinjeUtsnitt, mapStateToProps } from "../../js/containers/TidslinjeUtsnittContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import TidslinjeUtsnitt from '../../js/components/TidslinjeUtsnitt.js';

const milepaelerData = [{
    ledetekst: 'tidslinje.utarbeide.plan',
    bilde: '/sykefravaer/img/tidslinje/innen4uker.svg',
    alt: '',
    visning: ['arbeidstaker'],
    key: 0
}, {
    ledetekst: 'tidslinje.ikke-arbeidstaker.nav',
    visning: ['ikke-arbeidstaker'],
    key: 1
}, {
    ledetekst: 'tidslinje.delta.arbeid',
    bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
    alt: '',
    visning: ['arbeidstaker'],
    key: 2
}, {
    ledetekst: 'tidslinje.dialogmote',
    img: '/sykefravaer/img/tidslinje/innen24uker.svg',
    alt: '',
    visning: ['arbeidstaker'],
    key: 3
}, {
    ledetekst: 'tidslinje.sluttfasen',
    visning: ['arbeidstaker'],
    key: 4
}, {
    ledetekst: 'tidslinje.ikke-arbeidstaker.sluttfasen',
    visning: ['ikke-arbeidstaker'],
    key: 5
}];
 
describe("TidslinjeUtsnittContainer", () => {

    let initState; 

    describe("mapStateToProps", () => {

        it("Skal returnere ledetekster", () => {

            let state = {
                ledetekster: {},
                brukerinfo: {
                    bruker: {},
                    innstillinger: {}
                },
                milepaeler: {
                    data: milepaelerData
                }
            };
            const props = mapStateToProps(state);
            expect(props.ledetekster).to.deep.equal({});

        });

        it("Skal returnere milepaeler", () => {
            let state = {
                ledetekster: {},
                brukerinfo: {
                    bruker: {},
                    innstillinger: {}
                },
                milepaeler: {
                    data: milepaelerData
                }
            };
            const props = mapStateToProps(state);
            expect(props.milepaeler).to.deep.equal([{
                ledetekst: 'tidslinje.utarbeide.plan',
                bilde: '/sykefravaer/img/tidslinje/innen4uker.svg',
                alt: '',
                visning: ['arbeidstaker'],
                key: 0
            }, {
                ledetekst: 'tidslinje.delta.arbeid',
                bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
                alt: '',
                visning: ['arbeidstaker'],
                key: 2
            }, {
                ledetekst: 'tidslinje.dialogmote',
                img: '/sykefravaer/img/tidslinje/innen24uker.svg',
                alt: '',
                visning: ['arbeidstaker'],
                key: 3
            }, {
                ledetekst: 'tidslinje.sluttfasen',
                visning: ['arbeidstaker'],
                key: 4
            }]);

        });        

    });


    describe("TidzlinjeUtsnitt", () => {

        it("Skal vise en AppSpinner dersom ledetekster ikke er lastet", () => {
            const ledetekster = {
                henter: true
            };
            const milepaeler = {};
            const component = shallow(<TidzlinjeUtsnitt ledetekster={ledetekster} milepaeler={milepaeler} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en Feilmelding dersom ledetekster ikke er lastet", () => {
            const ledetekster = {
                hentingFeilet: true
            };
            const milepaeler = {};
            const component = shallow(<TidzlinjeUtsnitt ledetekster={ledetekster} milepaeler={milepaeler} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });


    })

}); 