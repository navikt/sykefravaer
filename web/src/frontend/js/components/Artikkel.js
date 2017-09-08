import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Artikkel = ({ tittel, innhold }) => {
    return (<article className="panel">
        <header className="artikkel__header">
            <div className="artikkel__meta">
                <Link to="/sykefravaer" className="artikkel__tilbake">Tilbake</Link>
            </div>
            <h1 className="artikkel__tittel">{tittel}</h1>
        </header>

        <div className="artikkel__innhold js-roller"
            dangerouslySetInnerHTML={{ __html: innhold }} />

        <footer className="artikkel__footer">
            <Link to="/sykefravaer" className="artikkel__tilbake">Tilbake</Link>
        </footer>
    </article>);
};

Artikkel.propTypes = {
    tittel: PropTypes.string,
    innhold: PropTypes.string,
};

export default Artikkel;
