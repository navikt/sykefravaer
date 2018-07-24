import React from 'react';
import PropTypes from 'prop-types';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { fieldPropTypes } from '../../propTypes';
import Feilmelding from './Feilmelding';

const CheckboxUtland = ({ input, meta, label, id }) => {
    return (<div>
        <BekreftCheckboksPanel {...input} id={id} label={label} checked />
        <Feilmelding {...meta} />
    </div>);
};

CheckboxUtland.propTypes = {
    input: fieldPropTypes.input,
    meta: fieldPropTypes.meta,
    label: PropTypes.string,
    id: PropTypes.string,
};

export default CheckboxUtland;
