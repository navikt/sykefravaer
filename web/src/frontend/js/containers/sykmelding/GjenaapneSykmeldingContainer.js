import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { getLedetekst } from 'digisyfo-npm';
import { gjenaapneSykmelding } from '../../actions/dinSykmelding_actions';

// eslint-disable-next-line no-shadow
function GjenaapneSykmeldingContainer({ sykmeldingId, gjenaapneSykmelding, gjenaapneFeilet, gjenaapner }) {
    return (
        <div>
            <div className="verktoylinje">
                <Knapp
                    type="standard"
                    htmlType="button"
                    mini
                    autoDisableVedSpinner
                    className="js-gjenaapne-sykmelding"
                    spinner={gjenaapner}
                    onClick={() => {
                        return gjenaapneSykmelding(sykmeldingId);
                    }}>
                    {getLedetekst('din-sykmelding.avbrutt.gjenaapne')}
                </Knapp>
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
    gjenaapner: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        gjenaapneFeilet: state.dineSykmeldinger.gjenaapneFeilet,
        gjenaapner: state.dineSykmeldinger.gjenaapner,
    };
};

export default connect(mapStateToProps, { gjenaapneSykmelding })(GjenaapneSykmeldingContainer);
