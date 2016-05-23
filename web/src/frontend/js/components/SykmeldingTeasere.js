import React, { PropTypes } from 'react';
import SykmeldingTeaser from './SykmeldingTeaser.js';
import SykmeldingerSorteringContainer from '../containers/SykmeldingerSorteringContainer.js';

const SykmeldingTeasere = ({ sykmeldinger, ledetekster, className, tittel = '', ingenSykmeldingerMelding, id }) => {
    return (<div className="blokk-l">
        {
            tittel !== '' ? (<header className="header-bolk"><h2 className="header-tittel">{tittel}</h2><SykmeldingerSorteringContainer /></header>) : ''
        }
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
};

export default SykmeldingTeasere;
