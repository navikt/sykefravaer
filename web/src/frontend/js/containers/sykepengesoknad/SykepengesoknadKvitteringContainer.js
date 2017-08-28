import React, { PropTypes } from 'react';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import { AVBRUTT, SLETTET_UTKAST } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import Feilmelding from '../../components/Feilmelding';
import { Standardkvittering } from '../../components/sykmelding/SykmeldingKvittering';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { Link } from 'react-router';

export const Controller = (props) => {
    if (props.sykepengesoknad.status === AVBRUTT || props.sykepengesoknad.status === SLETTET_UTKAST) {
        return (<div>
            <Standardkvittering
                tittel={getLedetekst('sykepengesoknad.avbryt.kvittering.tittel')}
                status={AVBRUTT}
                brodtekst={getHtmlLedetekst('sykepengesoknad.avbryt.kvittering.tekst')} />
                <p className="ikke-print blokk navigasjonsstripe">
                    <Link to="/sykefravaer/soknader">
                        {getLedetekst('sykepengesoknader.tilbake')}
                    </Link>
                </p>
            </div>);
    }
    return <Feilmelding melding="Er du sikker på at du er på riktig side?" />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.object,
};

const SykepengesoknadKvitteringContainer = ({ params }) => {
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknad',
        sti: `/soknader/${params.sykepengesoknadId}`,
        erKlikkbar: true,
    }, {
        tittel: 'Kvittering',
    }];
    return <GenerellSoknadContainer Component={Controller} brodsmuler={brodsmuler} params={params} />;
};

SykepengesoknadKvitteringContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default SykepengesoknadKvitteringContainer;
