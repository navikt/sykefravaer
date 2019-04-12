import React, { Component } from 'react';
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
import { pushToDataAOLayer } from './pushToAODataLayer';

class ArbeidsrettetOppfolging extends Component {
    componentDidMount() {
        const action = this.props.underOppfolging
            ? 'SIDE_VIST_UNDER_OPPFOLGING'
            : 'SIDE_VIST_IKKE_UNDER_OPPFOLGING';
        pushToDataAOLayer(action);
    }

    render() {
        const { underOppfolging, maksDato } = this.props;
        const brodsmuler = [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('ao.sidetittel'),
        }];

        return (
            <React.Fragment>
                <div className="begrensning begrensning--bred brodsmulerWrapper">
                    <Brodsmuler brodsmuler={brodsmuler} />
                </div>
                <div className="begrensning begrensning--bred begrensning--hvit">
                    <div className="arbeidsrettetOppfolging">
                        { underOppfolging ? <HarAlleredeOppfolgingAlertstripe /> : null }
                        <Sidetopp
                            className="sidetopp--arbeidsrettetOppfolging"
                            tittel={getLedetekst('ao.sidetittel')} />
                        <Veileder maksDato={maksDato} />
                        <HvaKanDuGjoreNa />
                        { !underOppfolging ? <MerVeiledning /> : null }
                        <KanDuBytteJobb />
                        <DinOkonomi />
                        <Forsikring />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ArbeidsrettetOppfolging.propTypes = {
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;
