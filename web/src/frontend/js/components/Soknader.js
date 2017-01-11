import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';

const Soknader = ({ ledetekster = {}, soknader = [] }) => {
    return (<div>
        <div className="sidetopp">
            <h1 className="sidetopp__tittel js-sidetittel">
                {getLedetekst('soknader.sidetittel', ledetekster)}
            </h1>
        </div>
    </div>);
};

Soknader.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    soknader: PropTypes.array,
};

export default Soknader;
