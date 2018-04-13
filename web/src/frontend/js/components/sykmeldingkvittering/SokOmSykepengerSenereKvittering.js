import React from 'react';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, Video, filmer } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import { soknadsdatoremse } from './Soknadsdatoliste';
import { Bjorn } from '../Hjelpeboble';

const SokOmSykepengerSenereKvittering = ({ sykepengesoknader }) => {
    return (<div className="js-kvittering js-kvittering--sok-senere">
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg
                    ikon="kvitteringhake--graa.svg"
                    alt="Grå hake"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-1.tittel-2')} />
                <Kvitteringsteg
                    ikon="kvitteringVent.svg"
                    alt="Timeglass"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-2.tittel-2')}>
                    <HtmlAvsnitt
                        Tag="div"
                        nokkel="sykmelding.kvittering.sok-senere.steg-2.tekst-2" />
                </Kvitteringsteg>
                <Kvitteringsteg
                    ikon="kvitteringSokSykepenger.svg"
                    alt="Søk om sykepenger"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-3.tittel-2')}>
                    <HtmlAvsnitt
                        nokkel="sykmelding.kvittering.sok-senere.steg-3.tekst-2"
                        replacements={{
                            '%DATOER%': soknadsdatoremse(sykepengesoknader)
                        }} />
                </Kvitteringsteg>
            </div>
        </div>
        <Bjorn
            className="blokk"
            hvit
            stor
            nokkel="sykmelding.kvittering.sok-senere.bjorn" />
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
