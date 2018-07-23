import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, getLedetekst, Utvidbar } from 'digisyfo-npm';
import { soknad as soknadPt, skjemasvar as skjemasvarPt } from '../../../propTypes';
import Feilstripe from '../../../components/Feilstripe';
import Oppsummeringsvisning from '../../soknad-felles-oppsummering/Oppsummeringsvisning';
import StatuspanelUtland from "../SoknadstatuspanelUtland";

const OppsummeringUtvidbar = ({ soknad }) => {
    return (<div className="panel blokk" tittel={getLedetekst('sykepengesoknad.sidetittel')}>
        <Oppsummeringsvisning soknad={soknad} />
    </div>);
};

OppsummeringUtvidbar.propTypes = {
    soknad: soknadPt,
};

export const hentSporsmalForOppsummering = (soknad) => {
    return soknad.sporsmal;
};

export const SykepengesoknadUtlandOppsummeringSkjema = (props) => {
    const { handleSubmit, soknad, skjemasvar, actions, sender, sendingFeilet } = props;
    console.log("eg trynar ikkje ennau");
    console.log(soknad);

    const sporsmal = hentSporsmalForOppsummering(soknad);
    console.log(sporsmal);
    return (<form className="soknadskjema" id="oppsummering-skjema" >
        <StatuspanelUtland sykepengesoknad={soknad}>
        </StatuspanelUtland>
        <div className="bekreftet-container blokk">
            <OppsummeringUtvidbar soknad={soknad} />
        </div>
        <Feilstripe vis={sendingFeilet} />
    </form>);
};

SykepengesoknadUtlandOppsummeringSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
    sender: PropTypes.bool,
    sendingFeilet: PropTypes.bool,
};

const OppsummeringUtland = (props) => {
    const { sykmelding, soknad, handleSubmit, skjemasvar, actions, sendingFeilet } = props;
    return (
        <SykepengesoknadUtlandOppsummeringSkjema
            soknad={soknad}
            handleSubmit={handleSubmit}
            skjemasvar={skjemasvar}
            sendingFeilet={sendingFeilet}
            actions={actions} />);
};

OppsummeringUtland.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    skjemasvar: skjemasvarPt,
    actions: PropTypes.shape({
        sendSoknad: PropTypes.func,
    }),
    sendingFeilet: PropTypes.bool,
};

export default OppsummeringUtland;
