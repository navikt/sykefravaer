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
        '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
        '%ORGNR%': formaterOrgnr(sykepengesoknad.arbeidsgiver.orgnummer),
        '%SENDTTILNAVDATO%': toDatePrettyPrint(sykepengesoknad.sendtTilNAVDato),
        '%SENDTTILARBEIDSGIVERDATO%': toDatePrettyPrint(sykepengesoknad.sendtTilArbeidsgiverDato),
    };
};

const getStatusTekst = (sykepengesoknad) => {
    const params = getParams(sykepengesoknad);
    switch (sykepengesoknad.status) {
        case SENDT: {
            return getLedetekst(`sykepengesoknad.status-2.SENDT${getSendtTilSuffix(sykepengesoknad)}`, params);
        }
        case TIL_SENDING: {
            return getLedetekst(`sykepengesoknad.status-2.TIL_SENDING${getSendtTilSuffix(sykepengesoknad)}`, params);
        }
        case KORRIGERT: {
            return getLedetekst('sykepengesoknad.status-2.KORRIGERT');
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
    return (<SykmeldingNokkelOpplysning Overskrift="h2" tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
        <p dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.sykepengeinfo${getSendtTilSuffix(sykepengesoknad)}`)} />
    </SykmeldingNokkelOpplysning>);
};

SykepengerInfo.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const SendtLikt = ({ sykepengesoknad }) => {
    const tekst = getStatusTekst(sykepengesoknad);
    return (<div className="statusopplysninger">
        <div Overskrift="h2" tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
            {
                sykepengesoknad.status === TIL_SENDING
                    ? (<div>
                        <span>{tekst}</span>{tilSendingHjelpetekst()}
                    </div>)
                    : <p>{tekst}</p>
            }
        </div>
        <SykepengerInfo sykepengesoknad={sykepengesoknad} />
    </div>);
};

SendtLikt.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const SendtUlikt = ({ sykepengesoknad }) => {
    const params = getParams(sykepengesoknad);
    return (<div className="statusopplysninger">
        <SykmeldingNokkelOpplysning Overskrift="h2" tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
            <p>
                {getLedetekst('sykepengesoknad.status-2.SENDT.til-nav', params)}<br />
                {getLedetekst('sykepengesoknad.status-2.SENDT.til-arbeidsgiver', params)}
            </p>
        </SykmeldingNokkelOpplysning>
        <SykepengerInfo sykepengesoknad={sykepengesoknad} />
    </div>);
};

SendtUlikt.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const Statuspanel = ({ sykepengesoknad, children }) => {
    return (<div className="panel panel--komprimert blokk">
        {
            (() => {
                if (erSendtTilBeggeMenIkkeSamtidig(sykepengesoknad)) {
                    return <SendtUlikt sykepengesoknad={sykepengesoknad} />;
                }
                return <SendtLikt sykepengesoknad={sykepengesoknad} />;
            })()
        }
        {children}
    </div>);
};

Statuspanel.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    children: PropTypes.node,
};

export default Statuspanel;
