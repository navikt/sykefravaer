import React from 'react';
import { getLedetekst, Varselstripe, SykmeldingNokkelOpplysning } from 'digisyfo-npm';
import SykmeldingUtdrag from './SykmeldingUtdrag';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import SykepengesoknadHeader from './SykepengesoknadHeader';

const AvbruttSoknad = ({ sykepengesoknad }) => {
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        <div className="panel panel--komprimert">
            <Varselstripe ikon="/sykefravaer/img/svg/avbryt-sykmelding.svg">
                <div className="statusopplysninger">
                    <SykmeldingNokkelOpplysning Overskrift="h2" tittel="Status">
                        <p>
                            {getLedetekst('sykepengesoknad.status.AVBRUTT')}
                        </p>
                    </SykmeldingNokkelOpplysning>
                </div>
            </Varselstripe>
        </div>
        <SykmeldingUtdrag sykepengesoknad={sykepengesoknad} erApen />
    </div>);
};

AvbruttSoknad.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default AvbruttSoknad;
