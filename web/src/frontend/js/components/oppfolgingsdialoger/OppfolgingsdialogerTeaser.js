import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getContextRoot } from '../../routers/paths';

const OppfolgingsdialogTeaser = ({ oppfolgingsdialog }) => {
    return (<article aria-labelledby={`oppfolgingsdialog-header-${oppfolgingsdialog.oppfoelgingsdialogId}`}>
        <Link className="inngangspanel" to={`${getContextRoot()}/oppfolgingsdialog/${oppfolgingsdialog.oppfoelgingsdialogId}`}>
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.oppfoelgingsdialogId}`}>
                        Arbeidsgiver {oppfolgingsdialog.virksomhetsnummer}
                    </h3>
                </header>
                <div className="inngangspanel__tekst">
                    Dato xx.xx.xxxx
                </div>
            </div>
        </Link></article>);
};

OppfolgingsdialogTeaser.propTypes = {
    oppfolgingsdialog: PropTypes.array,
};

export default OppfolgingsdialogTeaser;
