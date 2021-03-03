import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getHtmlLedetekst } from '../ledetekster';
import BjornBildeStor from './BjornBildeStor';
import BjornBildeLiten from './BjornBildeLiten';

const Hjelpeboble = (
    {
        children,
        className = '',
        hvit = false,
        stor = false,
        vertikal = false,
        bildeAlt,
    },
) => {
    const classNames = cn(`hjelpeboble ${className}`, {
        'hjelpeboble--horisontal': !vertikal,
    });
    const bobleClassNames = cn({
        hjelpeboble__boble: true,
        'hjelpeboble__boble--hvit': hvit,
        'hjelpeboble__boble--stor': stor,
        'hjelpeboble__boble--horisontal': !vertikal,
    });
    const bildeClassNames = cn({
        hjelpeboble__bilde: true,
        'hjelpeboble__bilde--hvit': hvit,
        'hjelpeboble__bilde--stor': stor,
        'hjelpeboble__bilde--horisontal': !vertikal,
    });
    const Bilde = stor ? BjornBildeStor : BjornBildeLiten;
    return (
        <div className={classNames}>
            <div className={bobleClassNames}>
                {children}
            </div>
            <div className={bildeClassNames}>
                <Bilde alt={bildeAlt} />
            </div>
        </div>
    );
};

Hjelpeboble.propTypes = {
    bildeAlt: PropTypes.string,
    children: PropTypes.element,
    hvit: PropTypes.bool,
    stor: PropTypes.bool,
    vertikal: PropTypes.bool,
    className: PropTypes.string,
};

export const Bjorn = (
    {
        nokkel,
        children,
        hvit,
        stor,
        vertikal,
        className = '',
    },
) => {
    return (
        <Hjelpeboble
            hvit={hvit}
            stor={stor}
            vertikal={vertikal}
            className={className}
            bildeAlt="NAV-ansatt">
            {
                nokkel
                    ? <div dangerouslySetInnerHTML={getHtmlLedetekst(nokkel)} />
                    : children
            }
        </Hjelpeboble>
    );
};

Bjorn.propTypes = {
    nokkel: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    hvit: PropTypes.bool,
    stor: PropTypes.bool,
    vertikal: PropTypes.bool,
    className: PropTypes.string,
};

export default Hjelpeboble;
