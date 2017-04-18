import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Feilomrade from '../skjema/Feilomrade';
import JaEllerNei from '../../components/sykepengesoknad/JaEllerNei';
import { FieldArray, Field } from 'redux-form';
import SporsmalMedTillegg from '../skjema/SporsmalMedTillegg';
import feilaktigeOpplysningerFields, { PERIODE, SYKMELDINGSGRAD, ARBEIDSGIVER, DIAGNOSE, ANDRE } from '../../enums/feilaktigeOpplysninger';

const Tilleggsinfo = ({ children }) => {
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">{children}</div>);
};

Tilleggsinfo.propTypes = {
    children: PropTypes.object,
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

const getAvkryssedeOpplysninger = (feilaktigeOpplysninger) => {
    return feilaktigeOpplysninger.filter((o) => {
        return o.avkrysset;
    }).map((o) => {
        return o.opplysning;
    });
};

export const SykmeldingFeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger = [], ledetekster }) => {
    const opplysninger = getAvkryssedeOpplysninger(feilaktigeOpplysninger);
    if (opplysninger.indexOf(PERIODE) > -1 || opplysninger.indexOf(SYKMELDINGSGRAD) > -1) {
        return <DuTrengerNySykmelding ledetekster={ledetekster} />;
    }
    if (opplysninger.indexOf(ARBEIDSGIVER) > -1) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiver ledetekster={ledetekster} />;
    }
    if (opplysninger.indexOf(DIAGNOSE) > -1 || opplysninger.indexOf(ANDRE) > -1) {
        return <DuKanBrukeSykmeldingenDinDiagnoseAndre ledetekster={ledetekster} />;
    }
    return null;
};

SykmeldingFeilaktigeOpplysningerInfo.propTypes = {
    feilaktigeOpplysninger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export const HvilkeOpplysninger = ({ fields, meta, ledetekster }) => {
    const labels = {};
    labels[PERIODE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.periode', ledetekster);
    labels[SYKMELDINGSGRAD] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.sykmeldingsgrad', ledetekster);
    labels[ARBEIDSGIVER] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.arbeidsgiver', ledetekster);
    labels[DIAGNOSE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.diagnose', ledetekster);
    labels[ANDRE] = getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.andre', ledetekster);

    return (<Feilomrade {...meta}>
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

HvilkeOpplysninger.propTypes = {
    fields: PropTypes.array,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
};

export const RenderFeilaktigeOpplysninger = (props) => {
    const { ledetekster, skjemaData } = props;
    const Sporsmal = <HvilkeOpplysninger {...props} />;

    return (<SporsmalMedTillegg {...props} Sporsmal={Sporsmal} visTillegg={(_props) => {
        try {
            const feilaktigeOpplysninger = _props.skjemaData.values.feilaktigeOpplysninger;
            return feilaktigeOpplysninger.filter((o) => {
                return o.avkrysset;
            }).length > 0;
        } catch (e) {
            return false;
        }
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
            fields={feilaktigeOpplysningerFields}
            ledetekster={ledetekster} />
    </JaEllerNei>);
};

ErOpplysningeneRiktige.propTypes = {
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
};

export default ErOpplysningeneRiktige;
