import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '../../../digisyfoNpm';
import Kvitteringsteg, { StegvisKvittering, HtmlAvsnitt } from '../felles/Kvitteringsteg';
import { soknadsdatoremse } from '../felles/Soknadsdatoliste';
import { soknadPt } from '../../../propTypes/index';
import { FrilanserSelvstendigKvitteringstegEn } from './FrilanserSoekDigitaltNaa';

const FrilanserSoekDigitaltSenere = ({ fremtidigeSoknader }) => {
    return (
        <div className="js-kvittering js-kvittering--frilanser-sok-senere">
            <div className="panel blokk">
                <StegvisKvittering>
                    <FrilanserSelvstendigKvitteringstegEn />
                    <Kvitteringsteg
                        nummer="2"
                        tittel={getLedetekst('sykmelding.kvittering.sok-senere.steg-2.tittel-3')}>
                        <HtmlAvsnitt
                            nokkel="sykmelding.kvittering.sok-senere-frilanser.steg-2.tekst-3"
                            replacements={{
                                '%DATOER%': soknadsdatoremse(fremtidigeSoknader),
                            }} />
                    </Kvitteringsteg>
                </StegvisKvittering>
            </div>
        </div>
    );
};

FrilanserSoekDigitaltSenere.propTypes = {
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
};

export default FrilanserSoekDigitaltSenere;
