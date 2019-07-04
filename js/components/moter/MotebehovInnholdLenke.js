import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { motebehovReducerPt } from '../../propTypes';
import { skalViseMotebehovKvittering } from '../../utils/motebehovUtils';

const TEKSTER = {
    tittel: 'Ønsker du et dialogmøte med NAV?',
    undertekst: 'I møtet går vi gjennom situasjonen sammen og ser på muligheter. Her kan du vurdere om du ønsker et møte',
};

const MotebehovInnholdLenke = (
    {
        motebehovReducer,
        virksomhetsnrListe,
    },
) => {
    const knappTekstNokkel = skalViseMotebehovKvittering(motebehovReducer, virksomhetsnrListe)
        ? 'mote.motebehovInnholdLenke.knapp.kvittering'
        : 'mote.motebehovInnholdLenke.knapp.svar';
    return (
        <div className="motebehovInnholdLenke panel">
            <h2 className="panel__tittel">{TEKSTER.tittel}</h2>
            <p>{TEKSTER.undertekst}</p>
            <Link
                className="knapp"
                to="/sykefravaer/dialogmoter/behov"
            >
                {getLedetekst(knappTekstNokkel)}
            </Link>
        </div>
    );
};
MotebehovInnholdLenke.propTypes = {
    motebehovReducer: motebehovReducerPt,
    virksomhetsnrListe: PropTypes.arrayOf(PropTypes.string),
};

export default MotebehovInnholdLenke;
