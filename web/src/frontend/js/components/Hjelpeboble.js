import React from 'react';
import PropTypes from 'prop-types';
import { getHtmlLedetekst } from 'digisyfo-npm';

const Hjelpeboble = ({ bilde, bildeAlt, children }) => {
    return (<div className="hjelpeboble">
        <div className="hjelpeboble__boble">
            {children}
        </div>
        <div className="hjelpeboble__bilde">
            <img src={bilde} alt={bildeAlt} />
        </div>
    </div>);
};

Hjelpeboble.propTypes = {
    bilde: PropTypes.string,
    bildeAlt: PropTypes.string,
    children: PropTypes.element,
};

export const Bjorn = ({ nokkel }) => {
    return (<Hjelpeboble bilde="/sykefravaer/img/svg/nav-ansatt--mannlig.svg" bildeAlt="NAV-ansatt">
        <div dangerouslySetInnerHTML={getHtmlLedetekst(nokkel)} />
    </Hjelpeboble>);
};

Bjorn.propTypes = {
    nokkel: PropTypes.string,
};

export default Hjelpeboble;
