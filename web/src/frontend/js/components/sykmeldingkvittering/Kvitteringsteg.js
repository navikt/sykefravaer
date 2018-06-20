import React from 'react';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Vis } from '../../utils';

const Kvitteringsteg = ({ nummer, aktiv, ok, tittel, children }) => {
    const classNames = cn('kvitteringsteg__nummer', {
        'kvitteringsteg__nummer--aktiv': aktiv,
        'kvitteringsteg__nummer--ok': ok,
    });
    return (<div className="kvitteringsteg">
        <div className="kvitteringsteg__innhold">
            <h2 className="kvitteringsteg__tittel js-tittel"><span className={classNames}>{nummer}</span> {tittel}</h2>
            <Vis hvis={children}>
                <div className="js-tekst">{children}</div>
            </Vis>
        </div>
    </div>);
};

Kvitteringsteg.propTypes = {
    nummer: PropTypes.string,
    aktiv: PropTypes.bool,
    ok: PropTypes.bool,
    tittel: PropTypes.string,
    children: PropTypes.node,
};

export const HtmlAvsnitt = ({ nokkel, replacements = null, Tag = 'div' }) => {
    return <Tag className="kvitteringsteg__tekst" dangerouslySetInnerHTML={{ __html: getLedetekst(nokkel, replacements) }} />;
};

HtmlAvsnitt.propTypes = {
    nokkel: PropTypes.string.isRequired,
    replacements: keyValue,
    Tag: PropTypes.string,
};

export default Kvitteringsteg;
