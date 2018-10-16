import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { Container } from '../../js/sider/OppfolgingsdialogerSide';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Oppfolgingsdialoger from '../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Container', () => {
    let dinesykmeldinger;
    let tilgang;
    let naermesteLedere;
    let oppfolgingsdialogerReducer;
    let toggles;
    let sjekkTilgang;
    let hentOppfolgingsdialoger;
    let hentDineSykmeldinger;
    let hentLedere;
    let hentToggles;

    describe('Container', () => {
        const harTilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };

        beforeEach(() => {
            dinesykmeldinger = {};
            tilgang = {};
            naermesteLedere = {};
            oppfolgingsdialogerReducer = {};
            toggles = {
                data: {},
                henter: false,
                hentet: false,
            };
            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentLedere = sinon.spy();
            hentToggles = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<Container
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                toggles={toggles}
                henter
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom data sendes', () => {
            const component = shallow(<Container
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                toggles={toggles}
                sender
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom henting Feilet', () => {
            const component = shallow(<Container
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                toggles={toggles}
                hentingFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sending feilet', () => {
            const component = shallow(<Container
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                toggles={toggles}
                sendingFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
            const component = shallow(<Container
                dinesykmeldinger={dinesykmeldinger}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialoger dersom henting er OK', () => {
            const component = shallow(<Container
                dinesykmeldinger={dinesykmeldinger}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentToggles={hentToggles}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });
});
