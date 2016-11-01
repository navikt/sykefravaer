import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { getHtmlTittel } from "../../js/components/tidslinje/HendelseBoble.js";

describe("HendelseBoble", () => {

    describe("getHtmlTittel", () => {

        it("aktivitetkrav-varsel faar aktivitetskrav-tekst", () => {
            const hendelse = {
                antallDager: 20,
                type: 'AKTIVITETSKRAV_VARSEL',
                tekstkey: 'key',
                inntruffetdato: { year: 2016, monthValue: 2, dayOfMonth: 28 },

            };
            const ledetekster = { 'key.tittel': '%DATO%' };
            const html = getHtmlTittel(hendelse, ledetekster);

            expect(html).to.be.equal('28.02.2016')
        });

        it("ny-naermesteLeder-varsel faar nearmesteLeder-tekst", () => {
            const hendelse = {
                antallDager: 20,
                type: 'NY_NAERMESTE_LEDER',
                data: {
                    naermesteLeder: {
                        navn: 'navn',
                    }
                },
                inntruffetdato: { year: 2016, monthValue: 2, dayOfMonth: 28 },
                tekstkey: 'key',
            };

            const ledetekster = {
                'key.tittel': '<h3>%DATO%</h3><p>Din arbeidsgiver har oppgitt <b>%NAERMESTELEDER%</b> som din personalansvarlige leder</p>',
            };
            const html = getHtmlTittel(hendelse, ledetekster)

            expect(html).to.be.equal('<h3>28.02.2016</h3><p>Din arbeidsgiver har oppgitt <b>navn</b> som din personalansvarlige leder</p>')
        });

        it("default hendelse faar default tittel", () => {
            const hendelse = {
                tekstkey: 'key',
            };
            const ledetekster = {
                'key.tittel': 'tittel',
            };
            const html = getHtmlTittel(hendelse, ledetekster)

            expect(html).to.be.equal('<h3>tittel</h3>')
        });

    });
});
