import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogInnholdboks,
} from 'oppfolgingsdialog-npm';
import ArbeidsgiverHarTvangsgodkjent from '../../../js/components/oppfolgingsdialoger/releasetplan/ArbeidsgiverHarTvangsgodkjent';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsgiverHarTvangsgodkjent', () => {
    let component;
    let hentPdfurler;
    let dokument;
    const oppfolgingsdialog = getOppfolgingsdialog();

    beforeEach(() => {
        hentPdfurler = sinon.spy();
    });

    it('Skal alltid vise OppfolgingsdialogInnholdboks', () => {
        dokument = { hentet: false };
        component = shallow(<ArbeidsgiverHarTvangsgodkjent
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            oppfolgingsdialog={oppfolgingsdialog}
        />);
        expect(component.find(OppfolgingsdialogInnholdboks)).to.have.length(1);
    });

    it('Skal vise en spinner om dokument henter', () => {
        dokument = { henter: true };
        component = shallow(<ArbeidsgiverHarTvangsgodkjent
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            oppfolgingsdialog={oppfolgingsdialog}
        />);
        expect(component.find('div.app-spinner')).to.have.length(1);
    });

    it('Skal vise en spinner om dokument henter', () => {
        dokument = { data: ['url1', 'url2'] };
        component = shallow(<ArbeidsgiverHarTvangsgodkjent
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            oppfolgingsdialog={oppfolgingsdialog}
        />);
        expect(component.find('div.godkjentPlanPdf__dokument')).to.have.length(2);
    });

    it('Skal vise en spinner om dokument hentingFeilet', () => {
        dokument = { hentingFeilet: true };
        component = shallow(<ArbeidsgiverHarTvangsgodkjent
            hentPdfurler={hentPdfurler}
            dokument={dokument}
            oppfolgingsdialog={oppfolgingsdialog}
        />);
        expect(component.find('div.godkjentPlanPdf__feilmelding')).to.have.length(1);
    });
});
