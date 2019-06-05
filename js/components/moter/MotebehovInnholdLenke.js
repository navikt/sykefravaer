import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst } from '@navikt/digisyfo-npm';

const TEKSTER = {
    tittel: 'Ønsker du et dialogmøte med NAV?',
    undertekst: 'I møtet går vi gjennom situasjonen sammen og ser på muligheter. Her kan du vurdere om du ønsker et møte',
};

const MotebehovInnholdLenke = (
    {
        skalViseKvittering,
    },
) => {
    const knappTekstNokkel = skalViseKvittering
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
    skalViseKvittering: PropTypes.bool,
};

export default MotebehovInnholdLenke;
