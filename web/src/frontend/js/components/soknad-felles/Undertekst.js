import React from 'react';
import PropTypes from 'prop-types';
import { Vis } from '../../utils';

const Undertekst = ({ Tag = 'p', tekst = null }) => {
    return tekst !== null
        ? <Tag>{tekst}</Tag>
        : null;
};

Undertekst.propTypes = {
    Tag: PropTypes.string,
    tekst: PropTypes.string,
};

export default Undertekst;
