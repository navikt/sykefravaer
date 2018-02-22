import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import { OppfolgingsdialogerSide } from '../../../js/containers/oppfolgingsdialoger/OppfolgingsdialogerContainer';
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Oppfolgingsdialoger from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogerContainer', () => {
    let dinesykmeldinger;
    let tilgang;
    let naermesteLedere;
    let oppfolgingsdialogerReducer;
    let sjekkTilgang;
    let hentOppfolgingsdialoger;
    let hentDineSykmeldinger;
    let hentLedere;
    describe('OppfolgingsdialogerSide', () => {
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
            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentLedere = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<OppfolgingsdialogerSide
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                henter
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom data sendes', () => {
            const component = shallow(<OppfolgingsdialogerSide
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                sender
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom henting Feilet', () => {
            const component = shallow(<OppfolgingsdialogerSide
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                hentingFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom sending feilet', () => {
            const component = shallow(<OppfolgingsdialogerSide
                dinesykmeldinger={dinesykmeldinger}
                tilgang={tilgang}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                sendingFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
            const component = shallow(<OppfolgingsdialogerSide
                dinesykmeldinger={dinesykmeldinger}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                tilgang={{ data: ikkeTilgang }}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialoger dersom henting er OK', () => {
            const component = shallow(<OppfolgingsdialogerSide
                dinesykmeldinger={dinesykmeldinger}
                naermesteLedere={naermesteLedere}
                oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
                oppfolgingsdialoger={[]}
                tilgang={{ data: harTilgang }}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });
});
