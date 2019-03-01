import React from 'react';
import PropTypes from 'prop-types';
import Sykmeldingteaser from './Sykmeldingteaser';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const SykmeldingTeasere = ({ sykmeldinger, className, tittel = '', ingenSykmeldingerMelding, id, children }) => {
    return (<div className="blokk--l">
        <header className="inngangspanelerHeader">
            <h2 className="inngangspanelerHeader__tittel">{tittel}</h2>
            {children}
        </header>
        <div id={id} className={className || 'js-content'}>
            {
                (sykmeldinger.length ? sykmeldinger.map((sykmelding, idx) => {
                    return <Sykmeldingteaser key={idx} sykmelding={sykmelding} />;
                }) : <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>)
            }
        </div>
    </div>);
};

SykmeldingTeasere.propTypes = {
    sykmeldinger: PropTypes.arrayOf(sykmeldingPt),
    className: PropTypes.string,
    tittel: PropTypes.string,
    ingenSykmeldingerMelding: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.element,
};

export default SykmeldingTeasere;
