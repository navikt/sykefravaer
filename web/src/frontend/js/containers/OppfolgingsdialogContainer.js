import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import Oppfolgingsdialog from '../components/oppfolgingsdialoger/Oppfolgingsdialog';
import { getLedetekst } from 'digisyfo-npm';
import { brodsmule as brodsmulePt } from '../propTypes';
import { getOppfolgingsdialog } from '../utils/oppfolgingsdialogUtils';

export class OppfolgingsdialogSide extends Component {

    render() {
        const { brodsmuler, oppfolgingsdialog, henter, hentingFeilet} = this.props;

        return (<Side tittel={getLedetekst('oppfolgingsdialog.sidetittel')} brodsmuler={brodsmuler}>
                { (() => {
                    if (henter) {
                        return <AppSpinner />;
                    } else if (hentingFeilet) {
                        return (<Feilmelding />);
                    }
                    return <Oppfolgingsdialog oppfolgingsdialog={oppfolgingsdialog} />;
                })()
                }
            </Side>);
    }
}

OppfolgingsdialogSide.propTypes = {
    dispatch: PropTypes.func,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    oppfolgingsdialog: PropTypes.object,
    oppfolgingsdialogId: PropTypes.string,
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
};

export function mapStateToProps(state, ownProps) {
    const oppfolgingsdialogId = ownProps.params.oppfolgingsdialogId;
    const oppfolgingsdialog = getOppfolgingsdialog(state.oppfolgingsdialoger.data, oppfolgingsdialogId);

    return {
        henter: state.oppfolgingsdialoger.henter || state.ledetekster.henter,
        hentingFeilet: state.oppfolgingsdialoger.hentingFeilet || state.ledetekster.hentingFeilet,
        oppfolgingsdialog,
        oppfolgingsdialogId,
        brodsmuler: [{
            tittel: getLedetekst('landingsside.sidetittel'),
            sti: '/',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialoger.sidetittel'),
            sti: '/oppfolgingsdialoger',
            erKlikkbar: true,
        }, {
            tittel: getLedetekst('oppfolgingsdialog.sidetittel'),
        }],
    };
}

const OppfolgingsdialogContainer = connect(mapStateToProps)(OppfolgingsdialogSide);

export default OppfolgingsdialogContainer;
