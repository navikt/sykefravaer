import React from 'react';
import {
    getLedetekst,
    getHtmlLedetekst,
    Utvidbar,
} from 'digisyfo-npm';
import {
    motePt,
    moteplanleggerDeltakertypePt,
} from '../../../propTypes';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';
import { finnDeltakerByType } from '../../../utils/moteUtils';
import BesvarteTidspunkter from './BesvarteTidspunkter';
import Motested from './Motested';

export const getVeienVidereTekst = (deltaker, deltakertype = BRUKER) => {
    const deltakertypenokkel = deltakertype === BRUKER
        ? 'arbeidstaker'
        : 'arbeidsgiver';
    const nokkel = deltakertype === BRUKER
        ? 'mote.kvittering.hva_skjer_videre.innhold.v2.arbeidstaker'
        : 'mote.kvittering.hva_skjer_videre.innhold.v2.arbeidsgiver';
    return deltaker.svar.filter((svar) => {
        return svar.valgt;
    }).length === 0
        ? getHtmlLedetekst(`mote.kvittering.hva_skjer_videre.innhold.ingenalternativpasser.v3.${deltakertypenokkel}`)
        : getHtmlLedetekst(nokkel);
};

const Kvittering = (
    {
        mote,
        deltakertype = BRUKER,
    }) => {
    const deltaker = finnDeltakerByType(mote.deltakere, deltakertype);
    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{getLedetekst('mote.kvittering.tittel')}</h1>
        </header>
        <div className="panel">
            <div className="illustrertTittel">
                <img
                    className="illustrertTittel__img"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/motesvarSendt.svg`}
                    alt=""
                />
                <h2 className="illustrertTittel__tittel" >
                    <div dangerouslySetInnerHTML={getHtmlLedetekst('mote.kvittering.svaret-ditt-er-sendt.v2')} />
                </h2>
            </div>
            <div
                dangerouslySetInnerHTML={getVeienVidereTekst(deltaker, deltakertype)}
                className="redaksjonelt blokk"
            />
            <Utvidbar tittel={getLedetekst('mote.kvittering.se.dine.svar')}>
                <div>
                    <div className="blokk">
                        <Motested sted={deltaker.svar[0].sted} />
                    </div>
                    <BesvarteTidspunkter
                        mote={mote}
                        deltakertype={deltakertype}
                        alternativer={mote.alternativer}
                    />
                </div>
            </Utvidbar>
        </div>
    </div>);
};

Kvittering.propTypes = {
    deltakertype: moteplanleggerDeltakertypePt,
    mote: motePt,
};

export default Kvittering;
