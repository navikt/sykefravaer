import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import Soknadskjema from './Soknadskjema';
import { skjemasvar as skjemasvarPt, soknadMetaReducerPt, soknadPt } from '../../../propTypes/index';
import AppSpinner from '../../../components/AppSpinner';
import { erSisteSide, hentTittel } from './ettSporsmalPerSideUtils';
import { SykepengesoknadArbeidstakerOppsummeringSkjema } from '../oppsummering/Oppsummering';
import { ForDuBegynnerSkjema } from '../for-du-begynner/ForDuBegynnerSkjema';
import { GenereltEttSporsmalPerSideSkjema } from './GenereltEttSporsmalPerSideSkjema';
import ForsteSoknadIntro from '../../../sykepengesoknad-gammel-plattform/for-du-begynner/ForsteSoknadIntro';
import SoknadIntro from '../../../sykepengesoknad-gammel-plattform/for-du-begynner/SoknadIntro';

export const hentSporsmalsvisning = (soknad, sidenummer) => {
    return erSisteSide(soknad, sidenummer)
        ? SykepengesoknadArbeidstakerOppsummeringSkjema
        : sidenummer === 1
            ? ForDuBegynnerSkjema
            : GenereltEttSporsmalPerSideSkjema;
};

export const hentIntro = (erForsteSoknad, sidenummer) => {
    return sidenummer !== 1
        ? null
        : erForsteSoknad
            ? <ForsteSoknadIntro />
            : <SoknadIntro />;
};

const EttSporsmalPerSide = (props) => {
    const { sykmelding, soknad, handleSubmit, actions, sidenummer, oppdaterer, skjemasvar, sendingFeilet, soknadMeta, sender } = props;

    const Sporsmalsvisning = hentSporsmalsvisning(soknad, sidenummer);
    const intro = hentIntro(props.erForsteSoknad, sidenummer);
    const scroll = sidenummer !== 1 && !erSisteSide(soknad, sidenummer);

    return (<Soknadskjema
        scroll={scroll}
        sidenummer={sidenummer}
        tittel={hentTittel(soknad, sidenummer)}
        sykmelding={sykmelding}
        intro={intro}
        soknad={soknad}>
        {
            oppdaterer
                ? <AppSpinner />
                : <Sporsmalsvisning
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
