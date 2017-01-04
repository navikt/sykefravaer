import React, { PropTypes } from 'react';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding, getLedetekst } from 'digisyfo-npm';

const ErOpplysningeneRiktige = ({ skjemaData, ledetekster, untouch }) => {
    const alternativer = [true, false];
    const verdi = skjemaData.values ? skjemaData.values.opplysningeneErRiktige : null;
    const erFeil = visFeilmelding(skjemaData, 'opplysningeneErRiktige');
    const feilmelding = getFeilmelding(skjemaData, 'opplysningeneErRiktige');

    return (<div className="blokk--l">
        <div className={`skjema__feilomrade${erFeil ? ' skjema__feilomrade--feil' : ''}`}>
            <h3 className="skjema__sporsmal">{getLedetekst('sykmelding.bekreft-opplysninger.sporsmal', ledetekster)}</h3>
            {
                alternativer.map((alternativ, index) => {
                    return (<div className="skjema__input" key={index}>
                        <Field
                            component="input"
                            type="radio"
                            name="opplysningeneErRiktige"
                            className="radioknapp"
                            id={`radio-${alternativ}`}
                            value={alternativ}
                            checked={verdi === alternativ}
                            parse={(v) => {
                                return v === 'true';
                            }}
                            onBlur={() => {
                                untouch('feilaktigeOpplysninger.periode',
                                    'feilaktigeOpplysninger.sykmeldingsgrad',
                                    'feilaktigeOpplysninger.arbeidsgiver',
                                    'feilaktigeOpplysninger.diagnose',
                                    'feilaktigeOpplysninger.andre');
                            }} />
                        <label htmlFor={`radio-${alternativ}`}>{getLedetekst(`sykmelding.bekreft-opplysninger.svar-${alternativ}`, ledetekster)}</label>
                    </div>);
                })
            }
            {verdi === false && <HvilkeOpplysningerErIkkeRiktige skjemaData={skjemaData} ledetekster={ledetekster} />}
            <p className="skjema__feilmelding" role="alert" aria-live="polite">{erFeil && feilmelding}</p>
        </div>
    </div>);
};

ErOpplysningeneRiktige.propTypes = {
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
    untouch: PropTypes.func,
};

export default ErOpplysningeneRiktige;
