import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import Sporsmalstekst from './Sporsmalstekst';
import Landvelger from '../../../components/skjema/landvelger/Landvelger';

const Land = ({ sporsmalstekst, name }) => {
    return (<div>
        <Sporsmalstekst Tag="label" tekst={sporsmalstekst} htmlFor={name} />
        <Field
            component={Landvelger}
            name={name}
            id={name} />
    </div>);
};

Land.propTypes = {
    sporsmalstekst: PropTypes.string,
    name: PropTypes.string,
};

export default Land;
