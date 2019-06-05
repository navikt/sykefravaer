/* eslint arrow-body-style: ["error", "as-needed"] */
import PT from 'prop-types';
import React from 'react';
import cn from 'classnames';

export const Nokkelopplysning = ({ vis = true, className, tittel, children }) => (
    vis
        ? (
            <div className={cn('nokkelopplysning', className)}>
                <h2 className="nokkelopplysning__tittel">{tittel}</h2>
                {children}
            </div>
        )
        : null
);

Nokkelopplysning.propTypes = {
    vis: PT.bool,
    className: PT.string,
    tittel: PT.string.isRequired,
    children: PT.node.isRequired,
};
