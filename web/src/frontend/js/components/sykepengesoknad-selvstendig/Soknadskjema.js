import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt } from 'digisyfo-npm';
import Stegindikator, { frilanserOgSelvstendigUrler } from '../sykepengesoknad-felles/Stegindikator';
import { childEllerChildren, soknad as soknadPt } from '../../propTypes';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import Soknadtopp from './Soknadtopp';
import { settErOppdelt } from '../../utils/soknadSelvstendigUtils';

const Soknadskjema = ({ children, aktivtSteg, tittel, soknad, sykmelding, intro = null }) => {
    const { _erOppdelt } = settErOppdelt(soknad, sykmelding);

    return (<div>
        <Soknadtopp
            soknad={soknad}
            sykmelding={sykmelding} />
        <Stegindikator aktivtSteg={aktivtSteg} soknadId={soknad.id} urler={frilanserOgSelvstendigUrler} />
        {intro}
        { sykmelding && <SykmeldingUtdrag sykmelding={sykmelding} erApen={aktivtSteg === '1'} erOppdelt={_erOppdelt} /> }
        { tittel && <h2 className="soknad__stegtittel">{tittel}</h2> }
        {children}
    </div>);
};

Soknadskjema.propTypes = {
    children: childEllerChildren,
    aktivtSteg: PropTypes.string,
    tittel: PropTypes.string,
    soknad: soknadPt,
    sykmelding: sykmeldingPt,
    intro: PropTypes.node,
};

export default Soknadskjema;
