import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';

const Header = ({ isLong }) => {
    return (<header className="sidetopp">
        {(() => {
            if (isLong) { return (<h1 className="sidetopp__tittel-long">{getLedetekst('sykepengesoknad-utland.tittel')}</h1>); }
            return (<h1 className="sidetopp__tittel">{getLedetekst('sykepengesoknad-utland.tittel')}</h1>);
        })()}
    </header>);
};

Header.propTypes = {
    isLong: PropTypes.bool,
};

export default Header;
