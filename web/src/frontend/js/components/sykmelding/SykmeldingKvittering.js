import React, { PropTypes } from 'react';
import { getLedetekst } from '../../ledetekster';
import LenkeTilDineSykmeldinger from '../LenkeTilDineSykmeldinger';

const SykmeldingKvittering = ({ tittel, brodtekst, ledetekster, sykepengerTittel, sykepengerTekst, sykmeldingStatus }) => {
    const ikon = sykmeldingStatus === 'AVBRUTT' ? 'avbryt-sykmelding.svg' : 'digital-til-papir.svg';
    const tittelKlasse = sykmeldingStatus === 'AVBRUTT' ? 'tittel-avbrutt' : 'tittel-bekreftet';

    return (<div>
        <h1 className="side-header typo-sidetittel">{getLedetekst('din-sykmelding.kvittering.sidetittel', ledetekster)}</h1>
        <div className="panel blokk typo-infotekst side-innhold">
            <h2 className={`tittel tittel-dekorert tittel-illustrert typo-undertittel ${tittelKlasse}`}>
                <img src={`/sykefravaer/img/svg/${ikon}`} alt="" />
                {tittel}
            </h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={brodtekst} />
        </div>
        <LenkeTilDineSykmeldinger ledetekster={ledetekster} />
        <article className="panel blokk side-innhold">
            <h2 className="typo-undertittel">{sykepengerTittel}</h2>
            <div className="redaksjonelt-innhold" dangerouslySetInnerHTML={sykepengerTekst} />
        </article>
    </div>);
};

SykmeldingKvittering.propTypes = {
    ledetekster: PropTypes.object,
    tittel: PropTypes.string,
    brodtekst: PropTypes.object,
    sykepengerTekst: PropTypes.object,
    sykepengerTittel: PropTypes.string,
    sykmeldingStatus: PropTypes.string,
};

export default SykmeldingKvittering;
