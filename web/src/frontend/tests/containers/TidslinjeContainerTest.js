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
    visning: ['MED_ARBEIDSGIVER'],
    key: 0
}, {
    ledetekst: 'tidslinje.UTEN_ARBEIDSGIVER.nav',
    visning: ['UTEN_ARBEIDSGIVER'],
    key: 1
}, {
    ledetekst: 'tidslinje.delta.arbeid',
    bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
    alt: '',
    visning: ['MED_ARBEIDSGIVER'],
    key: 2
}, {
    ledetekst: 'tidslinje.dialogmote',
    img: '/sykefravaer/img/tidslinje/innen24uker.svg',
    alt: '',
    visning: ['MED_ARBEIDSGIVER'],
    key: 3
}, {
    ledetekst: 'tidslinje.sluttfasen',
    visning: ['MED_ARBEIDSGIVER'],
    key: 4
}, {
    ledetekst: 'tidslinje.UTEN_ARBEIDSGIVER.sluttfasen',
    visning: ['UTEN_ARBEIDSGIVER'],
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
                innstillinger: {},
                bruker: {}
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
                visning: ['MED_ARBEIDSGIVER'],
                key: 0
            }, {
                ledetekst: 'tidslinje.delta.arbeid',
                bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
                alt: '',
                visning: ['MED_ARBEIDSGIVER'],
                key: 2
            }, {
                ledetekst: 'tidslinje.dialogmote',
                img: '/sykefravaer/img/tidslinje/innen24uker.svg',
                alt: '',
                visning: ['MED_ARBEIDSGIVER'],
                key: 3
            }, {
                ledetekst: 'tidslinje.sluttfasen',
                visning: ['MED_ARBEIDSGIVER'],
                key: 4
            }]);
        });

        it("Skal returnere milepaeler når arbeidssituasjon === 'UTEN_ARBEIDSGIVER'", () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = 'UTEN_ARBEIDSGIVER'
            const props = mapStateToProps(initState);
            expect(props.milepaeler).to.deep.equal([{
                ledetekst: 'tidslinje.UTEN_ARBEIDSGIVER.nav',
                visning: ['UTEN_ARBEIDSGIVER'],
                key: 1
            }, {
                ledetekst: 'tidslinje.UTEN_ARBEIDSGIVER.sluttfasen',
                visning: ['UTEN_ARBEIDSGIVER'],
                key: 5
            }]);
        });        

        it("Skal returnere arbeidssituasjon", () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = 'UTEN_ARBEIDSGIVER'
            const props = mapStateToProps(initState);
            expect(props.arbeidssituasjon).to.equal("UTEN_ARBEIDSGIVER");
        });               

        it("Skal returnere ledetekster", () => {
            const props = mapStateToProps(initState);
            expect(props.ledetekster).to.deep.equal(initState.ledetekster);
        });

        it("Skal returnere brødsmuler", () => {
            const props = mapStateToProps(initState); 
            expect(props.brodsmuler).to.deep.equal([{
                tittel: 'Ditt sykefravær',
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