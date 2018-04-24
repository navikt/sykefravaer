import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLedetekst } from 'digisyfo-npm';
import VelgArbeidsgiver from '../../components/sykmeldingskjema/VelgArbeidsgiver';

export const VelgArbeidsgiverWrapper = (props) => {
    const { henter, vis } = props;
    return !vis
        ? null
        : henter
            ? <p className="hovedsporsmal__tilleggssporsmal">Vent litt mens vi henter dine arbeidsgivere...</p>
            : <VelgArbeidsgiver {...props} />;
};

VelgArbeidsgiverWrapper.propTypes = {
    henter: PropTypes.bool,
    vis: PropTypes.bool,
};

export const mapStateToProps = (state) => {
    const arbeidsgivere = state.arbeidsgivere.data.concat([{
        orgnummer: '0',
        navn: getLedetekst('send-til-arbeidsgiver.annen-arbeidsgiver.label'),
    }]);

    return {
        arbeidsgivere,
        henter: state.arbeidsgivere.henter,
        vis: !state.brukerinfo.bruker.data.strengtFortroligAdresse,
    };
};

const Container = connect(mapStateToProps)(VelgArbeidsgiverWrapper);

export default Container;
