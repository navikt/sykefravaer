import chai from 'chai';
import React from 'react'
import { Link } from 'react-router';
import { Field } from 'redux-form';
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Varselstripe } from 'digisyfo-npm';
import { ArbeidsgiverSkjema, VelgArbeidsgiverFeilmelding } from '../../../js/components/oppfolgingsdialoger/ArbeidsgiverSkjema';
import { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("ArbeidsoppgaverContainer", () => {

    let komponent;
    let oppfolgingsdialoger;
    let arbeidsgivere;
    let handleSubmit;

    oppfolgingsdialoger = getOppfolgingsdialoger;
    handleSubmit = sinon.spy();

    arbeidsgivere = [
        {
            virksomhetsnummer: "123456781",
            navn: "Arbeidsgiver 1",
            harNaermesteLeder: true,
        },
        {
            virksomhetsnummer: "123456789",
            navn: "Arbeidsgiver 2",
            harNaermesteLeder: true,
        },
        {
            virksomhetsnummer: "123456782",
            navn: "Arbeidsgiver 3",
            harNaermesteLeder: false,
        }
    ];

    komponent = shallow(<ArbeidsgiverSkjema
        arbeidsgivere={[]}
        oppfolgingsdialoger={[]}
        handleSubmit={handleSubmit}
        avbrytHref=""
    />);


    it('Skal vise rett submit knapp', () => {
        expect(komponent.find('button.knapp')).to.have.length(1);
    });

    it('Skal vise rett avbryt lenke', () => {
        expect(komponent.find(Link)).to.have.length(1);
    });

    it('Skal vise 2 radioknapper med 2 arbeidsgivere uten opprettet plan', () => {
        let komponent = shallow(<ArbeidsgiverSkjema
            arbeidsgivere={arbeidsgivere}
            oppfolgingsdialoger={oppfolgingsdialoger}
            handleSubmit={handleSubmit}
            avbrytHref=""
        />);
        expect(komponent.find(Field)).to.have.length(1);
    });

    it('Skal vise Varselstripe, om det eksisterer en arbeidsgiver uten innmeldt naermeste leder', () => {
        let komponent = shallow(<ArbeidsgiverSkjema
            arbeidsgivere={[{harNaermesteLeder: false}]}
            oppfolgingsdialoger={[]}
            handleSubmit={handleSubmit}
            avbrytHref=""
        />);
        expect(komponent.find(Varselstripe)).to.have.length(1);
    });


    describe('VelgArbeidsgiverFeilmelding', () => {

        it('Skal vise ikke vise en feilmelding', () => {
            let komponent = shallow(<VelgArbeidsgiverFeilmelding
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgiver={arbeidsgivere[0]}
            />);
            expect(komponent.find('div.velgArbeidsgiverFeilmelding')).to.have.length(0);
        });

        it('Skal vise en feilmelding, om det allerede er opprettet en plan med arbeidsgiver', () => {
            let komponent = shallow(<VelgArbeidsgiverFeilmelding
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgiver={arbeidsgivere[1]}
            />);
            expect(komponent.find('div.velgArbeidsgiverFeilmelding')).to.have.length(1);
        });

        it('Skal vise en feilmelding, om naermeste leder ikke er innmeldt', () => {
            let komponent = shallow(<VelgArbeidsgiverFeilmelding
                oppfolgingsdialoger={oppfolgingsdialoger}
                arbeidsgiver={arbeidsgivere[2]}
            />);
            expect(komponent.find('div.velgArbeidsgiverFeilmelding')).to.have.length(1);
        });

    });

});