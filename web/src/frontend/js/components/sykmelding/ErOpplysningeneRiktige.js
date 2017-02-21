import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Checkbox from '../skjema/Checkbox';
import Feilomrade from '../skjema/Feilomrade';
import JaEllerNei from '../../components/sykepengesoknad/JaEllerNei';
import { FieldArray, Field } from 'redux-form';

export const opplysninger = [
    {
        label: 'Andre',
        value: false,
    }, {
        label: 'Noen',
        value: false,
    }];

export const DuTrengerNySykmelding = ({ ledetekster }) => {
    return (<div className="panel panel-relatert ekstrasporsmal">
        <h5 className="hode hode-advarsel hode-dekorert typo-undertittel">
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tittel', ledetekster)}
        </h5>
        <p>
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.ny-sykmelding.tekst', ledetekster)}
        </p>
    </div>);
};

DuTrengerNySykmelding.propTypes = {
    ledetekster: PropTypes.object,
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = ({ ledetekster }) => {
    return (<div className="panel panel-relatert ekstrasporsmal">
        <h5 className="typo-undertittel blokk--xs">
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tittel', ledetekster)}
        </h5>
        <p>
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.arbeidsgiver.tekst', ledetekster)}
        </p>
    </div>);
};

DuKanBrukeSykmeldingenDinArbeidsgiver.propTypes = {
    ledetekster: PropTypes.object,
};

export const DuKanBrukeSykmeldingenDinDiagnoseAndre = ({ ledetekster }) => {
    return (<div className="panel panel-relatert ekstrasporsmal">
        <h5 className="typo-undertittel blokk--xs">
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tittel', ledetekster)}
        </h5>
        <p>
            {getLedetekst('starte-sykmelding.feilaktige-opplysninger.du-kan-bruke-sykmelding.andre.tekst', ledetekster)}
        </p>
    </div>);
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

    const getName = (field) => {
        return field;
    };

    return (<Feilomrade {...meta}>
        <h4 className="skjema__sporsmal">Hvilke opplysninger er ikke riktige?</h4>
        {
            fields.map((field, index) => {
                const name = `${getName(field)}`;
                return <Field key={index} component={Checkbox} name={`feilaktigeOpplysninger.${name}`} label={labels[field]} id={`checkbox-${field}`} />;
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

    return (
    <JaEllerNei
        verdi={false}
        spoersmal="Er opplysningene riktige?"
        name="opplysningeneErRiktige">
        <FieldArray
            {...props}
            component={RenderFeilaktigeOpplysninger}
            name="feilaktigeOpplysninger"
            fields={['periode', 'sykmeldingsgrad', 'arbeidsgiver', 'diagnose', 'andre']}
            ledetekster={ledetekster} />
    </JaEllerNei>
    );
};

ErOpplysningeneRiktige.propTypes = {
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
    untouch: PropTypes.func,
};

export default ErOpplysningeneRiktige;
