import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import sinon from 'sinon';
const expect = chai.expect;

import { VelgArbeidsgiverWrapper, mapStateToProps } from '../../js/containers/VelgArbeidsgiverContainer';

describe("VelgArbeidsgiverContainer", () => {

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

        it("Skal returnere henter === true hvis det hentes", () => {
            state.arbeidsgivere.henter = true;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.true;
        });

        it("Skal returnere henter === false hvis det ikke hentes", () => {
            state.arbeidsgivere.henter = false;
            const props = mapStateToProps(state);
            expect(props.henter).to.be.false;
        });

        it("Skal returnere arbeidsgivere når det ikke finnes arbeidsgivere", () => {
            const props = mapStateToProps(state);
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
            const props = mapStateToProps(state);
            expect(props.arbeidsgivere).to.deep.equal([{
                orgnummer: "1234",
                navn: "Oles sykkelservice"
            }, {
                navn: "Annen arbeidsgiver",
                orgnummer: "0"
            }]);
        });

    });

})