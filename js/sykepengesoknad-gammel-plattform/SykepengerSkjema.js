import React from 'react';
import PropTypes from 'prop-types';
import Stegindikator from '../components/soknad-felles/Stegindikator';
import { sykepengesoknad as sykepengesoknadPt, childEllerChildren } from '../propTypes/index';
import SykepengesoknadHeader from '../components/soknad-felles/SykepengesoknadHeader';
import SykmeldingUtdragContainer from './SykmeldingUtdragContainer';

const SykepengerSkjema = ({ children, aktivtSteg, tittel, sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <Stegindikator aktivtSteg={aktivtSteg} soknadId={sykepengesoknad.id} />
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} />
        { tittel && <h2 className="soknad__stegtittel">{tittel}</h2> }
        {children}
    </div>);
};

SykepengerSkjema.propTypes = {
    children: childEllerChildren,
    aktivtSteg: PropTypes.string,
    tittel: PropTypes.string,
    sykepengesoknad: sykepengesoknadPt,
};

export default SykepengerSkjema;
