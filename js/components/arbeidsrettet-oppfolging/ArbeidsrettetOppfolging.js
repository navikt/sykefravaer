import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Sidetopp from '../Sidetopp';
import Brodsmuler from '../Brodsmuler';
import HarAlleredeOppfolgingAlertstripe from './HarAlleredeOppfolgingAlertstripe';
import VeilederRad from './VeilederRad';
import KommunikasjonRad from './KommunikasjonRad';
import AapRad from './AapRad';
import TrengerMerVeiledningRad from './TrengerMerVeiledningRad';

const ArbeidsrettetOppfolging = ({ brukerNavn, underOppfolging, maksDato }) => {
    const brodsmuler = [{
        tittel: getLedetekst('containers.sidetittel'),
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
            <VeilederRad brukerNavn={brukerNavn} maksDato={maksDato} />
            <KommunikasjonRad />
            { !underOppfolging ? <TrengerMerVeiledningRad /> : null }
            <AapRad />
        </React.Fragment>
    );
};

ArbeidsrettetOppfolging.propTypes = {
    brukerNavn: PropTypes.string,
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;
