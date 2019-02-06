import React from 'react';
import { getLedetekst, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../../components/Statuspanel';
import hentStatustekst from '../../utils/soknad-felles/hentSoknadStatustekst';
import hentSykepengetekst from '../../utils/soknad-felles/hentSykepengetekst';
import { soknad as soknadPt } from '../../propTypes';
import EndreSoknadContainer from '../../containers/sykepengesoknad-selvstendig/EndreSoknadContainer';

const StatusOgSykepengeopplysninger = ({ soknad }) => {
    return (<Statusopplysninger>
        <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
            <p>{hentStatustekst(soknad)}</p>
        </StatusNokkelopplysning>
        <StatusNokkelopplysning tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
            <p dangerouslySetInnerHTML={hentSykepengetekst(soknad)} />
        </StatusNokkelopplysning>
    </Statusopplysninger>);
};

StatusOgSykepengeopplysninger.propTypes = {
    soknad: soknadPt,
};

const SykepengesoknadStatuspanel = ({ soknad }) => {
    return (<Statuspanel enKolonne>
        <StatusOgSykepengeopplysninger soknad={soknad} />
        {
            soknad.status === sykepengesoknadstatuser.SENDT
                && <EndreSoknadContainer soknad={soknad} />
        }
    </Statuspanel>);
};

SykepengesoknadStatuspanel.propTypes = {
    soknad: soknadPt,
};

export default SykepengesoknadStatuspanel;
