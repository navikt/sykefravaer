import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import FeiloppsummeringContainer from '../../../containers/FeiloppsummeringContainer';
import history from '../../../history';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';
import validate from '../validering/validerFoerDuBegynner';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import SykepengesoknadHeader from '../../sykepengesoknad-felles/SykepengesoknadHeader';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad-arbeidstaker/AvbrytSoknadContainer';
import SykmeldingUtdragContainer from '../../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';
import { getSykepengesoknadArbeidstakerSkjemanavn } from '../../../enums/skjemanavn';
import DetFinnesEldreSoknader from './DetFinnesEldreSoknader';
import KorrigerVarsel from './KorrigerVarsel';
import ForsteSoknadIntro from './ForsteSoknadIntro';
import SoknadIntro from './SoknadIntro';
import TidligSoknad from './TidligSoknad';

const { NY, UTKAST_TIL_KORRIGERING } = sykepengesoknadstatuser;

export const FoerDuBegynnerSkjema = (props) => {
    const { handleSubmit, sykepengesoknad } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`);
    };
    return (<form className="soknadskjema" id="foer-du-begynner-skjema" onSubmit={handleSubmit(onSubmit)}>
        <div className="panel">
            <div className="redaksjonelt-innhold">
                <BekreftAnsvar sykepengesoknad={sykepengesoknad} />
            </div>
        </div>
        <div className="knapperad">
            <p className="blokk--s">
                <Hovedknapp className="js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</Hovedknapp>
            </p>
            <AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />
        </div>
    </form>);
};

FoerDuBegynnerSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
};

const initialize = true;
const FoerDuBegynnerSkjemaSetup = setup(validate, FoerDuBegynnerSkjema, initialize);

const FoerDuBegynner = (props) => {
    const { sykepengesoknad, erForsteSoknad, detFinnesEldreSoknader, eldsteSoknadId } = props;
    const now = new Date();

    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        {
            detFinnesEldreSoknader
                && sykepengesoknad.status !== UTKAST_TIL_KORRIGERING
                && <DetFinnesEldreSoknader eldsteSoknadId={eldsteSoknadId} />
        }
        { sykepengesoknad.status === UTKAST_TIL_KORRIGERING && <KorrigerVarsel /> }
        { (sykepengesoknad.status === NY && sykepengesoknad.tom > now) && <TidligSoknad /> }

        { erForsteSoknad ? <ForsteSoknadIntro /> : <SoknadIntro />}

        <SykmeldingUtdragContainer erApen sykepengesoknad={sykepengesoknad} />
        <h2 className="soknad__stegtittel">{getLedetekst('sykepengesoknad.for-du-begynner.tittel')}</h2>
        <FeiloppsummeringContainer skjemanavn={getSykepengesoknadArbeidstakerSkjemanavn(sykepengesoknad.id)} />
        <FoerDuBegynnerSkjemaSetup
            sykepengesoknad={sykepengesoknad} />
    </div>);
};

FoerDuBegynner.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    erForsteSoknad: PropTypes.bool,
    detFinnesEldreSoknader: PropTypes.bool,
    eldsteSoknadId: PropTypes.string,
};

export default FoerDuBegynner;
