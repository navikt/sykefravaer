import React, { PropTypes } from 'react';
import history from '../../../history';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';
import SykmeldingUtdrag from '../SykmeldingUtdrag';
import validate from '../validering/validerFoerDuBegynner';
import { getLedetekst } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import { Varselstripe } from 'digisyfo-npm';
import { UTKAST_TIL_KORRIGERING } from '../../../enums/sykepengesoknadstatuser';
import SykepengesoknadHeader from '../SykepengesoknadHeader';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad/AvbrytSoknadContainer';

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
                <button type="submit" className="knapp">{getLedetekst('sykepengesoknad.ga-videre')}</button>
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
    const { sykepengesoknad } = props;
    return (<div>
        <SykepengesoknadHeader sykepengesoknad={sykepengesoknad} />
        { sykepengesoknad.status === UTKAST_TIL_KORRIGERING && <KorrigerVarsel /> }
        <SykmeldingUtdrag erApen sykepengesoknad={sykepengesoknad} />
        <h2 className="sykepenger__stegtittel">{getLedetekst('sykepengesoknad.for-du-begynner.tittel')}</h2>
        <FoerDuBegynnerSkjemaSetup sykepengesoknad={sykepengesoknad} />
    </div>);
};

FoerDuBegynner.propTypes = {
    handleSubmit: PropTypes.func,
    sykepengesoknad: sykepengesoknadPt,
};

export default FoerDuBegynner;
