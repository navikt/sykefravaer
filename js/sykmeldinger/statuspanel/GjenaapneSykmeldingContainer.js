import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { gjenaapneSykmelding } from '../data/din-sykmelding/dinSykmeldingActions';

function GjenaapneSykmeldingContainer({ sykmeldingId, gjenaapneSykmeldingConnected, gjenaapneFeilet, gjenaapner }) {
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
                        return gjenaapneSykmeldingConnected(sykmeldingId);
                    }}>
                    {getLedetekst('din-sykmelding.avbrutt.gjenaapne')}
                </Knapp>
            </div>
            <div aria-live="polite">
                { gjenaapneFeilet && <p className="skjemaelement__feilmelding">Beklager, det oppstod en feil!</p> }
            </div>
        </div>
    );
}

GjenaapneSykmeldingContainer.propTypes = {
    sykmeldingId: PropTypes.string.isRequired,
    gjenaapneSykmeldingConnected: PropTypes.func.isRequired,
    gjenaapneFeilet: PropTypes.bool,
    gjenaapner: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        gjenaapneFeilet: state.dineSykmeldinger.gjenaapneFeilet,
        gjenaapner: state.dineSykmeldinger.gjenaapner,
    };
};

export default connect(mapStateToProps, { gjenaapneSykmeldingConnected: gjenaapneSykmelding })(GjenaapneSykmeldingContainer);
