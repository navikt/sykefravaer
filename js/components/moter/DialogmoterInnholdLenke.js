import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const DialogmoterInnholdLenke = (
    {
        imgUrl,
        visning,
        innholdstekster,
        minimal = true,
        rootUrl,
    }) => {
    if (minimal) {
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
    }
    return (<div className="dialogmoterInnholdLenke blokk--l">
        <header className="dialogmoterInnholdLenke__header">
            <h2>{innholdstekster.tittel}</h2>
        </header>
        <article aria-labelledby={`dialogmoter-${visning}`}>
            <Link className="inngangspanel" to={`${rootUrl}/dialogmoter/${visning}`}>
                <span className="dialogmoterInnholdLenke__ikon">
                    <img src={imgUrl} alt="bilde" />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 id={`dialogmoter-${visning}`}>
                            <p className="inngangspanel_undertekst">
                                {innholdstekster.undertittel}
                            </p>
                        </h3>
                    </header>
                    <p>
                        {innholdstekster.tekst}
                    </p>
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
    minimal: PropTypes.bool,
    rootUrl: PropTypes.string,
};

export default DialogmoterInnholdLenke;
