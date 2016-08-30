import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';

const ErOpplysningeneRiktige = (props) => {
    const { fields: { opplysningeneErRiktige, arbeidssituasjon }, ledetekster, untouch } = props;
    const visFeilmelding = opplysningeneErRiktige.touched && opplysningeneErRiktige.value === '';

    const tilbakestillFeilmeldinger = () => {
        untouch('sendSykmelding', 'feilaktigeOpplysninger');
        if (arbeidssituasjon.value !== 'arbeidstaker') {
            untouch('sendSykmelding', 'valgtArbeidsgiver');
        }
    };

    const blurHandler = (e) => {
        const boolValue = e.target.value === 'true';
        opplysningeneErRiktige.onBlur(boolValue);
        tilbakestillFeilmeldinger();
    };

    const changeHandler = (e) => {
        const boolValue = e.target.value === 'true';
        opplysningeneErRiktige.onChange(boolValue);
        tilbakestillFeilmeldinger();
    };

    const alternativer = ['true', 'false'];

    return (<div className="blokk-s">
        <div className={`skjema-feilomrade${visFeilmelding ? ' feil' : ''}`}>
            <h3 className="skjema-sporsmal">{getLedetekst('sykmelding.bekreft-opplysninger.sporsmal', ledetekster)}</h3>
            {
                alternativer.map((alternativ) => {
                    return (<div className="nav-input" key={alternativ}>
                        <input
                            id={`radio-${alternativ}`}
                            className="nav-radioknapp"
                            type="radio"
                            onBlur={blurHandler}
                            onChange={changeHandler}
                            value={alternativ}
                            checked={opplysningeneErRiktige.value === (alternativ === 'true')} />
                        <label htmlFor={`radio-${alternativ}`}>{getLedetekst(`sykmelding.bekreft-opplysninger.svar-${alternativ}`, ledetekster)}</label>
                    </div>);
                })
            }
            {opplysningeneErRiktige.value === false && <HvilkeOpplysningerErIkkeRiktige {...props} />}
            <p className="skjema-feilmelding" role="alert" aria-live="polite">{visFeilmelding && opplysningeneErRiktige.error}</p>
        </div>
    </div>);
};

ErOpplysningeneRiktige.propTypes = {
    sykmelding: PropTypes.object.isRequired,
    ledetekster: PropTypes.object,
    feilmelding: PropTypes.string,
    fields: PropTypes.object,
    untouch: PropTypes.func,
};

export default ErOpplysningeneRiktige;
