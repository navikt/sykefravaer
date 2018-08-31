import React from 'react';
import { sykepengesoknad as sykepengesoknadPt, getLedetekst, Video, filmer, Bjorn } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import getContextRoot from '../../utils/getContextRoot';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import { soknadsdatoremse } from './Soknadsdatoliste';

const SokOmSykepengerSenereKvittering = ({ sykepengesoknader }) => {
    return (<div className="js-kvittering js-kvittering--sok-senere">
        <div className="panel blokk">
            <div className="stegvisKvittering">
                <Kvitteringsteg
                    nummer="1"
                    ok
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-1.tittel-3')}>
                    <HtmlAvsnitt
                        Tag="div"
                        nokkel="sykmelding.kvittering.sok-senere.steg-1.tekst-3" />
                </Kvitteringsteg>
                <Kvitteringsteg
                    nummer="2"
                    tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-2.tittel-3')}>
                    <HtmlAvsnitt
                        nokkel="sykmelding.kvittering.sok-senere.steg-2.tekst-3"
                        replacements={{
                            '%DATOER%': soknadsdatoremse(sykepengesoknader),
                        }} />
                </Kvitteringsteg>
            </div>
        </div>
        <Bjorn
            className="blokk"
            hvit
            stor
            nokkel="sykmelding.kvittering.sok-senere.bjorn"
            rootUrl={getContextRoot()} />
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
