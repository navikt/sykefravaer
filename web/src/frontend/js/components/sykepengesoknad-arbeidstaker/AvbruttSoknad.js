import React from 'react';
import { getLedetekst, SykmeldingNokkelOpplysning, toDatePrettyPrint, sykepengesoknadstatuser } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';
import SykmeldingUtdragContainer from '../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';
import GjenapneSoknadContainer from '../../containers/sykepengesoknad-arbeidstaker/GjenapneSoknadContainer';

const AvbruttSoknad = (props) => {
    const { sykepengesoknad } = props;
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <div className="panel panel--komprimert">
            <div>
                <div className="statusopplysninger">
                    <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel="Status">
                        <p>
                            {getLedetekst(`sykepengesoknad.status.${sykepengesoknad.status}`)}
                        </p>
                    </SykmeldingNokkelOpplysning>
                    <SykmeldingNokkelOpplysning className="nokkelopplysning--statusopplysning" Overskrift="h2" tittel="Dato avbrutt">
                        <p>
                            {toDatePrettyPrint(sykepengesoknad.avbruttDato)}
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </div>
            { sykepengesoknad.status === sykepengesoknadstatuser.AVBRUTT && <GjenapneSoknadContainer {...props} /> }
        </div>
        <SykmeldingUtdragContainer sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AvbruttSoknad;
