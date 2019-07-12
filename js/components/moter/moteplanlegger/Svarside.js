import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import {
    getLedetekst,
    getHtmlLedetekst,
} from '@navikt/digisyfo-npm';
import Svarskjema from './Svarskjema';
import {
    motePt,
    moteplanleggerDeltakerPt,
} from '../../../propTypes';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import {
    BEKREFTET,
    finnNyesteAlternativ,
} from '../../../utils/moteUtils';
import { visKortDato } from '../../../utils/datoUtils';

const Svarside = (props) => {
    const {
        mote,
        deltakertype = BRUKER,
    } = props;
    const annenBruker = mote.deltakere.filter(deltaker => deltaker.type !== deltakertype)[0];

    const deltakertypeNokkel = deltakertype === BRUKER
        ? 'arbeidstaker'
        : 'arbeidsgiver';
    return (
        <div>
            <header className="sidetopp">
                <h1 className="sidetopp__tittel">{getLedetekst('mote.svarside.tittel')}</h1>
                <div
                    className="sidetopp__intro js-intro"
                    dangerouslySetInnerHTML={getHtmlLedetekst(`mote.svarside.innhold.v2.${deltakertypeNokkel}`, {
                        '%ANNEN_MOTEDELTAKER_NAVN%': annenBruker.navn,
                    })} />
            </header>
            { mote.status === BEKREFTET
        && (
            <div className="blokk panel">
                <Alertstripe
                    type="info"
                    className="panel">
                    <p className="uthevet">{getLedetekst('mote.svarside.tidligere.bekreftet.info')}</p>
                    <span>
                        {getLedetekst('mote.svarside.tidligere.bekreftet.sendtdato', {
                            '%BEKREFTET_DATO%': visKortDato(finnNyesteAlternativ(mote.alternativer).created),
                        })}
                    </span>
                </Alertstripe>
            </div>
        )
            }
            <Svarskjema {...props} deltakertype={deltakertype} />
        </div>
    );
};

Svarside.propTypes = {
    mote: motePt,
    deltakertype: moteplanleggerDeltakerPt,
};

export default Svarside;
