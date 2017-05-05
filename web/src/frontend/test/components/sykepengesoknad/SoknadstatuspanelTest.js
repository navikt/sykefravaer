import Statuspanel from '../../../js/components/sykepengesoknad/Soknadstatuspanel';
import * as statuser from '../../../js/enums/sykepengesoknadstatuser';
import { Hjelpetekst, setLedetekster, Varselstripe } from 'digisyfo-npm';
import chai from 'chai';
import React from 'react';
import {mount, render, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { getSoknad } from '../../mockSoknader';
chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Sykepengesoknad - Statuspanel", () => {

    beforeEach(() => {
        setLedetekster({
            'sykepengesoknad.oppsummering.status.label': "Status",
            'sykepengesoknad.oppsummering.dato.label': "Dato",
            'sykepengesoknad.oppsummering.arbeidsgiver.label': "Arbeidsgiver",
            'sykepengesoknad.oppsummering.organisasjonsnummer.label': "Organisasjonsnummer",
            'sykepengesoknad.status.SENDT': "Sendt til arbeidsgiver",
            'sykepengesoknad.status.TIL_SENDING': "Sender...",
            'sykepengesoknad.status.SENDT.til-arbeidsgiver': "Sendt til arbeidsgiver",
            'sykepengesoknad.status.SENDT.til-nav': "Sendt til NAV",
            'sykepengesoknad.status.SENDT.til-arbeidsgiver-og-nav': "Sendt til NAV og arbeidsgiver",
        });
    });

    it("Skal inneholde en Varselstripe", () => {
        const component = mount(<Statuspanel sykepengesoknad={getSoknad({
            status: statuser.TIL_SENDING,
        })} />)
        expect(component.find(Varselstripe)).to.have.length(1);
    });

    it("Skal inneholde en Varselstripe", () => {
        const component = mount(<Statuspanel sykepengesoknad={getSoknad({
            status: statuser.TIL_SENDING,
        })} />)
        expect(component.find(Varselstripe)).to.have.length(1);
    });

    describe("Når søknaden bare har innsendtDato", () => {
        
        let component;
        let sykepengesoknad;

        beforeEach(() => {
            sykepengesoknad = getSoknad({
                status: statuser.TIL_SENDING,
                innsendtDato: new Date("1945-05-08"),
            });
            component = mount(<Statuspanel sykepengesoknad={sykepengesoknad} />)
        });

        it("Skal vise Sender...", () => {
            expect(component.text()).to.contain("Sender...");
        });

        it("SKal inneholde Hjelpetekst", () => {
            expect(component.find(Hjelpetekst)).to.have.length(1);
        })

        it("Skal vise navn + orgnummer på arbeidsgiver", () => {
            expect(component.text()).to.contain("BYGGMESTER BLOM AS (***REMOVED***)");
        });

        it("Skal vise dato", () => {
            expect(component.text()).to.contain("Dato");
            expect(component.text()).to.contain("08.05.1945");
        });
        
    });

    describe("Når søknaden sendes til arbeidsgiver", () => {
        
        let component;
        let sykepengesoknad;

        beforeEach(() => {
            sykepengesoknad = getSoknad({
                status: statuser.TIL_SENDING,
                sendtTilArbeidsgiverDato: new Date("2017-05-17"),
            });
            component = mount(<Statuspanel sykepengesoknad={sykepengesoknad} />)
        });

        it("Skal vise Sender...", () => {
            expect(component.text()).to.contain("Sender...");
        });

        it("Skal inneholde Hjelpetekst", () => {
            expect(component.find(Hjelpetekst)).to.have.length(1);
        })

        it("Skal vise navn + orgnummer på arbeidsgiver", () => {
            expect(component.text()).to.contain("BYGGMESTER BLOM AS (***REMOVED***)");
        });

        it("Skal vise dato", () => {
            expect(component.text()).to.contain("Dato");
            expect(component.text()).to.contain("17.05.2017");
        });
        
    });

    describe("Når søknaden er sendt til NAV og arbeidsgiver", () => {
        
        let component;
        let sykepengesoknad;

        beforeEach(() => {
            sykepengesoknad = getSoknad({
                status: statuser.SENDT,
                sendtTilArbeidsgiverDato: new Date("2017-05-17"),
                sendtTilNAVDato: new Date("2017-05-17"),
            });
            component = mount(<Statuspanel sykepengesoknad={sykepengesoknad} />)
        });

        it("Skal vise riktig status", () => {
            expect(component.text()).to.contain("Sendt til NAV og arbeidsgiver");
        });

        it("Skal ikke inneholde Hjelpetekst", () => {
            expect(component.find(Hjelpetekst)).to.have.length(0);
        })

        it("Skal vise navn + orgnummer på arbeidsgiver", () => {
            expect(component.text()).to.contain("BYGGMESTER BLOM AS (***REMOVED***)");
        });

        it("Skal vise dato", () => {
            expect(component.text()).to.contain("Dato");
            expect(component.text()).to.contain("17.05.2017");
        });
        
    });

});