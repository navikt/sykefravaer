import React, { PropTypes } from 'react';
import VelgArbeidsgiver from '../components/sykmeldingskjema/VelgArbeidsgiver';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';

export const VelgArbeidsgiverWrapper = (props) => {
    const { henter } = props;
    if (henter) {
        return <p className="hovedsporsmal__tilleggssporsmal">Vent litt mens vi henter dine arbeidsgivere...</p>;
    }
    return <VelgArbeidsgiver {...props} />;
};

VelgArbeidsgiverWrapper.propTypes = {
    henter: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const arbeidsgivere = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.label'),
    }]);

    return {
        arbeidsgivere,
        henter: state.arbeidsgivere.henter,
    };
};

const Container = connect(mapStateToProps)(VelgArbeidsgiverWrapper);

export default Container;
