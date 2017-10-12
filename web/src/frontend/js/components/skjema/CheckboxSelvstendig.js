import React from 'react';
import PropTypes from 'prop-types';
import Feilomrade from './Feilomrade';
import Checkbox from './Checkbox';

const CheckboxSelvstendig = ({ input, meta, label, id }) => {
    return (<Feilomrade {...meta}>
        <Checkbox input={input} id={id} label={label} />
    </Feilomrade>);
};

CheckboxSelvstendig.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string,
};

export default CheckboxSelvstendig;
