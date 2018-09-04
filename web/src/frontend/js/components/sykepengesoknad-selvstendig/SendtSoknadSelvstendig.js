import React from 'react';
import {
    getLedetekst,
    Utvidbar,
    sykmelding as sykmeldingPt,
    tilLesbarDatoMedArstall,
    getHtmlLedetekst,
    SykmeldingNokkelOpplysning,
} from 'digisyfo-npm';
import { connect } from 'react-redux';
import SykmeldingUtdragForSelvstendige from './SykmeldingUtdragForSelvstendige';
import Oppsummeringsvisning from '../soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';
import Soknadtopp from './Soknadtopp';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../Statuspanel';
import { finnSykmelding } from '../../containers/sykepengesoknad-selvstendig/sykepengesoknadSelvstendigSetup';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';

const SendtSoknadSelvstendigStatuspanel = ({ soknad }) => {
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
    </Statuspanel>);
};

SendtSoknadSelvstendigStatuspanel.propTypes = {
    soknad: soknadPt,
};

const SendtSoknadSelvstendig = ({ sykmelding, soknad }) => {
    return (<div>
        <Soknadtopp soknad={soknad} />
        <SendtSoknadSelvstendigStatuspanel soknad={soknad} />
        { sykmelding && <SykmeldingUtdragForSelvstendige sykmelding={sykmelding} /> }
        <Utvidbar tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')} className="blokk js-soknad-oppsummering" erApen>
            <Oppsummeringsvisning
                soknad={{
                    ...soknad,
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag !== VAER_KLAR_OVER_AT;
                    }),
                }} />
        </Utvidbar>
        <div className="panel">
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

SendtSoknadSelvstendig.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
};

const mapStateToProps = (state, ownProps) => {
    return {
        sykmelding: finnSykmelding(state, ownProps),
    };
};

export default connect(mapStateToProps)(SendtSoknadSelvstendig);

