import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import Sporsmal from '../../felleskomponenter/sporsmal/Sporsmal';
import KnapperadEttSporsmalPerSide from '../ett-sporsmal-per-side/KnapperadEttSporsmalPerSide';
import AvbrytSoknadContainer from '../../felleskomponenter/avbryt-soknad/AvbrytSoknadContainer';
import { GenereltEttSporsmalPerSideSkjema } from '../ett-sporsmal-per-side/GenereltEttSporsmalPerSideSkjema';
import { hentSporsmalForDenneSiden } from '../ett-sporsmal-per-side/ettSporsmalPerSideUtils';
import OppdaterFeiletFeilstripe from '../ett-sporsmal-per-side/OppdaterFeiletFeilstripe';

export const ForDuBegynnerSkjema = (props) => {
    const { handleSubmit, soknad, actions, sidenummer } = props;
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer)[0];
    const onSubmit = () => {
        actions.lagreSoknad(soknad, sidenummer);
    };

    return (<form className="soknadskjema" id="ett-sporsmal-per-side" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSkjemanavnFraSoknad(soknad)} />
        <div className="panel redaksjonelt-innhold">
            <p className="blokk">{getLedetekst('sykepengesoknad.bekreft-ansvar.introtekst')}</p>
            <Sporsmal sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad} />
        </div>
        <OppdaterFeiletFeilstripe />
        <KnapperadEttSporsmalPerSide soknad={soknad} sidenummer={sidenummer} />
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
    </form>);
};

ForDuBegynnerSkjema.propTypes = GenereltEttSporsmalPerSideSkjema.propTypes;
