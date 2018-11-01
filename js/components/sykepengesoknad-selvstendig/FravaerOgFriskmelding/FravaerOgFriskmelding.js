import React from 'react';
import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt, getLedetekst } from 'digisyfo-npm';
import history from '../../../history';
import Soknadskjema from '../../soknad-felles/Soknadskjema';
import Sporsmalsliste from '../../soknad-felles-sporsmal/Sporsmalsliste';
import { KnapperadTilbake } from '../../skjema/Knapperad';
import FeiloppsummeringContainer from '../../../containers/skjema/FeiloppsummeringContainer';
import { getSoknadSkjemanavn } from '../../../enums/skjemanavn';
import { JOBBET_DU_100_PROSENT, JOBBET_DU_GRADERT, TILBAKE_I_ARBEID } from '../../../enums/tagtyper';
import { soknad as soknadPt } from '../../../propTypes';
import AvbrytSoknadContainer from '../../../containers/soknad-felles/AvbrytSoknadContainer';

export const hentSporsmalForFravaerOgFriskmelding = (soknad) => {
    return soknad.sporsmal.filter((sporsmal) => {
        return sporsmal.tag === TILBAKE_I_ARBEID || sporsmal.tag.indexOf(JOBBET_DU_100_PROSENT) > -1 || sporsmal.tag.indexOf(JOBBET_DU_GRADERT) > -1;
    });
};

const FravaerOgFriskmeldingSkjema = (props) => {
    const { handleSubmit, soknad } = props;
    const sporsmalsliste = hentSporsmalForFravaerOgFriskmelding(soknad);
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${soknad.id}/aktiviteter-i-sykmeldingsperioden`);
    };
    return (<form className="soknadskjema" id="fravaer-og-friskmeldnig-skjema" onSubmit={handleSubmit(onSubmit)}>
        <FeiloppsummeringContainer skjemanavn={getSoknadSkjemanavn(soknad.id)} />
        <Sporsmalsliste sporsmalsliste={sporsmalsliste} soknad={soknad} />
        <KnapperadTilbake forrigeUrl={`/sykefravaer/soknader/${soknad.id}/`} />
        <AvbrytSoknadContainer sykepengesoknad={soknad} />
    </form>);
};

FravaerOgFriskmeldingSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    soknad: soknadPt,
};

const FravaerOgFriskmelding = (props) => {
    const { sykmelding, soknad, handleSubmit } = props;
    return (<Soknadskjema
        aktivtSteg="2"
        tittel={getLedetekst('sykepengesoknad.fraver-og-friskmelding.tittel')}
        sykmelding={sykmelding}
        soknad={soknad}>
        <FravaerOgFriskmeldingSkjema soknad={soknad} handleSubmit={handleSubmit} />
    </Soknadskjema>);
};

FravaerOgFriskmelding.propTypes = {
    sykmelding: sykmeldingPt,
    soknad: soknadPt,
    handleSubmit: PropTypes.func,
};

export default FravaerOgFriskmelding;
