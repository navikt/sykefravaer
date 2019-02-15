import React from 'react';
import PropTypes from 'prop-types';
import Periodevelger from '../skjema/periodevelger/Periodevelger';
import Sporsmalstekst from './Sporsmalstekst';

const Perioder = ({ min, max, name, sporsmalstekst, initiellDato }) => {
    return (
        <div>
            <Sporsmalstekst Tag="label" tekst={sporsmalstekst} htmlFor={name} />
            <Periodevelger
                initiellDato={initiellDato}
                name={name}
                tidligsteFom={min}
                senesteTom={max} />
        </div>);
};

Perioder.propTypes = {
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    initiellDato: PropTypes.instanceOf(Date),
    name: PropTypes.string,
    sporsmalstekst: PropTypes.string,
};

export default Perioder;
