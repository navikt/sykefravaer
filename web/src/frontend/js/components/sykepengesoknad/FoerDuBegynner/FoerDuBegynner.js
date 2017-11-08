import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, Varselstripe } from 'digisyfo-npm';
import history from '../../../history';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';
import SykmeldingUtdrag from '../SykmeldingUtdrag';
import validate from '../validering/validerFoerDuBegynner';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { NY, UTKAST_TIL_KORRIGERING } from '../../../enums/sykepengesoknadstatuser';
import SykepengesoknadHeader from '../SykepengesoknadHeader';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad/AvbrytSoknadContainer';
import IllustrertInnhold from "../../IllustrertInnhold";

const KorrigerVarsel = () => {
    return (<div className="panel panel--komprimert blokk">
        <Varselstripe ikon="/sykefravaer/img/svg/soknader.svg" ikonAlt="Endre søknad">
            <div>
                <h2 className="varselstripe__tittel">Endre søknaden</h2>
                <p>Rediger det som er feil i søknaden, og send den inn på nytt.</p>
            </div>
        </Varselstripe>
    </div>);
};

export const FoerDuBegynnerSkjema = (props) => {
    const { handleSubmit, sykepengesoknad } = props;
    const onSubmit = () => {
        history.push(`/sykefravaer/soknader/${sykepengesoknad.id}/fravaer-og-friskmelding`);
    };
    return (<form className="sykepengerskjema" id="foer-du-begynner-skjema" onSubmit={handleSubmit(onSubmit)}>
        <div className="panel">
            <div className="redaksjonelt">
                <BekreftAnsvar sykepengesoknad={sykepengesoknad} />
            </div>
        </div>
        <div className="knapperad">
            <p className="blokk--s">
                <button type="submit" className="knapp js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
            </p>
            <AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />
        </div>
    </form>);
};

FoerDuBegynnerSkjema.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
};

const TidligSoknad = () => {
    return (<div className="panel panel--komprimert blokk">
        <IllustrertInnhold ikon={`/sykefravaer/img/svg/snomannen.svg`} ikonAlt="Tidlig søknad">
            <p className="sykepenger__tidligSoknad">{getLedetekst('sykepengesoknad.tidlig-soknad')}</p>
        </IllustrertInnhold>
    </div>);
};

const initialize = true;
const FoerDuBegynnerSkjemaSetup = setup(validate, FoerDuBegynnerSkjema, initialize);

const FoerDuBegynner = (props) => {
    const { sykepengesoknad } = props;
    const now = new Date();
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        { sykepengesoknad.status === UTKAST_TIL_KORRIGERING && <KorrigerVarsel /> }
        { (sykepengesoknad.status === NY && sykepengesoknad.tom > now) && <TidligSoknad /> }
        <SykmeldingUtdrag erApen sykepengesoknad={sykepengesoknad} />
        <h2 className="sykepenger__stegtittel">{getLedetekst('sykepengesoknad.for-du-begynner.tittel')}</h2>
        <FoerDuBegynnerSkjemaSetup sykepengesoknad={sykepengesoknad} />
    </div>);
};

FoerDuBegynner.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
};

export default FoerDuBegynner;
