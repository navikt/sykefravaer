import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { OppfolgingsdialogSide } from '../../../js/containers/oppfolgingsdialog/OppfolgingsdialogContainer';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Oppfolgingsdialog from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogContainer', () => {

    let sjekkTilgang;
    let hentOppfolgingsdialoger;
    let settDialog;
    let hentArbeidsforhold;
    let hentToggles;
    let toggles;
    let tilgangReducer;
    let oppfolgingsdialogerReducer;
    let navigasjontoggles;

    describe('OppfolgingsdialogSide', () => {
        const tilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };
        toggles = {
            henter: false,
            hentet: false,
        };
        navigasjontoggles = {
            steg: 1,
        };
        tilgangReducer = {};
        oppfolgingsdialogerReducer = {};

        beforeEach(() => {
            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            settDialog = sinon.spy();
            hentArbeidsforhold = sinon.spy();
            hentToggles = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgangReducer={tilgangReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                henter
                hentet={false}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom sender', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgangReducer={tilgangReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                sender
                hentet={false}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom hentingFeilet', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgangReducer={tilgangReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                hentet={false}
                hentingFeilet
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sendingFeilet', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgangReducer={tilgangReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                hentet={false}
                sendingFeilet
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgangReducer={tilgangReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                tilgang={ikkeTilgang}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialog dersom henting er OK', () => {
            const component = shallow(<OppfolgingsdialogSide
                tilgangReducer={tilgangReducer}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                tilgang={tilgang}
                toggles={toggles}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                sjekkTilgang={sjekkTilgang}
                settDialog={settDialog}
                hentArbeidsforhold={hentArbeidsforhold}
                hentToggles={hentToggles}
                navigasjontoggles={navigasjontoggles}
            />);
            expect(component.find(Oppfolgingsdialog)).to.have.length(1);
        });
    });
});
