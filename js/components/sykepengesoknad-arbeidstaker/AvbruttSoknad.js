import React from 'react';
import { getLedetekst, tilLesbarDatoMedArstall, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from '../soknad-felles/SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';
import GjenapneSoknadContainer from '../../containers/sykepengesoknad-arbeidstaker/GjenapneSoknadContainer';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';

const AvbruttSoknad = (props) => {
    const { sykepengesoknad } = props;
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <Statuspanel>
            <Statusopplysninger>
                <StatusNokkelopplysning tittel="Status">
                    <p>
                        {getLedetekst(`sykepengesoknad.status.${sykepengesoknad.status}`)}
                    </p>
                </StatusNokkelopplysning>
                <StatusNokkelopplysning tittel="Dato avbrutt">
                    <p>
                        {tilLesbarDatoMedArstall(sykepengesoknad.avbruttDato)}
                    </p>
                </StatusNokkelopplysning>
            </Statusopplysninger>
            { sykepengesoknad.status === sykepengesoknadstatuser.AVBRUTT && <GjenapneSoknadContainer {...props} /> }
        </Statuspanel>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AvbruttSoknad;
