import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { mapStateToProps } from "../../js/containers/DinSykmeldingBrukerInputContainer.js";

let state;
let ownProps;
let arbeidssituasjoner;

describe("DinSykmeldingBrukerInputContainer", () => {

    beforeEach(() => {
        arbeidssituasjoner = [{
                tekst: 'Velg arbeidssituasjon',
                verdi: 'default',
                skjult: true,
            },
            {
                tekst: 'Arbeidstaker',
                verdi: 'arbeidstaker',
            },
            {
                tekst: 'Selvstendig næringsdrivende',
                verdi: 'selvstendig_naeringsdrivende',
            },
            {
                tekst: 'Frilanser',
                verdi: 'frilanser',
            },
            {
                tekst: 'Arbeidsledig',
                verdi: 'arbeidsledig',
            },
            {
                tekst: 'Annet',
                verdi: 'annet',
            },
        ];
    })

    describe("mapStateToProps", () => {

        it("returnerer arbeidssituasjoner", () => {
            let state = {
                ledetekster: {
                    data: []
                }
            }
            let ownProps = {
                arbeidssituasjoner,
                sykmelding: {}
            }
            expect(mapStateToProps(state, ownProps).arbeidssituasjoner).to.deep.equal(arbeidssituasjoner);
        }); 

        it("returnerer ledetekster", () => {
            let state = {
                ledetekster: {
                    data: []
                }
            }
            let ownProps = {
                arbeidssituasjoner,
                sykmelding: {}
            }
            expect(mapStateToProps(state, ownProps).ledetekster).to.deep.equal({
                data: []
            });
        });



    });

});