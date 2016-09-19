import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import DinSykmeldingSkjemaContainer from '../../containers/DinSykmeldingSkjemaContainer';
import { getLedetekst, getHtmlLedetekst } from '../../ledetekster';

const DinSykmelding = ({ sykmelding, ledetekster, harPilotarbeidsgiver = false }) => {
    return (<div>
        <h1 className="side-header typo-sidetittel">{getLedetekst('din-sykmelding.tittel', ledetekster)}</h1>
        <div className="panel blokk">
            <div className="media">
                <img src="/sykefravaer/img/svg/nav-ansatt.svg" className="media-img media-img-desktop" alt="Ansatt i NAV" />
                <img src="/sykefravaer/img/svg/nav-ansatt-mobil.svg" className="media-img media-img-mobil" alt="Ansatt i NAV" />
                <h2 className="typo-syfotittel">{getLedetekst('din-sykmelding.ny-tjeneste.tittel', ledetekster)}</h2>
            </div>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.ny-tjeneste.tekst', ledetekster)} />
        </div>
        <div className="header-bolk header-sykmelding">
            <img className="header-ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img className="header-ikon header-ikon-hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" />
            <h2 className="header-tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h2>
        </div>
        <div className="panel blokk">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </div>
        <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    harPilotarbeidsgiver: PropTypes.bool,
    harStrengtFortroligAdresse: PropTypes.bool,
};

export default DinSykmelding;
