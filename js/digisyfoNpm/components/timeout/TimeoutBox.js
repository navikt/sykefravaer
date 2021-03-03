import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
import Modal from 'nav-frontend-modal';
/* eslint-enable */
import { connect } from 'react-redux';
import * as toggleActions from '../../actions/toggles_actions';
import { getLedetekst } from '../../ledetekster';

export const TimeoutBoxSide = ({ hentToggles, brukerSnartUtlogget }) => {
    const appEl = document.getElementById('maincontent');
    Modal.setAppElement(appEl);

    return (
        <Modal isOpen={brukerSnartUtlogget} closeButton={false} contentLabel={getLedetekst('sykefravaer.timeout.tittel')}>
            <h2 className="panel__tittel">{getLedetekst('sykefravaer.timeout.tittel')}</h2>
            <p className="blokk">{getLedetekst('sykefravaer.timeout.tekst')}</p>
            <div className="knapperad knapperad--forrigeNeste">
                <div className="knapperad__element">
                    <button
                        type="button"
                        className="knapp knapp--hoved"
                        onClick={() => {
                            hentToggles();
                        }}>
                        {getLedetekst('sykefravaer.timeout.knapp.bli')}
                    </button>
                </div>
                <div className="knapperad__element">
                    <a className="knapp" href="/esso/logout">{getLedetekst('sykefravaer.timeout.knapp.logg.ut')}</a>
                </div>
            </div>
        </Modal>
    );
};

TimeoutBoxSide.propTypes = {
    hentToggles: PropTypes.func,
    brukerSnartUtlogget: PropTypes.bool,
};

export function mapStateToProps(state) {
    return {
        brukerSnartUtlogget: state.timeout.brukerSnartUtlogget,
        ledetekster: state.ledetekster.henter ? {} : state.ledetekster.data,
    };
}

const TimeoutBox = connect(mapStateToProps, { hentToggles: toggleActions.hentToggles })(TimeoutBoxSide);

export default TimeoutBox;
