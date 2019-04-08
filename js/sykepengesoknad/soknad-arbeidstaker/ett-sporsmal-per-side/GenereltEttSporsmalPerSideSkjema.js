import React from 'react';
import PropTypes from 'prop-types';
import history from '../../../history';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import Sporsmalsliste from '../../felleskomponenter/sporsmal/Sporsmalsliste';
import KnapperadEttSporsmalPerSide from './KnapperadEttSporsmalPerSide';
import AvbrytSoknadContainer from '../../felleskomponenter/avbryt-soknad/AvbrytSoknadContainer';
import { soknadPt } from '../../../propTypes';
import { hentSporsmalForDenneSiden } from './ettSporsmalPerSideUtils';

export const GenereltEttSporsmalPerSideSkjema = (props) => {
    const { handleSubmit, soknad, actions, sidenummer } = props;
    const sporsmalsliste = hentSporsmalForDenneSiden(soknad, sidenummer);
    const onSubmit = () => {
        actions.lagreSoknad(soknad);
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/${sidenummer + 1}`);
    };

    return (<form className="soknadskjema" id="ett-sporsmal-per-side" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSkjemanavnFraSoknad(soknad)} />
        <Sporsmalsliste sporsmalsliste={sporsmalsliste} soknad={soknad} />
        <KnapperadEttSporsmalPerSide soknad={soknad} sidenummer={sidenummer} />
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
    </form>);
};

GenereltEttSporsmalPerSideSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
    actions: PropTypes.shape({
        lagreSoknad: PropTypes.func,
    }),
    sidenummer: PropTypes.number,
};
