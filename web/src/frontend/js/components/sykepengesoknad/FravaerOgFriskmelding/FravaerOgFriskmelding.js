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

const FravaerOgFriskmelding = ({ handleSubmit, sykepengesoknad, ledetekster }) => {
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/aktiviteter-i-sykmeldingsperioden`);
    };
    return (
        <SykepengerSkjema
            aktivtSteg="1"
            tittel={getLedetekst('sykepengesoknad.fraver-og-friskmelding.tittel', ledetekster)}
            ledetekster={ledetekster}
            sykepengesoknad={sykepengesoknad}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Egenmeldingsdager sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
                    <GjenopptattArbeidFulltUt sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />
                    <FeriePermisjonEllerUtenlandsopphold sykepengesoknad={sykepengesoknad} ledetekster={ledetekster} />

                    <Knapperad variant="knapperad--forrigeNeste">
                        <Link to={`/sykefravaer/soknader/${sykepengesoknad.id}/`} className="rammeknapp">{getLedetekst('sykepengesoknad.tilbake', ledetekster)}</Link>
                        <button type="submit" className="knapp">{getLedetekst('sykepengesoknad.ga-videre', ledetekster)}</button>
                    </Knapperad>
                </form>
        </SykepengerSkjema>);
};

FravaerOgFriskmelding.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    sykepengesoknad: sykepengesoknadPt,
    ledetekster: PropTypes.object,
};

const FravaerOgFriskmeldingSkjema = setup(validerFravaerOgFriskmelding, FravaerOgFriskmelding);

export default FravaerOgFriskmeldingSkjema;
