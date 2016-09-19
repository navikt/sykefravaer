import React, { PropTypes, Component } from 'react';
import DropdownWrapper from '../skjema/DropdownWrapper.js';
import Dropdown from '../skjema/Dropdown.js';
import { getLedetekst } from '../../ledetekster';
import Hjelpetekst from '../skjema/Hjelpetekst.js';
import arbeidssituasjoner from '../../arbeidssituasjonData';
import { Field } from 'redux-form';
import { visFeilmelding, getFeilmelding } from '../../utils/valideringUtils';

const getArbeidssituasjoner = (skjemaData) => {
    if (!skjemaData || !skjemaData.values || !skjemaData.values.valgtArbeidssituasjon) {
        return arbeidssituasjoner;
    }
    return arbeidssituasjoner.filter((arbeidssituasjon) => {
        return arbeidssituasjon.verdi !== 'default';
    });
}

const VelgArbeidssituasjon = (props) => {
    const { skjemaData, ledetekster } = props;
    const fields = skjemaData && skjemaData.fields ? skjemaData.fields : {};
    const erFeil = visFeilmelding(skjemaData, 'valgtArbeidssituasjon');

    return (
        <div className="blokk-l">
            <div className="hjelpetekst-parent hjelpetekst-parent-inline hjelpetekst-select">
                <label htmlFor="select-arbeidssituasjon" className="skjema-sporsmal med-hjelpetekst">
                    {getLedetekst('din-sykmelding.arbeidssituasjon.tittel', ledetekster)}
                </label>
                <Hjelpetekst
                    id="velg-arbeidssituasjon-hjelpetekst"
                    tittel={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tittel', ledetekster)}
                    tekst={getLedetekst('din-sykmelding.arbeidssituasjon.hjeleptekst.tekst', ledetekster)} />
            </div>
            <DropdownWrapper erFeil={erFeil} feilmelding={getFeilmelding(skjemaData, 'valgtArbeidssituasjon')}>
                <div className="select-container">
                    <Field component="select" name="valgtArbeidssituasjon">
                        {
                            getArbeidssituasjoner(skjemaData).map((arbeidssituasjon, index) => {
                                return <option value={arbeidssituasjon.verdi} key={index}>{arbeidssituasjon.tekst}</option>
                            })
                        }
                    </Field>
                </div>
            </DropdownWrapper>
        </div>
    );
}

VelgArbeidssituasjon.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    fields: PropTypes.object,
    untouch: PropTypes.func,
};

export default VelgArbeidssituasjon;
