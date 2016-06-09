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

        it("Skal returnere sykmelding", () => {
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: []
                }
            }, {
                sykmelding 
            });
            expect(res.sykmelding).to.deep.equal({
                id: 88
            });
        });

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
                data: {
                    "nokkel": "Verdi"
                }
            });
        });

        it("Skal returnere arbeidsgivere", () => {
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: [],
                    henter: true,
                }
            }, { sykmelding });
            expect(res.arbeidsgivere).to.deep.equal({
                data: [{
                    orgnummer: null, 
                    navn: "Arbeidsgiveren min er ikke her"
                }],
                henter: true
            });
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
                }
            }, { sykmelding });
            expect(res.valgtArbeidsgiverOrgnummer).to.equal(***REMOVED***);
        });

        it("Skal returnere valgtArbeidsgiverOrgnummer === undefined hvis det ikke finnes", () => {
            const res = mapStateToProps({
                arbeidsgivere: {
                    data: [],
                    henter: true,
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
                arbeidsgivere: {
                    data: []
                },
                dispatch
            }
        }); 

        it("Skal inneholde en VelgArbeidsgiver", () => {
            let component = shallow(<Velg {...props} />);
            expect(component.find(VelgArbeidsgiver)).to.have.length(1);
        });

        it("Skal hente arbeidsgivere dersom aktuell arbeidsgiver ikke tilhører den aktuelle sykmeldingen", () => {
            let component = mount(<Velg {...props} />);
            expect(dispatch.callCount).to.equal(1);
        });

        it("Skal ikke hente arbeidsgivere dersom aktuell arbeidsgiver tilhører den aktuelle sykmeldingen", () => {
            props.arbeidsgivere.sykmeldingId = 88,
            props.arbeidsgivere.data = [{
                orgnummer: 123456789,
                navn: "Mosveens Pizzagrilleri"
            }]
            let component = mount(<Velg {...props} />);
            expect(dispatch.callCount).to.equal(0);
        });


    });

}); 