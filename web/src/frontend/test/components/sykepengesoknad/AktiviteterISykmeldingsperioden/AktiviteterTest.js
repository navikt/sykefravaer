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
import { setLedetekster } from 'digisyfo-npm';

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
            "fom": new Date("2017-01-01"),
            "tom": new Date("2017-01-15")
          },
          "grad": 100,
          "avvik": null
        }, {
          "periode": {
            "fom": new Date("2017-01-16"),
            "tom": new Date("2017-01-25")
          },
          "grad": 35,
          "avvik": null
        }]

        ledetekster = {
            'sykepengesoknad.aktiviteter.gradert.spoersmal-2': 'I perioden %FOM%–%TOM% skulle du ifølge sykmeldingen jobbe %ARBEIDSGRAD% % av din normale arbeidstid hos %ARBEIDSGIVER%. Jobbet du mer enn dette?',
            'sykepengesoknad.aktiviteter.ugradert.spoersmal-2': 'I perioden %FOM%–%TOM% var du 100 % sykmeldt fra %ARBEIDSGIVER%. Jobbet du noe i denne perioden?',
            'sykepengesoknad.aktiviteter.avvik.hvor-mye-har-du-jobbet': "Hvor hvor mye jobbet du totalt i denne perioden hos %ARBEIDSGIVER%?",
        };

        setLedetekster(ledetekster);
    });

    describe("Aktiviteter", () => {

        let dato;

        beforeEach(() => {
            dato = new Date();
            component = shallow(<Aktiviteter
                fields={aktiviteter}
                arbeidsgiver="MORTENS GRØNNSAKER"
                gjenopptattArbeidFulltUtDato={dato}
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
                untouch={untouch} />)).to.be.true;

            expect(component.contains(<Aktivitet
                field={aktiviteter[1]}
                index={1}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch} />)).to.be.true;
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
                untouch={untouch} />)
            ja = component.find(JaEllerNei);
        });

        it("Skal inneholde en JaEllerNei", () => {
            expect(ja).to.have.length(1);
            expect(ja.prop("name")).to.equal("aktiviteter[1].jobbetMerEnnPlanlagt");
            expect(ja.prop("spoersmal")).to.equal("I perioden 16.01.2017–25.01.2017 skulle du ifølge sykmeldingen jobbe 65 % av din normale arbeidstid hos MORTENS GRØNNSAKER. Jobbet du mer enn dette?");
        });

        it("Skal inneholde en Hjelpetekst", () => {
            expect(ja.prop("hjelpetekst")).to.be.defined;
        });

        it("Skal inneholde Fields", () => {
            const fields = ja.find(Fields);
            expect(fields).to.have.length(1)
            expect(fields.prop("autofill")).to.deep.equal(autofill);
            expect(fields.prop("untouch")).to.deep.equal(untouch);
            expect(fields.prop("component")).to.deep.equal(AngiTid);
            expect(fields.prop("aktivitetIndex")).to.equal(1);
            expect(fields.prop("names")).to.deep.equal(['aktiviteter[1].avvik.arbeidsgrad', 'aktiviteter[1].avvik.timer', 'aktiviteter[1].avvik.arbeidstimerNormalUke', 'aktiviteter[1].avvik.enhet', 'aktiviteter[1].avvik.beregnetArbeidsgrad'])
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
                untouch={untouch} />)
            ja = component.find(JaEllerNei);
        });

        it("Skal inneholde en JaEllerNei", () => {
            expect(ja).to.have.length(1);
            expect(ja.prop("name")).to.equal("aktiviteter[0].jobbetMerEnnPlanlagt");
            expect(ja.prop("spoersmal")).to.equal("I perioden 01.01.2017–15.01.2017 var du 100 % sykmeldt fra MORTENS GRØNNSAKER. Jobbet du noe i denne perioden?");
        });

        it("Skal ikke inneholde en Hjelpetekst", () => {
            expect(ja.prop("hjelpetekst")).to.be.null;
        });

        it("Skal inneholde Fields", () => {
            const fields = ja.find(Fields);
            expect(fields).to.have.length(1)
            expect(fields.prop("autofill")).to.deep.equal(autofill);
            expect(fields.prop("untouch")).to.deep.equal(untouch);
            expect(fields.prop("component")).to.deep.equal(AngiTid);
            expect(fields.prop("aktivitetIndex")).to.equal(0);
            expect(fields.prop("names")).to.deep.equal(['aktiviteter[0].avvik.arbeidsgrad', 'aktiviteter[0].avvik.timer', 'aktiviteter[0].avvik.arbeidstimerNormalUke', 'aktiviteter[0].avvik.enhet', 'aktiviteter[0].avvik.beregnetArbeidsgrad'])
        })

    });


    xdescribe("Aktivitet med gjenopptattArbeidFulltUtDato", () => {

        let ja;
        let dato;

        it("Skal sende datoen videre til ledetekst hvis datoen er innenfor perioden", () => {
            dato = new Date("2017-01-10");
            component = shallow(<Aktivitet
                field={aktiviteter[0]}
                gjenopptattArbeidFulltUtDato={dato}
                index={0}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)
            ja = component.find(JaEllerNei);
            expect(ja.prop("intro")).to.equal("I perioden 01.01.2017 - 09.01.2017 skulle du ikke jobbe hos MORTENS GRØNNSAKER.")
        });

        it("Skal vise riktig ledetekst hvis datoen er innenfor perioden", () => {
            dato = new Date("2017-01-15");
            component = shallow(<Aktivitet
                field={aktiviteter[0]}
                gjenopptattArbeidFulltUtDato={dato}
                index={0}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)
            ja = component.find(JaEllerNei);
            expect(ja.prop("intro")).to.equal("I perioden 01.01.2017 - 14.01.2017 skulle du ikke jobbe hos MORTENS GRØNNSAKER.")
        });

        it("Skal ikke sende datoen videre til ledetekst hvis datoen er utenfor perioden", () => {
            dato = new Date("2017-01-18");
            component = shallow(<Aktivitet
                field={aktiviteter[0]}
                gjenopptattArbeidFulltUtDato={dato}
                index={0}
                arbeidsgiver="MORTENS GRØNNSAKER"
                autofill={autofill}
                untouch={untouch}
                ledetekster={ledetekster} />)
            ja = component.find(JaEllerNei);
            expect(ja.prop("intro")).to.equal("I perioden 01.01.2017 - 15.01.2017 skulle du ikke jobbe hos MORTENS GRØNNSAKER.")
        });

    });


});
