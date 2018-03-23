import React from 'react';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, Video, filmer } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import Soknadsdatoliste from './Soknadsdatoliste';

const SokOmSykepengerSenereKvittering = ({ sykepengesoknader }) => {
    return (<div className="js-kvittering--sok-senere">
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg
                    ikon="kvitteringhake.svg"
                    alt="Grønn hake"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-1.tittel')} />
                <Kvitteringsteg
                    ikon="kvitteringVent.svg"
                    alt="Timeglass"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-2.tittel')}>
                    <HtmlAvsnitt
                        nokkel="sykmelding.kvittering.sok-senere.steg-2.tekst" />
                </Kvitteringsteg>
                <Kvitteringsteg
                    ikon="kvitteringSokSykepenger.svg"
                    alt="Søk om sykepenger"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-3.tittel')}>
                    <HtmlAvsnitt
                        nokkel="sykmelding.kvittering.sok-senere.steg-3.tekst-med-liste" />
                    <Soknadsdatoliste
                        sykepengesoknader={sykepengesoknader} />
                </Kvitteringsteg>
            </div>
        </div>
        <div className="blokk">
            <h2 className="panel__tittel blokk--xxs">{getLedetekst('sykmelding.kvittering.sok-senere.video.tittel')}</h2>
            <Video film={filmer.SOKNAD_SYKEPENGER} />
        </div>
    </div>);
};

SokOmSykepengerSenereKvittering.propTypes = {
    sykepengesoknader: PropTypes.arrayOf(sykepengesoknadPt),
};

export default SokOmSykepengerSenereKvittering;
