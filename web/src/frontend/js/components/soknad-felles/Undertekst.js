import React from 'react';
import PropTypes from 'prop-types';
import { Vis } from '../../utils';

const Undertekst = ({ Tag = 'p', tekst = null }) => {
    return (<Vis hvis={tekst !== null}>
        <Tag>{tekst}</Tag>
    </Vis>);
};

Undertekst.propTypes = {
    Tag: PropTypes.string,
    tekst: PropTypes.string,
};

export default Undertekst;
