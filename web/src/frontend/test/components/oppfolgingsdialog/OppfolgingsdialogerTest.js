import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import Sidetopp from "../../../js/components/Sidetopp";
import Oppfolgingsdialoger, { OppfolgingsdialogNyDialog } from "../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger";
import { OppfolgingsdialogTeasere, OppfolgingsdialogerIngenplan } from "oppfolgingsdialog-npm";
import IngenledereInfoboks from '../../../js/components/oppfolgingsdialoger/IngenledereInfoboks';
import { setLedetekster } from 'digisyfo-npm';
import { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';
import getSykmelding from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialoger = getOppfolgingsdialoger;

describe("Oppfolgingsdialoger", () => {

    let component;
    let sykmeldinger;
    let arbeidsgivere;

    beforeEach(() => {
        setLedetekster(ledetekster);
        sykmeldinger = [];
        arbeidsgivere = [];
    });

    it("Skal vise overskrift for Oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(Sidetopp).prop("tittel")).to.equal("Oppfølgingsdialoger");
    });

    it("Skal vise tekst for Oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find('p.oppfolgingsdialoger__tekst')).to.have.length(1);
    });

    it("Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger
            oppfolgingsdialoger={[]}
            sykmeldinger={sykmeldinger}
            arbeidsgiver={arbeidsgivere}
        />);
        expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
    });

    it("Skal vise én OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
    });

    it("Skal vise OppfolgingsdialogNyDialog, dersom man har oppfolgingsdialoger'", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(OppfolgingsdialogNyDialog)).to.have.length(0);
    });

    it("Skal vise OppfolgingsdialogerIngenplan, dersom det ikke er opprettet en oppfolgingsdialog, men man har en naermeste leder hos virksomhet", () => {
        const sykmeldingListe = [getSykmelding({
            mulighetForArbeid: {
                perioder: [{
                    tom: new Date(),
                }],
            },
        })];
        component = shallow(<Oppfolgingsdialoger
            oppfolgingsdialoger={[]}
            sykmeldinger={sykmeldingListe}
            naermesteLedere={[{ orgnummer: sykmeldingListe[0].orgnummer }]}
        />);
        expect(component.find(OppfolgingsdialogerIngenplan)).to.have.length(1);
    });

    it("Skal vise IngenledereInfoboks, dersom det ikke er oppfolgingsdialoger og man ikke har noen naermesteLeder hos noen virksomhet'", () => {
        component = shallow(<Oppfolgingsdialoger
            oppfolgingsdialoger={[]}
            sykmeldinger={sykmeldinger}
            arbeidsgiver={arbeidsgivere}
        />);
        expect(component.find(IngenledereInfoboks)).to.have.length(1);
    });

    describe('OppfolgingsdialogNyDialog', () => {

        it('Skal vise tekster', () => {
            component = shallow(<OppfolgingsdialogNyDialog />);
            expect(component.find('h3')).to.have.length(1);
            expect(component.find('p')).to.have.length(1);
        });

        it('Skal vise knapp for å opprette oppfolgingsdialog', () => {
            component = shallow(<OppfolgingsdialogNyDialog />);
            expect(component.find('.knapp')).to.have.length(1);
        });
    });

});