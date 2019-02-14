import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykmelding as sykmeldingPt } from '@navikt/digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../../../components/soknad-felles/Soknadskjema';
import { KnapperadTilbake } from '../../../components/skjema/Knapperad';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSoknadSkjemanavn } from '../../../enums/skjemanavn';
import { ANDRE_INNTEKTSKILDER, FERIE_PERMISJON_UTLAND, UTDANNING } from '../../../enums/tagtyper';
import { soknad as soknadPt } from '../../../propTypes';
import Sporsmalsliste from '../../../components/soknad-felles-sporsmal/Sporsmalsliste';

export const hentSporsmalForAktiviteterISykmeldingsperioden = (soknad) => {
    return soknad.sporsmal.filter((sporsmal) => {
        return sporsmal.tag === FERIE_PERMISJON_UTLAND
            || sporsmal.tag === ANDRE_INNTEKTSKILDER
            || sporsmal.tag === UTDANNING;
    });
};

const AktiviteterISykmeldingsperiodenSkjema = (props) => {
    const { handleSubmit, soknad, actions } = props;
    const sporsmalsliste = hentSporsmalForAktiviteterISykmeldingsperioden(soknad);
    const onSubmit = () => {
        actions.lagreSoknad(soknad);
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/oppsummering`);
    };
    return (<form className="soknadskjema" id="aktiviteter-i-sykmeldingsperioden-skjema" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSoknadSkjemanavn(soknad.id)} />
        <Sporsmalsliste sporsmalsliste={sporsmalsliste} soknad={soknad} />
        <KnapperadTilbake forrigeUrl={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/fravaer-og-friskmelding`} />
    </form>);
};

AktiviteterISykmeldingsperiodenSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
    actions: PropTypes.shape({
        lagreSoknad: PropTypes.func,
    }),
};

const AktiviteterISykmeldingsperioden = (props) => {
    const { sykmelding, soknad, handleSubmit, actions } = props;
    return (<Soknadskjema
        aktivtSteg="3"
        tittel={getLedetekst('sykepengesoknad.aktiviteter-i-sykmeldingsperioden.tittel')}
        sykmelding={sykmelding}
        soknad={soknad}>
        <AktiviteterISykmeldingsperiodenSkjema soknad={soknad} handleSubmit={handleSubmit} actions={actions} />
    </Soknadskjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
    actions: PropTypes.shape({
        lagreSoknad: PropTypes.func,
    }),
};

export default AktiviteterISykmeldingsperioden;
