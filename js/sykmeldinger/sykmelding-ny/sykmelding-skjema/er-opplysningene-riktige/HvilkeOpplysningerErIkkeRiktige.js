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

const { PERIODE, SYKMELDINGSGRAD, ARBEIDSGIVER, DIAGNOSE, ANDRE } = feilaktigeOpplysningerEnums;

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
    return (<Tilleggsinfo>
        <div className="hode hode--advarsel">
            <h5 className="hode__tittel">
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tittel')}
            </h5>
            <p>
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tekst')}
            </p>
        </div>
    </Tilleggsinfo>);
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = () => {
    return (<Tilleggsinfo>
        <div className="hode hode--informasjon">
            <h5 className="hode__tittel">
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tittel')}
            </h5>
            <p>
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tekst')}
            </p>
        </div>
    </Tilleggsinfo>);
};

export const DuKanBrukeSykmeldingenDinDiagnoseAndre = () => {
    return (<Tilleggsinfo>
        <div className="hode hode--informasjon">
            <h5 className="hode__tittel">
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tittel')}
            </h5>
            <p>
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tekst')}
            </p>
        </div>
    </Tilleggsinfo>);
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
    }
    if (opplysninger.indexOf(ARBEIDSGIVER) > -1) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiver />;
    }
    if (opplysninger.indexOf(DIAGNOSE) > -1 || opplysninger.indexOf(ANDRE) > -1) {
        return <DuKanBrukeSykmeldingenDinDiagnoseAndre />;
    }
    return null;
};

FeilaktigeOpplysningerInfo.propTypes = {
    feilaktigeOpplysninger: feilaktigeOpplysningerProp,
};

export const VelgFeilaktigeOpplysninger = ({ fields, meta }) => {
    const labels = {};
    labels[PERIODE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.periode');
    labels[SYKMELDINGSGRAD] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.sykmeldingsgrad');
    labels[ARBEIDSGIVER] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.arbeidsgiver');
    labels[DIAGNOSE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.diagnose');
    labels[ANDRE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.andre');

    return (<Feilomrade {...meta} id="feilaktigeOpplysninger">
        <h4 className="skjema__sporsmal">Hvilke opplysninger er ikke riktige?</h4>
        {
            fields.map((field, index) => {
                const opplysning = field.opplysning;
                return (<Field
                    key={index}
                    component={Checkbox}
                    name={`feilaktigeOpplysninger[${index}].avkrysset`}
                    label={labels[opplysning]}
                    id={`checkbox-${opplysning}`} />);
            })
        }
    </Feilomrade>);
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
    return (<SporsmalMedTillegg
        {...props}
        Sporsmal={Sporsmal}
        visTillegg={visTillegg}>
        <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger} />
    </SporsmalMedTillegg>);
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
