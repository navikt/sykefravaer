import chai from 'chai';
import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    ArbeidsgiverSkjema,
    VelgArbeidsgiverUndertekst,
} from '../../../js/components/oppfolgingsdialoger/ArbeidsgiverSkjema';
import { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsgiverSkjema', () => {

    let komponent;
    let oppfolgingsdialoger;
    let arbeidsgivere;
    let handleSubmit;

    beforeEach(() => {
        oppfolgingsdialoger = getOppfolgingsdialoger;
        handleSubmit = sinon.spy();
        arbeidsgivere = [
            {
                virksomhetsnummer: '123456781',
                navn: 'Arbeidsgiver 1',
                harNaermesteLeder: true,
            },
            {
                virksomhetsnummer: '123456789',
                navn: 'Arbeidsgiver 2',
                harNaermesteLeder: true,
            },
            {
                virksomhetsnummer: '123456782',
                navn: 'Arbeidsgiver 3',
                harNaermesteLeder: false,
            },
            {
                virksomhetsnummer: '123456782',
                navn: 'Arbeidsgiver 3',
                harNaermesteLeder: true,
                naermesteLeder: {
                    navn: 'Test Testesen',
                },
            },
        ];
        komponent = shallow(<ArbeidsgiverSkjema
            arbeidsgivere={[]}
            oppfolgingsdialoger={[]}
            handleSubmit={handleSubmit}
            avbrytHref=""
        />);
    });

    it('Skal vise rett submit knapp', () => {
        expect(komponent.find('button.knapp')).to.have.length(1);
    });

    it('Skal vise rett avbryt lenke', () => {
        expect(komponent.find(Link)).to.have.length(1);
    });

    it('Skal vise 2 radioknapper med 2 arbeidsgivere uten opprettet plan', () => {
        komponent = shallow(<ArbeidsgiverSkjema
            arbeidsgivere={arbeidsgivere}
            oppfolgingsdialoger={oppfolgingsdialoger}
            handleSubmit={handleSubmit}
            avbrytHref=""
        />);
        expect(komponent.find(Field)).to.have.length(1);
    });

    describe('VelgArbeidsgiverUndertekst', () => {

        it('Skal vise ikke vise en feilmelding', () => {
            komponent = shallow(<VelgArbeidsgiverUndertekst
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgiver={arbeidsgivere[0]}
            />);
            expect(komponent.find('div.velgArbeidsgiverUndertekst')).to.have.length(0);
        });

        it('Skal vise en feilmelding, om det allerede er opprettet en plan med arbeidsgiver', () => {
            const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                godkjentPlan: null,
            })];
            komponent = shallow(<VelgArbeidsgiverUndertekst
                oppfolgingsdialoger={oppfolgingsdialogListe}
                arbeidsgiver={arbeidsgivere[1]}
            />);
            expect(komponent.find('div.velgArbeidsgiverUndertekst__lenke')).to.have.length(1);
            expect(komponent.find(Link)).to.have.length(1);
        });

        it('Skal vise en feilmelding, om naermeste leder ikke er innmeldt', () => {
            komponent = shallow(<VelgArbeidsgiverUndertekst
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgiver={arbeidsgivere[2]}
            />);
            expect(komponent.find('div.velgArbeidsgiverUndertekst')).to.have.length(1);
            expect(komponent.find('img.velgArbeidsgiverUndertekst__ikon')).to.have.length(1);
            expect(komponent.find('span.velgArbeidsgiverUndertekst__tekst')).to.have.length(1);
        });

        it('Skal vise en melding med naermesteLeders navn, om naermeste leder er innmeldt', () => {
            komponent = shallow(<VelgArbeidsgiverUndertekst
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgiver={arbeidsgivere[3]}
            />);
            expect(komponent.find('div.velgArbeidsgiverUndertekst')).to.have.length(1);
            expect(komponent.find('img.velgArbeidsgiverUndertekst__ikon')).to.have.length(0);
            expect(komponent.find('span.velgArbeidsgiverUndertekst__tekst')).to.have.length(1);
        });
    });
});
