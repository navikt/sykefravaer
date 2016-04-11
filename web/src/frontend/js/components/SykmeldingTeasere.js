import React, { PropTypes } from 'react';
import SykmeldingTeaser from './SykmeldingTeaser.js';

const SykmeldingTeasere = ({ sykmeldinger, ledetekster, className, tittel = '', ingenSykmeldingerMelding }) => {
    return (<div className="blokk-l">
        {
            tittel !== '' ? (<div className="panel panel-modulheader">
                <h2>{tittel}</h2>
            </div>) : ''
        }
        <div className={className || 'js-content'}>
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
};

export default SykmeldingTeasere;
