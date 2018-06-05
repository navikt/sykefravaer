import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmelding as sykmeldingPt } from 'digisyfo-npm';
import Stegindikator, { frilanserOgSelvstendigUrler } from '../sykepengesoknad-felles/Stegindikator';
import { childEllerChildren, soknad as soknadPt } from '../../propTypes';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Sidetopp from '../Sidetopp';

const Soknadskjema = ({ children, aktivtSteg, tittel, soknad, sykmelding }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
        <Stegindikator aktivtSteg={aktivtSteg} soknadId={soknad.id} urler={frilanserOgSelvstendigUrler} />
        { sykmelding && <SykmeldingUtdrag sykmelding={sykmelding} erApen={aktivtSteg === '1'} /> }
        <h2 className="soknad__stegtittel">{tittel}</h2>
        {children}
    </div>);
};

Soknadskjema.propTypes = {
    children: childEllerChildren,
    aktivtSteg: PropTypes.string,
    tittel: PropTypes.string,
    soknad: soknadPt,
    sykmelding: sykmeldingPt,
};

export default Soknadskjema;
