import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const DialogmoterInnholdLenke = (
    {
        imgUrl,
        visning,
        innholdstekster,
        rootUrl,
    }) => {
    return (<div className="dialogmoterInnholdLenke blokk--l">
        <article aria-labelledby={`dialogmoter-${visning}`}>
            <Link className="inngangspanel" to={`${rootUrl}/dialogmoter/${visning}`}>
                <span className="dialogmoterInnholdLenke__ikon">
                    <img src={imgUrl} alt="bilde" />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h2 className="js-title" id={`dialogmoter-${visning}`}>
                            <p className="inngangspanel_undertekst">
                                {innholdstekster.tittel}
                            </p>
                        </h2>
                    </header>
                </div>
            </Link>
        </article>
    </div>);
};
DialogmoterInnholdLenke.propTypes = {
    imgUrl: PropTypes.string,
    visning: PropTypes.string,
    innholdstekster: PropTypes.shape({
        tittel: PropTypes.string,
        undertittel: PropTypes.string,
        tekst: PropTypes.string,
    }),
    rootUrl: PropTypes.string,
};

export default DialogmoterInnholdLenke;
