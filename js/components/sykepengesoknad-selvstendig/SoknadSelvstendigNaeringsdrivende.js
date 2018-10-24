import React from 'react';
import PropTypes from 'prop-types';
import {
    AVBRUTT,
    KORRIGERT,
    NY,
    SENDT,
    UTKAST_TIL_KORRIGERING,
} from '../../enums/soknadstatuser';
import beregnSteg, {
    AKTIVITETER_I_SYKMELDINGSPERIODEN,
    FOER_DU_BEGYNNER,
    FRAVAER_OG_FRISKMELDING,
    KVITTERING,
    OPPSUMMERING,
} from '../../utils/soknad-felles/beregnSteg';
import { soknad as soknadPt } from '../../propTypes';
import FoerDuBegynnerContainer from '../../containers/sykepengesoknad-selvstendig/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from '../../containers/sykepengesoknad-selvstendig/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from '../../containers/sykepengesoknad-selvstendig/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from '../../containers/sykepengesoknad-selvstendig/OppsummeringContainer';
import KvitteringSelvstendigContainer from '../../containers/sykepengesoknad-selvstendig/SykepengesoknadSelvstendigKvitteringContainer';
import SendtSoknadSelvstendig from './SendtSoknadSelvstendig';
import Feilmelding from '../Feilmelding';
import AvbruttSoknadSelvstendig from './AvbruttSoknadSelvstendig';

export const SykepengeskjemaForSelvstendige = (props) => {
    switch (beregnSteg(props.sti)) {
        case FOER_DU_BEGYNNER: {
            return <FoerDuBegynnerContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <FravaerOgFriskmeldingContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <AktiviteterISykmeldingsperiodenContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <OppsummeringContainer {...props} />;
        }
        case KVITTERING: {
            return <KvitteringSelvstendigContainer {...props} />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SykepengeskjemaForSelvstendige.propTypes = {
    sti: PropTypes.string,
};

const SoknadSelvstendigNaeringsdrivende = (props) => {
    const { soknad, sti } = props;
    switch (soknad.status) {
        case NY:
        case UTKAST_TIL_KORRIGERING: {
            return <SykepengeskjemaForSelvstendige {...props} />;
        }
        case SENDT:
        case KORRIGERT: {
            if (beregnSteg(sti) === KVITTERING) {
                return <KvitteringSelvstendigContainer {...props} />;
            }
            return <SendtSoknadSelvstendig {...props} />;
        }
        case AVBRUTT: {
            return <AvbruttSoknadSelvstendig {...props} />;
        }
        default: {
            return <Feilmelding melding="Søknaden har ukjent status" />;
        }
    }
};

SoknadSelvstendigNaeringsdrivende.propTypes = {
    sti: PropTypes.string,
    soknad: soknadPt,
};

export default SoknadSelvstendigNaeringsdrivende;
