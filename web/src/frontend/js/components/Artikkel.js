import React, { PropTypes } from 'react';

const Artikkel = ({ tittel, innhold }) => {
    return (<article className="panel">
        <h1 className="artikkel__tittel">{tittel}</h1>
        <div className="redaksjonelt-innhold typo-infotekst js-roller"
            dangerouslySetInnerHTML={{ __html: innhold }} />
    </article>);
};

Artikkel.propTypes = {
    tittel: PropTypes.string,
    innhold: PropTypes.string,
};

export default Artikkel;
