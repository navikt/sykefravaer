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
    let sjekkTilgang;
    let hentOppfolgingsdialoger;
    let hentDineSykmeldinger;
    let hentLedere;
    describe('OppfolgingsdialogerSide', () => {
        const tilgang = {
            harTilgang: true,
        };
        const ikkeTilgang = {
            harTilgang: false,
        };

        beforeEach(() => {
            sjekkTilgang = sinon.spy();
            hentOppfolgingsdialoger = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentLedere = sinon.spy();
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<OppfolgingsdialogerSide
                oppfolgingsdialoger={[]}
                henter
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise spinner dersom leder avkreftes', () => {
            const component = shallow(<OppfolgingsdialogerSide
                oppfolgingsdialoger={[]}
                avkrefterLeder
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom henting feilet', () => {
            const component = shallow(<OppfolgingsdialogerSide
                oppfolgingsdialoger={[]}
                hentingFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise feilmelding dersom avkrefterLederFeilet', () => {
            const component = shallow(<OppfolgingsdialogerSide
                oppfolgingsdialoger={[]}
                avkrefterLederFeilet
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise OppfolgingsdialogInfoboks dersom sykmeldt ikke har tilgang', () => {
            const component = shallow(<OppfolgingsdialogerSide
                oppfolgingsdialoger={[]}
                tilgang={ikkeTilgang}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise Oppfolgingsdialoger dersom henting er OK', () => {
            const component = shallow(<OppfolgingsdialogerSide
                oppfolgingsdialoger={[]}
                tilgang={tilgang}
                hentOppfolgingsdialoger={hentOppfolgingsdialoger}
                hentDineSykmeldinger={hentDineSykmeldinger}
                hentLedere={hentLedere}
                sjekkTilgang={sjekkTilgang}
            />);
            expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
        });
    });
});
