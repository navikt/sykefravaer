import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import chaiEnzyme from 'chai-enzyme';
import { arbeidssituasjoner, setLedetekster } from '@navikt/digisyfo-npm';
import VelgArbeidssituasjon, { getAlternativer, RendreVelgArbeidssituasjon, Velg, visTillegg } from './VelgArbeidssituasjon';
import SporsmalMedTillegg from '../../../../components/skjema/SporsmalMedTillegg';
import Radioknapper from '../../../../components/skjema/Radioknapper';
import SkrivUtSykmeldingDialog from '../skriv-ut/SkrivUtSykmeldingDialog';
import ErLederRiktig from '../er-leder-riktig/ErLederRiktig';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('VelgArbeidssituasjon', () => {
    let props;
    const arbeidsgivereMock = [
        {
            navn: 'TESTBEDRIFT',
            orgnummer: '111222333',
            naermesteLeder: {
                aktoerId: '123456789',
                navn: 'Testleder Testledernavn',
                epost: 'test@test.no',
                mobil: '11223344',
                orgnummer: '111222333',
                organisasjonsnavn: null,
                aktivTom: null,
                arbeidsgiverForskuttererLoenn: true,
            },
            stilling: 'TESTJOBB',
        },
    ];

    beforeEach(() => {
        setLedetekster({
            'din-sykmelding.arbeidssituasjon.alternativ.arbeidstaker.2': 'jobb hos en arbeidsgiver',
            'din-sykmelding.arbeidssituasjon.alternativ.arbeidstaker-annen-arbeidsgiver.2': 'jobb hos en annen arbeidsgiver',
            'din-sykmelding.arbeidssituasjon.alternativ.naeringsdrivende.2': 'jobb som selvstendig næringsdrivende',
        });
        props = {
            arbeidsgivere: [],
            input: {},
            initialValues: {},
        };
    });

    it('Har et field med Velg', () => {
        const comp = shallow(<VelgArbeidssituasjon {...props} />);
        const field = comp.find(Field);
        expect(field.props().component).to.deep.equal(Velg);
    });

    describe('Velg', () => {
        let component;

        beforeEach(() => {
            component = shallow(<Velg {...props} />);
        });

        it('Skal inneholde SporsmalMedTillegg', () => {
            expect(component.find(SporsmalMedTillegg)).to.have.length(1);
            expect(component.find(SporsmalMedTillegg).prop('Sporsmal')).to.deep.equal(<RendreVelgArbeidssituasjon {...props} />);
        });

        it('Skal vise SkrivUtSykmeldingDialog hvis arbeidssituasjon er ARBEIDSTAKER', () => {
            props.input.value = arbeidssituasjoner.ARBEIDSTAKER;
            component = shallow(<Velg {...props} />);
            expect(component.find(SporsmalMedTillegg).find(SkrivUtSykmeldingDialog)).to.have.length(1);
        });

        it('Skal vise spørsmål om nærmeste leder hvis det er valgt en arbeidsgiver', () => {
            props.input = {
                value: '111222333',
            };
            props.arbeidsgivere = arbeidsgivereMock;
            component = shallow(<Velg {...props} />);
            expect(component.find(SporsmalMedTillegg).find(ErLederRiktig)).to.have.length(1);
        });

        it('Skal vise tillegg hvis arbeidssituasjon er ARBEIDSTAKER', () => {
            props.input = {
                value: 'ARBEIDSTAKER',
            };
            component = shallow(<Velg {...props} />);
            expect(component.find(SporsmalMedTillegg).prop('visTillegg')(props)).to.equal(true);
        });


        it('Skal ikke vise tillegg hvis arbeidssituasjon === "noe annet enn ARBEIDSTAKER"', () => {
            props.input = {
                value: 'noe annet enn ARBEIDSTAKER',
            };
            component = shallow(<Velg {...props} />);
            expect(component.find(SporsmalMedTillegg).prop('visTillegg')(props)).to.equal(false);
        });
    });

    describe('RendreVelgArbeidssituasjon når bruker har arbeidsgivere', () => {
        it('Viser i utgangspunktet 2 radioknapper', () => {
            props.alternativer = getAlternativer(arbeidsgivereMock);
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find(Radioknapper)).to.have.length(1);
            expect(comp.find('i').length).to.equal(2);
        });

        it('Viser alle alternativer dersom state.visArbeidssituasjoner === true', () => {
            props.alternativer = getAlternativer(arbeidsgivereMock, { visArbeidssituasjoner: true });
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find(Radioknapper)).to.have.length(1);
            expect(comp.find('i').length).to.equal(6);
        });
    });

    describe('RendreVelgArbeidssituasjon når bruker har arbeidsgivere', () => {
        it('Viser i utgangspunktet 2 radioknapper', () => {
            props.alternativer = getAlternativer(arbeidsgivereMock);
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find(Radioknapper)).to.have.length(1);
            expect(comp.find('i').length).to.equal(2);
        });

        it('Viser alle alternativer dersom state.visArbeidssituasjoner === true', () => {
            props.alternativer = getAlternativer(arbeidsgivereMock, {
                visArbeidssituasjoner: true,
            });
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find(Radioknapper)).to.have.length(1);
        });

        it('Viser alternativene i riktig rekkefølge', () => {
            props.alternativer = getAlternativer(arbeidsgivereMock, {
                visArbeidssituasjoner: true,
            });
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find('i').at(0).prop('value')).to.equal('111222333');
            expect(comp.find('i').at(1).prop('value')).to.equal(arbeidssituasjoner.NAERINGSDRIVENDE);
            expect(comp.find('i').at(1).prop('label')).to.equal('jobb som selvstendig næringsdrivende');
            expect(comp.find('i').at(2).prop('value')).to.equal(arbeidssituasjoner.FRILANSER);
            expect(comp.find('i').at(3).prop('value')).to.equal(arbeidssituasjoner.ARBEIDSTAKER);
            expect(comp.find('i').at(3).prop('label')).to.equal('jobb hos en annen arbeidsgiver');
            expect(comp.find('i').at(4).prop('value')).to.equal(arbeidssituasjoner.ARBEIDSLEDIG);
            expect(comp.find('i').at(5).prop('value')).to.equal(arbeidssituasjoner.ANNET);
        });
    });

    describe('RendreVelgArbeidssituasjon når bruker IKKE har arbeidsgivere', () => {
        it('Viser i utgangspunktet alle radioknapper', () => {
            props.alternativer = getAlternativer([]);
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find(Radioknapper)).to.have.length(1);
            expect(comp.find('i').length).to.equal(5);
        });

        it('Viser alternativene i riktig rekkefølge', () => {
            props.alternativer = getAlternativer([], { visArbeidssituasjoner: true });
            const comp = shallow(<RendreVelgArbeidssituasjon {...props} />);
            expect(comp.find('i').at(0).prop('value')).to.equal(arbeidssituasjoner.NAERINGSDRIVENDE);
            expect(comp.find('i').at(1).prop('value')).to.equal(arbeidssituasjoner.FRILANSER);
            expect(comp.find('i').at(2).prop('value')).to.equal(arbeidssituasjoner.ARBEIDSTAKER);
            expect(comp.find('i').at(2).prop('label')).to.equal('jobb hos en arbeidsgiver');
            expect(comp.find('i').at(3).prop('value')).to.equal(arbeidssituasjoner.ARBEIDSLEDIG);
            expect(comp.find('i').at(4).prop('value')).to.equal(arbeidssituasjoner.ANNET);
        });
    });

    describe('visTillegg', () => {
        it('Skal returnere false når bruker har strengt fortrolig adresse', () => {
            const vis = visTillegg({
                harStrengtFortroligAdresse: true,
                input: {},
                arbeidsgivere: [],
            });
            expect(vis).to.equal(false);
        });

        it('Skal returnere true når bruker har valgt en arbeidsgiver med nærmeste leder', () => {
            const vis = visTillegg({
                harStrengtFortroligAdresse: false,
                input: {
                    value: '111222333',
                },
                arbeidsgivere: arbeidsgivereMock,
            });
            expect(vis).to.equal(true);
        });

        it('Skal returnere false når bruker har valgt en arbeidsgiver uten nærmeste leder', () => {
            const vis = visTillegg({
                harStrengtFortroligAdresse: false,
                input: {
                    value: '000111222',
                },
                arbeidsgivere: [
                    ...arbeidsgivereMock,
                    {
                        orgnummer: '000111222',
                        naermesteLeder: null,
                    },
                ],
            });
            expect(vis).to.equal(false);
        });

        it("Skal returnere true når bruker har valgt arbeidssituasjon 'ARBEIDSTAKER'", () => {
            const vis = visTillegg({
                harStrengtFortroligAdresse: false,
                input: {
                    value: 'ARBEIDSTAKER',
                },
                arbeidsgivere: [
                    ...arbeidsgivereMock,
                    {
                        orgnummer: '000111222',
                        naermesteLeder: null,
                    },
                ],
            });
            expect(vis).to.equal(true);
        });
    });
});
