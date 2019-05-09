import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autofill, touch } from 'redux-form';
import landliste from './landliste';
import { TagsInput } from './TagsInput';
import { formaterFlereVerdier, genererParseForFlereVerdier } from '../../../sykepengesoknad/felleskomponenter/sporsmal/fieldUtils';
import { fieldPropTypes } from '../../../propTypes';

const formatTags = (tags, value) => {
    return tags
        .filter((tag) => {
            return value && value.includes
                ? !value.includes(tag)
                : true;
        })
        .map((tag) => {
            return {
                id: tag.toUpperCase(),
                text: tag,
            };
        });
};

const tagFinnesITagliste = (tagliste, tag) => {
    const formatertliste = formatTags(tagliste);
    return formatertliste.find((t) => {
        return t.id === tag.toUpperCase();
    }) !== undefined;
};

const finnTag = (tagliste, tag) => {
    const formatertListe = formatTags(tagliste);
    return formatertListe.find((t) => {
        return t.id === tag.toUpperCase();
    }).text;
};

export const genererHandleAddition = (meta, input, doAutofill, doTouch, tagliste = []) => {
    const prevVal = formaterFlereVerdier(input.value);
    const parse = genererParseForFlereVerdier();
    return (val) => {
        if (tagFinnesITagliste(tagliste, val.text)) {
            doTouch(meta.form, input.name);
            doAutofill(meta.form, input.name, parse([...prevVal, finnTag(tagliste, val.text)]));
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
    const handleAddition = genererHandleAddition(meta, input, doAutofill, doTouch, landliste);
    const handleDelete = genererHandleDelete(meta, input, doAutofill);
    const value = formaterFlereVerdier(input.value);
    return (<TagsInput
        meta={meta}
        tags={formatTags(value)}
        handleAddition={handleAddition}
        handleDelete={handleDelete}
        id={input.name}
        suggestions={formatTags(landliste, value)}
    />);
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
