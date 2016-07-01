import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { TidslinjeSide, mapStateToProps, mapArbeidssituasjonParam, setHash } from "../../js/containers/TidslinjeContainer.js";
import TidslinjeVelgArbeidssituasjonContainer from "../../js/containers/TidslinjeVelgArbeidssituasjonContainer.js";
import AppSpinner from '../../js/components/AppSpinner.js';
import Feilmelding from '../../js/components/Feilmelding.js';
import Tidslinje from '../../js/components/Tidslinje.js';
import sinon from 'sinon';

const hendelserData = [{
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
 
xdescribe("TidslinjeContainer", () => {

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
            hendelser: {
                data: hendelserData
            }
        }
    }); 

    describe("mapArbeidssituasjonParam", () => {
        it("Skal returnere MED_ARBEIDSGIVER når param === 'med-arbeidsgiver'", () => {
            const resultat = mapArbeidssituasjonParam('med-arbeidsgiver');
            expect(resultat).to.equal("MED_ARBEIDSGIVER");
        }); 

        it("Skal returnere UTEN_ARBEIDSGIVER når param === 'uten-arbeidsgiver'", () => {
            const resultat = mapArbeidssituasjonParam('uten-arbeidsgiver');
            expect(resultat).to.equal("UTEN_ARBEIDSGIVER");
        }); 

        it("Skal returnere MED_ARBEIDSGIVER når param === 'mitt-ukjente-param'", () => {
            const resultat = mapArbeidssituasjonParam('mitt-ukjente-param');
            expect(resultat).to.equal("MED_ARBEIDSGIVER");
        }); 

        it("Skal returnere undefined når param === undefined", () => {
            const resultat = mapArbeidssituasjonParam(undefined);
            expect(resultat).to.equal(undefined);
        }); 
    }); 

    describe("mapStateToProps", () => {

        it("Skal returnere hendelser når arbeidssituasjon === undefined", () => {
            const props = mapStateToProps(initState);
            expect(props.hendelser).to.deep.equal([{
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

        it("Skal returnere hendelser når arbeidssituasjon === 'UTEN_ARBEIDSGIVER'", () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = 'UTEN_ARBEIDSGIVER'
            const props = mapStateToProps(initState);
            expect(props.hendelser).to.deep.equal([{
                ledetekst: 'tidslinje.UTEN_ARBEIDSGIVER.nav',
                visning: ['UTEN_ARBEIDSGIVER'],
                key: 1
            }, {
                ledetekst: 'tidslinje.UTEN_ARBEIDSGIVER.sluttfasen',
                visning: ['UTEN_ARBEIDSGIVER'],
                key: 5
            }]);
        });        

        it("Skal returnere arbeidssituasjon fra parameter i URL dersom det finnes og er satt til med-arbeidsgiver", () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = 'UTEN_ARBEIDSGIVER';
            const ownProps = {
                params: {
                    arbeidssituasjon: 'med-arbeidsgiver'
                }
            }
            const props = mapStateToProps(initState, ownProps);
            expect(props.arbeidssituasjon).to.equal("MED_ARBEIDSGIVER");
        });

        it("Skal returnere arbeidssituasjon fra parameter i URL dersom det finnes og er satt til uten-arbeidsgiver", () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = 'MED_ARBEIDSGIVER';
            const ownProps = {
                params: {
                    arbeidssituasjon: 'uten-arbeidsgiver'
                }
            }
            const props = mapStateToProps(initState, ownProps);
            expect(props.arbeidssituasjon).to.equal("UTEN_ARBEIDSGIVER");
        });

        it("Skal returnere default arbeidssituasjon dersom parameter i URL er satt til noe som er ukjent", () => {
            const ownProps = {
                params: {
                    arbeidssituasjon: 'banankake'
                }
            }
            const props = mapStateToProps(initState, ownProps);
            expect(props.arbeidssituasjon).to.equal("MED_ARBEIDSGIVER");
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
        });

        it("Skal returnere hashMilepaeler", () => {
            const props = mapStateToProps(initState, {
                location: {
                    hash: "#1/2"
                }
            });
            expect(props.hashMilepaeler).to.deep.equal(["1", "2"])
        });

    });

    describe("TidslinjeSide", () => {

        let apneHendelserSpy; 

        beforeEach(() => {
            apneHendelserSpy = sinon.spy(); 
        })

        it("Skal vise en AppSpinner dersom ledetekster ikke er lastet", () => {
            const ledetekster = {
                henter: true
            };
            const hendelser = {};
            const spy = sinon.spy(); 
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} hendelser={hendelser} apneHendelser={apneHendelserSpy} />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it("Skal vise en Feilmelding dersom henting av ledetekster feiler", () => {
            const ledetekster = {
                hentingFeilet: true
            };
            const hendelser = {};
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} hendelser={hendelser} apneHendelser={apneHendelserSpy} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        }); 

        it("Skal sende arbeidssituasjon videre til tidslinjen", () => {
            const ledetekster = {
                data: {}
            };
            const arbeidssituasjon = "MED_ARBEIDSGIVER";
            const hendelser = [{
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
            }];
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} hendelser={hendelser} arbeidssituasjon={arbeidssituasjon} apneHendelser={apneHendelserSpy} />);
            const tidslinjeComp = component.find(Tidslinje);
            expect(tidslinjeComp.prop("arbeidssituasjon")).to.equal("MED_ARBEIDSGIVER");
        })

        it("Skal kalle på apneHendelser", () => {
            const ledetekster = {
                data: {}
            };
            const arbeidssituasjon = "MED_ARBEIDSGIVER";
            const hendelser = [{
                ledetekst: 'tidslinje.utarbeide.plan',
                bilde: '/sykefravaer/img/tidslinje/innen4uker.svg',
                alt: '',
                visning: ['MED_ARBEIDSGIVER'],
                key: 0
            }];
            const hashMilepaeler = ["0", "2"]
            const component = shallow(<TidslinjeSide ledetekster={ledetekster} hendelser={hendelser} arbeidssituasjon={arbeidssituasjon} apneHendelser={apneHendelserSpy} hashMilepaeler={hashMilepaeler} />);
            expect(apneHendelserSpy.calledOnce).to.be.true;
            expect(apneHendelserSpy.getCall(0).args[0]).to.deep.equal(["0", "2"]);
        })        

    })

    describe("Set hash", () => {

        let replaceState;

        beforeEach(() => {
            replaceState = sinon.spy(); 
            window.history = window.history || {};
            window.history.replaceState = replaceState;
        });

        it("Skal kalle på window.history.replaceState med null, null, # når det ikke finnes noen åpne milepæler", () => {
            setHash([]);
            expect(replaceState.calledOnce).to.be.true;
            expect(replaceState.getCall(0).args[0]).to.equal(null);
            expect(replaceState.getCall(0).args[1]).to.equal(null);
            expect(replaceState.getCall(0).args[2]).to.equal("#");
        });

        it("Skal kalle på window.history.replaceState med null, null, #1/2/3 når det finnes noen åpne milepæler", () => {
            setHash([{
                id: 0,
                erApen: false
            }, {
                id: 1,
                erApen: true
            }, {
                id: 2,
                erApen: true
            }, {
                id: 3, 
                erApen: true
            }, {
                id: 4,
                erApen: false
            }, {
                id: 5,
                erApen: false
            }]);
            expect(replaceState.calledOnce).to.be.true;
            expect(replaceState.getCall(0).args[0]).to.equal(null);
            expect(replaceState.getCall(0).args[1]).to.equal(null);
            expect(replaceState.getCall(0).args[2]).to.equal("#1/2/3");
        });

    })

}); 