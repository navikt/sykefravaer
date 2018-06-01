import React from 'react';
import PropTypes from 'prop-types';
import { childEllerChildren } from '../../propTypes';

const OppsummeringSporsmalscontainer = ({ tag, children }) => {
    return (<div className="oppsummering__sporsmalscontainer" id={`js-${tag.toLowerCase()}`}>
        {children}
    </div>);
};

OppsummeringSporsmalscontainer.propTypes = {
    tag: PropTypes.string,
    children: childEllerChildren,
};

export default OppsummeringSporsmalscontainer;
