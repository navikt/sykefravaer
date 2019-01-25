import React from 'react';
import {
    tilLesbarDatoMedArstall,
    getLedetekst,
    sykepengesoknadstatuser,
} from '@navikt/digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { soknad as soknadPt } from '../../propTypes';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';

const { SENDT, TIL_SENDING } = sykepengesoknadstatuser;

const getStatusTekst = (soknad) => {
    switch (soknad.status) {
        case SENDT: {
            return getLedetekst('sykepengesoknad-utland.status.sendt');
        }
        case TIL_SENDING: {
            return getLedetekst('sykepengesoknad-utland.status.til-sending');
        }
        default: {
            return 'Ukjent status';
        }
    }
};

export const tilSendingHjelpetekst = () => {
    return (<Hjelpetekst>{getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tekst')}</Hjelpetekst>);
};

const SendtDato = ({ soknad }) => {
    return (<StatusNokkelopplysning
        tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel.dato')}>
        <p>{tilLesbarDatoMedArstall(soknad.innsendtDato)}</p>
    </StatusNokkelopplysning>);
};

SendtDato.propTypes = {
    soknad: soknadPt,
};

const StatuspanelUtland = ({ soknad }) => {
    const tekst = getStatusTekst(soknad);
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning
                tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
                {
                    soknad.status === TIL_SENDING
                        ? (<div>
                            <span>{tekst}</span>{tilSendingHjelpetekst()}
                        </div>)
                        : <p>{tekst}</p>
                }
            </StatusNokkelopplysning>
            <SendtDato soknad={soknad} />
        </Statusopplysninger>
    </Statuspanel>);
};

StatuspanelUtland.propTypes = {
    soknad: soknadPt,
};

export default StatuspanelUtland;
