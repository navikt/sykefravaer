import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import Alertstripe from 'nav-frontend-alertstriper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { SVARSKJEMANAVN } from '../../../utils/moteUtils';

const Component = ({ visVarsel }) => {
    if (!visVarsel) {
        return null;
    }
    return (
        <div className="blokk">
            <Alertstripe
                type="info"
                solid
            >
                {getLedetekst('mote.skjema.svar.tidspunkt.info')}
            </Alertstripe>
        </div>
    );
};

Component.propTypes = {
    visVarsel: PropTypes.bool,
};

const mapStateToProps = (state) => {
    const verdier = getFormValues(SVARSKJEMANAVN)(state);
    let visVarsel;
    if (!verdier) {
        visVarsel = false;
    } else {
        visVarsel = verdier.alternativer.filter((alt) => {
            return alt
                && alt.avkrysset
                && alt.verdi !== 'ingen';
        }).length < verdier.alternativer.length - 1;
    }
    return { visVarsel };
};

const MinstEttTidspunktContainer = connect(mapStateToProps)(Component);

export default MinstEttTidspunktContainer;
