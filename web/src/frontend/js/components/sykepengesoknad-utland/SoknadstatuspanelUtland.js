import React from 'react';
import {
    SykmeldingNokkelOpplysning,
    toDatePrettyPrint,
    getLedetekst,
    sykepengesoknadstatuser,
} from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { soknad as soknadPt } from '../../propTypes';

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
    return (<SykmeldingNokkelOpplysning
        className="nokkelopplysning--statusopplysning"
        Overskrift="h2"
        tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel.dato')}>
        <p>{toDatePrettyPrint(soknad.sendtTilNavDato)}</p>
    </SykmeldingNokkelOpplysning>
    );
};

SendtDato.propTypes = {
    soknad: soknadPt,
};

const SendtLikt = ({ soknad }) => {
    const tekst = getStatusTekst(soknad);
    return (<div className="statusopplysninger">
        <SykmeldingNokkelOpplysning
            className="nokkelopplysning--statusopplysning"
            Overskrift="h2"
            tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
            {
                soknad.status === TIL_SENDING
                    ? (<div>
                        <span>{tekst}</span>{tilSendingHjelpetekst()}
                    </div>)
                    : <p>{tekst}</p>
            }
        </SykmeldingNokkelOpplysning>
        <SendtDato soknad={soknad} />
    </div>);
};

SendtLikt.propTypes = {
    soknad: soknadPt,
};

const StatuspanelUtland = ({ soknad }) => {
    const tekst = getStatusTekst(soknad);
    return (<div className="panel panel--komprimert blokk">
        <div className="statusopplysninger">
            <SykmeldingNokkelOpplysning
                className="nokkelopplysning--statusopplysning"
                Overskrift="h2"
                tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
                {
                    soknad.status === TIL_SENDING
                        ? (<div>
                            <span>{tekst}</span>{tilSendingHjelpetekst()}
                        </div>)
                        : <p>{tekst}</p>
                }
            </SykmeldingNokkelOpplysning>
            <SendtDato soknad={soknad} />
        </div>
    </div>);
};

StatuspanelUtland.propTypes = {
    soknad: soknadPt,
};

export default StatuspanelUtland;
