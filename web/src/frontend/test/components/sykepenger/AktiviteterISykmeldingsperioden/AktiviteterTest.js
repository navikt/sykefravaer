import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { AktiviteterISykmeldingsperioden, UtdanningStartDato } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import { Field, FieldArray, Fields } from 'redux-form';
import Aktiviteter, { Aktivitet } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/Aktiviteter';
import AngiTid from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AngiTid';
import JaEllerNei from '../../../../js/components/sykepengesoknad/JaEllerNei';

describe("Aktiviteter", () => {

    let ledetekster;
    let component;
    let untouch;
    let autofill;
    let sykepengesoknad;

    beforeEach(() => {
        autofill = sinon.spy();
        untouch = sinon.spy();
        aktiviteter = [{
          "periode": {
            "fom": "2017-01-01",
            "tom": "2017-01-15"
          },
          "grad": 100,
          "avvik": null
        }, {
          "periode": {
            "fom": "2017-01-01",
            "tom": "2017-01-25"
          },
          "grad": 35,
          "avvik": null
        }]

        ledetekster = {
            'sykepengesoknad.aktiviteter.gradert.sporsmal': 'Har du jobbet mer enn dette?',
            'sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet': "Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos %ARBEIDSGIVER%?",
            'sykepengesoknad.aktiviteter.ugradert.intro': "I perioden %FOM% - %TOM% skulle du ikke jobbe hos %ARBEIDSGIVER%.",
            'sykepengesoknad.aktiviteter.gradert.intro': "I perioden %FOM% - %TOM% skulle du jobbe %ARBEIDSGRAD% % av din normale arbeidstid hos %ARBEIDSGIVER%.",
            'sykepengesoknad.aktiviteter.ugradert.sporsmal': "Har du jobbet?",
        };
    });

    describe("Aktiviteter", () => {

        beforeEach(() => {
            component = shallow(<Aktiviteter
                fields={aktiviteter}
                arbeidsgiver="MORTENS GRØNNSAKER"
                ledetekster={ledetekster}
                autofill={autofill}
                untouch={untouch} />)
        });

        it("Skal rendre en Aktivitet per field", () => {
            expect(component.find(Aktivitet)).to.have.length(2);
        });

        it("Skal sende riktige props videre til Aktivitet", () => {
            expect(component.contains(<Aktivitet
                field={aktiviteter[0]}
                index={0}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)).to.be.true;

            expect(component.contains(<Aktivitet
                field={aktiviteter[1]}
                index={1}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)).to.be.true;
        });

    });

    describe("Aktivitet for gradert sykmelding", () => {

        let ja;

        beforeEach(() => {
            component = shallow(<Aktivitet
                field={aktiviteter[1]}
                index={1}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)
            ja = component.find(JaEllerNei);
        });

        it("Skal inneholde en JaEllerNei", () => {
            expect(ja).to.have.length(1);
            expect(ja.prop("name")).to.equal("aktiviteter[1].jobbetMerEnnPlanlagt");
            expect(ja.prop("intro")).to.equal("I perioden 01.01.2017 - 25.01.2017 skulle du jobbe 65 % av din normale arbeidstid hos MORTENS GRØNNSAKER.")
            expect(ja.prop("spoersmal")).to.equal("Har du jobbet mer enn dette?");
            expect(ja).to.contain("Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos MORTENS GRØNNSAKER?")
        });

        it("Skal inneholde Fields", () => {
            const fields = ja.find(Fields);
            expect(fields).to.have.length(1)
            expect(fields.prop("autofill")).to.deep.equal(autofill);
            expect(fields.prop("untouch")).to.deep.equal(untouch);
            expect(fields.prop("component")).to.deep.equal(AngiTid);
            expect(fields.prop("aktivitetIndex")).to.equal(1);
            expect(fields.prop("names")).to.deep.equal([`aktiviteter[1].avvik.arbeidsgrad`, `aktiviteter[1].avvik.timer`, `aktiviteter[1].avvik.arbeidstimerNormalUke`, `aktiviteter[1].avvik.enhet`])
        })

    });

    describe("Aktivitet for ugradert sykmelding", () => {

        let ja;

        beforeEach(() => {
            component = shallow(<Aktivitet
                field={aktiviteter[0]}
                index={0}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)
            ja = component.find(JaEllerNei);
        });

        it("Skal inneholde en JaEllerNei", () => {
            expect(ja).to.have.length(1);
            expect(ja.prop("name")).to.equal("aktiviteter[0].jobbetMerEnnPlanlagt");
            expect(ja.prop("intro")).to.equal("I perioden 01.01.2017 - 15.01.2017 skulle du ikke jobbe hos MORTENS GRØNNSAKER.")
            expect(ja.prop("spoersmal")).to.equal("Har du jobbet?");
            expect(ja).to.contain("Hvor mye har du jobbet i gjennomsnitt per uke i denne perioden hos MORTENS GRØNNSAKER?")
        });

        it("Skal inneholde Fields", () => {
            const fields = ja.find(Fields);
            expect(fields).to.have.length(1)
            expect(fields.prop("autofill")).to.deep.equal(autofill);
            expect(fields.prop("untouch")).to.deep.equal(untouch);
            expect(fields.prop("component")).to.deep.equal(AngiTid);
            expect(fields.prop("aktivitetIndex")).to.equal(0);
            expect(fields.prop("names")).to.deep.equal([`aktiviteter[0].avvik.arbeidsgrad`, `aktiviteter[0].avvik.timer`, `aktiviteter[0].avvik.arbeidstimerNormalUke`, `aktiviteter[0].avvik.enhet`])
        })

    });


});
