import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { gjenaapneSykmelding } from '../../actions/dinSykmelding_actions';

function GjenaapneSykmeldingContainer({ sykmeldingId, gjenaapneSykmeldingConnected, gjenaapneFeilet }) {
    return (
        <div className="verktoylinje">
            <button
                className="knapp knapp--mini js-gjenaapne-sykmelding"
                onClick={() => {
                    return gjenaapneSykmeldingConnected(sykmeldingId);
                }}>
                {getLedetekst('din-sykmelding.avbrutt.gjenaapne')}
            </button>
            <div aria-live="polite">
                { gjenaapneFeilet && <p className="skjema__feilmelding">Beklager, sykmeldingen kunne ikke gjenåpnes</p> }
            </div>
        </div>
    );
}

GjenaapneSykmeldingContainer.propTypes = {
    sykmeldingId: PropTypes.string.isRequired,
    gjenaapneSykmeldingConnected: PropTypes.func.isRequired,
    gjenaapneFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        gjenaapneFeilet: state.dineSykmeldinger.gjenaapneFeilet,
    };
};

export default connect(mapStateToProps, { gjenaapneSykmeldingConnected: gjenaapneSykmelding })(GjenaapneSykmeldingContainer);
