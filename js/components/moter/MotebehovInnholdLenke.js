import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import { proptypes as motebehovProptypes } from 'moter-npm';
import { skalViseMotebehovKvittering } from '../../utils/motebehovUtils';

const MotebehovInnholdLenke = (
    {
        ledetekster,
        motebehov,
        virksomhetsnrListe,
        rootUrl,
    }) => {
    const knappTekstNokkel = skalViseMotebehovKvittering(motebehov, virksomhetsnrListe) ?
        'mote.motebehovInnholdLenke.knapp.kvittering'
        :
        'mote.motebehovInnholdLenke.knapp.svar';
    return (<div className="motebehovInnholdLenke panel">
        <h3>{getLedetekst('mote.motebehovInnholdLenke.tittel', ledetekster)}</h3>
        <p>{getLedetekst('mote.motebehovInnholdLenke.tekst', ledetekster)}</p>
        <Link
            className="knapp"
            to={`${rootUrl}/dialogmoter/behov`}
        >
            {getLedetekst(knappTekstNokkel, ledetekster)}
        </Link>
    </div>);
};
MotebehovInnholdLenke.propTypes = {
    ledetekster: keyValue,
    motebehov: motebehovProptypes.motebehovReducerATPt,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
    rootUrl: PropTypes.string,
};

export default MotebehovInnholdLenke;
