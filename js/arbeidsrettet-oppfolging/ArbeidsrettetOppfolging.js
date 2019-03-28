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
        <div className="begrensning">
            <div className="brodsmulerWrapper">
                <Brodsmuler brodsmuler={brodsmuler} />
            </div>
            { underOppfolging ? <HarAlleredeOppfolgingAlertstripe /> : null }
            <div className="blokk--xl">
                <Sidetopp tittel={getLedetekst('ao.sidetittel')} />
            </div>
            <Veileder maksDato={maksDato} />
            <HvaKanDuGjoreNa />
            { !underOppfolging ? <MerVeiledning /> : null }
            <DinOkonomi />
            <KanDuBytteJobb />
            <Forsikring />
        </div>
    );
};

ArbeidsrettetOppfolging.propTypes = {
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;
