import React from 'react';
import PropTypes from 'prop-types';

const Tomtsporsmal = ({ sporsmalstekst, undertekst, children }) => {
    return (<div>
        <h3 className="skjema__sporsmal">{sporsmalstekst}</h3>
        <div dangerouslySetInnerHTML={{ __html: undertekst }} />
        { children }
    </div>);
};

Tomtsporsmal.propTypes = {
    sporsmalstekst: PropTypes.string,
    undertekst: PropTypes.string,
    children: PropTypes.node,
};

export default Tomtsporsmal;
