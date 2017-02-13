import React, { PropTypes } from 'react';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Sidetopp from '../Sidetopp';
import Stegindikator from './Stegindikator';
import { getLedetekst } from 'digisyfo-npm';

const SykepengerSkjema = ({ children, aktivtSteg, tittel, sykepengesoknad, ledetekster }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel', ledetekster)} />
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
    sykepengesoknad: PropTypes.object,
    ledetekster: PropTypes.object,
};

export default SykepengerSkjema;
