import React, { PropTypes } from 'react';
import SykmeldingTeaser from './SykmeldingTeaser.js';

const SykmeldingTeasere = ({ sykmeldinger, ledetekster, className, tittel = '', ingenSykmeldingerMelding, id, children }) => {
    return (<div className="blokk-l">
        <header className="header-bolk">
            <h2 className="header-tittel">{tittel}</h2>
            {children}
        </header>
        <div id={id} className={className || 'js-content'}>
        {
            (sykmeldinger.length ? sykmeldinger.map((sykmelding, idx) => {
                return <SykmeldingTeaser key={idx} sykmelding={sykmelding} ledetekster={ledetekster} />;
            }) : <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>)
        }
        </div>
    </div>);
};

SykmeldingTeasere.propTypes = {
    sykmeldinger: PropTypes.array,
    ledetekster: PropTypes.object,
    className: PropTypes.string,
    tittel: PropTypes.string,
    ingenSykmeldingerMelding: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.object,
};

export default SykmeldingTeasere;
