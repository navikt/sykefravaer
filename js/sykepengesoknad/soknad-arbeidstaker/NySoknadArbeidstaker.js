import React from 'react';
import PropTypes from 'prop-types';
import beregnSteg, { AKTIVITETER_I_SYKMELDINGSPERIODEN, ETT_SPORSMAL_PER_SIDE, FOER_DU_BEGYNNER, FRAVAER_OG_FRISKMELDING, KVITTERING, OPPSUMMERING } from '../utils/beregnSteg';
import NyFoerDuBegynnerArbeidstakerContainer from './for-du-begynner/NyFoerDuBegynnerArbeidstakerContainer';
import NyFravaerOgFriskmeldingArbeidstakerContainer from './fravar-og-friskmelding/NyFravaerOgFriskmeldingArbeidstakerContainer';
import NyAktiviteterISykmeldingsperiodenArbeidstakerContainer from './aktiviteter-i-sykmeldingsperioden/NyAktiviteterISykmeldingsperiodenArbeidstakerContainer';
import NyOppsummeringArbeidstakerContainer from './oppsummering/NyOppsummeringArbeidstakerContainer';
import SoknadKvitteringSjekker from '../felleskomponenter/SoknadKvitteringSjekker';
import { soknadPt } from '../../propTypes';
import { AVBRUTT, KORRIGERT, NY, SENDT, UTKAST_TIL_KORRIGERING } from '../enums/soknadstatuser';
import NySendtSoknadArbeidstaker from './NySendtSoknadArbeidstaker';
import Feilmelding from '../../components/Feilmelding';
import AvbruttSoknadArbeidstaker from './AvbruttSoknadArbeidstaker';
import EttSporsmalPerSideContainer from './ett-sporsmal-per-side/EttSporsmalPerSideContainer';

const NySoknadArbeidstakerSkjema = (props) => {
    const { sti } = props;
    const steg = beregnSteg(sti);
    switch (steg) {
        case FOER_DU_BEGYNNER: {
            return <NyFoerDuBegynnerArbeidstakerContainer {...props} />;
        }
        case FRAVAER_OG_FRISKMELDING: {
            return <NyFravaerOgFriskmeldingArbeidstakerContainer {...props} />;
        }
        case AKTIVITETER_I_SYKMELDINGSPERIODEN: {
            return <NyAktiviteterISykmeldingsperiodenArbeidstakerContainer {...props} />;
        }
        case OPPSUMMERING: {
            return <NyOppsummeringArbeidstakerContainer {...props} />;
        }
        case KVITTERING: {
            return <SoknadKvitteringSjekker soknad={props.soknad} />;
        }
        case ETT_SPORSMAL_PER_SIDE: {
            return <EttSporsmalPerSideContainer {...props} />;
        }
        default: {
            return null;
        }
    }
};

NySoknadArbeidstakerSkjema.propTypes = {
    sti: PropTypes.string,
    soknad: soknadPt,
};

const NySoknadArbeidstaker = (props) => {
    const { soknad, sti } = props;
    switch (soknad.status) {
        case NY:
        case UTKAST_TIL_KORRIGERING: {
            return <NySoknadArbeidstakerSkjema {...props} />;
        }
        case SENDT:
        case KORRIGERT: {
            if (beregnSteg(sti) === KVITTERING) {
                return <SoknadKvitteringSjekker {...props} />;
            }
            return <NySendtSoknadArbeidstaker {...props} />;
        }
        case AVBRUTT: {
            return <AvbruttSoknadArbeidstaker {...props} />;
        }
        default: {
            return <Feilmelding melding="Søknaden har ukjent status" />;
        }
    }
};

NySoknadArbeidstaker.propTypes = {
    sti: PropTypes.string,
    soknad: soknadPt,
};

export default NySoknadArbeidstaker;
