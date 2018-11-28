import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
import GenerellSoknadContainer from './GenerellArbeidstakersoknadContainer';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import Feilmelding from '../../components/Feilmelding';
import Standardkvittering from '../../components/sykmeldingkvittering/StandardSykmeldingkvittering';

const { AVBRUTT, SLETTET_UTKAST } = sykepengesoknadstatuser;

export const Controller = (props) => {
    if (props.sykepengesoknad.status === AVBRUTT || props.sykepengesoknad.status === SLETTET_UTKAST) {
        return (<div>
            <Standardkvittering
                tittel={getLedetekst('sykepengesoknad.avbryt.kvittering.tittel')}
                status={AVBRUTT}
                brodtekst={getHtmlLedetekst('sykepengesoknad.avbryt.kvittering.tekst')} />
            <p className="ikke-print blokk navigasjonsstripe">
                <Link to={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader`} className="tilbakelenke">
                    {getLedetekst('sykepengesoknader.tilbake')}
                </Link>
            </p>
        </div>);
    }
    return <Feilmelding melding="Er du sikker på at du er på riktig side?" />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

const SykepengesoknadKvitteringContainer = ({ params }) => {
    return <GenerellSoknadContainer Component={Controller} params={params} />;
};

SykepengesoknadKvitteringContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default SykepengesoknadKvitteringContainer;
