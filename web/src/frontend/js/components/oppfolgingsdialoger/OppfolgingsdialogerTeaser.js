import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';

const OppfolgingsdialogTeaser = ({ oppfolgingsdialog, bruker }) => {
    return (<article aria-labelledby={`oppfolgingsdialog-header-${oppfolgingsdialog.oppfoelgingsdialogId}`}>
        <Link className="inngangspanel" to={`${getContextRoot()}/oppfolgingsdialoger/${oppfolgingsdialog.oppfoelgingsdialogId}`}>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.oppfoelgingsdialogId}`}>
                        { bruker }
                    </h3>
                </header>
                <p className="inngangspanel__tekst">
                    Siste endret: { oppfolgingsdialog.sistEndretDato }
                    <br />
                    Endret av: { oppfolgingsdialog.sistEndretAvAktoerId }
                </p>
            </div>
        </Link></article>);
};

OppfolgingsdialogTeaser.propTypes = {
    oppfolgingsdialog: PropTypes.object,
    bruker: PropTypes.string,
};

export default OppfolgingsdialogTeaser;
