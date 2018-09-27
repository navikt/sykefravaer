import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { gjenaapneSykmelding } from '../../actions/dinSykmelding_actions';

// eslint-disable-next-line no-shadow
function GjenaapneSykmeldingContainer({ sykmeldingId, gjenaapneSykmelding, gjenaapneFeilet }) {
    return (
        <div>
            <div className="verktoylinje">
                <button
                    className="knapp knapp--mini js-gjenaapne-sykmelding"
                    onClick={() => {
                        return gjenaapneSykmelding(sykmeldingId);
                    }}>
                    {getLedetekst('din-sykmelding.avbrutt.gjenaapne')}
                </button>
            </div>
            <div aria-live="polite">
                { gjenaapneFeilet && <p className="skjemaelement__feilmelding">Beklager, sykmeldingen kunne ikke gjenåpnes</p> }
            </div>
        </div>
    );
}

GjenaapneSykmeldingContainer.propTypes = {
    sykmeldingId: PropTypes.string.isRequired,
    gjenaapneSykmelding: PropTypes.func.isRequired,
    gjenaapneFeilet: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        gjenaapneFeilet: state.dineSykmeldinger.gjenaapneFeilet,
    };
};

export default connect(mapStateToProps, { gjenaapneSykmelding })(GjenaapneSykmeldingContainer);
