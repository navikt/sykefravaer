import React, { PropTypes } from 'react';
import SykepengerSkjema from '../SykepengerSkjema';
import { Link } from 'react-router';
import history from '../../../history';
import setup from '../setup';
import Egenmeldingsdager from './Egenmeldingsdager';
import GjenopptattArbeidFulltUt from './GjenopptattArbeidFulltUt';
import FeriePermisjonEllerUtenlandsopphold from './FeriePermisjonEllerUtenlandsopphold';
import Knapperad from '../../skjema/Knapperad';
import validerFravaerOgFriskmelding from '../validering/validerFravaerOgFriskmelding';
import { getLedetekst } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad/AvbrytSoknadContainer';

export const FravaerOgFriskmeldingSkjema = (props) => {
    const { handleSubmit, sykepengesoknad } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`);
    };
    return (<form id="fravaer-og-friskmelding-skjema" onSubmit={handleSubmit(onSubmit)}>
        <Egenmeldingsdager sykepengesoknad={sykepengesoknad} />
        <GjenopptattArbeidFulltUt sykepengesoknad={sykepengesoknad} />
        <FeriePermisjonEllerUtenlandsopphold sykepengesoknad={sykepengesoknad} />

        <Knapperad variant="knapperad--forrigeNeste knapperad--medAvbryt">
            <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/`} className="rammeknapp">{getLedetekst('sykepengesoknad.tilbake')}</Link>
            <button type="submit" className="knapp">{getLedetekst('sykepengesoknad.ga-videre')}</button>
        </Knapperad>
        <AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />
    </form>);
};

FravaerOgFriskmeldingSkjema.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    sykepengesoknad: sykepengesoknadPt,
};

const FravaerOgFriskmeldingSkjemaSetup = setup(validerFravaerOgFriskmelding, FravaerOgFriskmeldingSkjema);

const FravaerOgFriskmelding = ({ sykepengesoknad }) => {
    return (
        <SykepengerSkjema
            aktivtSteg="1"
            tittel={getLedetekst('sykepengesoknad.fraver-og-friskmelding.tittel')}
            sykepengesoknad={sykepengesoknad}>
                <FravaerOgFriskmeldingSkjemaSetup sykepengesoknad={sykepengesoknad} />
        </SykepengerSkjema>);
};

FravaerOgFriskmelding.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default FravaerOgFriskmelding;
