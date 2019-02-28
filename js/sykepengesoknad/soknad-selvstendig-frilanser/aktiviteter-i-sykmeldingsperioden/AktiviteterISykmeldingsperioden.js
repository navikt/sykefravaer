import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, getLedetekst } from '@navikt/digisyfo-npm';
import { soknadPt } from '../../../propTypes/index';
import history from '../../../history';
import Soknadskjema from '../../felleskomponenter/Soknadskjema';
import { KnapperadTilbake } from '../../../components/skjema/Knapperad';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSoknadSkjemanavn } from '../../../enums/skjemanavn';
import { ANDRE_INNTEKTSKILDER, UTDANNING, UTLAND } from '../../enums/tagtyper';
import AvbrytSoknadContainer from '../../felleskomponenter/avbryt-soknad/AvbrytSoknadContainer';
import Sporsmalsliste from '../../felleskomponenter/sporsmal/Sporsmalsliste';

export const hentSporsmalForAktiviteterISykmeldingsperioden = (soknad) => {
    return soknad.sporsmal.filter((s) => {
        return [ANDRE_INNTEKTSKILDER, UTDANNING, UTLAND].indexOf(s.tag) > -1;
    });
};

const AktiviteterISykmeldingsperiodenSkjema = (props) => {
    const { handleSubmit, soknad } = props;
    const onSubmit = () => {
        history.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/oppsummering`);
    };
    return (<form className="soknadskjema" id="aktiviteter-i-sykmeldingsperioden-skjema" onSubmit={handleSubmit(onSubmit)}>
        <Sporsmalsliste sporsmalsliste={hentSporsmalForAktiviteterISykmeldingsperioden(soknad)} soknad={soknad} />
        <KnapperadTilbake forrigeUrl={`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknad.id}/fravaer-og-friskmelding`} />
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
    </form>);
};

AktiviteterISykmeldingsperiodenSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
};

const AktiviteterISykmeldingsperioden = (props) => {
    const { sykmelding, soknad, handleSubmit } = props;
    return (<Soknadskjema
        aktivtSteg="3"
        tittel={getLedetekst('sykepengesoknad.aktiviteter-i-sykmeldingsperioden.tittel')}
        sykmelding={sykmelding}
        soknad={soknad}>
        <FeiloppsummeringContainer skjemanavn={getSoknadSkjemanavn(soknad.id)} />
        <AktiviteterISykmeldingsperiodenSkjema
            soknad={soknad}
            handleSubmit={handleSubmit} />
    </Soknadskjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
};

export default AktiviteterISykmeldingsperioden;
