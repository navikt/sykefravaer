import React from 'react';
import {
    SykmeldingNokkelOpplysning,
    toDatePrettyPrint,
    getLedetekst,
    sykepengesoknadstatuser,
} from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

const { SENDT, TIL_SENDING } = sykepengesoknadstatuser;

const getStatusTekst = (sykepengesoknad) => {
    switch (sykepengesoknad.status) {
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

const SendtDato = ({ sykepengesoknad }) => {
    return (<SykmeldingNokkelOpplysning
        className="nokkelopplysning--statusopplysning"
        Overskrift="h2"
        tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel.dato')}>
        <p>{toDatePrettyPrint(sykepengesoknad.sendtTilNavDato)}</p>
    </SykmeldingNokkelOpplysning>
    );
};

SendtDato.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const SendtLikt = ({ sykepengesoknad }) => {
    const tekst = getStatusTekst(sykepengesoknad);
    return (<div className="statusopplysninger">
        <SykmeldingNokkelOpplysning
            className="nokkelopplysning--statusopplysning"
            Overskrift="h2"
            tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
            {
                sykepengesoknad.status === TIL_SENDING
                    ? (<div>
                        <span>{tekst}</span>{tilSendingHjelpetekst()}
                    </div>)
                    : <p>{tekst}</p>
            }
        </SykmeldingNokkelOpplysning>
        <SendtDato sykepengesoknad={sykepengesoknad} />
    </div>);
};

SendtLikt.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const StatuspanelUtland = ({ sykepengesoknad }) => {
    return (<div className="panel panel--komprimert blokk">
        <SendtLikt sykepengesoknad={sykepengesoknad} />
    </div>);
};

StatuspanelUtland.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default StatuspanelUtland;
