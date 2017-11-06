import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    ReleasetPlan,
} from 'oppfolgingsdialog-npm';
import ReleasetPlanAT from '../../../js/components/oppfolgingsdialoger/releasetplan/ReleasetPlanAT';
import ArbeidsgiverHarTvangsgodkjent from '../../../js/components/oppfolgingsdialoger/releasetplan/ArbeidsgiverHarTvangsgodkjent';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ReleasetPlanAT', () => {
    let component;
    let hentPdfurler;
    let giSamtykke;
    let avbrytDialog;
    let delMedNavFunc;

    beforeEach(() => {
        hentPdfurler = sinon.spy();
        giSamtykke = sinon.spy();
        avbrytDialog = sinon.spy();
        delMedNavFunc = sinon.spy();
    });

    describe('Ikke tvangsgodkjent', () => {
        const oppfolgingsdialog = getOppfolgingsdialog();
        beforeEach(() => {
            component = shallow(<ReleasetPlanAT
                hentPdfurler={hentPdfurler}
                giSamtykke={giSamtykke}
                avbrytDialog={avbrytDialog}
                delmednav={delMedNavFunc}
                oppfolgingsdialog={oppfolgingsdialog}
            />);
        });

        it('Skal vise ReleasetPlanAT', () => {
            expect(component.find(ReleasetPlan)).to.have.length(1);
        });
    });

    describe('Tvangsgodkjent', () => {
        const oppfolgingsdialogTvangsgodkjent = Object.assign({}, getOppfolgingsdialog(), {
            godkjentPlan: {
                tvungenGodkjenning: true,
                opprettetTidspunkt: '2017-01-02T00:00:00.000',
            },
            arbeidstaker: {
                navn: 'Arbeidstaker',
                fnr: '1234567891234',
                sistInnlogget: '2017-01-01T00:00:00.000',
            },
        });
        beforeEach(() => {
            component = shallow(<ReleasetPlanAT
                hentPdfurler={hentPdfurler}
                giSamtykke={giSamtykke}
                avbrytDialog={avbrytDialog}
                delmednav={delMedNavFunc}
                oppfolgingsdialog={oppfolgingsdialogTvangsgodkjent}
            />);
        });

        it('Skal vise ArbeidsgiverHarTvangsgodkjent, om arbeidsgiver har tvangsgodkjent og arbeidstaker ikke har sett dette', () => {
            component.setState({
                settTvungenGodkjenning: false,
            });
            expect(component.find(ArbeidsgiverHarTvangsgodkjent)).to.have.length(1);
        });

        it('Skal ikke vise ArbeidsgiverHarTvangsgodkjent, om arbeidsgiver har tvangsgodkjent og arbeidstaker ikke har sett dette', () => {
            component.setState({
                settTvungenGodkjenning: true,
            });
            expect(component.find(ArbeidsgiverHarTvangsgodkjent)).to.have.length(0);
        });
    });
});
