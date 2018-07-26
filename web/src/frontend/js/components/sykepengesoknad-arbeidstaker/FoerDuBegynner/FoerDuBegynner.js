import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst, sykepengesoknadstatuser } from 'digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';
import { Link } from 'react-router';
import { Hovedknapp } from 'nav-frontend-knapper';
import history from '../../../history';
import setup from '../setup';
import BekreftAnsvar from './BekreftAnsvar';
import validate from '../validering/validerFoerDuBegynner';
import { sykepengesoknad as sykepengesoknadPt } from '../../../propTypes';
import SykepengesoknadHeader from '../SykepengesoknadHeader';
import AvbrytSoknadContainer from '../../../containers/sykepengesoknad-arbeidstaker/AvbrytSoknadContainer';
import SykmeldingUtdragContainer from '../../../containers/sykepengesoknad-arbeidstaker/SykmeldingUtdragContainer';
import IllustrertInnhold from '../../IllustrertInnhold';

const { NY, UTKAST_TIL_KORRIGERING } = sykepengesoknadstatuser;

export const DetFinnesEldreSoknader = ({ eldsteSoknadId }) => {
    return (<Alertstripe type="info" className="blokk">
        <p className="sist">{getLedetekst('sykepengesoknad.eldre-soknad.varsel.melding')}</p>
        <p className="sist">
            <Link className="lenke" to={`/sykefravaer/soknader/${eldsteSoknadId}`}>{getLedetekst('sykepengesoknad.eldre-soknad.varsel.lenke')}</Link>
        </p>
    </Alertstripe>);
};

DetFinnesEldreSoknader.propTypes = {
    eldsteSoknadId: PropTypes.string,
};

const KorrigerVarsel = () => {
    return (<Alertstripe type="info" className="blokk">
        <p className="sist">Rediger det som er feil i søknaden, og send den inn på nytt.</p>
    </Alertstripe>);
};

export const ForsteSoknadIntro = () => {
    return (<div className="panel blokk">
        <div className="blokk--s">
            <IllustrertInnhold ikon="/sykefravaer/img/svg/foerste-soknad.svg" ikonAlt="Din første digitale søknad om sykepenger" liten>
                <h2 className="panel__tittel sist">{getLedetekst('sykepengesoknad.foerste-soknad.tittel')}</h2>
            </IllustrertInnhold>
        </div>
        <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.foerste-soknad.mer_v2')} />
    </div>);
};

export const SoknadIntro = () => {
    return (
        <div className="panel blokk">
            <IllustrertInnhold ikon="/sykefravaer/img/svg/foerste-soknad.svg" ikonAlt="Din første digitale søknad om sykepenger" liten>
                <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad.soknad-intro.personvern')} />
            </IllustrertInnhold>
        </div>);
};

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

export const TidligSoknad = () => {
    return (<div className="panel panel--komprimert blokk">
        <IllustrertInnhold ikon="/sykefravaer/img/svg/snomannen.svg" ikonAlt="Tidlig søknad">
            <p className="sykepenger__tidligSoknad">{getLedetekst('sykepengesoknad.tidlig-soknad')}</p>
        </IllustrertInnhold>
    </div>);
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
        <FoerDuBegynnerSkjemaSetup sykepengesoknad={sykepengesoknad} />
    </div>);
};

FoerDuBegynner.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    erForsteSoknad: PropTypes.bool,
    detFinnesEldreSoknader: PropTypes.bool,
    eldsteSoknadId: PropTypes.string,
};

export default FoerDuBegynner;
