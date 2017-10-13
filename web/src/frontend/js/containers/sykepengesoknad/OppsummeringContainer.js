import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OppsummeringSkjema from '../../components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import GenerellSoknadContainer from './GenerellSoknadContainer';
import StartIgjen from '../../components/sykepengesoknad/StartIgjen';
import Kvittering from '../../components/sykepengesoknad/Kvittering';
import { SENDT, TIL_SENDING } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import mapSkjemasoknadToBackendsoknad from '../../components/sykepengesoknad/mapSkjemasoknadToBackendsoknad';
import { hentArbeidsgiverperiodeberegning } from '../../actions/arbeidsgiverperiodeberegning_actions';
import { hentLedere } from '../../actions/ledere_actions';
import AppSpinner from '../../components/AppSpinner';

const NAV_OG_ARBEIDSGIVER = 'NAV_OG_ARBEIDSGIVER';
const NAV = 'NAV';
const ARBEIDSGIVER = 'ARBEIDSGIVER';

export class Oppsummering extends Component {
    componentWillMount() {
        const { backendsoknad } = this.props;
        this.props.hentArbeidsgiverperiodeberegning(backendsoknad);
        this.props.hentLedere();
    }

    render() {
        if (this.props.henterArbeidsgiverperiodeberegning || this.props.henterLedere) {
            return <AppSpinner />;
        }
        return <OppsummeringSkjema {...this.props} />;
    }
}

Oppsummering.propTypes = {
    hentArbeidsgiverperiodeberegning: PropTypes.func,
    hentLedere: PropTypes.func,
    backendsoknad: sykepengesoknadPt,
    henterArbeidsgiverperiodeberegning: PropTypes.bool,
    henterLedere: PropTypes.bool,
    sendesTil: PropTypes.string,

};

const utledSkalViseForskuttering = (ledere, soknad, arbeidsgiverperiodeberegning) => {
    if (ledere && soknad && arbeidsgiverperiodeberegning) {
        const ledersSvar = ledere
            .filter((l) => {
                return l.orgnummer === soknad.arbeidsgiver.orgnummer;
            })
            .map((l) => {
                return l.arbeidsgiverForskuttererLoenn;
            })[0];
        if (ledersSvar !== undefined && ledersSvar !== null) {
            return false;
        }
        return arbeidsgiverperiodeberegning.erUtenforArbeidsgiverperiode;
    }
    return true;
};

const utledMottaker = (ledere, soknad, arbeidsgiverperiodeberegning) => {
    if (ledere && soknad && arbeidsgiverperiodeberegning) {
        const svarFraLeder = ledere
            .filter((l) => {
                return l.orgnummer === soknad.arbeidsgiver.orgnummer;
            })
            .map((l) => {
                return l.arbeidsgiverForskuttererLoenn;
            })[0];

        const skalTilNAV = arbeidsgiverperiodeberegning.erUtenforArbeidsgiverperiode;
        const skalTilArbeidsgiver = !skalTilNAV || svarFraLeder || soknad.arbeidsgiverForskutterer === 'JA' || soknad.arbeidsgiverForskutterer === 'VET_IKKE';

        if (skalTilNAV && skalTilArbeidsgiver) {
            return NAV_OG_ARBEIDSGIVER;
        } else if (skalTilNAV) {
            return NAV;
        } else if (skalTilArbeidsgiver) {
            return ARBEIDSGIVER;
        }
    }
    return undefined;
};

export const mapStateToProps = (state, ownProps) => {
    return {
        henterArbeidsgiverperiodeberegning: state.arbeidsgiverperiodeberegning.henter === true,
        henterLedere: state.ledere.henter,
        visForskutteringssporsmal: utledSkalViseForskuttering(state.ledere.data, ownProps.skjemasoknad, state.arbeidsgiverperiodeberegning.data),
        sendesTil: utledMottaker(state.ledere.data, ownProps.skjemasoknad, state.arbeidsgiverperiodeberegning.data),
        backendsoknad: mapSkjemasoknadToBackendsoknad(ownProps.skjemasoknad),
    };
};

export const ConnectedOppsummering = connect(mapStateToProps, {
    hentArbeidsgiverperiodeberegning,
    hentLedere,
})(Oppsummering);

export const Controller = (props) => {
    if (props.sykepengesoknad.status === SENDT || props.sykepengesoknad.status === TIL_SENDING) {
        return <Kvittering sykepengesoknad={props.sykepengesoknad} />;
    }
    if (props.skjemasoknad) {
        return <ConnectedOppsummering {...props} />;
    }
    return <StartIgjen sykepengesoknad={props.sykepengesoknad} />;
};

Controller.propTypes = {
    sykepengesoknad: sykepengesoknadPt,
    skjemasoknad: PropTypes.shape(),
};

const OppsummeringContainer = ({ params }) => {
    const brodsmuler = [{
        tittel: 'Ditt sykefravær',
        sti: '/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknader om sykepenger',
        sti: '/soknader/',
        erKlikkbar: true,
    }, {
        tittel: 'Søknad',
    }];
    return (<GenerellSoknadContainer
        Component={Controller}
        brodsmuler={brodsmuler}
        params={params} />);
};

OppsummeringContainer.propTypes = {
    params: PropTypes.shape({
        sykepengesoknadId: PropTypes.string,
    }),
};

export default OppsummeringContainer;
