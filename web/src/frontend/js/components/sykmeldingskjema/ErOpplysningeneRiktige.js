import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Feilomrade from '../skjema/Feilomrade';
import JaEllerNei from '../../components/sykepengesoknad/JaEllerNei';
import { FieldArray, Field } from 'redux-form';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';

const Tilleggsinfo = ({ children }) => {
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">{children}</div>);
};

Tilleggsinfo.propTypes = {
    children: PropTypes.array,
};

export const DuTrengerNySykmelding = ({ ledetekster }) => {
    return (<Tilleggsinfo>
        <div className="hode hode--advarsel">
            <h5 className="hode__tittel">
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tittel', ledetekster)}
            </h5>
            <p>
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tekst', ledetekster)}
            </p>
        </div>
    </Tilleggsinfo>);
};

DuTrengerNySykmelding.propTypes = {
    ledetekster: PropTypes.object,
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = ({ ledetekster }) => {
    return (<Tilleggsinfo>
        <div className="hode hode--informasjon">
            <h5 className="hode__tittel">
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tittel', ledetekster)}
            </h5>
            <p>
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tekst', ledetekster)}
            </p>
        </div>
    </Tilleggsinfo>);
};

DuKanBrukeSykmeldingenDinArbeidsgiver.propTypes = {
    ledetekster: PropTypes.object,
};

export const DuKanBrukeSykmeldingenDinDiagnoseAndre = ({ ledetekster }) => {
    return (<Tilleggsinfo>
        <div className="hode hode--informasjon">
            <h5 className="hode__tittel">
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tittel', ledetekster)}
            </h5>
            <p>
                {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tekst', ledetekster)}
            </p>
        </div>
    </Tilleggsinfo>);
};

DuKanBrukeSykmeldingenDinDiagnoseAndre.propTypes = {
    ledetekster: PropTypes.object,
};

export const SykmeldingFeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger = {}, ledetekster }) => {
    if (feilaktigeOpplysninger.periode || feilaktigeOpplysninger.sykmeldingsgrad) {
        return <DuTrengerNySykmelding ledetekster={ledetekster} />;
    }
    if (feilaktigeOpplysninger.arbeidsgiver) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />;
    }
    if (feilaktigeOpplysninger.diagnose || feilaktigeOpplysninger.andre) {
        return <DuKanBrukeSykmeldingenDinDiagnoseAndre ledetekster={ledetekster} />;
    }
    return null;
};

SykmeldingFeilaktigeOpplysningerInfo.propTypes = {
    feilaktigeOpplysninger: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const HvilkeOpplysninger = ({ fields, meta, ledetekster }) => {
    const labels = {
        periode: getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.periode', ledetekster),
        sykmeldingsgrad: getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.sykmeldingsgrad', ledetekster),
        arbeidsgiver: getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.arbeidsgiver', ledetekster),
        diagnose: getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.diagnose', ledetekster),
        andre: getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.andre', ledetekster),
    };

    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">Hvilke opplysninger er ikke riktige?</h4>
        {
            fields.map((field, index) => {
                return <Field key={index} component={Checkbox} name={`feilaktigeOpplysninger.${field}`} label={labels[field]} id={`checkbox-${field}`} />;
            })
        }
    </Feilomrade>);
};

HvilkeOpplysninger.propTypes = {
    fields: PropTypes.object,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const RenderFeilaktigeOpplysninger = (props) => {
    const { ledetekster, skjemaData } = props;
    const Sporsmal = <HvilkeOpplysninger {...props} />;

    return (<SporsmalMedTillegg {...props} Sporsmal={Sporsmal} visTillegg={(_props) => {
        const _skjemaData = _props.skjemaData;
        const s = _skjemaData && _skjemaData.values && _skjemaData.values.feilaktigeOpplysninger ? _skjemaData.values.feilaktigeOpplysninger : false;
        const a = s && (s.periode || s.sykmeldingsgrad || s.arbeidsgiver || s.diagnose || s.andre);
        return a === true;
    }}>
        <SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={skjemaData.values.feilaktigeOpplysninger} ledetekster={ledetekster} />
    </SporsmalMedTillegg>);
};

RenderFeilaktigeOpplysninger.propTypes = {
    fields: PropTypes.array,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
};

export const ErOpplysningeneRiktige = (props) => {
    const { ledetekster } = props;

    return (<JaEllerNei
        verdiMedTilleggssporsmal={false}
        spoersmal="Er opplysningene i sykmeldingen riktige?"
        name="opplysningeneErRiktige">
        <FieldArray
            {...props}
            component={RenderFeilaktigeOpplysninger}
            name="feilaktigeOpplysninger"
            fields={['periode', 'sykmeldingsgrad', 'arbeidsgiver', 'diagnose', 'andre']}
            ledetekster={ledetekster} />
    </JaEllerNei>);
};

ErOpplysningeneRiktige.propTypes = {
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
};

export default ErOpplysningeneRiktige;
