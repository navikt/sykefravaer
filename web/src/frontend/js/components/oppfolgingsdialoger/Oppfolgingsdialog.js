import React, { PropTypes } from 'react';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';

const Oppfolgingsdialog = ({ oppfolgingsdialog }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('oppfolgingsdialog.tittel')} />
    </div>);
};

Oppfolgingsdialog.propTypes = {
    oppfolgingsdialog: PropTypes.object,
};

export default Oppfolgingsdialog;
