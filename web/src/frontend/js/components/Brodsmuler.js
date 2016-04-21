import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';

const Brodsmuler = ({ brodsmuler }) => {
    return (<nav role="navigation" className="brodsmuler blokk" aria-label="Du er her: ">
        <img src="/sykefravaer/img/svg/account-circle.svg" alt="Du" className="brodsmuler-ikon" />
        <a href="/dittnav" className="lenke-fremhevet">Ditt NAV</a><span className="brodsmule-skille"> / </span>
        {brodsmuler.map((smule, idx) => {
            return (smule.erKlikkbar ? <span key={idx}>
                <Link to={getContextRoot() + smule.sti} className="lenke-fremhevet">{smule.tittel}</Link>
                <span className="brodsmule-skille"> / </span>
                </span> : <span key={idx}>{smule.tittel}</span>);
        })}
        </nav>
    );
};

Brodsmuler.propTypes = {
    brodsmuler: PropTypes.array,
};

export default Brodsmuler;
