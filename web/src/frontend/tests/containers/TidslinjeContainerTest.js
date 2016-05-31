import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { TidslinjeSide, mapStateToProps } from "../../js/containers/TidslinjeContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import Tidslinje from '../../js/components/Tidslinje.js';

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
 
describe("TidslinjeContainer", () => {

    let initState; 

    beforeEach(() => {
        initState = {
            ledetekster: {
                data: ledetekster,
                henter: false, 
                hentingFeilet: false
            },
            brukerinfo: {
                data: {

                }
            },
            milepaeler: {
                data: milepaelerData
            }
        }
    }); 

    describe("mapStateToProps", () => {

        it("Skal returnere milepaeler når arbeidssituasjon === undefined", () => {
            const props = mapStateToProps(initState);
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

        it("Skal returnere milepaeler når arbeidssituasjon === 'ikke-arbeidstaker'", () => {
            initState.brukerinfo.data.arbeidssituasjon = 'ikke-arbeidstaker'
            const props = mapStateToProps(initState);
            expect(props.milepaeler).to.deep.equal([{
                ledetekst: 'tidslinje.ikke-arbeidstaker.nav',
                visning: ['ikke-arbeidstaker'],
                key: 1
            }, {
                ledetekst: 'tidslinje.ikke-arbeidstaker.sluttfasen',
                visning: ['ikke-arbeidstaker'],
                key: 5
            }]);
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
            const milepaeler = {};
            const props = { ledetekster, milepaeler };
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} milepaeler={milepaeler} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en Feilmelding dersom henting av ledetekster feiler", () => {
            const ledetekster = {
                hentingFeilet: true
            };
            const milepaeler = {};
            const props = { ledetekster, milepaeler };
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} milepaeler={milepaeler} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

    })

}); 