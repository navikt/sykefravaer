import React from 'react';
import { getLedetekst } from 'digisyfo-npm';
import { moteplanleggerDeltakertypePt } from '../../../propTypes';
import { BRUKER } from '../../../enums/moteplanleggerDeltakerTyper';

const MotePassert = (
    {
        deltakertype = BRUKER,
    }) => {
    const deltakertypenokkel = deltakertype === BRUKER
        ? 'arbeidstaker'
        : 'arbeidsgiver';
    const harDuSporsmalNokkel = `mote.motepassert.har_du_sporsmal.${deltakertypenokkel}`;
    return (<div>
        <header className="sidetopp">
            <h1 className="sidetopp__tittel">{getLedetekst('mote.motepassert.tittel')}</h1>
        </header>
        <div className="panel">
            <div className="illustrertTittel">
                <img
                    className="illustrertTittel__img"
                    src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/mote_avbrutt.svg`}
                    alt=""
                />
                <h2 className="illustrertTittel__tittel" >{getLedetekst('mote.motepassert.undertittel')}</h2>
            </div>
            <p>{getLedetekst(`mote.motepassert.${deltakertypenokkel}.forklaring`)}</p>
            <div className="adskilt__blokk blokk">
                <p>{getLedetekst(harDuSporsmalNokkel)}</p>
            </div>
        </div>
    </div>);
};

MotePassert.propTypes = {
    deltakertype: moteplanleggerDeltakertypePt,
};

export default MotePassert;
