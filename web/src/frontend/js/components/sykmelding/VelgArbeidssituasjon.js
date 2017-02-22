import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import arbeidssituasjoner from '../../arbeidssituasjonData';
import { getLedetekst, Hjelpetekst } from 'digisyfo-npm';
import Feilmelding from '../skjema/Feilmelding';

const getArbeidssituasjoner = (arbeidssituasjon) => {
    if (!arbeidssituasjon || arbeidssituasjon === 'default') {
        return arbeidssituasjoner;
    }
    return arbeidssituasjoner.filter((a) => {
        return a.verdi !== 'default';
    });
};

export const RendreVelgArbeidssituasjon = (props) => {
    const { input, meta, ledetekster } = props;
    return (
        <div className={input.value && input.value !== 'default' ? 'blokk' : ''}>
            <div className="medHjelpetekst">
                <label htmlFor="select-arbeidssituasjon" className="skjema__sporsmal medHjelpetekst">
                    {getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster)}
                </label>
                <Hjelpetekst
                    id="velg-arbeidssituasjon-hjelpetekst"
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.tittel', ledetekster)}
                    tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.tekst', ledetekster)} />
            </div>
            <div className="selectContainer">
                <select {...input} className={meta.error && meta.touched ? 'input--feil' : ''}>
                    {getArbeidssituasjoner(input.value).map((arbeidssituasjon, index) => {
                        return <option value={arbeidssituasjon.verdi} key={index}>{arbeidssituasjon.tekst}</option>;
                    })}
                </select>
            </div>
            <Feilmelding {...meta} />
        </div>
    );
};

RendreVelgArbeidssituasjon.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    ledetekster: PropTypes.object,
};

const VelgArbeidssituasjon = (props) => {
    const { ledetekster, untouch } = props;

    return (<Field ledetekster={ledetekster} component={RendreVelgArbeidssituasjon} name="valgtArbeidssituasjon" onBlur={() => {
        untouch('valgtArbeidsgiver');
    }} />);
};

VelgArbeidssituasjon.propTypes = {
    ledetekster: PropTypes.object,
    untouch: PropTypes.func,
};

export default VelgArbeidssituasjon;
