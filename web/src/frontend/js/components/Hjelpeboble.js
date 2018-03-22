import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlLedetekst } from 'digisyfo-npm';
import cn from 'classnames';

const Hjelpeboble = ({ bilde, bildeAlt, children, className = '', hvit = false, stor = false }) => {
    const bobleClassNames = cn({
        hjelpeboble__boble: true,
        'hjelpeboble__boble--hvit': hvit,
        'hjelpeboble__boble--stor': stor,
    });
    const bildeClassNames = cn({
        hjelpeboble__bilde: true,
        'hjelpeboble__bilde--hvit': hvit,
        'hjelpeboble__bilde--stor': stor,
    });
    return (<div className={`hjelpeboble ${className}`}>
        <div className={bobleClassNames}>
            {children}
        </div>
        <div className={bildeClassNames}>
            <img src={bilde} alt={bildeAlt} />
        </div>
    </div>);
};

Hjelpeboble.propTypes = {
    bilde: PropTypes.string,
    bildeAlt: PropTypes.string,
    children: PropTypes.element,
    hvit: PropTypes.bool,
    stor: PropTypes.bool,
    className: PropTypes.string,
};

export const Bjorn = ({ nokkel, children, hvit, stor, className = '' }) => {
    return (<Hjelpeboble
        hvit={hvit}
        stor={stor}
        className={className}
        bilde="/sykefravaer/img/svg/nav-ansatt--mannlig.svg"
        bildeAlt="NAV-ansatt">
        {
            nokkel
                ? <div dangerouslySetInnerHTML={getHtmlLedetekst(nokkel)} />
                : children
        }
    </Hjelpeboble>);
};

Bjorn.propTypes = {
    nokkel: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    hvit: PropTypes.bool,
    stor: PropTypes.bool,
    className: PropTypes.string,
};

export default Hjelpeboble;
