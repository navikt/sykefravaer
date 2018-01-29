import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ledetekster from '../../mockLedetekster';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Landingsside from '../../../js/components/landingsside/Landingsside';
import LandingssideLenke from '../../../js/components/landingsside/LandingssideLenke';
import { getSoknad } from '../../mockSoknader';
import { setLedetekster } from 'digisyfo-npm';
import getSykmelding from '../../mockSykmeldinger';

const MILLISEKUNDER_PER_DAG = 86400000;

export const datoMedKlokkeslett = (dato) => {
    if (dato === undefined || dato === null) {
        return '';
    }

    const days = parseInt(dato.substring(8, 10), 10) < 10 ? dato.substring(9, 10) : dato.substring(8, 10);
    const months = parseInt(dato.substring(5, 7), 10) < 10 ? dato.substring(6, 7) : dato.substring(5, 7);
    const time = dato.substring(11, 16);

    /* 16/2 klokken 14:15 */
    return `${days}/${months} klokken ${time}`;
};

export const trekkDagerFraDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() - (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const trekkMnderFraDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() - mnder);
    return new Date(nyDato);
};

export const trekkMnderOgDagerFraDato = (dato, mnder, dager) => {
    let nyDato = new Date(dato);
    nyDato = trekkMnderFraDato(nyDato, mnder);
    nyDato = trekkDagerFraDato(nyDato, dager);
    return new Date(nyDato);
};

describe('Landingsside', () => {
    const today = new Date();
    let clock;
    today.setHours(0, 0, 0, 0);
    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
        clock = sinon.useFakeTimers(today.getTime());
    });

    afterEach(() => {
        clock.restore();
    });
    const sykmeldingAktiv = getSykmelding({
        sendtdato: new Date(),
        mulighetForArbeid: {
            perioder: [
                {
                    fom: trekkDagerFraDato(today, 35).toISOString(),
                    tom: trekkDagerFraDato(today, 5).toISOString(),
                },
                {
                    fom: trekkDagerFraDato(today, 5).toISOString(),
                    tom: leggTilDagerPaaDato(today, 35).toISOString(),
                },
            ],
        },
    });

    it('Skal vise overskrift for "Ditt sykefravær"', () => {
        component = shallow(<Landingsside skjulVarsel={false} />);
        expect(component.find('.js-sidetittel').text()).to.equal('Ditt sykefravær');
    });

    it('Skal vise 1 lenkeboks om vi ikke har dialogmoter, soknader eller sykmeldinger', () => {
        component = shallow(<Landingsside skjulVarsel />);
        expect(component.find(LandingssideLenke)).to.have.length(1);
    });

    it('Skal vise lenkeboks til dialogmoter om vi har et dialogmote', () => {
        component = shallow(<Landingsside skjulVarsel harDialogmote />);
        expect(component.find(LandingssideLenke)).to.have.length(2);
    });

    it('Skal ikke vise lenkeboks til oppfølgingsdialog om det eksisterer 1 sykmelding uten orgnummer', () => {
        const dineSykemeldinger = [Object.assign({}, sykmeldingAktiv, {
            orgnummer: null,
        })];
        component = shallow(<Landingsside skjulVarsel harDialogmote={false} dineSykmeldinger={dineSykemeldinger} />);
        expect(component.find(LandingssideLenke)).to.have.length(2);
    });

    it('Skal ikke vise lenkeboks til oppfølgingsdialog om det eksisterer 1 sykmelding med orgnummer og sendtdato', () => {
        const dineSykemeldinger = [sykmeldingAktiv];
        component = shallow(<Landingsside skjulVarsel harDialogmote={false} dineSykmeldinger={dineSykemeldinger} />);
        expect(component.find(LandingssideLenke)).to.have.length(3);
    });

    it('Skal vise lenkeboks til soknader om vi har en soknad', () => {
        component = shallow(<Landingsside skjulVarsel sykepengesoknader={[getSoknad()]} />);
        expect(component.find(LandingssideLenke)).to.have.length(2);
    });
});
