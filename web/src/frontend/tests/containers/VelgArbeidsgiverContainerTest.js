import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Velg, mapStateToProps } from "../../js/containers/VelgArbeidsgiverContainer.js";
import VelgArbeidsgiver from "../../js/components/VelgArbeidsgiver.js";

describe("VelgArbeidsgiverContainer", () => {

    let sykmelding;

    beforeEach(() => {
        sykmelding = {
            id: 88, 
        }
    }); 

    describe("mapStateToProps", () => {

        it("Skal returnere ledetekster", () => {
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: []
                },
                ledetekster: {
                    data: {
                        "nokkel": "Verdi"
                    }
                }
            }, { sykmelding });
            expect(res.ledetekster).to.deep.equal({
                "nokkel": "Verdiiii"
            });
        });

        it("Skal returnere arbeidsgivere", () => {
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: [],
                    henter: true,
                },
                ledetekster: {
                    data: ledetekster
                }
            }, { sykmelding });
            expect(res.arbeidsgivere).to.deep.equal([{
                    orgnummer: '0', 
                    navn: "Annen arbeidsgiver"
                }]);
        });

        it("Skal returnere valgtArbeidsgiverOrgnummer hvis det finnes", () => {
            sykmelding.valgtArbeidsgiver = {
                orgnummer: ***REMOVED***,
                navn: "Knuts Kaffebar"
            }
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: [],
                    henter: true,
                }, 
                ledetekster: {
                    data: {
                        "nokkel": "Verdi"
                    }
                }
            }, { sykmelding });
            expect(res.valgtArbeidsgiverOrgnummer).to.equal(***REMOVED***);
        });

        it("Skal returnere valgtArbeidsgiverOrgnummer === undefined hvis det ikke finnes", () => {
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: [],
                    henter: true,
                }, 
                ledetekster: {
                    data: {
                        "nokkel": "Verdi"
                    }
                }
            }, { sykmelding });
            expect(res.valgtArbeidsgiverOrgnummer).to.equal(undefined);
        });        

    });

    describe("Velg", () => {

        let props; 
        let dispatch;

        beforeEach(() => {
            dispatch = sinon.spy();
            props = {
                sykmelding,
                arbeidsgivere: [],
                dispatch
            }
        }); 

        it("Skal inneholde en VelgArbeidsgiver", () => {
            let component = shallow(<Velg {...props} />);
            expect(component.find(VelgArbeidsgiver)).to.have.length(1);
        });

        it("Skal hente arbeidsgivere", () => {
            let component = mount(<Velg {...props} />);
            expect(dispatch.callCount).to.equal(1);
        });

    });

}); 