import React from 'react';
import PropTypes from 'prop-types';
import { childEllerChildren } from '../../propTypes';

const OppsummeringSporsmalstekst = ({ overskriftsnivaa = 3, children }) => {
    const Overskriftstag = `h${overskriftsnivaa}`;
    return <Overskriftstag className="oppsummering__sporsmal">{children}</Overskriftstag>;
};

OppsummeringSporsmalstekst.propTypes = {
    overskriftsnivaa: PropTypes.number,
    children: childEllerChildren,
};

export default OppsummeringSporsmalstekst;
