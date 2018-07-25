import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { soknad as soknadPt, skjemasvar as skjemasvarPt } from '../../../propTypes';
import Feilstripe from '../../../components/Feilstripe';
import Oppsummeringsvisning from '../../soknad-felles-oppsummering/Oppsummeringsvisning';
import StatuspanelUtland from '../SoknadstatuspanelUtland';
import Sidetopp from '../../Sidetopp';

const OppsummeringPanel = ({ soknad }) => {
    return (<div className="panel blokk">
        <div className="panel__tittel blokk--xs"> {getLedetekst('sykepengesoknad.oppsummering.undertittel')}</div>
        <Oppsummeringsvisning soknad={soknad} />
    </div>);
};

OppsummeringPanel.propTypes = {
    soknad: soknadPt,
};

export const SykepengesoknadUtlandOppsummeringSkjema = (props) => {
    const { soknad, sendingFeilet } = props;
    return (<div>
        <div className="blokk--xl">
            <Sidetopp tittel={getLedetekst('sykepengesoknad-utland.tittel')} />
        </div>
        <StatuspanelUtland sykepengesoknad={soknad} />
        <OppsummeringPanel soknad={soknad} />
        <Feilstripe vis={sendingFeilet} />
        <p className="ikke-print blokk navigasjonsstripe">
            <Link to="/sykefravaer/soknader" className="tilbakelenke">
                {getLedetekst('sykepengesoknad.navigasjon.gaa-til')}
            </Link>
        </p>
    </div>);
};

SykepengesoknadUtlandOppsummeringSkjema.propTypes = {
    soknad: soknadPt,
    sendingFeilet: PropTypes.bool,
};

const OppsummeringUtland = (props) => {
    const { soknad, handleSubmit, skjemasvar, actions, sendingFeilet } = props;
    return (
        <SykepengesoknadUtlandOppsummeringSkjema
            soknad={soknad}
            handleSubmit={handleSubmit}
            skjemasvar={skjemasvar}
            sendingFeilet={sendingFeilet}
            actions={actions} />);
};

OppsummeringUtland.propTypes = {
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
    sendingFeilet: PropTypes.bool,
};

export default OppsummeringUtland;
