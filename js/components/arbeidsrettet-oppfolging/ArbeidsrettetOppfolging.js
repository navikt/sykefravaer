import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import Sidetopp from '../Sidetopp';
import Brodsmuler from '../Brodsmuler';
import HarAlleredeOppfolgingAlertstripe from './HarAlleredeOppfolgingAlertstripe';
import VeilederRad from './VeilederRad';
import KommunikasjonRad from './KommunikasjonRad';
import AapRad from './AapRad';
import TrengerMerVeiledningRad from './TrengerMerVeiledningRad';

const ArbeidsrettetOppfolging = ({ underOppfolging, sykmeldtInfo }) => {
    const brodsmuler = [{
        tittel: getLedetekst('landingsside.sidetittel'),
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: getLedetekst('infoside-fo.sidetittel'),
    }];

    return (
        <React.Fragment>
            <div className="infoside-fo__brodsmuler--wrapper begrensning">
                <Brodsmuler brodsmuler={brodsmuler} />
            </div>
            { underOppfolging ? <HarAlleredeOppfolgingAlertstripe /> : null }
            <Sidetopp tittel={getLedetekst('infoside-fo.sidetittel')} />
            <VeilederRad sykmeldtInfo={sykmeldtInfo} />
            <KommunikasjonRad />
            <AapRad />
            { !underOppfolging ? <TrengerMerVeiledningRad /> : null }
        </React.Fragment>
    );
};

ArbeidsrettetOppfolging.propTypes = {
    underOppfolging: PropTypes.bool,
    sykmeldtInfo: PropTypes.shape({
        maksDato: PropTypes.string,
    }),
};

export default ArbeidsrettetOppfolging;
