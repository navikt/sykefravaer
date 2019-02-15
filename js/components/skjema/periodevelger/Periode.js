import React from 'react';
import PropTypes from 'prop-types';
import { Fields } from 'redux-form';
import DatovelgerPeriode from './FomTomVelger';

const Periode = (props) => {
    const { name, index, onRemoveHandler, tidligsteFom, senesteTom, skjemanavn, initiellDato } = props;
    const fomName = `${name}.fom`;
    const tomName = `${name}.tom`;
    return (<Fields
        names={[fomName, tomName]}
        skjemanavn={skjemanavn}
        tidligsteFom={tidligsteFom}
        senesteTom={senesteTom}
        component={DatovelgerPeriode}
        onRemoveHandler={onRemoveHandler}
        initiellDato={initiellDato}
        periodeIndex={index} />);
};

Periode.propTypes = {
    index: PropTypes.number,
    onRemoveHandler: PropTypes.func,
    tidligsteFom: PropTypes.instanceOf(Date),
    senesteTom: PropTypes.instanceOf(Date),
    initiellDato: PropTypes.instanceOf(Date),
    name: PropTypes.string.isRequired,
    skjemanavn: PropTypes.string,
};

export default Periode;
