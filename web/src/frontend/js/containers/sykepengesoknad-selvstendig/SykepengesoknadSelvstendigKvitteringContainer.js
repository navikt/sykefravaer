import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';
import setup from './sykepengesoknadSelvstendigSetup';
import Kvittering from '../../components/sykepengesoknad-selvstendig/Kvittering/Kvittering';
import { NY, SENDT, TIL_SENDING } from '../../enums/soknadstatuser';
import Feilmelding from '../../components/Feilmelding';
import { soknad as soknadPt } from '../../propTypes';
import Sidetopp from '../../components/Sidetopp';

const validate = () => {
    return {};
};

const SykepengesoknadSelvstendigKvitteringContainer = ({ soknad }) => {
    switch (soknad.status) {
        case NY: {
            return (<div>
                <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')} />
                <Feilmelding tittel={getLedetekst('soknad.kvittering.ugyldig.ny.tittel')}>
                    <span>
                        {getLedetekst('soknad.kvittering.ugyldig.ny.melding')} <Link
                            className="lenke"
                            to={`/sykefravaer/soknader/${soknad.id}`}>{getLedetekst('soknad.kvittering.ugyldig.ny.lenke')}</Link>
                    </span>
                </Feilmelding>
            </div>);
        }
        case SENDT:
        case TIL_SENDING: {
            return <Kvittering />;
        }
        default: {
            return <Feilmelding />;
        }
    }
};

SykepengesoknadSelvstendigKvitteringContainer.propTypes = {
    soknad: soknadPt,
};

export default setup(validate, SykepengesoknadSelvstendigKvitteringContainer, false);
