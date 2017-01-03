import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import DropdownWrapper from '../skjema/DropdownWrapper';
import arbeidssituasjoner from '../../arbeidssituasjonData';
import { visFeilmelding, getFeilmelding, getLedetekst, Hjelpetekst } from 'digisyfo-npm';

const getArbeidssituasjoner = (skjemaData) => {
    if (!skjemaData || !skjemaData.values || !skjemaData.values.valgtArbeidssituasjon) {
        return arbeidssituasjoner;
    }
    return arbeidssituasjoner.filter((arbeidssituasjon) => {
        return arbeidssituasjon.verdi !== 'default';
    });
};

const VelgArbeidssituasjon = (props) => {
    const { skjemaData, ledetekster, untouch } = props;
    const erFeil = visFeilmelding(skjemaData, 'valgtArbeidssituasjon');

    return (
        <div className="blokk--l">
            <div className="medHjelpetekst">
                <label htmlFor="select-arbeidssituasjon" className="skjema__sporsmal medHjelpetekst">
                    {getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster)}
                </label>
                <Hjelpetekst
                    id="velg-arbeidssituasjon-hjelpetekst"
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.tittel', ledetekster)}
                    tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjelpetekst.tekst', ledetekster)} />
            </div>
            <DropdownWrapper erFeil={erFeil} feilmelding={getFeilmelding(skjemaData, 'valgtArbeidssituasjon')}>
                <div className="selectContainer">
                    <Field component="select" className={erFeil ? 'input--feil' : ''} name="valgtArbeidssituasjon" onBlur={() => {
                        untouch('valgtArbeidsgiver');
                    }}>
                        {
                            getArbeidssituasjoner(skjemaData).map((arbeidssituasjon, index) => {
                                return <option value={arbeidssituasjon.verdi} key={index}>{arbeidssituasjon.tekst}</option>;
                            })
                        }
                    </Field>
                </div>
            </DropdownWrapper>
        </div>
    );
};

VelgArbeidssituasjon.propTypes = {
    ledetekster: PropTypes.object,
    skjemaData: PropTypes.object,
    untouch: PropTypes.func,
};

export default VelgArbeidssituasjon;
