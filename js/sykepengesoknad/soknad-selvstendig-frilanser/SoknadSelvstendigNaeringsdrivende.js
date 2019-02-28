import React from 'react';
import PropTypes from 'prop-types';
import {
    AVBRUTT,
    KORRIGERT,
    NY,
    SENDT,
    UTKAST_TIL_KORRIGERING,
} from '../enums/soknadstatuser';
import beregnSteg, {
    AKTIVITETER_I_SYKMELDINGSPERIODEN,
    FOER_DU_BEGYNNER,
    FRAVAER_OG_FRISKMELDING,
    KVITTERING,
    OPPSUMMERING,
} from '../utils/beregnSteg';
import { soknadPt } from '../../propTypes';
import FoerDuBegynnerContainer from './for-du-begynner/FoerDuBegynnerContainer';
import FravaerOgFriskmeldingContainer from './fravar-og-friskmelding/FravaerOgFriskmeldingContainer';
import AktiviteterISykmeldingsperiodenContainer from './aktiviteter-i-sykmeldingsperioden/AktiviteterISykmeldingsperiodenContainer';
import OppsummeringContainer from './oppsummering/OppsummeringContainer';
import SendtSoknadSelvstendig from './SendtSoknadSelvstendig';
import AvbruttSoknadSelvstendig from './AvbruttSoknadSelvstendig';
import SoknadKvitteringSjekker from '../felleskomponenter/SoknadKvitteringSjekker';
import Feilmelding from '../../components/Feilmelding';

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
            return <SoknadKvitteringSjekker {...props} />;
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
                return <SoknadKvitteringSjekker {...props} />;
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
