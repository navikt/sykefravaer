import React from 'react';
import {
    getHtmlLedetekst,
    getLedetekst,
    sykepengesoknadstatuser,
    sykmelding as sykmeldingPt,
    SykmeldingNokkelOpplysning,
    tilLesbarDatoMedArstall,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SykmeldingUtdragForSelvstendige from './SykmeldingUtdragForSelvstendige';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';
import Soknadtopp from '../soknad-felles/Soknadtopp';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import { finnSykmelding } from '../../utils/soknad-felles/soknadSetup';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import EndreSoknadContainer from '../../containers/sykepengesoknad-selvstendig/EndreSoknadContainer';
import { toggleKorrigerSelvstendigSoknad } from '../../selectors/unleashTogglesSelectors';
import RelaterteSoknaderContainer from '../../containers/sykepengesoknad-selvstendig/RelaterteSoknaderContainer';
import { SENDT } from '../../enums/soknadstatuser';

export const SendtSoknadSelvstendigStatuspanel = ({ soknad, kanViseKorrigering }) => {
    return (<Statuspanel>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{getLedetekst('sykepengesoknad.status.SENDT.til-nav')}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.dato.innsendt')}>
                <p>{tilLesbarDatoMedArstall(soknad.innsendtDato)}</p>
            </StatusNokkelopplysning>
            <SykmeldingNokkelOpplysning className="sist" tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
                <p dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.sykepengeinfo.til-nav')} />
            </SykmeldingNokkelOpplysning>
        </Statusopplysninger>
        {kanViseKorrigering && soknad.status === sykepengesoknadstatuser.SENDT &&
        <EndreSoknadContainer soknad={soknad} />}
    </Statuspanel>);
};

SendtSoknadSelvstendigStatuspanel.propTypes = {
    soknad: soknadPt,
    kanViseKorrigering: PropTypes.bool,
};

const SendtSoknadSelvstendig = ({ sykmelding, soknad, kanViseKorrigering }) => {
    return (<div>
        <Soknadtopp soknad={soknad} />
        <SendtSoknadSelvstendigStatuspanel soknad={soknad} kanViseKorrigering={kanViseKorrigering} />
        {sykmelding && <SykmeldingUtdragForSelvstendige sykmelding={sykmelding} />}
        <Utvidbar
            tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')}
            className="blokk js-soknad-oppsummering"
            erApen>
            <Oppsummeringsvisning
                soknad={{
                    ...soknad,
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag !== VAER_KLAR_OVER_AT;
                    }),
                }} />
        </Utvidbar>
        <div className="panel js-vaer-klar-over-at">
            <Oppsummeringsvisning
                soknad={{
                    ...soknad,
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag === VAER_KLAR_OVER_AT;
                    }),
                }} />
        </div>
        {soknad.status === SENDT && <RelaterteSoknaderContainer soknad={soknad} />}

    </div>);
};

SendtSoknadSelvstendig.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    kanViseKorrigering: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
    return {
        sykmelding: finnSykmelding(state, ownProps),
        kanViseKorrigering: toggleKorrigerSelvstendigSoknad(state),
    };
};

export default connect(mapStateToProps)(SendtSoknadSelvstendig);

