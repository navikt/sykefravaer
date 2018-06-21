import React from 'react';
import PropTypes from 'prop-types';
import Stegindikator from '../sykepengesoknad-felles/Stegindikator';
import { sykepengesoknad as sykepengesoknadPt, childEllerChildren } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';

const SykepengerSkjema = ({ children, aktivtSteg, tittel, sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <Stegindikator aktivtSteg={aktivtSteg} soknadId={sykepengesoknad.id} />
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} />
        <h2 className="soknad__stegtittel">{tittel}</h2>
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
