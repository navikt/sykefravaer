import React from 'react';
import PropTypes from 'prop-types';
import Sykmeldingteaser from './Sykmeldingteaser';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import AvvistSykmeldingTeaser from './AvvistSykmeldingTeaser';
import { smSykmeldingPt } from '../../propTypes/smSykmeldingProptypes';

const SykmeldingTeasere = ({
    sykmeldinger, className, tittel = '', ingenSykmeldingerMelding, id, children,
}) => (
    <div className="blokk--l">
        <header className="inngangspanelerHeader">
            <h2 className="inngangspanelerHeader__tittel">{tittel}</h2>
            {children}
        </header>
        <div id={id} className={className || 'js-content'}>
            {
                sykmeldinger.length > 0
                    ? sykmeldinger.map(sykmelding => (sykmelding.mulighetForArbeid
                        ? <Sykmeldingteaser key={sykmelding.id} sykmelding={sykmelding} />
                        : <AvvistSykmeldingTeaser key={sykmelding.id} smSykmelding={sykmelding} />))
                    : <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>
            }
        </div>
    </div>
);

SykmeldingTeasere.propTypes = {
    sykmeldinger: PropTypes.arrayOf(PropTypes.oneOfType(sykmeldingPt, smSykmeldingPt)),
    className: PropTypes.string,
    tittel: PropTypes.string,
    ingenSykmeldingerMelding: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.element,
};

export default SykmeldingTeasere;
