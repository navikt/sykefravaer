import React from 'react';
import { getLedetekst, SykmeldingNokkelOpplysning } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';
import GjenapneSoknadContainer from '../../containers/sykepengesoknad-arbeidstaker/GjenapneSoknadContainer';

const UtgaattSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <div className="panel panel--komprimert blokk">
            <div>
                <div className="statusopplysninger">
                    <SykmeldingNokkelOpplysning Overskrift="h2" tittel={getLedetekst('sykepengesoknad.status-2.tittel')}>
                        <p>{getLedetekst('soknad.teaser.status.UTGAATT')}</p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </div>
            <GjenapneSoknadContainer sykepengesoknad={sykepengesoknad} tekst="Åpne søknad" />
        </div>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

UtgaattSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default UtgaattSoknad;
