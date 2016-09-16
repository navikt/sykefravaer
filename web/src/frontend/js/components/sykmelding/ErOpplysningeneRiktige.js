import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import HvilkeOpplysningerErIkkeRiktige from './HvilkeOpplysningerErIkkeRiktige';
import { Fields } from 'redux-form';

// {
//     alternativer.map((alternativ) => {
//         return (<div className="nav-input" key={alternativ}>
//             <Field
//                 component="input"
//                 type="radio"
//                 name="opplysningeneErRiktige"
//                 id={`radio-${alternativ}`}
//                 value={alternativ}
//                 className="nav-radioknapp"
//                 parse={(verdi) => {
//                     return verdi === 'true';
//                 }}
//                 checked={alternativ === verdi} />
//             <label htmlFor={`radio-${alternativ}`}>{getLedetekst(`sykmelding.bekreft-opplysninger.svar-${alternativ}`, ledetekster)}</label>
//         </div>);
//     })
// }

const Radioknapp = (props) => {
    console.log("PROPS", props);
    return (<div>
        {
            props.names.map((name, index) => {
                return (<div className="nav-input" key={index}>
                    <input
                        type="radio"
                        name="opplysningeneErRiktige"
                        id={`radio-${name}`}
                        value={name}
                        className="nav-radioknapp" />
                    <label htmlFor={`radio-${name}`}>{getLedetekst(`sykmelding.bekreft-opplysninger.svar-${name}`, props.ledetekster)}</label>
                </div>);
            })
        }
    </div>)
}

const ErOpplysningeneRiktige = ({ skjemaData, ledetekster }) => {
    const visFeilmelding = false; // skjemaData && skjemaData.fields && skjemaData.fields.opplysningeneErRiktige.touched && skjemaData.values.opplysningeneErRiktige === undefined;
    const opplysningeneErRiktige = {};
    const alternativer = [true, false];
    const verdi = skjemaData && skjemaData.values ? skjemaData.values.opplysningeneErRiktige : null;

    return (<div className="blokk-s">
        <div className={`skjema-feilomrade${visFeilmelding ? ' feil' : ''}`}>
            <h3 className="skjema-sporsmal">{getLedetekst('sykmelding.bekreft-opplysninger.sporsmal', ledetekster)}</h3>
            <Fields names={alternativer} component={Radioknapp} ledetekster={ledetekster} />
            {verdi === false && <HvilkeOpplysningerErIkkeRiktige skjemaData={skjemaData} ledetekster={ledetekster} />}
            <p className="skjema-feilmelding" role="alert" aria-live="polite">{visFeilmelding && "OK"}</p>
        </div>
    </div>);
};

ErOpplysningeneRiktige.propTypes = {
    ledetekster: PropTypes.object,
    feilmelding: PropTypes.string,
    fields: PropTypes.object,
    untouch: PropTypes.func,
};

export default ErOpplysningeneRiktige;
