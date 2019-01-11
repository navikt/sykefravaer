import React from 'react';
import {
    getLedetekst,
    getHtmlLedetekst,
} from 'digisyfo-npm';
import {
    motePt,
    moteplanleggerDeltakertypePt,
} from '../../../propTypes';
import { visDato, visKlokkeslett } from '../../../utils/datoUtils';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';

export const forklarendeTekst = (mote, deltakertype) => {
    if (deltakertype === BRUKER) {
        return mote.bekreftetTidspunkt
            ? getHtmlLedetekst('mote.avbruttmote.sykmeldt.bekreftet_sa_avbrutt')
            : getHtmlLedetekst('mote.avbruttmote.sykmeldt.avbrutt');
    }
    return mote.bekreftetTidspunkt
        ? getHtmlLedetekst('mote.avbruttmote.arbeidsgiver.bekreftet_sa_avbrutt')
        : getHtmlLedetekst('mote.avbruttmote.arbeidsgiver.avbrutt');
};

const AvbruttMote = (
    {
        mote,
        deltakertype,
    }) => {
    const deltakertypeSuffix = deltakertype === BRUKER
        ? 'arbeidstaker'
        : 'arbeidsgiver';
    const harDuSporsmalNokkel = `mote.avbruttmote.har_du_sporsmal.${deltakertypeSuffix}`;
    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{getLedetekst('mote.avbruttmote.tittel')}</h1>
        </header>
        <div className="panel">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/mote_avbrutt.svg`} alt="" />
                <h2 className="illustrertTittel__tittel" >{getLedetekst('mote.avbruttmote.undertittel')}</h2>
            </div>
            <div dangerouslySetInnerHTML={forklarendeTekst(mote, deltakertype)} />
            <div className="adskilt__blokk blokk">
                <h3 className="typo-element">{getLedetekst('mote.avbruttmote.tidspunkter_det_gjelder')}</h3>
                <div className="kvittering__svar blokk">
                    { mote.alternativer.map((alternativ) => {
                        return (<label key={alternativ.id} className="avbrutt__mote__svar">
                            {`${visDato(alternativ.tid)} ${getLedetekst('mote.kvitterng.kl')} ${visKlokkeslett(alternativ.tid)}`}
                        </label>);
                    })
                    }
                </div>
                <h3 className="typo-element">{getLedetekst('mote.avbruttmote.motested')}</h3>
                <p>{mote.alternativer[0].sted}</p>
            </div>
            <p>{getLedetekst(harDuSporsmalNokkel)}</p>
        </div>
    </div>);
};

AvbruttMote.propTypes = {
    mote: motePt,
    deltakertype: moteplanleggerDeltakertypePt,
};

export default AvbruttMote;
