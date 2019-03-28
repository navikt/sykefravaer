import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Sidetopp from '../components/Sidetopp';
import Brodsmuler from '../components/Brodsmuler';
import HarAlleredeOppfolgingAlertstripe from './HarAlleredeOppfolgingAlertstripe';
import Veileder from './Veileder';
import MerVeiledning from './MerVeiledning';
import DinOkonomi from './DinOkonomi';
import KanDuBytteJobb from './KanDuBytteJobb';
import Forsikring from './Forsikring';
import HvaKanDuGjoreNa from './HvaKanDuGjoreNa';

const ArbeidsrettetOppfolging = ({ underOppfolging, maksDato }) => {
    const brodsmuler = [{
        tittel: getLedetekst('landingsside.sidetittel'),
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: getLedetekst('ao.sidetittel'),
    }];

    return (
        <React.Fragment>
            <div className="begrensning brodsmulerWrapper">
                <Brodsmuler brodsmuler={brodsmuler} />
            </div>
            <div className="begrensning begrensning--hvit">
                { underOppfolging ? <HarAlleredeOppfolgingAlertstripe /> : null }
                <Sidetopp
                    className="sidetopp--arbeidsrettetOppfolging"
                    tittel={getLedetekst('ao.sidetittel')} />
                <Veileder maksDato={maksDato} />
                <HvaKanDuGjoreNa />
                { !underOppfolging ? <MerVeiledning /> : null }
                <DinOkonomi />
                <KanDuBytteJobb />
                <Forsikring />
            </div>
        </React.Fragment>
    );
};

ArbeidsrettetOppfolging.propTypes = {
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;
