/* eslint-disable max-len */
import React from 'react';

import PropTypes from 'prop-types';
import { getSykepengesoknaderUrl } from '../../../utils/urlUtils';
import Kvitteringsteg, { StegvisKvittering } from '../felles/Kvitteringsteg';
import { soknadPt } from '../../../propTypes';
import { Vis } from '../../../utils';
import { soknadsdatoremseUtenForsteDatUtenStrong, sorterSoknaderEtterDatoTilgjengelig } from '../felles/Soknadsdatoliste';
import { tilLesbarDatoMedArstall } from '../../../digisyfoNpm';

const HundreProsentReisetilskudd = ({
    fremtidigeSoknader,
    nyeSoknader,
}) => {
    const aktiv = nyeSoknader.length > 0;


    let stegToTekst = 'Vi trenger kvitteringer fra reisene for å behandle søknaden din.';

    if (!aktiv) {
        if (fremtidigeSoknader.length > 0) {
            const forsteDato = tilLesbarDatoMedArstall(sorterSoknaderEtterDatoTilgjengelig(fremtidigeSoknader)[0].tom);
            stegToTekst += ` ${forsteDato} får du en melding fra oss om at du kan logge deg inn på Ditt NAV for å fylle ut søknaden om reisetilskudd.`;
        }
        if (fremtidigeSoknader.length > 1) {
            stegToTekst += ` Du vil også få melding ${soknadsdatoremseUtenForsteDatUtenStrong(fremtidigeSoknader)}.`;
        }
    }

    return (
        <div className="panel blokk js-kvittering">
            <StegvisKvittering>
                <Kvitteringsteg
                    nummer="1"
                    ok
                    tittel="Da har du gjort første del">
                    <div className="kvitteringsteg__tekst">
                        <p>Du har gitt beskjed til NAV og arbeidsgiveren din om at du trenger reisetilskudd.</p>
                    </div>
                </Kvitteringsteg>
                <Kvitteringsteg
                    nummer="2"
                    aktiv={aktiv}
                    tittel={aktiv ? 'Nå skal du svare på noen spørsmål' : 'Senere må du svare på noen spørsmål'}>
                    <div className="kvitteringsteg__tekst">
                        <p>
                            {stegToTekst}
                        </p>
                    </div>
                    <Vis hvis={aktiv}>
                        <p className="kvitteringsteg__handling">
                            <a
                                href={getSykepengesoknaderUrl()}
                                className="js-sok knapp knapp--mini">
                                {'Søk om reisetilskudd'}
                            </a>
                        </p>
                    </Vis>

                    <div className="kvitteringsteg__tekst">
                        <p>
                            <strong>Fikk du sykmeldingen på papir hos legen? </strong>
                            <br />
                            Legg den bort. Det du gjør på nett erstatter papiret.
                        </p>
                    </div>
                </Kvitteringsteg>
            </StegvisKvittering>
        </div>
    );
};

HundreProsentReisetilskudd.propTypes = {
    fremtidigeSoknader: PropTypes.arrayOf(soknadPt),
    nyeSoknader: PropTypes.arrayOf(soknadPt),
};

export default HundreProsentReisetilskudd;
