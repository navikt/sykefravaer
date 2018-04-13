import React from 'react';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import PropTypes from 'prop-types';

const Kvitteringsteg = ({ ikon, alt, tittel, children }) => {
    return (<div className="kvitteringsteg">
        <div className="kvitteringsteg__ikon">
            <img
                alt={alt}
                src={`${window.APP_SETTINGS.APP_ROOT}/img/svg/${ikon}`} />
        </div>
        <div className="kvitteringsteg__innhold">
            <h2 className="kvitteringsteg__tittel js-tittel">{tittel}</h2>
            { children && <div className="js-tekst">{children}</div> }
        </div>
    </div>);
};

Kvitteringsteg.propTypes = {
    ikon: PropTypes.string,
    alt: PropTypes.string,
    tittel: PropTypes.string,
    children: PropTypes.node,
};

export const HtmlAvsnitt = ({ nokkel, replacements = null, Tag = 'p' }) => {
    return <Tag className="kvitteringsteg__tekst" dangerouslySetInnerHTML={{ __html: getLedetekst(nokkel, replacements) }} />;
};

HtmlAvsnitt.propTypes = {
    nokkel: PropTypes.string.isRequired,
    replacements: keyValue,
    Tag: PropTypes.string,
};

export default Kvitteringsteg;
