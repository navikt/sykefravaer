import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, getLedetekst } from 'digisyfo-npm';
import { soknad as soknadPt } from '../../../propTypes';
import history from '../../../history';
import Soknadskjema from '../../soknad-felles/Soknadskjema';
import Sporsmal from '../../soknad-felles-sporsmal/Sporsmal';
import { KnapperadTilbake } from '../../skjema/Knapperad';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSoknadSkjemanavn } from '../../../enums/skjemanavn';
import { ANDRE_INNTEKTSKILDER, UTDANNING, UTLAND } from '../../../enums/tagtyper';
import AvbrytSoknadContainer from '../../../containers/soknad-felles/AvbrytSoknadContainer';

export const hentSporsmalForAktiviteterISykmeldingsperioden = (soknad) => {
    return soknad.sporsmal.filter((s) => {
        return [ANDRE_INNTEKTSKILDER, UTDANNING, UTLAND].indexOf(s.tag) > -1;
    });
};

const AktiviteterISykmeldingsperiodenSkjema = (props) => {
    const { handleSubmit, soknad } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${soknad.id}/oppsummering`);
    };
    return (<form className="soknadskjema" id="aktiviteter-i-sykmeldingsperioden-skjema" onSubmit={handleSubmit(onSubmit)}>
        {
            hentSporsmalForAktiviteterISykmeldingsperioden(soknad).map((sporsmal) => {
                return (<Sporsmal
                    hovedsporsmal
                    sporsmal={sporsmal}
                    key={sporsmal.tag}
                    name={sporsmal.tag} />);
            })
        }
        <KnapperadTilbake forrigeUrl={`/sykefravaer/soknader/${soknad.id}/fravaer-og-friskmelding`} />
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
