import React, { PropTypes } from 'react';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Sidetopp from '../Sidetopp';
import Stegindikator from './Stegindikator';
import { getLedetekst } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const SykepengerSkjema = ({ children, aktivtSteg, tittel, sykepengesoknad }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        <Stegindikator aktivtSteg={aktivtSteg} />
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} />
        <h2 className="sykepenger__stegtittel">{tittel}</h2>
        {children}
    </div>);
};

SykepengerSkjema.propTypes = {
    children: PropTypes.element.isRequired,
    aktivtSteg: PropTypes.string,
    tittel: PropTypes.string,
    sykepengesoknad: sykepengesoknadPt,
};

export default SykepengerSkjema;
