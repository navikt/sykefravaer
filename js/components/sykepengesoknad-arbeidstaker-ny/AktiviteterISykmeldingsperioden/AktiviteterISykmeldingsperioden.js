import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, getLedetekst } from 'digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../../soknad-felles/Soknadskjema';
import { KnapperadTilbake } from '../../skjema/Knapperad';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSoknadSkjemanavn } from '../../../enums/skjemanavn';
import { FERIE_PERMISJON_UTLAND, ANDRE_INNTEKTSKILDER, UTDANNING } from '../../../enums/tagtyper';
import { soknad as soknadPt } from '../../../propTypes';
import Sporsmalsliste from '../../soknad-felles-sporsmal/Sporsmalsliste';

export const hentSporsmalForAktiviteterISykmeldingsperioden = (soknad) => {
    return soknad.sporsmal.filter((sporsmal) => {
        return sporsmal.tag === FERIE_PERMISJON_UTLAND
            || sporsmal.tag === ANDRE_INNTEKTSKILDER
            || sporsmal.tag === UTDANNING;
    });
};

const AktiviteterISykmeldingsperiodenSkjema = (props) => {
    const { handleSubmit, soknad } = props;
    const sporsmalsliste = hentSporsmalForAktiviteterISykmeldingsperioden(soknad);
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${soknad.id}/oppsummering`);
    };
    return (<form className="soknadskjema" id="aktiviteter-i-sykmeldingsperioden-skjema" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSoknadSkjemanavn(soknad.id)} />
        <Sporsmalsliste sporsmalsliste={sporsmalsliste} soknad={soknad} />
        <KnapperadTilbake forrigeUrl={`/sykefravaer/soknader/${soknad.id}/fravaer-og-friskmelding`} />
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
        <AktiviteterISykmeldingsperiodenSkjema soknad={soknad} handleSubmit={handleSubmit} />
    </Soknadskjema>);
};

AktiviteterISykmeldingsperioden.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
};

export default AktiviteterISykmeldingsperioden;
