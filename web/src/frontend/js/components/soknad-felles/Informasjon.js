import React from 'react';
import PropTypes from 'prop-types';

const Informasjon = ({ sporsmalstekst, undertekst, children }) => {
    return (<div>
        <h3 className="skjema__sporsmal">{sporsmalstekst}</h3>
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={{ __html: undertekst }} />
        { children }
    </div>);
};

Informasjon.propTypes = {
    sporsmalstekst: PropTypes.string,
    undertekst: PropTypes.string,
    children: PropTypes.node,
};

export default Informasjon;
