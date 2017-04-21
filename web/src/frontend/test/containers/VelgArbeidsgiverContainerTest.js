import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import sinon from 'sinon';
const expect = chai.expect;


import { VelgArbeidsgiverWrapper, mapStateToProps } from '../../js/containers/VelgArbeidsgiverContainer';

describe("VelgArbeidsgiverContainer", () => {

    describe("VelgArbeidsgiverWrapper", () => {
        let sykmelding = {
            id: "1234"
        }
        let arbeidsgivere = [{
            orgnummer: "123",
            navn: "Oles sykkelservice"
        }]
        
        it("onChange skal dispatche riktig action", () => {
            const dispatch = sinon.spy();
            const comp = shallow(<VelgArbeidsgiverWrapper arbeidsgivere={arbeidsgivere} sykmelding={sykmelding} dispatch={dispatch} />);
            comp.instance().onChange("123");
            expect(dispatch.getCall(0).args[0]).to.deep.equal({
                type: "SET_ARBEIDSGIVER",
                sykmeldingId: "1234",
                arbeidsgiver: {
                    orgnummer: "123",
                    navn: "Oles sykkelservice"
                }
            });
        });

    });

    describe("mapStateToProps", () => {

        let state = {};

        beforeEach(() => {
            state.arbeidsgiversSykmeldinger = {
                data: [{
                    id: "123",
                    valgtArbeidsgiver: {
                        orgnummer: "99"
                    }
                }, {
                    id: "888"
                }]
            };
            state.arbeidsgivere = {
                data: []
            };
            state.ledetekster = {
                data: ledetekster
            }
        });

        it("Skal returnere valgtArbeidsgiverOrgnummer hvis det finnes", () => {
            const props = mapStateToProps(state, {
                sykmeldingId: "123"
            });
            expect(props.valgtArbeidsgiverOrgnummer).to.equal("99");
        });

        it("Skal returnere valgtArbeidsgiverOrgnummer === undefined hvis det ikke finnes", () => {
            const props = mapStateToProps(state, {
                sykmeldingId: "456"
            });
            expect(props.valgtArbeidsgiverOrgnummer).to.equal(undefined);
        });

        it("Skal returnere arbeidsgivere når det ikke finnes arbeidsgivere", () => {
            const props = mapStateToProps(state, {
                sykmeldingId: "333"
            });
            expect(props.arbeidsgivere).to.deep.equal([{
                navn: "Annen arbeidsgiver",
                orgnummer: "0"
            }]);
        });

        it("Skal returnere arbeidsgivere når det finnes arbeidsgivere", () => {
            state.arbeidsgivere.data = [{
                orgnummer: "1234",
                navn: "Oles sykkelservice"
            }]
            const props = mapStateToProps(state, {
                sykmeldingId: "333"
            });
            expect(props.arbeidsgivere).to.deep.equal([{
                orgnummer: "1234",
                navn: "Oles sykkelservice"
            }, {
                navn: "Annen arbeidsgiver",
                orgnummer: "0"
            }]);
        });

        it("Skal returnere sykmelding", () => {
            const props = mapStateToProps(state, {
                sykmeldingId: "123"
            });
            expect(props.sykmelding.id).to.equal("123")
        });

        it("Skal returnere riktig feilmelding", () => {
            const props = mapStateToProps(state, {
                sykmeldingId: "123"
            });
            expect(props.feilmelding).to.equal("Du må sende sykmeldingen til arbeidsgiveren din manuelt")
        });

        it("Skal returnere riktig feilmelding", () => {
            const props = mapStateToProps(state, {
                sykmeldingId: "888"
            });
            expect(props.feilmelding).to.equal("Vennligst velg en arbeidsgiver")
        });

        it("SKal returnere resetState", () => {
            const resetState = sinon.spy();
            const props = mapStateToProps(state, {
                resetState
            });
            expect(props.resetState).to.deep.equal(resetState);
        })

    });

})