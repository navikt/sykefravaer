import React from 'react';
import PropTypes from 'prop-types';
import hentArbeidsrettetOppfolgingBilde from './hentArbeidsrettetOppfolgingBilde';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const Tiltak = ({ tittel, tekst, bilde, bildeAlt }) => {
    return (<div className="arbeidsrettetOppfolgingTiltak">
        <div className="arbeidsrettetOppfolgingTiltak__bilde">
            <img src={bilde} alt={bildeAlt} />
        </div>
        <div className="arbeidsrettetOppfolgingTiltak__tekst">
            <h3 className="arbeidsrettetOppfolgingTiltak__tittel">{tittel}</h3>
            <p dangerouslySetInnerHTML={{ __html: tekst }} />
        </div>
    </div>);
};

Tiltak.propTypes = {
    tittel: PropTypes.string,
    tekst: PropTypes.string,
    bilde: PropTypes.string,
    bildeAlt: PropTypes.string,
};

const HvaKanDuGjoreNa = () => {
    return (<ArbeidsrettetOppfolgingRad tittel="Hva kan du gjøre nå?">
        <Tiltak
            tittel="Snakk med arbeidsgiveren din"
            tekst="Arbeidsgiveren din har fortsatt ansvaret for å tilpasse arbeidsplasen og oppgavene dine slik at du kan jobbe"
            bildeAlt="Arbeidsgiver"
            bilde={hentArbeidsrettetOppfolgingBilde('arbeidsgiver.svg')} />
        <Tiltak
            tittel="Lag en aktivitetsplan"
            tekst="NAV kan tilby deg en aktivitetsplan der du kan kommunisere direkte med NAV-veilederen din."
            bildeAlt="Dialog"
            bilde={hentArbeidsrettetOppfolgingBilde('dialog.svg')} />
        <Tiltak
            tittel="Planlegg økonomien din"
            tekst="Det er bare sykepenger som erstatter inntekten din med 100 prosent. Du må derfor være forberedt på å gå ned i inntekt når sykepengene tar slutt."
            bildeAlt="Økonomi"
            bilde={hentArbeidsrettetOppfolgingBilde('okonomi.svg')} />
    </ArbeidsrettetOppfolgingRad>);
};

export default HvaKanDuGjoreNa;
