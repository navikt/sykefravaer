import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Feilomrade from '../skjema/Feilomrade';
import JaEllerNei from '../../components/sykepengesoknad/JaEllerNei';
import { FieldArray, Field } from 'redux-form';

const Tilleggsinfo = ({ children }) => {
    return (<div className="ekstrasporsmal ekstrasporsmal--sist">{children}</div>);
};

Tilleggsinfo.propTypes = {
    children: PropTypes.array,
};

export const DuTrengerNySykmelding = ({ ledetekster }) => {
    return (<Tilleggsinfo>
        <h5 className="hode hode-advarsel hode-dekorert typo-undertittel">
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tittel', ledetekster)}
        </h5>
        <p>
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tekst', ledetekster)}
        </p>
    </Tilleggsinfo>);
};

DuTrengerNySykmelding.propTypes = {
    ledetekster: PropTypes.object,
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = ({ ledetekster }) => {
    return (<Tilleggsinfo>
        <h5 className="typo-undertittel blokk--xs">
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tittel', ledetekster)}
        </h5>
        <p>
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tekst', ledetekster)}
        </p>
    </Tilleggsinfo>);
};

DuKanBrukeSykmeldingenDinArbeidsgiver.propTypes = {
    ledetekster: PropTypes.object,
};

export const DuKanBrukeSykmeldingenDinDiagnoseAndre = ({ ledetekster }) => {
    return (<Tilleggsinfo>
        <h5 className="typo-undertittel blokk--xs">
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tittel', ledetekster)}
        </h5>
        <p>
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tekst', ledetekster)}
        </p>
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

export const RenderFeilaktigeOpplysninger = ({ fields, meta, ledetekster, skjemaData }) => {
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
        <SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={skjemaData.values.feilaktigeOpplysninger} ledetekster={ledetekster} />
    </Feilomrade>);
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
        spoersmal="Er opplysningene riktige?"
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
