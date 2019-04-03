import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../../felleskomponenter/Soknadskjema';
import { skjemasvar as skjemasvarPt, soknadMetaReducerPt, soknadPt } from '../../../propTypes';
import Sporsmalsliste from '../../felleskomponenter/sporsmal/Sporsmalsliste';
import AvbrytSoknadContainer from '../../felleskomponenter/avbryt-soknad/AvbrytSoknadContainer';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import AppSpinner from '../../../components/AppSpinner';
import KnapperadEttSporsmalPerSide from './KnapperadEttSporsmalPerSide';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import { SykepengesoknadArbeidstakerOppsummeringSkjema } from '../oppsummering/Oppsummering';

export const hentSporsmalForDenneSiden = (soknad, sidenummer) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return [sporsmal];
};

const erSisteSide = (soknad, sidenummer) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    return sporsmal[0].tag === VAER_KLAR_OVER_AT;
};

const GenereltEttSporsmalPerSideSkjema = (props) => {
    const { handleSubmit, soknad, actions, sidenummer } = props;
    const sporsmalsliste = hentSporsmalForDenneSiden(soknad, sidenummer);
    const onSubmit = () => {
        actions.lagreSoknad(soknad);
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/side/${sidenummer + 1}`);
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

const EttSporsmalPerSide = (props) => {
    const { sykmelding, soknad, handleSubmit, actions, sidenummer, oppdaterer, skjemasvar, sendingFeilet, soknadMeta, sender } = props;
    const Komponent = erSisteSide(soknad, sidenummer) ? SykepengesoknadArbeidstakerOppsummeringSkjema : GenereltEttSporsmalPerSideSkjema;
    return (<Soknadskjema
        apentUtdrag={sidenummer === 1}
        sykmelding={sykmelding}
        soknad={soknad}>
        {
            oppdaterer
                ? <AppSpinner />
                : <Komponent
                    soknad={soknad}
                    sykmelding={sykmelding}
                    handleSubmit={handleSubmit}
                    skjemasvar={skjemasvar}
                    sendingFeilet={sendingFeilet || soknadMeta.hentingFeilet}
                    sender={sender}
                    actions={actions}
                    sidenummer={sidenummer} />
        }
    </Soknadskjema>);
};

EttSporsmalPerSide.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    actions: PropTypes.shape({
        lagreSoknad: PropTypes.func,
        sendSoknad: PropTypes.func,
    }),
    sidenummer: PropTypes.number,
    oppdaterer: PropTypes.bool,
    skjemasvar: skjemasvarPt,
    sendingFeilet: PropTypes.bool,
    sender: PropTypes.bool,
    soknadMeta: soknadMetaReducerPt,
};

export default EttSporsmalPerSide;
