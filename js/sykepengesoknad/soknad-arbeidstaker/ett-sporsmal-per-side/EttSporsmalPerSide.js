import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import Soknadskjema from '../../felleskomponenter/Soknadskjema';
import { skjemasvar as skjemasvarPt, soknadMetaReducerPt, soknadPt } from '../../../propTypes';
import AppSpinner from '../../../components/AppSpinner';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import { SykepengesoknadArbeidstakerOppsummeringSkjema } from '../oppsummering/Oppsummering';
import ForsteSoknadIntro from '../../../sykepengesoknad-gammel-plattform/for-du-begynner/ForsteSoknadIntro';
import SoknadIntro from '../../../sykepengesoknad-gammel-plattform/for-du-begynner/SoknadIntro';
import { GenereltEttSporsmalPerSideSkjema } from './GenereltEttSporsmalPerSideSkjema';
import { ForDuBegynnerSkjema } from './ForDuBegynnerSkjema';

export const hentSporsmalForDenneSiden = (soknad, sidenummer) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return [sporsmal];
};

const erSisteSide = (soknad, sidenummer) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    return sporsmal[0].tag === VAER_KLAR_OVER_AT;
};

const EttSporsmalPerSide = (props) => {
    const { sykmelding, soknad, handleSubmit, actions, sidenummer, oppdaterer, skjemasvar, sendingFeilet, soknadMeta, sender } = props;
    const Komponent = erSisteSide(soknad, sidenummer)
        ? SykepengesoknadArbeidstakerOppsummeringSkjema
        : sidenummer === 1
            ? ForDuBegynnerSkjema
            : GenereltEttSporsmalPerSideSkjema;
    const intro = sidenummer !== 1
        ? null
        : props.erForsteSoknad
            ? <ForsteSoknadIntro />
            : <SoknadIntro />;
    return (<Soknadskjema
        apentUtdrag={sidenummer === 1}
        tittel={sidenummer === 1 ? getLedetekst('sykepengesoknad.for-du-begynner.tittel') : null}
        sykmelding={sykmelding}
        intro={intro}
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
    erForsteSoknad: PropTypes.bool,
};

export default EttSporsmalPerSide;
