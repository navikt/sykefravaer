import React from 'react';
import { getLedetekst, Video, Bjorn } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import Kvitteringsteg, { HtmlAvsnitt } from './Kvitteringsteg';
import { soknadsdatoremse } from './Soknadsdatoliste';
import { soknad as soknadPt } from '../../propTypes';

const FrilanserSoekDigitaltSenere = ({ soknader }) => {
    return (<div className="js-kvittering js-kvittering--frilanser-sok-senere">
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
                            '%DATOER%': soknadsdatoremse(soknader),
                        }} />
                </Kvitteringsteg>
            </div>
        </div>
    </div>);
};

FrilanserSoekDigitaltSenere.propTypes = {
    soknader: PropTypes.arrayOf(soknadPt),
};

export default FrilanserSoekDigitaltSenere;
