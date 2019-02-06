import React from 'react';
import {
    getLedetekst,
    getHtmlLedetekst,
    sykmelding as sykmeldingPt,
    SykmeldingUtdrag,
    tilLesbarDatoMedArstall,
    Utvidbar,
} from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import Oppsummeringsvisning from '../../components/soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';
import Soknadtopp from '../../components/soknad-felles/Soknadtopp';
import { finnSykmelding } from '../../utils/soknad-felles/soknadSetup';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../../components/Statuspanel';
import { formaterOrgnr } from '../../utils';

const hentStatustekst = (soknad) => {
    const soknadSendtTilNav = soknad.sendtNav !== null;
    const soknadSendtTilArbeidsgiver = soknad.sendtArbeidsgiver !== null;
    const nokkel = soknadSendtTilNav && soknadSendtTilArbeidsgiver
        ? 'sykepengesoknad.status-2.SENDT.til-arbeidsgiver-og-nav'
        : soknadSendtTilNav && !soknadSendtTilArbeidsgiver
            ? 'sykepengesoknad.status-2.SENDT.til-nav'
            : 'sykepengesoknad.status-2.SENDT.til-arbeidsgiver';
    const args = {
        '%ARBEIDSGIVER%': soknad.arbeidsgiver ? soknad.arbeidsgiver.navn : null,
        '%ORGNR%': soknad.arbeidsgiver ? formaterOrgnr(soknad.arbeidsgiver.orgnr) : null,
        '%SENDTTILARBEIDSGIVERDATO%': soknadSendtTilArbeidsgiver ? tilLesbarDatoMedArstall(soknad.sendtArbeidsgiver) : null,
        '%SENDTTILNAVDATO%': soknadSendtTilNav ? tilLesbarDatoMedArstall(soknad.sendtNav) : null,
    };
    return getLedetekst(nokkel, args);
};

const hentSykepengetekst = (soknad) => {
    const nokkel = soknad.sendtNav && soknad.sendtArbeidsgiver
        ? 'sykepengesoknad.sykepengeinfo.til-arbeidsgiver-og-nav'
        : soknad.sendtNav
            ? 'sykepengesoknad.sykepengeinfo.til-nav'
            : 'sykepengesoknad.sykepengeinfo.til-arbeidsgiver';
    return getHtmlLedetekst(nokkel);
};

export const SendtSoknadArbeidstakerStatuspanel = ({ soknad }) => {
    return (<Statuspanel enKolonne>
        <Statusopplysninger>
            <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                <p>{hentStatustekst(soknad)}</p>
            </StatusNokkelopplysning>
            <StatusNokkelopplysning tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
                <p dangerouslySetInnerHTML={hentSykepengetekst(soknad)} />
            </StatusNokkelopplysning>
        </Statusopplysninger>
    </Statuspanel>);
};

SendtSoknadArbeidstakerStatuspanel.propTypes = {
    soknad: soknadPt,
};

const NySendtSoknadArbeidstaker = ({ sykmelding, soknad }) => {
    return (<div>
        <Soknadtopp soknad={soknad} />
        <SendtSoknadArbeidstakerStatuspanel soknad={soknad} />
        {sykmelding && <SykmeldingUtdrag sykmelding={sykmelding} />}
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
    </div>);
};

NySendtSoknadArbeidstaker.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
};

const mapStateToProps = (state, ownProps) => {
    return {
        sykmelding: finnSykmelding(state, ownProps),
    };
};

export default connect(mapStateToProps)(NySendtSoknadArbeidstaker);
