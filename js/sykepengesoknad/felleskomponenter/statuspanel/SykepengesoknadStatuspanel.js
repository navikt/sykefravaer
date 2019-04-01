import React from 'react';
import { getLedetekst, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../../../components/Statuspanel';
import hentSoknadStatustekst from '../../utils/hentSoknadStatustekst';
import hentSykepengetekst from '../../utils/hentSykepengetekst';
import { soknadPt } from '../../../propTypes/index';
import EndreSoknadContainer from '../endre-soknad/EndreSoknadContainer';
import ConnectedEttersending from '../ettersending/Ettersending';

const StatusOgSykepengeopplysninger = ({ soknad }) => {
    return (<Statusopplysninger>
        <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
            <p>{hentSoknadStatustekst(soknad)}</p>
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
        <ConnectedEttersending
            manglendeDato="sendtTilNAVDato"
            ledetekstKeySuffix="send-til-nav"
            sykepengesoknad={soknad} />
        <ConnectedEttersending
            manglendeDato="sendtTilArbeidsgiverDato"
            ledetekstKeySuffix="send-til-arbeidsgiver"
            sykepengesoknad={soknad} />
    </Statuspanel>);
};

SykepengesoknadStatuspanel.propTypes = {
    soknad: soknadPt,
};

export default SykepengesoknadStatuspanel;
