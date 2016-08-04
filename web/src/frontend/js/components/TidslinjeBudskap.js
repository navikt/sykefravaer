import React, { PropTypes } from 'react';

export const lagHtml = (innhold, bilde, alt = '') => {
    let innholdMedBilde = innhold;
    if (bilde) {
        innholdMedBilde = `<img class="js-img" alt="${alt}" src="${bilde}" /> ${innhold}`;
    }
    return { __html: `<div class="side-innhold boble-budskap">${innholdMedBilde}</div>` };
};

const TidslinjeBudskap = ({ innhold, bilde, alt, vis }) => {
    return (<div className={`panel panel-stablet panel-budskap ${(!vis ? 'er-usynlig' : '')}`}
        dangerouslySetInnerHTML={lagHtml(innhold, bilde, alt)}></div>);
};

TidslinjeBudskap.propTypes = {
    innhold: PropTypes.string,
    bilde: PropTypes.string,
    alt: PropTypes.string,
    vis: PropTypes.bool,
};

export default TidslinjeBudskap;
