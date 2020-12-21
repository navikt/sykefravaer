import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Sidetittel, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import { Bjorn } from '@navikt/digisyfo-npm/lib/components/Hjelpeboble';
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
import HotjarTrigger from '../components/HotjarTrigger';
import SidebannerLiten from '../components/SidebannerLiten';

class ArbeidsrettetOppfolging extends Component {
    componentDidMount() {
        const { underOppfolging } = this.props;
        const action = underOppfolging
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
            tittel: 'Varsling',
        }];
        const hotjarTrigger = underOppfolging
            ? 'ARBEIDSRETTET_OPPFOLGING_UNDER_OPPFOLGING'
            : 'ARBEIDSRETTET_OPPFOLGING_IKKE_UNDER_OPPFOLGING';


        // TODO: Get arbeidsgiver status
        const harArbeidsgiver = false;

        return (
            <HotjarTrigger hotjarTrigger={hotjarTrigger}>
                <SidebannerLiten />
                <div className="begrensning begrensning--bred brodsmulerWrapper">
                    <Brodsmuler brodsmuler={brodsmuler} />
                </div>
                <div className="begrensning begrensning--bred">
                    <div style={{ marginBottom: '3rem' }}>
                        <Bjorn>
                            <Normaltekst>
                        Det begynner å nærme seg datoen du ikke lenger kan få sykepenger. Tror du at du snart er tilbake i jobb, eller vil du trenge noe mer fra NAV? Her kan du se hvilke muligheter du har.
                            </Normaltekst>
                        </Bjorn>
                    </div>

                    <HvaKanDuGjoreNa harArbeidsgiver={harArbeidsgiver} />

                    <h2 className="panel__tittel">Andre muligheter</h2>
                </div>
            </HotjarTrigger>
        );
    }
}

ArbeidsrettetOppfolging.propTypes = {
    underOppfolging: PropTypes.bool,
    maksDato: PropTypes.string,
};

export default ArbeidsrettetOppfolging;

/*
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
                */
