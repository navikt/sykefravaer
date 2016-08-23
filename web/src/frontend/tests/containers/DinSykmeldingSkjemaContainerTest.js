import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

import { DinSykmldSkjema, mapStateToProps } from "../../js/containers/DinSykmeldingSkjemaContainer";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("DinSykmeldingSkjemaContainer", () => {

    const getState = (state = {}) => {
        const defaultState = {
            arbeidsgiversSykmeldinger: {
                data: [{
                    id: 123,
                    navn: "Olsen"
                }, {
                    id: 1234,
                    navn: "Hansen"
                }],
                sender: true,
            },
            ledetekster: {
                data: ledetekster
            },
            brukerinfo: {
                bruker: {
                    data: {
                        strengtFortroligAdresse: true
                    }
                }
            }
        };
        return Object.assign({}, defaultState, state);
    }

    describe("mapStateToProps", () => {

        it("Skal returnere sykmelding", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.sykmelding).to.deep.equal({
                id: 123,
                navn: "Olsen"
            })
        });

        it("Skal returnere ledetekster", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.ledetekster).to.deep.equal(ledetekster);
        });

        it("Skal returnere sender", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.sender).to.be.true;
        });

        it("Skal returnere strengt fortrolig adresse", () => {
            const state = getState();
            const props = mapStateToProps(state, {
                sykmeldingId: 123
            });
            expect(props.harStrengtFortroligAdresse).to.be.true;
        });

    });

});