import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Sidetopp from '../../../js/components/Sidetopp';
import { OpprettOppfolgingsdialogSide } from '../../../js/containers/oppfolgingsdialog/OpprettOppfolgingsdialogContainer';
import OpprettOppfolgingsdialog from '../../../js/components/oppfolgingsdialoger/OpprettOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OpprettOppfolgingsdialogContainer', () => {
    let sjekkTilgang;
    let hentDineSykmeldinger;
    let hentLedere;
    let hentOppfolgingsdialoger;
    let component;
    let sykmeldingerReducer;
    let tilgangReducer;
    let ledereReducer;
    let oppfolgingsdialogerReducer;
    const ikkeTilgang = {
        harTilgang: false,
    };
    const tilgang = {
        harTilgang: true,
    };

    beforeEach(() => {
        sykmeldingerReducer = {};
        tilgangReducer = {};
        ledereReducer = {};
        oppfolgingsdialogerReducer = {};
        sjekkTilgang = sinon.spy();
        hentDineSykmeldinger = sinon.spy();
        hentLedere = sinon.spy();
        hentOppfolgingsdialoger = sinon.spy();
    });

    it('Skal vise spinner dersom data hentes', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            henter
        />);
        expect(component.find(AppSpinner)).to.have.length(1);
    });

    it('Skal vise spinner dersom dialog opprettes', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            sender
        />);
        expect(component.find(AppSpinner)).to.have.length(1);
    });

    it('Skal vise feilmelding dersom hentingFeilet', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            hentingFeilet
        />);
        expect(component.find(Feilmelding)).to.have.length(1);
    });

    it('Skal vise feilmelding dersom opprettingFeilet', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            sendingFeilet
        />);
        expect(component.find(Feilmelding)).to.have.length(1);
    });

    it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            tilgang={ikkeTilgang}
        />);
        expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
    });

    it('Skal vise Sidetopp dersom henting er OK', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            tilgang={tilgang}
        />);
        expect(component.find(Sidetopp)).to.have.length(1);
    });

    it('Skal vise OpprettOppfolgingsdialog dersom henting er OK', () => {
        component = shallow(<OpprettOppfolgingsdialogSide
            sykmeldingerReducer={sykmeldingerReducer}
            tilgangReducer={tilgangReducer}
            ledereReducer={ledereReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            hentDineSykmeldinger={hentDineSykmeldinger}
            hentLedere={hentLedere}
            hentOppfolgingsdialoger={hentOppfolgingsdialoger}
            sjekkTilgang={sjekkTilgang}
            tilgang={tilgang}
        />);
        expect(component.find(OpprettOppfolgingsdialog)).to.have.length(1);
    });
});
