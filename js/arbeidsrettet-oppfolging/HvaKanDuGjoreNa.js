import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import hentArbeidsrettetOppfolgingBilde from './hentArbeidsrettetOppfolgingBilde';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const Tiltak = ({ ledetekstNokkel, bilde, bildeAlt }) => {
    return (<div className="arbeidsrettetOppfolgingTiltak">
        <div className="arbeidsrettetOppfolgingTiltak__bilde">
            <img src={bilde} alt={bildeAlt} />
        </div>
        <div className="arbeidsrettetOppfolgingTiltak__tekst">
            <h3 className="arbeidsrettetOppfolgingTiltak__tittel">{getLedetekst(`ao.hva-na.${ledetekstNokkel}.tittel`)}</h3>
            <p dangerouslySetInnerHTML={getHtmlLedetekst(`ao.hva-na.${ledetekstNokkel}.tekst`)} />
        </div>
    </div>);
};

Tiltak.propTypes = {
    ledetekstNokkel: PropTypes.string,
    bilde: PropTypes.string,
    bildeAlt: PropTypes.string,
};

const HvaKanDuGjoreNa = () => {
    return (<ArbeidsrettetOppfolgingRad tittel={getLedetekst('ao.hva-na.tittel')}>
        <Tiltak
            ledetekstNokkel="snakk-med-arbeidsgiver"
            bildeAlt="Arbeidsgiver"
            bilde={hentArbeidsrettetOppfolgingBilde('arbeidsgiver.svg')} />
        <Tiltak
            ledetekstNokkel="aktivitetsplan"
            bildeAlt="Dialog"
            bilde={hentArbeidsrettetOppfolgingBilde('dialog.svg')} />
        <Tiltak
            ledetekstNokkel="okonomi"
            bildeAlt="Økonomi"
            bilde={hentArbeidsrettetOppfolgingBilde('okonomi.svg')} />
    </ArbeidsrettetOppfolgingRad>);
};

export default HvaKanDuGjoreNa;
