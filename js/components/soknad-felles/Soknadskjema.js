import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, SykmeldingUtdrag } from '@navikt/digisyfo-npm';
import { childEllerChildren, soknad as soknadPt } from '../../propTypes';
import { settErOppdelt } from '../../utils/soknadSelvstendigUtils';
import Stegindikator, { frilanserOgSelvstendigUrler } from '../sykepengesoknad-felles/Stegindikator';
import KorrigerVarsel from '../sykepengesoknad-felles/KorrigerVarsel';
import { UTKAST_TIL_KORRIGERING } from '../../enums/soknadstatuser';
import Soknadtopp from './Soknadtopp';
import SykmeldingUtdragForSelvstendige from '../sykepengesoknad-selvstendig/SykmeldingUtdragForSelvstendige';
import { ARBEIDSTAKERE, SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import TidligSoknad from './TidligSoknad';

const SoknadskjemaSelvstendig = ({ children, aktivtSteg, tittel, soknad, sykmelding, intro = null }) => {
    const { _erOppdelt } = settErOppdelt(soknad, sykmelding);
    
    return (<div>
        <Soknadtopp
            soknad={soknad}
            sykmelding={sykmelding} />
        <Stegindikator aktivtSteg={aktivtSteg} soknadId={soknad.id} urler={frilanserOgSelvstendigUrler} />
        {soknad.status === UTKAST_TIL_KORRIGERING && <KorrigerVarsel />}
        <TidligSoknad soknad={soknad} />
        {intro}
        {sykmelding
        && soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE
        && <SykmeldingUtdragForSelvstendige
            sykmelding={sykmelding}
            erApen={aktivtSteg === '1'}
            erOppdelt={_erOppdelt} />}
        {sykmelding
        && soknad.soknadstype === ARBEIDSTAKERE
        && <SykmeldingUtdrag
            rootUrl="/sykefravaer"
            sykmelding={sykmelding}
            erApen={aktivtSteg === '1'}
            sykepengesoknad={{ _erOppdelt }} />}
        {tittel && <h2 className="soknad__stegtittel">{tittel}</h2>}
        {children}
    </div>);
};

SoknadskjemaSelvstendig.propTypes = {
    children: childEllerChildren,
    aktivtSteg: PropTypes.string,
    tittel: PropTypes.string,
    soknad: soknadPt,
    sykmelding: sykmeldingPt,
    intro: PropTypes.node,
};

export default SoknadskjemaSelvstendig;
