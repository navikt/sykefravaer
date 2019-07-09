import React from 'react';
import PropTypes from 'prop-types';
import { sykepengesoknad as sykepengesoknadPt, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import {
    FlereSoknader,
    KommendeSoknad,
    SoknadAvbruttBekreftelse,
    SokOmSykepengerNaa,
    PapirsoknadMelding,
    SoknadSendtBekreftelse,
    UtgaattSoknadBekreftelse,
} from './SykmeldingSoknadstatus';

const { NY, SENDT, FREMTIDIG, AVBRUTT, UTGAATT, TIL_SENDING } = sykepengesoknadstatuser;

const SykmeldingSoknadsinfo = ({ sykepengesoknader }) => {
    const el = (() => {
        if (sykepengesoknader.length === 0) {
            return <PapirsoknadMelding />;
        }
        if (sykepengesoknader.length > 1) {
            return <FlereSoknader sykepengesoknader={sykepengesoknader} />;
        }
        const soknad = sykepengesoknader[0];
        switch (soknad.status) {
            case NY: {
                return <SokOmSykepengerNaa sykepengesoknad={soknad} />;
            }
            case FREMTIDIG: {
                return <KommendeSoknad sykepengesoknad={soknad} />;
            }
            case SENDT:
            case TIL_SENDING: {
                return <SoknadSendtBekreftelse sykepengesoknad={soknad} />;
            }
            case UTGAATT: {
                return <UtgaattSoknadBekreftelse />;
            }
            case AVBRUTT: {
                return <SoknadAvbruttBekreftelse sykepengesoknad={soknad} />;
            }
            default: {
                return null;
            }
        }
    })();
    if (!el) {
        return null;
    }
    return (<div className="panel panel--komprimert blokk">
        {el}
    </div>);
};

SykmeldingSoknadsinfo.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export default SykmeldingSoknadsinfo;
