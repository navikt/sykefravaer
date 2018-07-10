import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { angreBekreftSykmelding } from '../../actions/dinSykmelding_actions';

// eslint-disable-next-line no-shadow
function AngreBekreftSykmeldingContainer({ sykmeldingId, angreBekreftSykmelding, angreBekreftSykmeldingFeilet }) {
    return (
        <div className="verktoylinje">
            <button
                className="knapp knapp--mini js-gjenaapne-sykmelding"
                onClick={() => { return angreBekreftSykmelding(sykmeldingId); }}
                key={1}>
                {getLedetekst('din-sykmelding.godkjennt.angre')}
            </button>
            <div aria-live="polite" key={2}>
                {angreBekreftSykmeldingFeilet &&
                <p className="skjema__feilmelding">{getLedetekst('din-sykmelding.godkjennt.angre.feilet')}</p>}
            </div>
        </div>
    );
}

AngreBekreftSykmeldingContainer.propTypes = {
    sykmeldingId: PropTypes.string.isRequired,
    angreBekreftSykmelding: PropTypes.func.isRequired,
    angreBekreftSykmeldingFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        angreBekreftSykmeldingFeilet: state.dineSykmeldinger.angreBekreftSykmeldingFeilet,
    };
};

export default connect(mapStateToProps, { angreBekreftSykmelding })(AngreBekreftSykmeldingContainer);
