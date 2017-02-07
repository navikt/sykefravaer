import chai from 'chai';
import React from 'react'
import {mount, shallow, render} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import JaEllerNei, { RendreJaEllerNei, parseJaEllerNei, JaEllerNeiRadioknapper, jaEllerNeiAlternativer } from '../../../js/components/sykepengesoknad/JaEllerNei';
import Radioknapper from '../../../js/components/skjema/Radioknapper';
import { Field } from 'redux-form';

describe("JaEllerNei", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<JaEllerNei sporsmal="Liker du frukt?">
            <p>Hvilken frukt liker du?</p>
        </JaEllerNei>);
    });

    it("Skal inneholde en Field med riktig komponent", () => {
        expect(component.find(Field)).to.have.length(1);
        expect(component.find(Field).prop("component")).to.deep.equal(RendreJaEllerNei);
        expect(component.find(Field).prop("parse")).to.deep.equal(parseJaEllerNei);
        expect(component.find(Field).prop("sporsmal"))
    });

    describe("parseJaEllerNei", () => {
        it("Skal returnere true hvis verdi === 'true'", () => {
            const res = parseJaEllerNei('true');
            expect(res).to.equal(true);
        });

        it("Skal returnere false hvis verdi === 'false'", () => {
            const res = parseJaEllerNei('false');
            expect(res).to.equal(false);
        });

        it("Skal returnere undefined hvis verdi === undefined", () => {
            const res = parseJaEllerNei(undefined);
            expect(res).to.equal(undefined);
        });

        it("Skal returnere 'minTilfeldigeVerdi' hvis verdi === 'minTilfeldigeVerdi'", () => {
            const res = parseJaEllerNei('minTilfeldigeVerdi');
            expect(res).to.equal('minTilfeldigeVerdi');
        });
    });

    describe("RendreJaEllerNei", () => {

        let props;
        let component;

        beforeEach(() => {
            props = {
                sporsmal: "Liker du frukt?",
                input: {}
            };
            component = shallow(<RendreJaEllerNei {...props} />);
        })

        it("Skal vise intro hvis det er intro", () => {
            component = shallow(<RendreJaEllerNei intro="Min intro" {...props} />);
            expect(component).to.contain("Min intro");
            expect(component.find(".js-intro")).to.have.length(1);
        });

        it("Skal ikke vise intro hvis det ikke er intro", () => {
            expect(component.find(".js-intro")).to.have.length(0);
        });

        it("Skal inneholde JaEllerNeiRadioknapper", () => {
            expect(component.contains(<JaEllerNeiRadioknapper {...props} />)).to.be.true;
        });

        it("Skal vise children hvis verdi === true og det finnes children", () => {
            props.input.value = true;
            component = shallow(<RendreJaEllerNei {...props}><p>Test</p></RendreJaEllerNei>)
            expect(component.find(".js-tillegg")).to.have.length(1);
            expect(component.find(".js-tillegg")).to.contain(<p>Test</p>);
        });

        it("Skal ikke vise children hvis verdi !== true og det finnes children", () => {
            component = shallow(<RendreJaEllerNei {...props}><p>Test</p></RendreJaEllerNei>)
            expect(component.find(".js-tillegg")).to.have.length(0);
        });

    });

    describe("jaEllerNeiAlternativer", () => {
        it("Skal se slik ut:", () => {
            expect(jaEllerNeiAlternativer).to.deep.equal([{
                value: true,
                label: 'Ja',
            }, {
                value: false,
                label: 'Nei',
            }])
        })
    });

    describe("JaEllerNeiRadioknapper", () => {

        let props;
        let component;

        beforeEach(() => {
            props = {
                input: {
                    name: "Olsen"
                },
                sporsmal: "Liker du frukt?"
            }
            component = shallow(<JaEllerNeiRadioknapper {...props} />)
        });

        it("Skal inneholde Radioknapper", () => {
            expect(component.find(Radioknapper)).to.have.length(1);
        });

        it("SKal sende props videre til Radioknapper", () => {
            expect(component.find(Radioknapper).prop("sporsmal")).to.equal("Liker du frukt?");
            expect(component.find(Radioknapper).prop("input")).to.deep.equal(props.input);
        })

        it("Skal inneholde to input", () => {
            expect(component.find("input")).to.have.length(2);
            expect(component.find("input").at(0).prop("value")).to.equal(true);
            expect(component.find("input").at(0).prop("label")).to.equal("Ja");

            expect(component.find("input").at(1).prop("value")).to.equal(false);
            expect(component.find("input").at(1).prop("label")).to.equal("Nei");
        });

    })

})