import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DinSykmeldingSkjemaContainer from '../../containers/DinSykmeldingSkjemaContainer';
import { getLedetekst, getHtmlLedetekst, DineSykmeldingOpplysninger, Varselstripe } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import { sykmelding as sykmeldingPt } from '../../propTypes';

const DinSykmelding = ({ sykmelding, visEldreSykmeldingVarsel, eldsteSykmeldingId, pilotSykepenger = false }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel')} />
        <div className="panel blokk">
            <div className="media">
                <img src="/sykefravaer/img/svg/nav-ansatt.svg" className="media__img media__img--desktop" alt="Ansatt i NAV" />
                <img src="/sykefravaer/img/svg/nav-ansatt-mobil.svg" className="media__img media__img--mobil" alt="Ansatt i NAV" />
                <h2 className="typo-syfotittel">{getLedetekst('din-sykmelding.ny-tjeneste.tittel')}</h2>
            </div>
            {
                pilotSykepenger
                    ? <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.ny-tjeneste.pilot.tekst')} />
                    : <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.ny-tjeneste.tekst')} />
            }
        </div>
        {
            visEldreSykmeldingVarsel && <div className="panel blokk">
                <Varselstripe type="info">
                    <p className="sist">
                        <span>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.tekst')} </span>
                        <Link className="lenke" to={`/sykefravaer/sykmeldinger/${eldsteSykmeldingId}`}>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.lenke')}</Link>
                    </p>
                </Varselstripe>
            </div>
        }
        <header className="panelHeader panelHeader--lysebla">
            <img className="panelHeader__ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img className="panelHeader__ikon panelHeader__ikon--hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" />
            <h2 className="panelHeader__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h2>
        </header>
        <div className="panel blokk">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} />
        </div>
        <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: sykmeldingPt,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
    pilotSykepenger: PropTypes.bool,
};

export default DinSykmelding;
