import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Checkboxgruppe from '../skjema/Checkboxgruppe';
import { getLedetekst } from '../../ledetekster';
import { visFeilmelding, getFeilmelding } from '../../utils';

export const DuTrengerNySykmelding = ({ ledetekster }) => {
    return (<div className="panel panel-relatert">
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
    return (<div className="panel panel-relatert">
        <h5 className="typo-undertittel blokk-xs">
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
    return (<div className="panel panel-relatert">
        <h5 className="typo-undertittel blokk-xs">
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

const HvilkeOpplysningerErIkkeRiktige = ({ skjemaData, ledetekster }) => {
    const inputs = ['periode', 'sykmeldingsgrad', 'arbeidsgiver', 'diagnose', 'andre'];
    const erFeil = visFeilmelding(skjemaData, 'feilaktigeOpplysninger');
    const feilmelding = getFeilmelding(skjemaData, 'feilaktigeOpplysninger');
    const feilaktigeOpplysninger = skjemaData.values.feilaktigeOpplysninger;

    const checkboxer = inputs.map((input, index) => {
        return (<div className="nav-input" key={index}>
            <Field component="input" className="nav-checkbox" type="checkbox" name={`feilaktigeOpplysninger.${input}`} id={`checkbox-${input}`} />
            <label htmlFor={`checkbox-${input}`}>{getLedetekst(`sykmelding.bekreft-opplysninger.hvilke-opplysninger.${input}`, ledetekster)}</label>
        </div>);
    });

    return (<div className="panel panel-ekstra">
        <Checkboxgruppe
            erFeil={erFeil}
            feilmelding={feilmelding}
            Overskrift="h4"
            spoersmaal={getLedetekst('sykmelding.bekreft-opplysninger.hvilke-opplysninger.sporsmal', ledetekster)}>
            {checkboxer}
            <SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger} ledetekster={ledetekster} />
        </Checkboxgruppe>
    </div>);
};

HvilkeOpplysningerErIkkeRiktige.propTypes = {
    skjemaData: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default HvilkeOpplysningerErIkkeRiktige;
