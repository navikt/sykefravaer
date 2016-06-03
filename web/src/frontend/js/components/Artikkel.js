import React, { PropTypes } from 'react';

const Artikkel = ({ tittel, innhold }) => {
    return (<article className="panel">
        <h1 className="artikkel-tittel">{tittel}</h1>
        <div className="redaksjonelt-innhold typo-infotekst side-innhold js-roller"
             dangerouslySetInnerHTML={{ __html: innhold }}/>
    </article>);
};

Artikkel.propTypes = {
    tittel: PropTypes.string,
    innhold: PropTypes.string,
};

export default Artikkel;
