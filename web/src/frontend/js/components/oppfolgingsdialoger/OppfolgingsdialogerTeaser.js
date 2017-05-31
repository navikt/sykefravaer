import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';
import { restdatoTildato, finnSistEndretAvNavn } from 'oppfolgingsdialog-npm';

const OppfolgingsdialogTeaser = ({ oppfolgingsdialog }) => {
    return (<article aria-labelledby={`oppfolgingsdialog-header-${oppfolgingsdialog.oppfoelgingsdialogId}`}>
        <Link className="inngangspanel" to={`${getContextRoot()}/oppfolgingsdialoger/${oppfolgingsdialog.oppfoelgingsdialogId}`}>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.oppfoelgingsdialogId}`}>
                        { oppfolgingsdialog.virksomhetsnavn }
                    </h3>
                </header>
                <p className="inngangspanel__tekst">
                    Siste endret: {restdatoTildato(oppfolgingsdialog.sistEndretDato)}
                    <br />
                    Endret av: {finnSistEndretAvNavn(oppfolgingsdialog)}
                </p>
            </div>
        </Link></article>);
};

OppfolgingsdialogTeaser.propTypes = {
    oppfolgingsdialog: PropTypes.object,
};

export default OppfolgingsdialogTeaser;
