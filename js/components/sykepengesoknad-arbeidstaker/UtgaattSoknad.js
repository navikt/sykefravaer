import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from '../soknad-felles/SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';
import GjenapneSoknadContainer from '../../containers/sykepengesoknad-arbeidstaker/GjenapneSoknadContainer';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';

const UtgaattSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <Statuspanel>
            <Statusopplysninger>
                <StatusNokkelopplysning tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
                    <p>{getLedetekst('soknad.teaser.status.UTGAATT')}</p>
                </StatusNokkelopplysning>
            </Statusopplysninger>
            <GjenapneSoknadContainer sykepengesoknad={sykepengesoknad} tekst="Åpne søknad" />
        </Statuspanel>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
