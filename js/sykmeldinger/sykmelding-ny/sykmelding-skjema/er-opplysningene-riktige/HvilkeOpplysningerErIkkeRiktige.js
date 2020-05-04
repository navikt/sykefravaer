import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from '@navikt/digisyfo-npm';
import { Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import Checkbox from '../../../../components/skjema/Checkbox';
import Feilomrade from '../../../../components/skjema/Feilomrade';
import SporsmalMedTillegg from '../../../../components/skjema/SporsmalMedTillegg';
import { fieldPropTypes } from '../../../../propTypes';
import { getSykmeldingSkjemanavn } from '../../../../enums/skjemanavn';

const {
    PERIODE, SYKMELDINGSGRAD, ARBEIDSGIVER, DIAGNOSE, ANDRE, SYKMELDINGSGRAD_HOY,
} = feilaktigeOpplysningerEnums;

const feilaktigeOpplysningerProp = PropTypes.arrayOf(PropTypes.shape({
    avkrysset: PropTypes.bool,
    opplysning: PropTypes.string,
}));

const Tilleggsinfo = ({ children }) => {
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">{children}</div>);
};

Tilleggsinfo.propTypes = {
    children: PropTypes.element,
};

export const DuTrengerNySykmelding = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--advarsel">
                <h5 className="hode__tittel">
                    {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tittel')}
                </h5>
                <p>
                    {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tekst')}
                </p>
            </div>
        </Tilleggsinfo>
    );
};

// SykmeldingsgradHoy + arbeidsgiver + diagnose + (andre)
export const DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiverDiagnoseAndre = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    Når du senere skal fylle ut søknaden om sykepenger, skriver du inn hvor mye du faktisk jobbet.
                </p>
                <p>
                    I neste trinn velger du riktig arbeidsgiver.
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

// Arbeidsgiver + diagnose + andre
export const DuKanBrukeSykmeldingenDinArbeidsgiverDiagnoseAndre = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    I neste trinn velger du riktig arbeidsgiver.
                </p>
                <p>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

// arbeidsgiver + diagnose
export const DuKanBrukeSykmeldingenDinArbeidsgiverDiagnose = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    I neste trinn velger du riktig arbeidsgiver.
                </p>
                <p>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

// diagnose + andre
export const DuKanBrukeSykmeldingenDinDiagnoseAndre = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

// sykmeldingsgradHoy + arbeidsgiver
export const DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiver = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    Når du senere skal fylle ut søknaden om sykepenger, skriver du inn hvor mye du faktisk jobbet.
                </p>
                <p>
                    I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

export const DuKanBrukeSykmeldingenDinSykmeldingsgradHoy = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    Senere, når du skal fylle ut søknaden om sykepenger, skriver du bare inn hvor mye du faktisk jobbet.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    I neste trinn velger du riktig arbeidsgiver. Obs: Feilen vil være synlig for arbeidsgiveren du sender sykmeldingen til.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

export const DuKanBrukeSykmeldingenDinDiagnose = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at diagnosen er feil.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

export const DuKanBrukeSykmeldingenDinAndre = () => {
    return (
        <Tilleggsinfo>
            <div className="hode hode--informasjon">
                <h5 className="hode__tittel">
                    Du kan likevel bruke denne sykmeldingen
                </h5>
                <p>
                    Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.
                </p>
            </div>
        </Tilleggsinfo>
    );
};

const getAvkryssedeOpplysninger = (feilaktigeOpplysninger) => {
    return feilaktigeOpplysninger.filter((o) => {
        return o.avkrysset;
    }).map((o) => {
        return o.opplysning;
    });
};

export const FeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger = [] }) => {
    const opplysninger = getAvkryssedeOpplysninger(feilaktigeOpplysninger);
    if (opplysninger.indexOf(PERIODE) > -1 || opplysninger.indexOf(SYKMELDINGSGRAD) > -1) {
        return <DuTrengerNySykmelding />;
    } if (opplysninger.indexOf(SYKMELDINGSGRAD_HOY) > -1 && opplysninger.indexOf(ARBEIDSGIVER) > -1 && opplysninger.indexOf(DIAGNOSE) > -1) {
        return <DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiverDiagnoseAndre />;
    } if (opplysninger.indexOf(ARBEIDSGIVER) > -1 && opplysninger.indexOf(DIAGNOSE) > -1 && opplysninger.indexOf(ANDRE) > -1) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiverDiagnoseAndre />;
    } if (opplysninger.indexOf(SYKMELDINGSGRAD_HOY) > -1 && opplysninger.indexOf(ARBEIDSGIVER) > -1) {
        return <DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiver />;
    } if (opplysninger.indexOf(ARBEIDSGIVER) > -1 && opplysninger.indexOf(DIAGNOSE) > -1) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiverDiagnose />;
    } if (opplysninger.indexOf(DIAGNOSE) > -1 && opplysninger.indexOf(ANDRE) > -1) {
        return <DuKanBrukeSykmeldingenDinDiagnoseAndre />;
    } if (opplysninger.indexOf(SYKMELDINGSGRAD_HOY) > -1) {
        return <DuKanBrukeSykmeldingenDinSykmeldingsgradHoy />;
    } if (opplysninger.indexOf(ARBEIDSGIVER) > -1) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiver />;
    } if (opplysninger.indexOf(DIAGNOSE) > -1) {
        return <DuKanBrukeSykmeldingenDinDiagnose />;
    } if (opplysninger.indexOf(ANDRE) > -1) {
        return <DuKanBrukeSykmeldingenDinAndre />;
    }
    return null;
};

FeilaktigeOpplysningerInfo.propTypes = {
    feilaktigeOpplysninger: feilaktigeOpplysningerProp,
};

export const VelgFeilaktigeOpplysninger = ({ fields, meta }) => {
    const labels = {};
    labels[PERIODE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.periode');
    labels[SYKMELDINGSGRAD] = 'Sykmeldingsgraden er for lav';
    labels[SYKMELDINGSGRAD_HOY] = 'Sykmeldingsgraden er for høy';
    labels[ARBEIDSGIVER] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.arbeidsgiver');
    labels[DIAGNOSE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.diagnose');
    labels[ANDRE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.andre');

    return (
        <Feilomrade {...meta} id="feilaktigeOpplysninger">
            <h4 className="skjema__sporsmal">Hvilke opplysninger er ikke riktige?</h4>
            {
                fields.map((field, index) => {
                    const { opplysning } = field;
                    return (
                        <Field
                            key={index}
                            component={Checkbox}
                            name={`feilaktigeOpplysninger[${index}].avkrysset`}
                            label={labels[opplysning]}
                            id={`checkbox-${opplysning}`} />
                    );
                })
            }
        </Feilomrade>
    );
};

VelgFeilaktigeOpplysninger.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        opplysning: PropTypes.string,
    })),
    meta: fieldPropTypes.meta,
};

export const HvilkeOpplysninger = (props) => {
    const { feilaktigeOpplysninger } = props;
    const Sporsmal = <VelgFeilaktigeOpplysninger {...props} />;
    const visTillegg = (propsarg) => {
        try {
            return propsarg.feilaktigeOpplysninger.filter((o) => {
                return o.avkrysset;
            }).length > 0;
        } catch (e) {
            return false;
        }
    };
    return (
        <SporsmalMedTillegg
            {...props}
            Sporsmal={Sporsmal}
            visTillegg={visTillegg}>
            <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger} />
        </SporsmalMedTillegg>
    );
};

HvilkeOpplysninger.propTypes = {
    feilaktigeOpplysninger: feilaktigeOpplysningerProp,
};

const mapStateToProps = (state, ownProps) => {
    return {
        feilaktigeOpplysninger: getFormValues(getSykmeldingSkjemanavn(ownProps.sykmelding.id))(state).feilaktigeOpplysninger,
    };
};

const FeilaktigeOpplysninger = connect(mapStateToProps)(HvilkeOpplysninger);

export default FeilaktigeOpplysninger;
