import React from 'react';
import PropTypes from 'prop-types';
import { SykmeldingNokkelOpplysning, toDatePrettyPrint, getLedetekst, getHtmlLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { erSendtTilBeggeMenIkkeSamtidig, getSendtTilSuffix } from '../../utils/sykepengesoknadUtils';
import { formaterOrgnr } from '../../utils';

const { SENDT, TIL_SENDING, KORRIGERT } = sykepengesoknadstatuser;

const getParams = (sykepengesoknad) => {
    return {
        '%SENDTTILNAVDATO%': toDatePrettyPrint(sykepengesoknad.sendtTilNAVDato)
    };
};

const getStatusTekst = (sykepengesoknad) => {
    switch (sykepengesoknad.status) {
        case SENDT: {
            return getLedetekst("sykepengesoknad-utland.status-2.sendt");
        }
        case TIL_SENDING: {
            return getLedetekst("sykepengesoknad-utland.status-2.til-sending");
        }
        //TODO: KORRIGERT?
        case KORRIGERT: {
            return getLedetekst('sykepengesoknad-utland.status-2.korrigert');
        }
        default: {
            return 'Ukjent status';
        }
    }
};

export const tilSendingHjelpetekst = () => {
    return (<Hjelpetekst>{getLedetekst('sykepengesoknad.til-sending.hjelpetekst.tekst')}</Hjelpetekst>);
};

const SykepengerInfo = ({ sykepengesoknad }) => {
    return (<SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
        <p dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.sykepengeinfo${getSendtTilSuffix(sykepengesoknad)}`)} />
    </SykmeldingNokkelOpplysning>);
};

SykepengerInfo.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const SendtLikt = ({ sykepengesoknad }) => {
    const tekst = getStatusTekst(sykepengesoknad);
    return (<div className="statusopplysninger">
        <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
            {
                sykepengesoknad.status === TIL_SENDING
                    ? (<div>
                        <span>{tekst}</span>{tilSendingHjelpetekst()}
                    </div>)
                    : <p>{tekst}</p>
            }
        </SykmeldingNokkelOpplysning>
        <SykepengerInfo sykepengesoknad={sykepengesoknad} />
    </div>);
};

SendtLikt.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const StatuspanelUtland = ({ sykepengesoknad, children }) => {
    //TODO: OVERSKRIV OPPRETTET DATO VED SENDING?
    console.log("jau", sykepengesoknad);
    return (<div className="panel panel--komprimert blokk">
        {
            <SendtLikt sykepengesoknad={sykepengesoknad} />
        }
        {children}
    </div>);
};

StatuspanelUtland.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    children: PropTypes.node,
};

export default StatuspanelUtland;
