import React, { PropTypes } from 'react';
import Checkboxgruppe from '../skjema/Checkboxgruppe';
import { getLedetekst } from '../../ledetekster';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding } from '../../utils/valideringUtils';

export const DuTrengerNySykmelding = () => {
    return (<div className="panel panel-relatert">
        <h5 className="hode hode-advarsel hode-dekorert typo-undertittel">Du trenger ny sykmelding</h5>
        <p>Du må avbryte denne sykmeldingen, og kontakte den som har sykmeldt deg for å få en ny.</p>
    </div>);
};

export const DuKanBrukeSykmeldingenDinArbeidsgiver = () => {
    return (<div className="panel panel-relatert">
        <h5 className="typo-undertittel blokk-xs">Du kan bruke sykmeldingen din</h5>
        <p>Du velger hvilken arbeidsgiver du skal sende sykmeldingen til i neste steg.
        Vær oppmerksom på at den du sender til likevel får se hvilken arbeidsgiver som
        opprinnelig sto i sykmeldingen. Hvis sykmeldingen senere skal forlenges, må du
        gi beskjed til den som sykmelder deg om at den inneholder feil. </p>
    </div>);
};

export const DuKanBrukeSykmeldingenDinDiagnoseAndre = () => {
    return (<div className="panel panel-relatert">
        <h5 className="typo-undertittel blokk-xs">Du kan bruke sykmeldingen din</h5>
        <p>Hvis sykmeldingen senere skal forlenges, må du gi beskjed til den som sykmelder deg om at den inneholder feil.</p>
    </div>);
};

export const SykmeldingFeilaktigeOpplysningerInfo = ({ feilaktigeOpplysninger = {} }) => {
    if (feilaktigeOpplysninger.periode || feilaktigeOpplysninger.sykmeldingsgrad) {
        return <DuTrengerNySykmelding />;
    }
    if (feilaktigeOpplysninger.arbeidsgiver) {
        return <DuKanBrukeSykmeldingenDinArbeidsgiver />;
    }
    if (feilaktigeOpplysninger.diagnose || feilaktigeOpplysninger.andre) {
        return <DuKanBrukeSykmeldingenDinDiagnoseAndre />;
    }
    return null;
};

SykmeldingFeilaktigeOpplysningerInfo.propTypes = {
    feilaktigeOpplysninger: PropTypes.object,
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
            <SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger} />
        </Checkboxgruppe>
    </div>);
};

HvilkeOpplysningerErIkkeRiktige.propTypes = {
    skjemaData: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default HvilkeOpplysningerErIkkeRiktige;
