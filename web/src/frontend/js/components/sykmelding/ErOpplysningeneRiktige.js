import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding } from '../../utils/valideringUtils';

const Radio = (field) => {
    return (<input
        {...field.input}
        type="radio"
        name={field.name}
        id={field.id}
        value={field.verdi}
        className="nav-radioknapp"
        checked={field.checked}
        onChange={(e) => {
            field.untouch();
            field.input.onChange(e);
        }}
    />);
}

const ErOpplysningeneRiktige = ({ skjemaData, ledetekster, untouch }) => {
    const alternativer = [true, false];
    const verdi = skjemaData.values ? skjemaData.values.opplysningeneErRiktige : null;
    const erFeil = visFeilmelding(skjemaData, 'opplysningeneErRiktige');
    const feilmelding = getFeilmelding(skjemaData, 'opplysningeneErRiktige');

    return (<div className="blokk-s">
        <div className={`skjema-feilomrade${erFeil ? ' feil' : ''}`}>
            <h3 className="skjema-sporsmal">{getLedetekst('sykmelding.bekreft-opplysninger.sporsmal', ledetekster)}</h3>
            {
                alternativer.map((alternativ) => {
                    return (<div className="nav-input" key={alternativ}>
                        <Field
                            component={Radio}
                            name="opplysningeneErRiktige"
                            id={`radio-${alternativ}`}
                            verdi={alternativ}
                            parse={(e) => {
                                return e === 'true';
                            }}
                            untouch={() => {
                                untouch("feilaktigeOpplysninger.periode",
                                    "feilaktigeOpplysninger.sykmeldingsgrad",
                                    "feilaktigeOpplysninger.arbeidsgiver",
                                    "feilaktigeOpplysninger.diagnose",
                                    "feilaktigeOpplysninger.andre");
                            }} />
                        <label htmlFor={`radio-${alternativ}`}>{getLedetekst(`sykmelding.bekreft-opplysninger.svar-${alternativ}`, ledetekster)}</label>
                    </div>);
                })
            }
            {verdi === false && <HvilkeOpplysningerErIkkeRiktige skjemaData={skjemaData} ledetekster={ledetekster} />}
            <p className="skjema-feilmelding" role="alert" aria-live="polite">{erFeil && feilmelding}</p>
        </div>
    </div>);
};

ErOpplysningeneRiktige.propTypes = {
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
    untouch: PropTypes.func,
};

export default ErOpplysningeneRiktige;
