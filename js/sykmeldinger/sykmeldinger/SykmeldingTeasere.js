import React from 'react';
import PropTypes from 'prop-types';
import Sykmeldingteaser from './Sykmeldingteaser';
import { sykmelding as sykmeldingPt } from '../../propTypes';
import AvvistSykmeldingTeaser from './AvvistSykmeldingTeaser';
import { smSykmeldingerPt } from '../../propTypes/smSykmeldingProptypes';

const SykmeldingTeasere = ({ sykmeldinger, className, tittel = '', ingenSykmeldingerMelding, id, children, smSykmeldinger = [] }) => {
    return (<div className="blokk--l">
        <header className="inngangspanelerHeader">
            <h2 className="inngangspanelerHeader__tittel">{tittel}</h2>
            {children}
        </header>
        <div id={id} className={className || 'js-content'}>
            {
                (sykmeldinger.length > 0 || smSykmeldinger.length > 0
                    ? [...sykmeldinger, ...smSykmeldinger].map((sykmelding) => {
                        return sykmelding.status
                            ? <Sykmeldingteaser key={sykmelding.id} sykmelding={sykmelding} />
                            : <AvvistSykmeldingTeaser key={sykmelding.id} smSykmelding={sykmelding} />;
                    })
                    : <p className="panel typo-infotekst">{ingenSykmeldingerMelding}</p>)
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
    smSykmeldinger: smSykmeldingerPt,
};

export default SykmeldingTeasere;
