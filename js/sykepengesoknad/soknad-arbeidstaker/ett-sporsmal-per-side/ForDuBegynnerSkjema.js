import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import history from '../../../history';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import Sporsmal from '../../felleskomponenter/sporsmal/Sporsmal';
import KnapperadEttSporsmalPerSide from './KnapperadEttSporsmalPerSide';
import AvbrytSoknadContainer from '../../felleskomponenter/avbryt-soknad/AvbrytSoknadContainer';
import { GenereltEttSporsmalPerSideSkjema } from './GenereltEttSporsmalPerSideSkjema';
import { hentSporsmalForDenneSiden } from './ettSporsmalPerSideUtils';

export const ForDuBegynnerSkjema = (props) => {
    const { handleSubmit, soknad, actions, sidenummer } = props;
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer)[0];
    const onSubmit = () => {
        actions.lagreSoknad(soknad);
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/${sidenummer + 1}`);
    };

    return (<form className="soknadskjema" id="ett-sporsmal-per-side" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSkjemanavnFraSoknad(soknad)} />
        <div className="panel redaksjonelt-innhold">
            <p className="blokk">{getLedetekst('sykepengesoknad.bekreft-ansvar.introtekst')}</p>
            <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad} />
        </div>
        <KnapperadEttSporsmalPerSide soknad={soknad} sidenummer={sidenummer} />
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
    </form>);
};

ForDuBegynnerSkjema.propTypes = GenereltEttSporsmalPerSideSkjema.propTypes;
