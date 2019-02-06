import React from 'react';
import { getLedetekst, sykmelding as sykmeldingPt, SykmeldingUtdrag, Utvidbar } from '@navikt/digisyfo-npm';
import { connect } from 'react-redux';
import Oppsummeringsvisning from '../../components/soknad-felles-oppsummering/Oppsummeringsvisning';
import { soknad as soknadPt } from '../../propTypes';
import Soknadtopp from '../../components/soknad-felles/Soknadtopp';
import { finnSykmelding } from '../../utils/soknad-felles/soknadSetup';
import { VAER_KLAR_OVER_AT } from '../../enums/tagtyper';
import SykepengesoknadStatuspanel from '../statuspanel/SykepengesoknadStatuspanel';
import { SENDT } from '../../enums/soknadstatuser';
import RelaterteSoknaderContainer from '../../containers/sykepengesoknad-selvstendig/RelaterteSoknaderContainer';

const NySendtSoknadArbeidstaker = ({ sykmelding, soknad }) => {
    return (<div>
        <Soknadtopp soknad={soknad} />
        <SykepengesoknadStatuspanel soknad={soknad} />
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
        {
            soknad.status === SENDT
            && <RelaterteSoknaderContainer soknad={soknad} />
        }
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
