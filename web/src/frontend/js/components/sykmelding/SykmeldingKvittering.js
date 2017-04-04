import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';
import Sidetopp from '../Sidetopp';

const SykmeldingKvittering = ({ tittel, brodtekst, ledetekster, sykmeldingStatus }) => {
    const ikon = sykmeldingStatus === 'AVBRUTT' ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const ikonKlasse = sykmeldingStatus === 'AVBRUTT' ? 'illustrertTittel__img--mikro' : '';

    return (<div>
        <Sidetopp tittel={getLedetekst('din-sykmelding.kvittering.sidetittel', ledetekster)} />
        <div className="panel blokk typo-infotekst side-innhold">
            <div className="illustrertTittel">
                <img className={`illustrertTittel__img ${ikonKlasse}`}src={`/sykefravaer/img/svg/${ikon}`} alt="" />
                <h2 className="illustrertTittel__tittel">
                    {tittel}
                </h2>
            </div>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={brodtekst} />
        </div>
        <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
        <div className="panel">
            <h2 className="typo-undertittel">Hjelp oss å bli bedre</h2>
            <p>Dette er en tjeneste som fortsatt er under utvikling. Gi oss tilbakemelding slik at vi kan bli bedre!</p>
            <p className="knapperad">
                <a href="https://www.survey-xact.no/LinkCollector?key=5U5KSNH43P9K" className="rammeknapp" target="_blank">Gi tilbakemelding</a>
            </p>
        </div>
    </div>);
};

SykmeldingKvittering.propTypes = {
    ledetekster: PropTypes.object,
    tittel: PropTypes.string,
    brodtekst: PropTypes.object,
    sykmeldingStatus: PropTypes.string,
};

export default SykmeldingKvittering;
