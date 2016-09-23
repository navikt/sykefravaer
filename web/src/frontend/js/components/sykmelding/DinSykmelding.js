import React, { PropTypes } from 'react';
import DineSykmeldingOpplysninger from '../sykmeldingOpplysninger/DineSykmeldingOpplysninger';
import DinSykmeldingSkjemaContainer from '../../containers/DinSykmeldingSkjemaContainer';
import { getLedetekst, getHtmlLedetekst } from '../../ledetekster';
import Sidetopp from '../Sidetopp';

const DinSykmelding = ({ sykmelding, ledetekster }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.tittel', ledetekster)} />
        <div className="panel blokk">
            <div className="media">
                <img src="/sykefravaer/img/svg/nav-ansatt.svg" className="media__img media__img--desktop" alt="Ansatt i NAV" />
                <img src="/sykefravaer/img/svg/nav-ansatt-mobil.svg" className="media__img media__img--mobil" alt="Ansatt i NAV" />
                <h2 className="typo-syfotittel">{getLedetekst('din-sykmelding.ny-tjeneste.tittel', ledetekster)}</h2>
            </div>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={getHtmlLedetekst('din-sykmelding.ny-tjeneste.tekst', ledetekster)} />
        </div>
        <header className="panelHeader panelHeader--lysebla">
            <img className="panelHeader__ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img className="panelHeader__ikon panelHeader__ikon--hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg" alt="Du" />
            <h2 className="panelHeader__tittel">{sykmelding.pasient.fornavn} {sykmelding.pasient.etternavn}</h2>
        </header>
        <div className="panel blokk">
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
        </div>
        <DinSykmeldingSkjemaContainer sykmeldingId={sykmelding.id} />
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    harStrengtFortroligAdresse: PropTypes.bool,
};

export default DinSykmelding;
