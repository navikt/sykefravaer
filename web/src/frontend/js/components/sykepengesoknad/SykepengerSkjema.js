import React, { PropTypes } from 'react';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Sidetopp from '../Sidetopp';
import Stegindikator from './Stegindikator';

const SykepengerSkjema = ({ children, aktivtSteg, tittel, sykepengesoknad, ledetekster }) => {
    return (<div>
        <Sidetopp tittel="Søknad om sykepenger" />
        <Stegindikator aktivtSteg={aktivtSteg} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
        <h2 className="sykepenger__stegtittel">{tittel}</h2>
        {children}
    </div>);
};

SykepengerSkjema.propTypes = {
    children: PropTypes.element.isRequired,
    aktivtSteg: PropTypes.string,
    tittel: PropTypes.string,
    apentUtdrag: PropTypes.bool,
};

export default SykepengerSkjema;
