import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Sidetopp from '../components/Sidetopp';
import Brodsmuler from '../components/Brodsmuler';
import HarAlleredeOppfolgingAlertstripe from './HarAlleredeOppfolgingAlertstripe';
import VeilederRad from './VeilederRad';
import DinOkonomi from './DinOkonomi';
import TrengerMerVeiledningRad from './MerVeiledning';
import HvaKanDuGjoreNa from './HvaKanDuGjoreNa';
import ArbeidsrettetOppfolgingRad from './ArbeidsrettetOppfolgingrad';

const ArbeidsrettetOppfolging = ({ brukerNavn, underOppfolging, maksDato }) => {
    const brodsmuler = [{
        tittel: getLedetekst('landingsside.sidetittel'),
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Snart slutt på sykepengene',
    }];

    return (
        <div className="begrensning">
            <div className="brodsmulerWrapper">
                <Brodsmuler brodsmuler={brodsmuler} />
            </div>
            { underOppfolging ? <HarAlleredeOppfolgingAlertstripe /> : null }
            <div className="blokk--xl">
                <Sidetopp tittel="Snart slutt på sykepengene" />
            </div>
            <VeilederRad brukerNavn={brukerNavn} maksDato={maksDato} />
            <HvaKanDuGjoreNa />
            { !underOppfolging ? <TrengerMerVeiledningRad /> : null }
            <DinOkonomi />
            <ArbeidsrettetOppfolgingRad tittel="Forsikrings- og pensjonsavtale">
                <p>Du bør undersøke hvilke rettigheter du har hos forsikringsselskapet eller pensjonskassen du er medlem i. Det er
                ikke NAV som administrerer slike ordninger.</p>
            </ArbeidsrettetOppfolgingRad>
        </div>
    );
};

ArbeidsrettetOppfolging.propTypes = {
    brukerNavn: PropTypes.string,
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;
