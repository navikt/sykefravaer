import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autofill, touch } from 'redux-form';
import landliste from './landliste';
import { formaterFlereVerdier, genererParseForFlereVerdier } from '../../../sykepengesoknad/felleskomponenter/sporsmal/fieldUtils';
import { fieldPropTypes } from '../../../propTypes';
import NavAutosuggest from './NavAutosuggest';
import { finnForslag, forslagFinnesIForslagsliste, tilForslagsliste } from './forslagUtils';

export const genererHandleAddition = (meta, input, doAutofill, doTouch, forslagsliste = []) => {
    const prevVal = formaterFlereVerdier(input.value);
    const parse = genererParseForFlereVerdier();
    return (forslag) => {
        if (forslagFinnesIForslagsliste(forslagsliste, forslag)) {
            doTouch(meta.form, input.name);
            doAutofill(meta.form, input.name, parse([...prevVal, finnForslag(forslagsliste, forslag)]));
        }
    };
};

export const genererHandleDelete = (meta, input, doAutofill) => {
    return (index) => {
        const verdier = formaterFlereVerdier(input.value);
        const nyeVerdier = verdier.filter((value, valueIndex) => {
            return valueIndex !== index;
        });
        doAutofill(meta.form, input.name, genererParseForFlereVerdier()(nyeVerdier));
    };
};

const LandvelgerComponent = ({ input, meta, doAutofill, doTouch }) => {
    const onAdd = genererHandleAddition(meta, input, doAutofill, doTouch, landliste);
    const handleDelete = genererHandleDelete(meta, input, doAutofill);
    const verdiArray = formaterFlereVerdier(input.value);
    return (<div>
        <NavAutosuggest
            meta={meta}
            onAdd={onAdd}
            id={input.name}
            forslagsliste={tilForslagsliste(landliste, verdiArray)}
        />
    </div>);
};

LandvelgerComponent.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    doAutofill: PropTypes.func,
    doTouch: PropTypes.func,
};

const Landvelger = connect(null, {
    doAutofill: autofill,
    doTouch: touch,
})(LandvelgerComponent);

export default Landvelger;
