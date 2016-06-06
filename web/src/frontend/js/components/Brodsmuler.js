import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../routers/paths.js';

const Brodsmuler = ({ brodsmuler }) => {
    return (<nav role="navigation" className="brodsmuler blokk side-innhold" aria-label="Du er her: ">
        <img src="/sykefravaer/img/svg/account-circle.svg" alt="Du" className="brodsmuler-ikon" />
        <img src="/sykefravaer/img/svg/account-circle-highcontrast.svg" alt="Du" className="brodsmuler-ikon brodsmuler-ikon-hoykontrast" />
        <a href="/dittnav" className="js-smule">Ditt NAV</a>
        {brodsmuler.length ? <span className="brodsmule-skille"> / </span> : ''}
        {brodsmuler.map((smule, idx) => {
            if(brodsmuler.length === idx + 1) {
                return <span key={idx} className="js-smule"><span className="vekk">Du er her:</span> {smule.tittel}</span>
            } else if (smule.erKlikkbar) {
                return (<span key={idx}>
                    <Link className="js-smule" to={getContextRoot() + smule.sti}>{smule.tittel}</Link>
                    <span className="brodsmule-skille"> / </span>
                </span>);
            } else {
                return (<span key={idx}>
                    {smule.tittel}
                    <span className="brodsmule-skille"> / </span>
                </span>)
            }
        })}
        </nav>
    );
};

Brodsmuler.propTypes = {
    brodsmuler: PropTypes.array,
};

export default Brodsmuler;
