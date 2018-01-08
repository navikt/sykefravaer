import React from 'react';
import PropTypes from 'prop-types';
import SykmeldingUtdrag from 'digisyfo-npm';
import Stegindikator from './Stegindikator';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';

const SykepengerSkjema = ({ children, aktivtSteg, tittel, sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <Stegindikator aktivtSteg={aktivtSteg} sykepengesoknad={sykepengesoknad} />
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
